<script lang="ts">
</script>

<script lang="ts" setup>
import { getRandomInt } from 'easy-fns-ts'
import { makeImgSize, makeImgWithCanvas, paintPuzzle } from './utils'

const props = withDefaults(defineProps<InteralProps>(), {
  canvasWidth: 310,
  canvasHeight: 160,
  puzzleScale: 1,
  sliderSize: 36,
  range: 5,
})

const emits = defineEmits(['success', 'fail'])

export default defineComponent({
  name: 'WVerify',
})

// TODO 888
interface InteralProps {
  canvasWidth?: number
  canvasHeight?: number
  // 拼图块的大小缩放比例
  puzzleScale?: number
  // 滑块的大小
  sliderSize?: number
  // 允许的偏差值
  range?: number
  imgs?: string[]
}

const { t } = useAppI18n()

const show = ref(false)
const rangeSlider = ref<Nullable<HTMLDivElement>>(null)
const canvas1 = ref<Nullable<HTMLCanvasElement>>(null)
const canvas2 = ref<Nullable<HTMLCanvasElement>>(null)
const canvas3 = ref<Nullable<HTMLCanvasElement>>(null)

const startWidth = ref(50) // 鼠标点下去时父级的width
const startX = ref(0) // 鼠标按下时的X
const newX = ref(0) // 鼠标当前的偏移X
const pinX = ref(0) // 拼图的起始X
const pinY = ref(0) // 拼图的起始Y
const isCanSlide = ref(false) // 是否可以拉动滑动条
const infoTextShow = ref(false) // 提示信息是否出现
const isSuccess = ref(false) // 验证成功
const imgIndex = ref(-1) // 用于自定义图片时不会随机到重复的图片
const loading = ref(false) // 加载
const mouseDown = ref(false) // 鼠标是否按下

const getInfoText = computed(() =>
  isSuccess.value ? t('comp.verify.success') : t('comp.verify.fail'),
)

// 处理一下sliderSize，弄成整数，以免计算有偏差
const getSliderBaseSize = computed(() =>
  Math.max(
    Math.min(
      Math.round(props.sliderSize),
      Math.round(props.canvasWidth * 0.5),
    ),
    10,
  ),
)

// styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
const getStyleWidth = computed(() => {
  const w = startWidth.value + newX.value - startX.value
  return w < getSliderBaseSize.value
    ? getSliderBaseSize.value
    : w > props.canvasWidth
      ? props.canvasWidth
      : w
})

// 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
const getPuzzleBaseSize = computed(() =>
  Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6),
)

// canvas的基本宽高样式
const getCanvasBaseStyle = computed(() => ({
  width: `${props.canvasWidth}px`,
  height: `${props.canvasHeight}px`,
}))

// 缺口canvas的样式
const getPuzzleCanvasStyle = computed(() => ({
  width: `${getPuzzleBaseSize.value}px`,
  height: `${props.canvasHeight}px`,
  transform: `translateX(${
      getStyleWidth.value
      - getSliderBaseSize.value
      - (getPuzzleBaseSize.value - getSliderBaseSize.value)
      * ((getStyleWidth.value - getSliderBaseSize.value)
      / (props.canvasWidth - getSliderBaseSize.value))
    }px)`,
}))

// 绘制拼图块的路径
function paintBrick(ctx: CanvasRenderingContext2D) {
  return paintPuzzle(ctx, props.puzzleScale, pinX.value, pinY.value)
}

// 初始化
function onInit(withCanvas = false) {
  // 防止重复加载导致的渲染错误
  if (loading.value && !withCanvas)
    return

  loading.value = true
  isCanSlide.value = false

  const c = canvas1.value!
  const c2 = canvas2.value!
  const c3 = canvas3.value!

  const ctx = c.getContext('2d')!
  const ctx2 = c2.getContext('2d')!
  const ctx3 = c3.getContext('2d')!

  const isFirefox
      = navigator.userAgent.includes('Firefox')
      && navigator.userAgent.includes('Windows') // 是windows版火狐

  const img = document.createElement('img')

  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx3.fillStyle = 'rgba(255,255,255,1)'
  ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
  ctx2.clearRect(0, 0, props.canvasWidth, props.canvasHeight)

  // 取一个随机坐标，作为拼图块的位置
  pinX.value = getRandomInt(
    getPuzzleBaseSize.value,
    // 留20的边距
    props.canvasWidth - getPuzzleBaseSize.value - 20,
  )

  // 主图高度 - 拼图块自身高度 - 20边距
  pinY.value = getRandomInt(
    20,
    props.canvasHeight - getPuzzleBaseSize.value - 20,
  )

  img.crossOrigin = 'anonymous' // 匿名，想要获取跨域的图片

  img.onload = () => {
    const [x, y, w, h] = makeImgSize(
      img,
      props.canvasWidth,
      props.canvasHeight,
    )

    ctx.save()
    // 先画小图
    paintBrick(ctx)
    ctx.closePath()

    if (!isFirefox) {
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.clip()
    }
    else {
      ctx.clip()
      ctx.save()
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.restore()
    }

    ctx.drawImage(img, x, y, w, h)
    ctx3.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
    ctx3.drawImage(img, x, y, w, h)

    // 设置小图的内阴影
    ctx.globalCompositeOperation = 'source-atop'

    paintBrick(ctx)

    ctx.arc(
      pinX.value + Math.ceil(getPuzzleBaseSize.value / 2),
      pinY.value + Math.ceil(getPuzzleBaseSize.value / 2),
      getPuzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.closePath()
    ctx.shadowColor = 'rgba(255, 255, 255, .8)'
    ctx.shadowOffsetX = -1
    ctx.shadowOffsetY = -1
    ctx.shadowBlur = Math.min(Math.ceil(8 * props.puzzleScale), 12)
    ctx.fillStyle = '#ffffaa'
    ctx.fill()

    // 将小图赋值给ctx2
    const imgData = ctx.getImageData(
      pinX.value - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
      pinY.value - 20,
      pinX.value + getPuzzleBaseSize.value + 5,
      pinY.value + getPuzzleBaseSize.value + 5,
    )
    ctx2.putImageData(imgData, 0, pinY.value - 20)

    // 清理
    ctx.restore()
    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)

    // 画缺口
    ctx.save()
    paintBrick(ctx)
    ctx.globalAlpha = 0.8
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.restore()

    // 画缺口的内阴影
    ctx.save()
    ctx.globalCompositeOperation = 'source-atop'
    paintBrick(ctx)
    ctx.arc(
      pinX.value + Math.ceil(getPuzzleBaseSize.value / 2),
      pinY.value + Math.ceil(getPuzzleBaseSize.value / 2),
      getPuzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.shadowColor = '#000'
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 16
    ctx.fill()
    ctx.restore()

    // 画整体背景图
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.drawImage(img, x, y, w, h)
    ctx.restore()

    loading.value = false
    isCanSlide.value = true
  }

  img.onerror = () => {
    onInit(true) // 如果图片加载错误就重新来，并强制用canvas随机作图
  }

  if (!withCanvas && props.imgs && props.imgs.length) {
    let randomNum = getRandomInt(0, props.imgs.length - 1)
    if (randomNum === imgIndex.value) {
      if (randomNum === props.imgs.length - 1)
        randomNum = 0
      else
        randomNum++
    }
    imgIndex.value = randomNum
    img.src = props.imgs[randomNum]
  }
  else {
    img.src = makeImgWithCanvas(props.canvasWidth, props.canvasHeight)
  }
}

// 鼠标按下准备拖动
function onRangeMouseDown(e: MouseEvent | TouchEvent) {
  if (isCanSlide.value) {
    mouseDown.value = true
    startWidth.value = rangeSlider.value!.clientWidth
    newX.value
        = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
    startX.value
        = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
  }
}

// 鼠标移动
function onRangeMouseMove(e: MouseEvent | TouchEvent) {
  if (mouseDown.value) {
    e.preventDefault()
    newX.value
        = (e as MouseEvent).clientX || (e as TouchEvent).changedTouches[0].clientX
  }
}

// 鼠标抬起
function onRangeMouseUp(e: MouseEvent | TouchEvent) {
  if (mouseDown.value) {
    mouseDown.value = false
    onVerify()
  }
}

// 开始判定
function onVerify() {
  // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
  // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
  const x = Math.abs(
    pinX.value
    - (getStyleWidth.value - getSliderBaseSize.value)
    + (getPuzzleBaseSize.value - getSliderBaseSize.value)
    * ((getStyleWidth.value - getSliderBaseSize.value)
    / (props.canvasWidth - getSliderBaseSize.value))
    - 3,
  )

  if (x < props.range) {
    // 成功
    isSuccess.value = true
    emits('success', x)

    // 成功的回调
    useTimeoutFn(() => {
      show.value = false
    }, 800)
  }
  else {
    // 失败
    isSuccess.value = false
    emits('fail', x)

    // 失败的回调
    useTimeoutFn(() => {
      onReset()
    }, 800)
  }

  infoTextShow.value = true
  isCanSlide.value = false
}

function onReset() {
  onResetState()
  onInit()
}

function onResetState() {
  infoTextShow.value = false
  isCanSlide.value = false
  isSuccess.value = false
  startWidth.value = getSliderBaseSize.value // 鼠标点下去时父级的width
  startX.value = 0 // 鼠标按下时的X
  newX.value = 0 // 鼠标当前的偏移X
}

onMounted(() => {
  useEventListener('mousemove', onRangeMouseMove)
  useEventListener('mouseup', onRangeMouseUp)
})

function onOpenModal() {
  show.value = true

  nextTick(onReset)
}

defineExpose({ onOpenModal })
</script>

<template>
  <w-modal
    v-model:show="show"
    :title="t('comp.verify.title')"
    :close-on-esc="false"
    :default-button="false"
    :fullscreen="false"
    :closable="false"
    width="auto"
    display-directive="show"
  >
    <div class="select-none" @mousedown.stop @touchstart.stop>
      <n-spin :show="loading">
        <div class="relative" :style="`height: ${canvasHeight}px`">
          <!-- 主图，有缺口 -->
          <canvas
            ref="canvas1"
            :width="canvasWidth"
            :height="canvasHeight"
            :style="getCanvasBaseStyle"
          />

          <!-- 小图 -->
          <canvas
            ref="canvas2"
            :width="getPuzzleBaseSize"
            :height="canvasHeight"
            :style="getPuzzleCanvasStyle"
            class="absolute left-0 top-0 z-20"
          />

          <!-- 成功后显示的完整图 -->
          <canvas
            ref="canvas3"
            :width="canvasWidth"
            :height="canvasHeight"
            :style="getCanvasBaseStyle"
            class="absolute left-0 top-0 z-30 opacity-0 transition-opacity duration-700" :class="[
              { 'opacity-100': isSuccess },
            ]"
          />

          <!-- 提示消息 -->
          <div
            class="absolute bottom-0 left-0 z-50 h-6 w-full bg-green-600 text-center opacity-0 transition-all" :class="[
              { 'opacity-100': infoTextShow },
              { 'bg-orange-600': !isSuccess },
            ]"
          >
            {{ getInfoText }}
          </div>

          <!-- 重置 -->
          <n-button
            text
            type="error"
            class="absolute right-2 top-2 z-40 transform cursor-pointer transition-transform hover:-rotate-90"
            @click="onReset"
          >
            <w-icon icon="carbon:reset" height="36" />
          </n-button>
        </div>
      </n-spin>

      <!-- 滑块 -->
      <div
        class="relative mt-4 w-full rounded-md bg-gray-400/50 shadow-xl transition-all"
        :style="`height: ${getSliderBaseSize}px`"
      >
        <!-- 滑块文字 -->
        <div
          v-show="!mouseDown"
          class="abs-center w-full truncate text-center text-sm"
        >
          {{ t('comp.verify.slider') }}
        </div>

        <!-- 滑块本体 -->
        <div
          ref="rangeSlider"
          class="absolute h-full w-12 rounded from-indigo-200 via-red-200 to-yellow-100 bg-gradient-to-r"
          :style="`width: ${getStyleWidth}px`"
        >
          <div
            class="border-{3px} absolute right-0 h-full w-12 border rounded bg-gray-700 shadow-xl transition-all hover:bg-gray-700/60"
            :style="`width: ${getSliderBaseSize}px`"
            @mousedown="onRangeMouseDown($event)"
            @touchstart="onRangeMouseDown($event)"
          >
            <n-button text type="success" :disabled="loading">
              <w-icon
                :icon="
                  mouseDown ? 'mdi:drag' : 'ant-design:double-right-outlined'
                "
                :height="`${getSliderBaseSize}`"
              />
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </w-modal>
</template>
