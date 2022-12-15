<script lang="ts" setup>
const appTab = useAppStoreTab()

const index = ref(0)

const getOtherTabButtonDisabled = computed(
  () => !appTab.tabs.some(i => i.name === 'DemoUI'),
)

const onCreate = (type: number) => {
  const query
      = type === 1 ? { testQuery1: 1, testQuery2: 'abc', testQuery3: false } : {}

  const params
      = type === 2 ? { testParam1: 1, testParam2: 'abc', testParam3: false } : {}

  appTab.createTabs({
    name: `name-${index.value}`,
    path: `path-${index.value}`,
    meta: {
      title: `demo-tab-${index.value}`,
      icon: 'ant-design:home-outlined',
    },
    query,
    params,
  })

  index.value++
}

const onDelete = () => {
  if (!index.value)
    return

  index.value--

  appTab.deleteTabs(`name-${index.value}`)
}

const onDynamicTitle = (type: number, self = true) => {
  const pool = {
    1: () => {
      appTab.setCurrentTabTitle('Title ?')
    },
    2: () => {
      appTab.setCurrentTabTitle('3s expired', {
        timeout: 3000,
        maxLength: 12,
      })
    },
    3: () => {
      appTab.setCurrentTabTitle(
        'this will scrolling for 10s and then recover',
        {
          timeout: 10000,
          maxLength: 12,
        },
      )
    },
    4: () => {
      appTab.recoverCurrentTabTitle()
    },
  }

  const pool2 = {
    1: () => {
      appTab.setTabTitle('DemoUI', 'Title ?')
    },
    2: () => {
      appTab.setTabTitle('DemoUI', '3s expired', {
        timeout: 3000,
        maxLength: 12,
      })
    },
    3: () => {
      appTab.setTabTitle(
        'DemoUI',
        'this will scrolling for 10s and then recover',
        {
          timeout: 10000,
          maxLength: 12,
        },
      )
    },
    4: () => {
      appTab.recoverTabTitle('DemoUI')
    },
  }

  if (self)
    pool[type]()
  else
    pool2[type]()
}

const onDynamicIcon = (type: number, self = true) => {
  const pool = {
    1: () => {
      appTab.setCurrentTabIcon('ant-design:android-filled')
    },
    2: () => {
      appTab.setCurrentTabIcon('ant-design:android-outlined', {
        timeout: 3000,
      })
    },
    3: () => {
      appTab.setCurrentTabIcon('ant-design:android-filled', {
        animate: true,
        duration: 2000,
      })
    },
    4: () => {
      appTab.recoverCurrentTabIcon()
    },
  }

  const pool2 = {
    1: () => {
      appTab.setTabIcon('DemoUI', 'ant-design:android-filled')
    },
    2: () => {
      appTab.setTabIcon('DemoUI', 'ant-design:android-outlined', {
        timeout: 3000,
      })
    },
    3: () => {
      appTab.setTabIcon('DemoUI', 'ant-design:android-filled', {
        animate: true,
        duration: 2000,
      })
    },
    4: () => {
      appTab.recoverTabIcon('DemoUI')
    },
  }

  if (self)
    pool[type]()
  else
    pool2[type]()
}

const onDynamicQueryandParam = (type: number) => {
  const pool = {
    1: () => {},
    2: () => {},
  }

  pool[type]()
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'LayoutDemoTab',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Demo for layout tab">
    <n-list>
      <n-list-item>
        <w-title prefix="bar">
          Basic create: {{ index }}
        </w-title>

        <n-button @click="onCreate(0)">
          Create
        </n-button>
        <n-button @click="onDelete">
          Delete
        </n-button>
        <n-button @click="onCreate(1)">
          Create with query
        </n-button>
        <n-button @click="onCreate(2)">
          Create with params
        </n-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Dynamic Title
        </w-title>

        <n-button @click="onDynamicTitle(1)">
          Set title(default 5s)
        </n-button>
        <n-button @click="onDynamicTitle(2)">
          Set title with timeout limit(3s)
        </n-button>
        <n-button @click="onDynamicTitle(3)">
          Set title with scrolling for 10s
        </n-button>
        <n-button @click="onDynamicTitle(4)">
          Recovery
        </n-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Other tab Title (Open the UI component page)
        </w-title>

        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicTitle(1, false)"
        >
          Set title(default 5s)
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicTitle(2, false)"
        >
          Set title with timeout limit(3s)
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicTitle(3, false)"
        >
          Set title with scrolling for 10s
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicTitle(4, false)"
        >
          Recovery
        </n-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Dynamic Icon
        </w-title>

        <n-button @click="onDynamicIcon(1)">
          Set Icon(default 5s)
        </n-button>
        <n-button @click="onDynamicIcon(2)">
          Set icon with timeout limit(3s)
        </n-button>
        <n-button @click="onDynamicIcon(3)">
          Set icon with animate
        </n-button>
        <n-button @click="onDynamicIcon(4)">
          Recovery
        </n-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Other tab Icon (Open the UI component page)
        </w-title>

        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicIcon(1, false)"
        >
          Set Icon(default 5s)
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicIcon(2, false)"
        >
          Set icon with timeout limit(3s)
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicIcon(3, false)"
        >
          Set icon with animate
        </n-button>
        <n-button
          :disabled="getOtherTabButtonDisabled"
          @click="onDynamicIcon(4, false)"
        >
          Recovery
        </n-button>
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Dynamic Query/Params (WIP)
        </w-title>

        <!-- <n-button @click="onDynamicQueryandParam(1)">Set Query</n-button>
        <n-button @click="onDynamicQueryandParam(2)">Set Param</n-button> -->

        <w-JSON
          :value="{
            currentTab: appTab.getCurrentTab,
          }"
          height="400px"
        />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
