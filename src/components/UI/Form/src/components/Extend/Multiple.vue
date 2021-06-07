<script lang="tsx">
  import type { PropType } from 'vue'
  import type { WForm } from '/@/components/UI/Form'

  import { defineComponent, ref, renderList, watch } from 'vue'
  import { useFormContext } from '../../hooks/useFormContext'

  interface MultipleChildren {
    id?: number
    details?: {
      keyField: string
      keyValue: string
      valueField: string
      valueValue: string
    }
  }

  export default defineComponent({
    name: 'WFormItemExtendMultiple',

    inheritAttrs: false,

    props: {
      item: Object as PropType<WForm.Schema.MultipleSchema<any>>,
    },

    setup(props, ctx) {
      const { item } = props
      const { componentProp, formProp } = item!
      const {
        min = 1,
        max = 99,
        preset = 'input',
        presetProps = {},
        keyField = 'key',
        valueField = 'value',
      } = componentProp!
      const { prop } = formProp!

      const { formProps } = useFormContext()

      const id = ref(1)
      const childrens = ref<MultipleChildren[]>([
        {
          id: id.value,
          details: {
            keyField: keyField,
            keyValue: '',
            valueField: valueField,
            valueValue: '',
          },
        },
      ])

      watch(
        () => childrens.value,
        (val) => {
          if (formProps.value.modelValue[prop!]) {
            console.log(123)
            return
          }

          if (preset === 'input') {
            formProps.value.modelValue[prop!] = val.map(
              (i) => i.details!.valueValue
            )
          } else if (preset === 'pair') {
            const vals = val.map((i) => ({
              [i.details!.keyField]: i.details!.keyValue,
              [i.details!.valueField]: i.details!.valueValue,
            }))

            formProps.value.modelValue[prop!] = vals
          }
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const onAdd = (index: number) => {
        id.value++
        childrens.value.splice(index + 1, 0, {
          id: id.value,
          details: {
            keyField: keyField,
            keyValue: '',
            valueField: valueField,
            valueValue: '',
          },
        })
      }

      const onRemove = (index: number) => {
        childrens.value.splice(index, 1)
      }

      const renderButtons = (index: number) => (
        <>
          <el-button
            circle
            size="mini"
            type="primary"
            icon="el-icon-plus"
            onClick={() => onAdd(index)}
            disabled={childrens.value.length >= max}
          ></el-button>

          {childrens.value.length > min && (
            <el-button
              circle
              size="mini"
              type="danger"
              icon="el-icon-close"
              onClick={() => onRemove(index)}
            ></el-button>
          )}
        </>
      )

      const renderPresetInput = (value: MultipleChildren) => (
        <w-input vModel={value.details!.valueValue} {...presetProps}></w-input>
      )

      const renderPresetPair = (value: MultipleChildren) => (
        <>
          <w-input vModel={value.details!.keyValue}></w-input>
          <w-input vModel={value.details!.valueValue}></w-input>
        </>
      )

      return () =>
        renderList(childrens.value, (value, index) => (
          <el-row
            type="flex"
            justify="center"
            align="middle"
            gutter={20}
            style="width:100%"
          >
            <el-col span={22} class="mb-1">
              {preset === 'input'
                ? renderPresetInput(value)
                : renderPresetPair(value)}
            </el-col>
            <el-col span={2}>{renderButtons(index as number)}</el-col>
          </el-row>
        ))
    },
  })
</script>

<style lang="scss" scoped></style>
