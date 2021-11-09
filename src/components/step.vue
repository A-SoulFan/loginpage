<template>
  <div class="steps">
    <a-button v-if="currentStep===2"
              :class="{position:changePsw}"
              class="btn back-login"
              @click="backLogin">
      返回登陆
    </a-button>
    <a-steps v-model:current="currentStep">
      <a-step class="step-des" disabled description="· · ·"/>
      <a-step class="step-des" disabled description="· · ·"/>
      <a-step disabled/>
    </a-steps>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {useRouter} from "vue-router";
import {currentStep} from "@/utils/mixins.ts";

export default defineComponent({
  name: 'step',
  props: {
    changePsw: Boolean
  },
  setup() {
    const router = useRouter()
    const backLogin = () => {
      currentStep.value=0
      router.push('login')
    }
    return {
      currentStep,
      backLogin
    }
  }
})
</script>

<style>

</style>
