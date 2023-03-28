<script lang="ts" setup>
import type { PhoneNumberInputUpdateParams } from '@/components/Extra/PhoneNumberInput'

const state = ref<any>({})
const updateParams1 = ref<PhoneNumberInputUpdateParams>()

const onUpdate = (val: PhoneNumberInputUpdateParams) => {
  updateParams1.value = val
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'PhoneInputDemo',

  defaultView: false,
})
</script>

<template>
  <w-demo-card title="Phone Number Input">
    <n-list>
      <w-JSON :value="{ state, updateParams1 }" height="300px" />

      <n-list-item>
        <w-title prefix="bar">
          Normal usage, see console output
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber1" @update="onUpdate" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Auto get current user country code (if online get result from https://ip2c.org/s, otherwise use `new Intl.Locale(navigator.language).region` to get country cdoe)
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber2" auto-default-country />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Display an example phone number in placeholder, changes when country select changed
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber3" example />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          No nation flag
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber4" :flag="false" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          No country select, just a normal phone number input
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber5" :country-select="false" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Preferred List, get from `navagator.languages`
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber6" preferred />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          White List, only show passed countries
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber7" :white-list="['CN', 'US', 'JP']" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Black List, no US anymore (HE)
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber8" :black-list="['US']" country-code="CN" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Disabled
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber9" disabled />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
