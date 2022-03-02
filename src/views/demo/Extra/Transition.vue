<template>
  <w-demo-card title="Transition & Transition Select" class="h-72">
    <w-form :model="formData" @hook="register"></w-form>

    <w-transition :name="formData.name">
      <div v-show="show" class="h-36 w-36 bg-red-400"></div>
    </w-transition>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const show = ref(true)
  const formData = ref({
    name: 'fade' as ValueOfTransitionNameConst,
  })

  const onStart = () => {
    show.value = false
    setTimeout(() => {
      show.value = true
    }, 1000)
  }

  const [register] = useForm({
    span: 6,
    schemas: [
      {
        type: 'Extend:TransitionSelect',
        formProp: {
          path: 'name',
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
</script>

<script lang="ts">
  export default defineComponent({
    name: 'TransitionDemo',

    defaultView: false,
  })
</script>
