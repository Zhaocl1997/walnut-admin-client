<template>
  <w-demo-card title="Transition Demo">
    <w-form :model="formData" @hook="register"></w-form>

    <w-transition :name="formData.name">
      <div v-show="show" class="h-36 w-36 bg-red-400"></div>
    </w-transition>
  </w-demo-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { TransitionEnum } from '/@/components/Extra/Transition'
  import { useForm } from '/@/components/UI/Form'

  const options: OptionDataItem[] = Object.entries(TransitionEnum).map(
    ([key, value]) => ({
      value: value,
      label: key,
    })
  )

  export default defineComponent({
    name: 'TransitionDemo',

    setup() {
      const show = ref(true)
      const formData = ref({
        name: 'fade',
      })

      const onStart = () => {
        show.value = false
        setTimeout(() => {
          show.value = true
        }, 500)
      }

      const [register] = useForm({
        span: 6,
        schemas: [
          {
            type: 'Base:Select',
            formProp: {
              path: 'name',
            },
            componentProp: {
              options: options,
            },
          },
          {
            type: 'Base:Button',
            componentProp: {
              textProp: 'Start',
              onClick: onStart,
            },
          },
        ],
      })

      return {
        formData,
        show,
        options,
        onStart,
        register,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
