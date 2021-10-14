<template>
  <n-input
    v-model:value="value"
    readonly
    placeholder="Choose your Icon!"
    @click="onOpenPopover"
  >
    <template #suffix>
      <n-popover
        v-model:show="show"
        placement="top"
        trigger="click"
        :style="{ width: '500px', position: 'relative', right: '200px' }"
      >
        <template #header>
          <n-text type="success" strong>Choose your favorite Icon !</n-text>
        </template>

        <template #trigger>
          <w-icon
            class="cursor-pointer"
            :icon="value || 'ant-design:home-outlined'"
            width="24"
            @click="onOpenPopover"
          ></w-icon>
        </template>

        <template #default>
          <n-spin :show="loading">
            <div class="w-64 mt-1 mb-3">
              <n-input
                ref="searchInputRef"
                v-model:value="filters"
                clearable
                placeholder="Search for the fav icon!"
                @input="debouncedInit"
              ></n-input>
            </div>

            <div class="w-icon-picker-main" style="min-height: 230px;">
              <w-icon
                v-for="(icon, index) in lists"
                :key="index"
                :icon="icon"
                width="36"
                :class="[
                  'm-0.5 rounded border-2 border-solid border-gray-700 hover:cursor-pointer',
                  {
                    'bg-light-blue-300': icon === value,
                    'hover:bg-warm-gray-300': icon !== value,
                  },
                ]"
                @click="onClosePopover(icon)"
              />

              <n-empty
                description="No Icon Found."
                v-show="lists.length === 0"
              />
            </div>

            <n-pagination
              v-model:page="pageNum"
              :page-size="pageSize"
              :item-count="total"
              size="small"
              class="text-sm"
              @update:page="init(false)"
            >
              <template #suffix>
                <span class="whitespace-nowrap">Total: {{ total }}</span>
              </template>
            </n-pagination>
          </n-spin>
        </template>
      </n-popover>
    </template>
  </n-input>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import { mockListApi } from '/@/utils/mockListApi'
  import iconLists from '../../UI/Icon/src/utils/list'

  export default defineComponent({
    name: 'WIconPicker',

    inheritAttrs: false,

    props: {
      value: String as PropType<string>,
    },

    emits: ['update:value'],

    setup(props, ctx) {
      const { emit } = ctx

      const state = reactive({
        lists: [],
        total: 0,
        pageNum: 1,
        pageSize: 55,
        show: false,
        filters: '',
        searchInputRef: null as any,
        loading: false,
      })

      const init = (needFeedback?: boolean) => {
        state.loading = true
        if (props.value && needFeedback) {
          const index = iconLists.findIndex((item) => item === props.value) + 1

          const shouldGoPageNum = Math.floor(index / state.pageSize) + 1

          state.pageNum = shouldGoPageNum
        }

        const params = {
          pageNum: state.pageNum,
          pageSize: state.pageSize,
        }

        const filtered = iconLists.filter((i) => i.includes(state.filters))
        const filterdRes = mockListApi(filtered)(params) as any

        setTimeout(() => {
          state.total = filterdRes.total
          state.lists = filterdRes.data
          state.loading = false
        }, 200)
      }

      const debouncedInit = useDebounceFn(() => {
        state.pageNum = 1
        init(false)
      }, 300)

      const onOpenPopover = () => {
        state.filters = ''
        state.show = true
        init(true)
        nextTick(() => {
          state.searchInputRef!.focus()
        })
      }

      const onClosePopover = (icon: string) => {
        emit('update:value', icon)
        state.pageNum = 1
        state.show = false
      }

      return {
        ...toRefs(state),
        init,
        debouncedInit,
        onOpenPopover,
        onClosePopover,
      }
    },
  })
</script>
