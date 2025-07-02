<script lang="ts" setup>
// https://21st.dev/davidhzdev/letter-glitch/default
interface ComponentProps {
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
}

const props = withDefaults(defineProps<ComponentProps>(), {
  glitchColors: () => ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed: 50,
  centerVignette: false,
  outerVignette: true,
  smooth: true,
})

const containerRef = shallowRef<HTMLDivElement | null>(null)
const canvasRef = shallowRef<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let resizeTimeout: ReturnType<typeof setTimeout> | null = null
let lastGlitchTime = Date.now()

interface LetterData {
  char: string
  color: string
  targetColor: string
  colorProgress: number
}

const letters = ref<LetterData[]>([])
const grid = ref({ columns: 0, rows: 0 })
let context: CanvasRenderingContext2D | null = null

const fontSize = 16
const charWidth = 10
const charHeight = 20

const lettersAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-=_+[]{}<>,0123456789'.split('')

function getRandomChar() {
  return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
}

function getRandomColor() {
  return props.glitchColors[Math.floor(Math.random() * props.glitchColors.length)]
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

function interpolateColor(start: { r: number, g: number, b: number }, end: { r: number, g: number, b: number }, factor: number) {
  const r = Math.round(start.r + (end.r - start.r) * factor)
  const g = Math.round(start.g + (end.g - start.g) * factor)
  const b = Math.round(start.b + (end.b - start.b) * factor)
  return `rgb(${r}, ${g}, ${b})`
}

function calculateGrid(width: number, height: number) {
  const columns = Math.ceil(width / charWidth)
  const rows = Math.ceil(height / charHeight)
  return { columns, rows }
}

function initializeLetters(columns: number, rows: number) {
  grid.value = { columns, rows }
  const totalLetters = columns * rows
  letters.value = Array.from({ length: totalLetters }, () => ({
    char: getRandomChar(),
    color: getRandomColor(),
    targetColor: getRandomColor(),
    colorProgress: 1,
  }))
}

function drawLetters() {
  const canvas = canvasRef.value
  if (!canvas || !context || letters.value.length === 0)
    return

  const { width, height } = canvas.getBoundingClientRect()
  context.clearRect(0, 0, width, height)
  context.font = `${fontSize}px monospace`
  context.textBaseline = 'top'

  for (let i = 0; i < letters.value.length; i++) {
    const letterData = letters.value[i]
    const x = (i % grid.value.columns) * charWidth
    const y = Math.floor(i / grid.value.columns) * charHeight
    context.fillStyle = letterData.color
    context.fillText(letterData.char, x, y)
  }
}

function resizeCanvasAndDraw() {
  const canvas = canvasRef.value
  if (!canvas || !containerRef.value)
    return

  const dpr = window.devicePixelRatio || 1
  const rect = containerRef.value.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  if (context) {
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const { columns, rows } = calculateGrid(rect.width, rect.height)
  initializeLetters(columns, rows)
  drawLetters()
}

function updateLetters() {
  if (!letters.value || letters.value.length === 0)
    return
  const updateCount = Math.max(1, Math.floor(letters.value.length * 0.05))
  for (let i = 0; i < updateCount; i++) {
    const index = Math.floor(Math.random() * letters.value.length)
    if (!letters.value[index])
      continue
    letters.value[index].char = getRandomChar()
    letters.value[index].targetColor = getRandomColor()
    if (!props.smooth) {
      letters.value[index].color = letters.value[index].targetColor
      letters.value[index].colorProgress = 1
    }
    else {
      letters.value[index].colorProgress = 0
    }
  }
}

function handleSmoothTransitions() {
  let needsRedraw = false
  letters.value.forEach((letter) => {
    if (letter.colorProgress < 1) {
      letter.colorProgress += 0.05
      if (letter.colorProgress > 1)
        letter.colorProgress = 1
      const startRgb = hexToRgb(letter.color)
      const endRgb = hexToRgb(letter.targetColor)
      if (startRgb && endRgb) {
        letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
        needsRedraw = true
      }
    }
  })
  if (needsRedraw) {
    drawLetters()
  }
}

function animate() {
  const now = Date.now()
  if (now - lastGlitchTime >= props.glitchSpeed) {
    updateLetters()
    drawLetters()
    lastGlitchTime = now
  }
  if (props.smooth) {
    handleSmoothTransitions()
  }
  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  if (resizeTimeout)
    clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    if (animationId)
      cancelAnimationFrame(animationId)
    resizeCanvasAndDraw()
    animationId = requestAnimationFrame(animate)
  }, 100)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return

  context = canvas.getContext('2d')

  nextTick(() => {
    resizeCanvasAndDraw()
    animationId = requestAnimationFrame(animate)
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  if (animationId)
    cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout)
    clearTimeout(resizeTimeout)
})

watch(
  () => [props.glitchSpeed, props.smooth, props.glitchColors],
  () => {
    if (animationId)
      cancelAnimationFrame(animationId)
    resizeCanvasAndDraw()
    animationId = requestAnimationFrame(animate)
  },
  { deep: true },
)
</script>

<template>
  <div ref="containerRef" class="glitch-container">
    <canvas ref="canvasRef" />
    <div v-if="outerVignette" class="vignette-outer" />
    <div v-if="centerVignette" class="vignette-center" />
  </div>
</template>

<style scoped>
.glitch-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.vignette-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 100%);
}

.vignette-center {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%);
}
</style>
