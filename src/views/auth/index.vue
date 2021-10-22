<template>
  <div class="w-auth h-screen w-screen">
    <w-icon
      icon="ant-design:user-outlined"
      height="24"
      color="#F0F8FF"
      @click="onShowCard"
      class="cursor-pointer m-0.5 float-right"
    ></w-icon>

    <transition name="el-fade-in-linear">
      <div v-show="showCard">
        <WFlipper width="450px" height="500px" class="w-auth-card abs-center">
          <template #front>
            <div class="w-auth-card__front h-full rounded-2xl">
              <SignIn></SignIn>
            </div>
          </template>

          <template #back>
            <div class="w-auth-card__back h-full rounded-2xl">
              <SignUp></SignUp>
            </div>
          </template>
        </WFlipper>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import SignIn from './signin.vue'
  import SignUp from './signup.vue'

  export default defineComponent({
    name: 'Auth',

    defaultView: false,

    components: { SignIn, SignUp },

    setup() {
      const showCard = ref(false)

      const onShowCard = () => {
        showCard.value = !showCard.value
      }

      return {
        showCard,
        onShowCard,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-auth {
    background: transparent url('/assets/facebook-1200.png') no-repeat center
      center fixed;
    background-size: cover;

    &-card {
      &__front {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/auth_signin.jpg') no-repeat center center;
        background-size: cover;
      }

      &__back {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/auth_signup.jpg') no-repeat center center;
        background-size: cover;
      }
    }
  }
</style>
