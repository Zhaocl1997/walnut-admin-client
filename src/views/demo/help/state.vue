<template>
  <el-card>
    <template #header>
      <span>State Components/Hooks</span>
    </template>

    <w-title show-left>Loading State</w-title>
    <el-button @click="onNoTargetLoading"
      >Loading for 2 seconds without target</el-button
    >

    <el-button @click="onTargetLoading"
      >Loading for 2 seconds with a target</el-button
    >

    <br />
    <br />

    <w-title show-left>Empty State</w-title>

    <el-input-number v-model="total"></el-input-number>

    <w-empty :total="total">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </w-empty>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useLoading } from '/@/hooks/component/useLoading'

  export default defineComponent({
    name: 'StateDemo',

    setup() {
      const total = ref(0)
      const tableData = computed(() => {
        const ret = []

        for (let i = 0; i < total.value; i++) {
          ret.push({
            date: '2021-04-13',
            name: 'Jack',
            address: 'NYC Fifth Avenue',
          })
        }

        return ret
      })

      const { startLoading, endLoading } = useLoading()

      const {
        startLoading: startLoading2,
        endLoading: endLoading2,
      } = useLoading({
        target: '.w-default-layout-aside',
      })

      const onNoTargetLoading = () => {
        startLoading()

        setTimeout(() => {
          endLoading()
        }, 2000)
      }

      const onTargetLoading = () => {
        startLoading2()

        setTimeout(() => {
          endLoading2()
        }, 2000)
      }

      return {
        total,
        tableData,
        onNoTargetLoading,
        onTargetLoading,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
