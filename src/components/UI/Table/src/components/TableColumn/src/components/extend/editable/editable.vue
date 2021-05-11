<script lang="tsx">
  import type {
    WTableEditableColumn,
    ElTableColumnScopedSlot,
    WTableEditableColumnSwitch,
  } from '/@/components/UI/Table'
  import type { ElInputRef } from '/@/components/UI/Input'
  import type { PropType } from 'vue'

  import { defineComponent, ref, resolveDynamicComponent } from 'vue'
  import { camel2Line, easyDeepGet, isFunction } from 'easy-fns-ts'

  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { emptyFunction } from '/@/utils'

  import { useEditableColumnComponents } from './hooks/useEditableColumnComponents'
  import { useEditableColumnLoading } from './hooks/useEditableColumnLoading'
  import { useEditableColumnSwitch } from './hooks/useEditableColumnSwitch'

  export default defineComponent({
    name: 'WTableColumnEditable',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WTableEditableColumn>,
      row: Object as PropType<Pick<ElTableColumnScopedSlot, 'row'>>,
    },

    setup(props) {
      useEditableColumnComponents()

      const {
        startLoading,
        endLoading,
        loadingTargetId,
      } = useEditableColumnLoading(props)

      const {
        switchLoading,
        switchLoadStart,
        switchLoadEnd,
        isSwitchType,
      } = useEditableColumnSwitch(props)

      const editable = ref(false)
      const editValue = ref('')
      const editableComponentRef = ref<Nullable<ElInputRef>>(null)

      const { emitEvents, tableProps } = useTableContext()

      // render original content
      const renderOriginContent = () => {
        // fir for nested prop
        // use `deepGet` method to get real nested value
        const getValue = easyDeepGet(props.row, props.item?.prop!)

        // set the inside editValue ASAP got real value
        editValue.value = getValue

        // item may have `formatter` function
        const formattedValue = isFunction(props.item?.formatter)
          ? props.item?.formatter(props.row)
          : getValue

        // edit click event
        const onClickEdit = () => {
          editable.value = true

          // `input` and `inputNumber`
          // default focus
          ;(props.item?.editType === 'input' ||
            props.item?.editType === 'inputNumber') &&
            setTimeout(() => {
              // since these components are loaded by `createAsyncComponent`
              // it has 200ms delay to load the component
              // so we use setTimeout for 300ms to focus when comp loaded complete
              editableComponentRef.value!.focus()
            }, 300)
        }

        // if `switch` type
        // value won't render since `element-plus` `el-table` default behavior is don't render boolean type value
        // instead, `w-table` provide a default boolean type value switch component
        // so below need a judge to decide render `formattedValue` or `el-switch`
        // also, the most important thing is that `el-switch` has a `beforeChange` prop like a hook before change
        // `w-table` use `beforeChange` API to achieve the same action like `emitEvents.edit`
        return (
          <el-space size="mini">
            {isSwitchType.value ? (
              <el-switch
                {...props.item!.editTypeComponentProps}
                v-model={editValue.value}
                loading={switchLoading.value}
                beforeChange={() =>
                  (props.item as WTableEditableColumnSwitch).editTypeComponentProps?.beforeChange(
                    {
                      newValue: editValue.value,
                      row: props.row,
                      prop: props.item!.prop,
                      loadStart: switchLoadStart,
                      loadEnd: switchLoadEnd,
                    }
                  )
                }
              ></el-switch>
            ) : (
              <span>{formattedValue}</span>
            )}

            {!isSwitchType.value && (
              <i
                class="el-icon-edit cursor-pointer w-table-edit-icon"
                onClick={onClickEdit}
              ></i>
            )}
          </el-space>
        )
      }

      // confirm ane emit to root table
      const onSave = (e: KeyboardEvent | any) => {
        // handle common and enter keyup
        if (!e.key || e.key === 'Enter') {
          // for emit event
          emitEvents.edit({
            newValue: editValue.value,
            row: props.row,
            prop: props.item!.prop,
            loadStart: () =>
              startLoading({ target: `#${loadingTargetId.value}` }),
            loadEnd: () => endLoading(),
          })

          // for prop usage
          tableProps.value.onEdit &&
            tableProps.value.onEdit({
              newValue: editValue.value,
              row: props.row,
              prop: props.item!.prop,
              loadStart: () =>
                startLoading({ target: `#${loadingTargetId.value}` }),
              loadEnd: () => endLoading(),
            })

          editable.value = false
        }

        // esc means quit edit mode
        if (e.key === 'Escape') {
          editable.value = false
        }
      }

      // render editable cell action
      // specific for `save` and `cancel`
      const renderEditAction = () => (
        <>
          <i class="el-icon-check cursor-pointer" onClick={onSave}></i>
          <i
            class="el-icon-close cursor-pointer"
            onClick={() => (editable.value = false)}
          ></i>
        </>
      )

      // render different typed component edit item
      // specific for `input`/`select`
      const renderEditComponentType = () => {
        const editComponent = resolveDynamicComponent(
          `w-${camel2Line(props.item?.editType!)}`
        )

        // different type comp trigger `onSave` in different way
        const keyupComps = ['input', 'inputNumber']
        const changeComps = ['select']

        return (
          <editComponent
            {...props.item!.editTypeComponentProps}
            ref={editableComponentRef}
            size="small"
            v-model={editValue.value}
            onKeyup={
              keyupComps.includes(props.item?.editType!)
                ? onSave
                : emptyFunction
            }
            onChange={
              changeComps.includes(props.item?.editType!)
                ? onSave
                : emptyFunction
            }
          ></editComponent>
        )
      }

      // render editable content
      const renderEditContent = () => {
        return (
          <el-space size="mini">
            {renderEditComponentType()}

            {renderEditAction()}
          </el-space>
        )
      }

      // render editable item content
      const renderContent = () => (
        <div id={loadingTargetId.value} class="w-table-edit-cell">
          {!editable.value ? renderOriginContent() : renderEditContent()}
        </div>
      )

      return () => renderContent()
    },
  })
</script>

<style lang="scss" scoped>
  .el-icon-check,
  .el-icon-close {
    &:hover {
      color: rgb(92, 182, 255);
      transform: scale(1.1);
    }
  }

  .w-table-edit-icon {
    position: relative;
    top: 0;
    right: 0;
    display: none;
  }

  .w-table-edit-cell:hover {
    .w-table-edit-icon {
      display: initial;
    }
  }
</style>
