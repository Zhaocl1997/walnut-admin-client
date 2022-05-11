const getStyle = (dom: Element, attr: string) => {
  return getComputedStyle(dom)[attr]
}

export const useModalDraggable = (
  dragEl: HTMLElement,
  dragDom: HTMLElement
) => {
  dragEl.style.cursor = 'move'

  dragEl.onmousedown = (e: MouseEvent) => {
    if (!e) return

    const disX = e.clientX
    const disY = e.clientY

    const screenWidth = document.body.clientWidth
    const screenHeight = document.documentElement.clientHeight

    const dragDomWidth = dragDom.offsetWidth
    const dragDomheight = dragDom.offsetHeight

    const minDragDomLeft = dragDom.offsetLeft

    const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
    const minDragDomTop = dragDom.offsetTop
    const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

    const domLeft = getStyle(dragDom, 'left')
    const domTop = getStyle(dragDom, 'top')

    let styL = +domLeft
    let styT = +domTop

    if (domLeft.includes('%')) {
      styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100)
      styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100)
    } else {
      styL = +domLeft.replace(/px/g, '')
      styT = +domTop.replace(/px/g, '')
    }

    document.onmousemove = function (e) {
      let left = e.clientX - disX
      let top = e.clientY - disY

      if (-left > minDragDomLeft) {
        left = -minDragDomLeft
      } else if (left > maxDragDomLeft) {
        left = maxDragDomLeft
      }

      if (-top > minDragDomTop) {
        top = -minDragDomTop
      } else if (top > maxDragDomTop) {
        top = maxDragDomTop
      }

      dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
