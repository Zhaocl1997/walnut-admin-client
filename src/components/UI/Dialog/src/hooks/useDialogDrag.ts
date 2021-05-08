import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'

export const useDialogDrag = (wDialogRef: Ref<Nullable<HTMLElement>>) => {
  const countV = (v: string) => {
    let newV = 0
    if (v.includes('%')) {
      newV = +document.body.clientWidth * (+v.replace(/\%/g, '') / 100)
    } else {
      newV = +v.replace(/\px/g, '')
    }
    return newV
  }

  const dragDom = wDialogRef.value!.querySelector('.el-dialog') as HTMLElement
  const dragTarget = wDialogRef.value!.querySelector(
    '.el-dialog__header'
  ) as HTMLElement

  const dialogElStyle =
    // @ts-ignore
    window.getComputedStyle(dragDom!, null) || dragDom.currentStyle

  dragTarget?.classList.add('cursor-move')

  const onMouseDown = (e: MouseEvent) => {
    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - dragTarget!.offsetLeft
    const disY = e.clientY - dragTarget!.offsetTop

    // 获取到的值带px 正则匹配替换
    // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    const styL = countV(dialogElStyle.left)
    const styT = countV(dialogElStyle.top)

    const screenWidth = window.innerWidth // body当前宽度
    const screenHeight = window.innerHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
    const dragDomWidth = dragDom.offsetWidth // 对话框宽度
    const dragDomheight = dragDom.offsetHeight // 对话框高度
    const minDragDomLeft = dragDom.offsetLeft
    const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
    const minDragDomTop = dragDom.offsetTop
    const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

    const onMouseMove = (e: MouseEvent) => {
      // 通过事件委托，计算移动的距离
      let l = e.clientX - disX
      let t = e.clientY - disY

      // 边界处理
      if (-l > minDragDomLeft) {
        l = -minDragDomLeft
      } else if (l > maxDragDomLeft) {
        l = maxDragDomLeft
      }
      if (-t > minDragDomTop) {
        t = -minDragDomTop
      } else if (t > maxDragDomTop) {
        t = maxDragDomTop
      }

      // 移动当前元素
      dragDom.style.cssText += `;left:${l + styL}px;top:${t + styT}px;`
    }

    const stopMouseMove = useEventListener(document, 'mousemove', onMouseMove)

    const stopMouseUp = useEventListener(document, 'mouseup', () => {
      stopMouseMove()
      stopMouseUp()
    })
  }

  useEventListener(dragTarget, 'mousedown', onMouseDown)
}
