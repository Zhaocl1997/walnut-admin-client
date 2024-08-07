import type { SelectGroupOptionBase } from 'naive-ui/lib/select/src/interface'

export default defineComponent({
  name: 'WTransitionSelect',

  props: ['value'],

  emits: ['update:value'],

  setup(props, { emit }) {
    const getChilren = (group: string) =>
      Object.entries(AppConstTransitionName)
        .map(([key, value]) => ({
          value,
          label: key,
        }))
        .filter(i => i.value.startsWith(group))

    const options = ref<SelectGroupOptionBase[]>(
      ['fade', 'zoom', 'bounce', 'rotate', 'slide', 'back', 'flip'].map(
        group => ({
          type: 'group',
          label: group,
          key: `group-${group}`,
          children: getChilren(group),
        }),
      ),
    )

    return () => (
      <w-select
        value={props.value}
        options={options.value}
        filterable
        onUpdateValue={(v: string) => emit('update:value', v)}
      >
      </w-select>
    )
  },
})
