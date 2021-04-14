<template>
  <w-input v-model="modelValue" readonly placeholder="Choose your Icon!">
    <template #append>
      <el-popover
        v-model:visible="popoverVisible"
        placement="top"
        :width="450"
        trigger="click"
        @after-leave="onHidePopover"
        ref="popoverRef"
      >
        <template #reference>
          <w-icon
            class="mt-1 cursor-pointer"
            :icon="modelValue || 'ant-design:home-outlined'"
            width="24"
            @click="onOpenPopover"
          ></w-icon>
        </template>

        <template #default>
          <div class="mb-1">
            <w-title show-left>Choose your favorite Icon !</w-title>

            <div class="w-64 mt-1 mb-3">
              <w-input
                ref="searchInputRef"
                v-model="filters"
                size="mini"
                clearable
                placeholder="Filter the icon."
                @search="init"
                :debounce="1000"
                @clear="init"
              ></w-input>
            </div>
          </div>

          <div class="w-icon-picker-main" style="min-height: 230px;">
            <WEmpty :total="total" :image-size="74">
              <w-icon
                v-for="(icon, index) in lists"
                :key="index"
                :icon="icon"
                width="36"
                :class="[
                  'm-0.5 rounded border-2 border-solid border-gray-700 hover:cursor-pointer',
                  {
                    'bg-light-blue-300': icon === modelValue,
                    'hover:bg-warm-gray-300': icon !== modelValue,
                  },
                ]"
                @click="onClosePopover(icon)"
              ></w-icon>
            </WEmpty>
          </div>

          <w-pagination
            small
            :total="total"
            v-model:current-page="pageNum"
            v-model:pageSize="pageSize"
            @change="init(false)"
            layout="total, prev, pager, next"
            class="mt-4 flex justify-end"
          ></w-pagination>
        </template>
      </el-popover>
    </template>
  </w-input>
</template>

<script lang="ts">
  import type { SetupContext, PropType } from 'vue'
  import { defineComponent, reactive, toRefs, onMounted, nextTick } from 'vue'

  import { useLoading } from '/@/hooks/component/useLoading'
  import { mockListApi } from '/@/utils/mockListApi'
  import iconLists from '../../UI/Icon/src/utils/list'

  // TODO when search , it will trigger form blur rule
  // TODO search input got one clear icon and one finished icon when used in dialog
  export default defineComponent({
    name: 'WIconPicker',

    inheritAttrs: false,

    props: {
      modelValue: String as PropType<string>,
    },

    emits: ['update:modelValue'],

    setup(props: any, ctx: SetupContext) {
      const { emit } = ctx

      let insideStartLoading: Fn
      let insideEndLoading: Fn

      const state = reactive({
        lists: [],
        total: 0,
        pageNum: 1,
        pageSize: 50,
        popoverVisible: false,
        filters: '',
        popoverRef: null as any,
        searchInputRef: null as any,
      })

      const init = (needFeedback: boolean) => {
        insideStartLoading()

        if (props.modelValue && needFeedback) {
          const index =
            iconLists.findIndex((item) => item === props.modelValue) + 1

          const shouldGoPageNum = Math.floor(index / state.pageSize) + 1

          state.pageNum = shouldGoPageNum
        }

        const params = {
          pageNum: state.pageNum,
          pageSize: state.pageSize,
        }

        const filtered = iconLists.filter((i) => i.includes(state.filters))
        const filterdRes = mockListApi(filtered)(params) as any

        state.total = filterdRes.total
        state.lists = filterdRes.data

        insideEndLoading()
      }

      const onOpenPopover = () => {
        state.popoverVisible = true
        init(true)
        nextTick(() => {
          state.searchInputRef!.focus()
        })
      }

      const onClosePopover = (icon: string) => {
        emit('update:modelValue', icon)
        state.pageNum = 1
        state.popoverVisible = false
      }

      const onHidePopover = () => {
        state.filters = ''
        init(false)
      }

      onMounted(() => {
        nextTick(() => {
          const { startLoading, endLoading } = useLoading({
            target: `#${state.popoverRef!.popperId} .w-icon-picker-main`,
          })

          insideStartLoading = startLoading
          insideEndLoading = endLoading
        })
      })

      return {
        ...toRefs(state),
        init,
        onOpenPopover,
        onClosePopover,
        onHidePopover,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
