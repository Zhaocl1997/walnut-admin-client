import { getRandomInt } from 'easy-fns-ts'

/**
 * @description use canvas to generate an image
 */
export const makeImgWithCanvas = (width = 36, height = 36) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = width
  canvas.height = height
  ctx.fillStyle = `rgb(${getRandomInt(100, 255)},${getRandomInt(
    100,
    255
  )},${getRandomInt(100, 255)})`
  ctx.fillRect(0, 0, width, height)
  // some random figures
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(${getRandomInt(100, 255)},${getRandomInt(
      100,
      255
    )},${getRandomInt(100, 255)})`
    ctx.strokeStyle = `rgb(${getRandomInt(100, 255)},${getRandomInt(
      100,
      255
    )},${getRandomInt(100, 255)})`

    if (getRandomInt(0, 2) > 1) {
      // rect
      ctx.save()
      ctx.rotate((getRandomInt(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandomInt(-20, canvas.width - 20),
        getRandomInt(-20, canvas.height - 20),
        getRandomInt(10, canvas.width / 2 + 10),
        getRandomInt(10, canvas.height / 2 + 10)
      )
      ctx.restore()
    } else {
      // circle
      ctx.beginPath()
      const ran = getRandomInt(-Math.PI, Math.PI)
      ctx.arc(
        getRandomInt(0, canvas.width),
        getRandomInt(0, canvas.height),
        getRandomInt(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5
      )
      ctx.closePath()
      ctx.fill()
    }
  }

  return canvas.toDataURL('image/png')
}

/**
 * @description get image size based on canvas
 */
export const makeImgSize = (img: HTMLImageElement, width = 36, height = 36) => {
  const imgScale = img.width / img.height
  const canvasScale = width / height
  let x = 0,
    y = 0,
    w = 0,
    h = 0
  if (imgScale > canvasScale) {
    h = height
    w = imgScale * h
    y = 0
    x = (width - w) / 2
  } else {
    w = width
    h = w / imgScale
    x = 0
    y = (height - h) / 2
  }
  return [x, y, w, h]
}

/**
 * @description paint puzzle path
 */
export const paintPuzzle = (
  ctx: CanvasRenderingContext2D,
  puzzleScale: number,
  x: number,
  y: number
) => {
  const moveL = Math.ceil(15 * puzzleScale) // 直线移动的基础距离

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + moveL, y)
  ctx.arcTo(
    x + moveL,
    y - moveL / 2,
    x + moveL + moveL / 2,
    y - moveL / 2,
    moveL / 2
  )
  ctx.arcTo(x + moveL + moveL, y - moveL / 2, x + moveL + moveL, y, moveL / 2)
  ctx.lineTo(x + moveL + moveL + moveL, y)
  ctx.lineTo(x + moveL + moveL + moveL, y + moveL)
  ctx.arcTo(
    x + moveL + moveL + moveL + moveL / 2,
    y + moveL,
    x + moveL + moveL + moveL + moveL / 2,
    y + moveL + moveL / 2,
    moveL / 2
  )
  ctx.arcTo(
    x + moveL + moveL + moveL + moveL / 2,
    y + moveL + moveL,
    x + moveL + moveL + moveL,
    y + moveL + moveL,
    moveL / 2
  )
  ctx.lineTo(x + moveL + moveL + moveL, y + moveL + moveL + moveL)
  ctx.lineTo(x, y + moveL + moveL + moveL)
  ctx.lineTo(x, y + moveL + moveL)

  ctx.arcTo(
    x + moveL / 2,
    y + moveL + moveL,
    x + moveL / 2,
    y + moveL + moveL / 2,
    moveL / 2
  )
  ctx.arcTo(x + moveL / 2, y + moveL, x, y + moveL, moveL / 2)
  ctx.lineTo(x, y)
}
