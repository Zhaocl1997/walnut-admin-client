<template>
  <div>
    <w-form v-model="formData" @hook="register"></w-form>

    <w-transition :name="formData.name">
      <div v-show="show" class="h-36 w-36 bg-red-400"></div>
    </w-transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { TransitionEnum } from '/@/components/Help/Transition'
  import WTransition from '/@/components/Help/Transition'
  import { useForm } from '/@/components/UI/Form'

  const options: OptionDataItem[] = Object.entries(TransitionEnum).map(
    ([key, value]) => ({
      value: value,
      label: key,
    })
  )

  export default defineComponent({
    name: 'TransitionDemo',

    components: {
      WTransition,
    },

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
            type: 'Select',
            formProp: {
              prop: 'name',
            },
            componentProp: {
              options: options,
            },
          },
          {
            type: 'Button',
            componentProp: {
              type: 'primary',
              text: 'Start',
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
