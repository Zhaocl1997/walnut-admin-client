import { reactive, toRefs } from 'vue'

export const useSelectTreeState = () => {
  const state = reactive({
    selectValue: '',
    optionValue: '',
    treeValue: '',
    wTreeRef: null,
    elSelectRef: null,
  })

  return {
    ...toRefs(state),
  }
}
