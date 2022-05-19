<template>
  <n-popover v-model:show="show" trigger="click" display-directive="show">
    <template #trigger>
      <n-input
        ref="inputRef"
        :value="filter"
        readonly
        @click="onOpenPopover"
      ></n-input>
    </template>

    <template #header>
      <n-input
        :id="acId"
        v-model:value="filter"
        @input="onDebounedFilter"
        @clear="onClearFilter"
        clearable
      ></n-input>
    </template>

    <template #>
      <div ref="baiduRef" :style="{ height, width }"></div>
    </template>
  </n-popover>
</template>

<script lang="ts" setup>
  import { genString } from 'easy-fns-ts'

  // TODO 888
  interface InternalProps {
    value?: number[]
    height?: string
    width?: string
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    height: '50vh',
    width: '50vw',
  })

  const emits = defineEmits(['update:value'])

  const appKey = useAppKeyStore()

  const baiduRef = ref<Nullable<HTMLDivElement>>(null)
  const baiduMap = ref<any>()
  const baiduMapAutoComplete = ref<any>()
  const acId = ref('ac' + genString(8))

  const filter = ref<string>()
  const show = ref(false)

  const onOpenPopover = () => {
    show.value = true

    if (window.BMap) {
      onInitMap()
      return
    }

    const url = `https://api.map.baidu.com/getscript?v=2.0&ak=${appKey.baiduAK}&services=&t=20220314154112`
    window.HOST_TYPE = '2'
    useScriptTag(url, onInitMap)
  }

  const onFilter = () => {
    baiduMapAutoComplete.value.search(filter.value)
  }

  const onDebounedFilter = useDebounceFn(onFilter, 500)

  const onClearFilter = () => {
    emits('update:value', [])
  }

  const onFeedback = () => {
    if (!props.value || props.value.length === 0) return

    const BMap = window.BMap
    const myGeo = new BMap.Geocoder()

    myGeo.getLocation(
      new BMap.Point(props.value[0], props.value[1]),
      (res: any) => {
        filter.value = res.address + res.surroundingPois[0].title

        baiduMap.value.centerAndZoom(res.point, 18)
        baiduMap.value.addOverlay(new BMap.Marker(res.point))
      }
    )
  }

  const onInitMap = async () => {
    console.log('Init Baidu Map')

    await nextTick()

    const wrap = unref(baiduRef)

    const BMap = window.BMap
    const map = new BMap.Map(wrap)
    baiduMap.value = map
    const point = new BMap.Point(116.331398, 39.897445)
    map.centerAndZoom(point, 15)
    map.addControl(
      new BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT })
    )
    map.addControl(new BMap.MapTypeControl())
    map.enableScrollWheelZoom(true)
    map.enableAutoResize(true)
    map.setDefaultCursor('Crosshair')

    baiduMapAutoComplete.value = new BMap.Autocomplete({
      input: acId.value,
      location: map,
      onSearchComplete(data: any) {},
    })

    baiduMapAutoComplete.value.addEventListener('onconfirm', (e: any) => {
      const v = e.item.value

      filter.value = v.province + v.city + v.district + v.street + v.business

      const myGeo = new BMap.Geocoder()

      myGeo.getPoint(filter.value, (point: any) => {
        emits('update:value', [point.lng, point.lat])
        baiduMapAutoComplete.value.hide()

        map.centerAndZoom(point, 18)
        map.addOverlay(new BMap.Marker(point))
      })
    })

    onFeedback()

    // baiduMapAutoComplete.value.addEventListener(
    //   'onhighlight',
    //   function (e: any) {
    //     console.log(e, 233)
    //   }
    // )

    // // 用经纬度设置地图中心点
    // function theLocation(lng, lat) {
    //   map.clearOverlays()
    //   var new_point = new BMap.Point(lng, lat)
    //   var marker = new BMap.Marker(new_point) // 创建标注
    //   map.addOverlay(marker) // 将标注添加到地图中
    //   map.panTo(new_point)
    // }

    // var geolocation = new BMap.Geolocation()
    // geolocation.getCurrentPosition(function (r) {
    //   if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
    //     var mk = new BMap.Marker(r.point)
    //     map.addOverlay(mk)
    //     map.panTo(r.point)
    //     alert('您的位置：' + r.point.lng + ',' + r.point.lat)
    //     theLocation(r.point.lng, r.point.lat)
    //   } else {
    //     alert('failed' + this.getStatus())
    //   }
    // })
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WVendorLocationPicker',
  })
</script>

<style>
  .tangram-suggestion-main {
    z-index: 9999999999;
  }
</style>
