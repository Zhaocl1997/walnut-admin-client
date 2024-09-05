<script lang="ts" setup>
import type { PhoneNumberInputUpdateParams } from '@/components/Extra/PhoneNumberInput'

defineOptions({
  name: 'PhoneInputDemo',
  defaultView: false,
})

const state = ref<any>({
  phoneNumber1: '13866665555',
})
const updateParams1 = ref<PhoneNumberInputUpdateParams>()

function onUpdate(val: PhoneNumberInputUpdateParams) {
  updateParams1.value = val
}
</script>

<template>
  <w-demo-card title="Phone Number Input">
    <n-list>
      <w-JSON :value="{ state, updateParams1 }" height="200px" />

      <n-list-item>
        <w-title prefix="bar">
          Normal usage, see console output
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber1" class="w-80" @update="onUpdate" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Auto get current user country code (if online get result from https://ip2c.org/s, otherwise use `new Intl.Locale(navigator.language).region` to get country cdoe)
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber2" class="w-80" auto-default-country />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Display an example phone number in placeholder, changes when country select changed
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber3" class="w-80" example />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          No nation flag
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber4" class="w-80" :flag="false" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          No country select, just a normal phone number input
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber5" class="w-80" :country-select="false" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Preferred List, get from `navagator.languages`
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber6" class="w-80" preferred />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          White List, only show passed countries
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber7" class="w-80" :white-list="['CN', 'US', 'JP']" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Black List, no US anymore (HE)
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber8" class="w-80" :black-list="['US']" country-code="CN" />
      </n-list-item>

      <n-list-item>
        <w-title prefix="bar">
          Disabled
        </w-title>

        <w-phone-number-input v-model:value="state.phoneNumber9" class="w-80" disabled />
      </n-list-item>
    </n-list>
  </w-demo-card>
</template>
