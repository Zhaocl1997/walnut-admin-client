<template>
  <w-demo-card title="Authorize Component">
    <n-list>
      <n-list-item>
        <w-title
          prefix="bar"
          help-message="Use permission string to controll element visibility, quite simple"
        >
          `null` preset
        </w-title>

        <br />

        <w-JSON height="70px" :value="{ permission1: p1 }"></w-JSON>

        <br />

        <n-text> Below is something you can see </n-text>
        <br />
        <w-app-authorize value="system:user:list">
          <n-text type="primary"> This is something you can see </n-text>
        </w-app-authorize>

        <br />

        <n-text> Below is something you can't see </n-text>
        <n-button text type="info" @click="onToggle(p1)"> Toggle </n-button>
        <br />
        <w-app-authorize :value="p1">
          <n-text type="primary"> This is something you can't see </n-text>
        </w-app-authorize>
      </n-list-item>

      <n-list-item>
        <w-title
          prefix="bar"
          help-message="Show a tip to tell user that you do not have permission on this module \n Need to provide a `preset-width` and `preset-height` to hold the container"
        >
          `tip` preset
        </w-title>

        <br />

        <w-JSON height="70px" :value="{ permission2: p2 }"></w-JSON>

        <br />

        <n-button text type="info" @click="onToggle(p2)"> Toggle </n-button>

        <br />

        <w-app-authorize
          :value="p2"
          preset="tip"
          preset-width="200px"
          preset-height="200px"
        >
          <div
            :style="{
              height: '200px',
              width: '200px',
            }"
            class="bg-yellow-100 text-blue-900 flex justify-center items-center text-center"
          >
            this is the content that you can't see
          </div>
        </w-app-authorize>
      </n-list-item>

      <n-list-item>
        <w-title
          prefix="bar"
          help-message="Show a input for user to confirm the permission string \n Need to provide a `preset-width` and `preset-height` to hold the container"
        >
          `input-permission-to-confirm` preset
        </w-title>

        <br />

        <w-JSON height="70px" :value="{ permission3: p3 }"></w-JSON>

        <br />

        <n-button text type="info" @click="onReset"> Reset </n-button>

        <w-app-authorize
          v-if="p3show"
          :value="p3"
          preset="IPTC"
          preset-width="400px"
          preset-height="400px"
        >
          <div
            :style="{
              height: '400px',
              width: '400px',
            }"
            class="bg-yellow-100 text-blue-900 flex justify-center items-center text-center"
          >
            this is the content that you won't see if you do not enter the right
            permission code
          </div>
        </w-app-authorize>
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>

<script lang="ts" setup>
  const p1 = 'some:strange:permission:string'
  const p2 = 'some:strange:permission:string2'
  const p3 = 'some:strange:permission:string3'

  const p3show = ref(true)

  const userPermission = useAppStoreUserPermission()

  const onToggle = (s: string) => {
    userPermission.togglePermission(s)
  }

  const onReset = () => {
    p3show.value = false
    nextTick(() => {
      p3show.value = true
    })
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AuthorizeDemo',

    defaultView: false,
  })
</script>

<style scoped>
  :deep(.w-h) {
    margin-bottom: 8px;
  }
</style>
