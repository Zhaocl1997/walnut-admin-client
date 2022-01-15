<template>
  <w-demo-card title="Select">
    <W-JSON :value="state" height="400px"></W-JSON>

    <n-space vertical>
      <w-select
        v-model:value="state.select1"
        :options="options"
        clearable
      ></w-select>

      <w-select
        v-model:value="state.select2"
        :options="options"
        clearable
      ></w-select>

      <w-select
        v-model:value="state.select3"
        :options="options"
        clearable
        multiple
      ></w-select>

      <w-select
        v-model:value="state.select4"
        :options="options"
        clearable
        multiple
      ></w-select>

      <w-select
        v-model:value="state.select5"
        :options="options"
        clearable
        multiple
        value-separator=","
      ></w-select>

      <RoleSelect v-model:value="state.select6"></RoleSelect>

      <RoleSelect v-model:value="state.select7" multiple></RoleSelect>

      <RoleSelect
        v-model:value="state.select8"
        multiple
        value-separator="|"
      ></RoleSelect>

      <div class="h-96"></div>
    </n-space>
  </w-demo-card>
</template>

<script lang="ts">
  import RoleSelect from '/@/components/Advanced/services/RoleSelect'

  export default defineComponent({
    name: 'SelectDemo',

    components: { RoleSelect },

    setup() {
      const state = reactive<any>({
        select1: '1',
        select2: 1,
        select3: ['1', '3', '5'],
        select4: [1, 3, 5],
        select5: '2,4,6',
        select6: '618e0224400f699b3d6b2da9',
        select7: ['618e0224400f699b3d6b2d6f', '618e0224400f699b3d6b2d71'],
        select8: '618e0224400f699b3d6b2d73|618e0224400f699b3d6b2d75',
      })

      const options = []

      for (let i = 0; i < 100; i++) {
        options.push({
          value: `${i + 1}`,
          label: `label-${i + 1}`,
        })
      }

      options.push({
        value: 999,
        label:
          'label-999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
      })

      return {
        state,
        options,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
