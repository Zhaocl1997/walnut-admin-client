<script lang="tsx" setup>
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { useDropdown } from '@/components/UI/Dropdown'

defineOptions({
  name: 'DropdownDemo',
  defaultView: false,
})

const contextMenuOptions = computed<Partial<DropdownMixedOption>[]>(() => [
  {
    key: '1',
    label: 'New York City',
    disabled: true,
  },
  {
    key: '2',
    label: 'Pairs',
  },
  {
    key: '3',
    label: 'London',
    icon: () => <WIcon icon="ant-design:question-circle-outlined"></WIcon>,
  },
  {
    key: '4',
    label: 'Tokyo',
  },
  {
    key: '5',
    label: 'Beijing',
  },
  {
    key: '6',
    label: 'Shanghai',
  },
])

const [registerDropdown, { openDropdown, closeDropdown }] = useDropdown({
  dropdownProps: {
    options: contextMenuOptions,
    onSelect: (key) => {
      AppConsoleLog('DEMO', key)
      closeDropdown()
    },
  },
})

function onRightClick(e: MouseEvent) {
  e.preventDefault()
  openDropdown(e)
}
</script>

<template>
  <WDemoCard title="Dropdown">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <WDropdown @hook="registerDropdown" />

        <n-space>
          <div class="h-64 w-64 bg-gray-6" @click="openDropdown">
            click to open dropdown
          </div>

          <div class="h-64 w-64 bg-gray-4" @click.right="onRightClick">
            right click to open dropdown
          </div>
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
