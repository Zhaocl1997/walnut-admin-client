<template>
  <el-table-column v-if="getHasChildren" v-bind="getBindValue">
    <WTableItem
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
    >
      <template
        #[slotName]="data"
        v-for="(slotName, slotIndex) in Object.keys($slots)"
        :key="slotIndex"
      >
        <slot :name="slotName" v-bind="data"></slot>
      </template>
    </WTableItem>
  </el-table-column>

  <el-table-column v-else v-bind="getBindValue">
    <template v-if="getHasSlot" #default="scope">
      <slot :name="item.prop" v-bind="scope"></slot>
    </template>
  </el-table-column>
</template>

<script lang="ts">
  import type { SetupContext, PropType } from 'vue'
  import type { WTableHeaderItem } from '../../../types'
  import { defineComponent, computed } from 'vue'
  import { easyOmit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableItem',

    props: {
      item: Object as PropType<WTableHeaderItem>,
    },

    setup(props: any, ctx: SetupContext) {
      const { slots } = ctx

      const getBindValue = computed(() => {
        return easyOmit(
          {
            ...props.item,
            align: props.item.align ? props.item.align : 'center',
            showOverflowTooltip:
              props.item.showOverflowTooltip !== undefined
                ? props.item.showOverflowTooltip
                : true,
          },
          'children'
        )
      })

      const getHasChildren = computed(() => {
        return props.item.children && props.item.children.length > 0
      })

      const getHasSlot = computed(() => {
        return slots[props.item.prop] !== undefined
      })

      return {
        getBindValue,
        getHasChildren,
        getHasSlot,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
