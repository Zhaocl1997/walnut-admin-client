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
          <n-h6 prefix="bar">Choose your favorite Icon !</n-h6>
        </template>

        <template #trigger>
          <div class="cursor-pointer -mb-2">
            <w-icon :icon="value" width="24" @click="onOpenPopover"></w-icon>
          </div>
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

            <div style="min-height: 230px">
              <w-icon
                v-for="(icon, index) in lists"
                :key="icon"
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
  import type { InputInst } from 'naive-ui'
  import { mockListApi } from '/@/utils/mockListApi'
  import iconLists from '/@/components/UI/Icon/src/utils/list'

  export default defineComponent({
    name: 'WIconPicker',

    inheritAttrs: false,

    props: {
      value: {
        type: String as PropType<string>,
        default: '',
      },
    },

    emits: ['update:value'],

    setup(props, ctx) {
      const { emit } = ctx

      const state = reactive({
        lists: [] as string[],
        total: 0,
        pageNum: 1,
        pageSize: 55,
        show: false,
        filters: '',
        searchInputRef: null as Nullable<InputInst>,
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
        const filterdRes = mockListApi(filtered)(params)

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
