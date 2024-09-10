<script lang="ts" setup>
defineOptions({
  name: 'TransitionDemo',
  defaultView: false,
})

const show = ref(true)
const formData = ref({
  name: 'fade' as ValueOfAppConstTransitionName,
})

function onStart() {
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 1000)
}

const [register] = useForm({
  span: 12,
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

<template>
  <WDemoCard title="Transition & Transition Select" class="h-72">
    <WForm :model="formData" @hook="register" />

    <div class="h-36">
      <WTransition :name="formData.name">
        <div v-show="show" class="h-36 w-36 bg-red-400" />
      </WTransition>
    </div>
  </WDemoCard>
</template>
