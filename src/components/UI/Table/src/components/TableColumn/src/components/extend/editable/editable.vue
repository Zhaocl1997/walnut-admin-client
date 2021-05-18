<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WTable } from '/@/components/UI/Table'

  import { defineComponent, resolveDynamicComponent } from 'vue'
  import { camel2Line, easyDeepGet, isFunction } from 'easy-fns-ts'

  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { emptyFunction } from '/@/utils'

  import { useEditableColumnComponents } from './hooks/useEditableColumnComponents'
  import { useEditableColumnLoading } from './hooks/useEditableColumnLoading'
  import { useEditableColumnSwitch } from './hooks/useEditableColumnSwitch'
  import { useEditableState } from './hooks/useEditableState'

  export default defineComponent({
    name: 'WTableColumnEditable',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WTable.Header.Item.Editable>,
      row: Object as PropType<Pick<WTable.ScopeSlotData, 'row'>>,
    },

    setup(props) {
      useEditableColumnComponents()

      const {
        editable,
        editValue,
        editableComponentRef,
        getColumnProps,
        getProp,
        getComponentType,
        getComponentProps,
      } = useEditableState(props)

      const {
        startLoading,
        endLoading,
        loadingTargetId,
      } = useEditableColumnLoading(props, getProp)

      const {
        switchLoading,
        switchLoadStart,
        switchLoadEnd,
        isSwitchType,
      } = useEditableColumnSwitch(getComponentType, getComponentProps)

      const { emitEvents, tableProps } = useTableContext()

      // render original content
      const renderOriginContent = () => {
        // fir for nested prop
        // use `deepGet` method to get real nested value
        const getValue = easyDeepGet(props.row, getProp.value)

        // set the inside editValue ASAP got real value
        editValue.value = getValue

        // item may have `formatter` function
        const formattedValue = isFunction(getColumnProps.value!.formatter)
          ? getColumnProps.value!.formatter!(props.row)
          : getValue

        // edit click event
        const onClickEdit = () => {
          editable.value = true

          // `input` and `inputNumber`
          // default focus
          ;(getComponentType.value === 'input' ||
            getComponentType.value === 'inputNumber') &&
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
                {...getComponentProps.value}
                v-model={editValue.value}
                loading={switchLoading.value}
                beforeChange={() =>
                  (getComponentProps.value as WTable.Header.Extend.Editable.SwitchProps)?.beforeChange(
                    {
                      newValue: editValue.value,
                      row: props.row,
                      prop: getProp.value!,
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
            prop: getProp.value!,
            loadStart: () =>
              startLoading({ target: `#${loadingTargetId.value}` }),
            loadEnd: () => endLoading(),
          })

          // for prop usage
          tableProps.value.onEdit &&
            tableProps.value.onEdit({
              newValue: editValue.value,
              row: props.row,
              prop: getProp.value!,
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
          `w-table-${camel2Line(getComponentType.value!)}`
        )

        // different type comp trigger `onSave` in different way
        const keyupComps = ['input', 'inputNumber']
        const changeComps = ['select']

        return (
          <editComponent
            {...props.item!.componentProps?.editTypeComponentProps}
            ref={editableComponentRef}
            size="small"
            v-model={editValue.value}
            onKeyup={
              keyupComps.includes(getComponentType.value!)
                ? onSave
                : emptyFunction
            }
            onChange={
              changeComps.includes(getComponentType.value!)
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
