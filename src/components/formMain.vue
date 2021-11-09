<template>
  <div class="content">
    <div class="main">
      <div class="findPsw">
        <slot name="headImg"></slot>
      </div>
      <slot name="logo"></slot>
      <slot name="form"></slot>
      <slot name="step"></slot>
    </div>
    <div class="aside-title" :class="[title === 0 ? 'origin' : 'blue']">
      <router-link to="/register" v-if="title === 0">注册</router-link>
      <router-link to="/login" v-else>登陆</router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import {ToggleTitle} from "@/types/types.ts";
import {theme} from '@/types/theme.ts'
import {currentStep} from '@/utils/mixins.ts';

export default defineComponent({
  name: 'formMain',
  props: {
    title: {
      type: Number,
      default: ToggleTitle.register
    },
    theme: {
      type: String,
      default: 'origin'
    }
  },
  setup(props) {
    const formRef = ref()

    //根据props.theme传值切换主题
    const toggleTheme = () => {
      for (const [key, value] of Object.entries(theme)) {
        switch (props.theme) {
          case 'blue':
            document.documentElement.style.setProperty(key, value.blue)
            document.documentElement.style.setProperty('--form-position', '250px')
            break
          case 'origin':
            document.documentElement.style.setProperty(key, value.origin)
            document.documentElement.style.setProperty('--form-position', '200px')
            break
          case 'lilac':
            document.documentElement.style.setProperty(key, value.lilac)
            document.documentElement.style.setProperty('--form-position', '250px')
            break
          default:
            break
        }
      }
    }
    toggleTheme()

    return {
      formRef,
      currentStep,
    }
  }
})
</script>

<style lang="scss">
:root {
  --theme-color: #FFD2BF;
  --theme-color2: #FC996E;
  --theme-line: linear-gradient(90deg, #FF4D00 0%, #FC996E 100%);
  --form-position:250px
}

.content {
  width: 855px;
  height: 540px;
  display: flex;

  .main {
    flex: 1;
    border-radius: 10px;
    z-index: 99;
    position: relative;
    .btn {
      display: block;
      width: 150px;
      height: 36px;
      background: var(--theme-color2);
      border-radius: 8px;
      transform: translateX(-50%);
      border: none;
      color: #fff;
    }
    .form-btn {
      position: absolute;
      left: 50%;
      span {
        font-size: 18px;
      }
    }
    @mixin a-form {
      position: absolute;
      height: 250px;
      left: 50%;
      transform: translateX(-50%);
    }

    .special-form {
      @include a-form;
      top: 150px;
    }
    .form {
      @include a-form;
      top: var(--form-position);
    }

    .sendCode {
      position: absolute;
      bottom: 0;
      right: 10px;
      width: 150px;
      height: 36px;
      background: #FC996E;
      border-radius: 8px;
      color: #fff;
      border: none;
    }

    .ant-form-item {
      .ant-form-item-control-input {
        margin: 0 auto;
      }
    }

    .title {
      color: var(--theme-color2);
      margin: 20px 0;
    }

    .input {
      width: 360px;
      height: 30px;
      border: none;
      background: none;
      box-shadow: none !important;
    }

    .login-btn {
      width: 150px;
      height: 36px;
      background: #2D77DC;
      border-radius: 8px;
    }

    @mixin des {
      color: var(--theme-color2);
      font-size: 42px;
    }

    .register-des {
      @include des
    }

    .changePsw-des {
      @include des
    }

    .changePsw {
      position: absolute;
      right: 0;
      bottom: 140px;
      line-height: 0;
      font-size: 14px;
      color: #2D77DC;
      z-index: 99;
    }


    .steps {
      position: absolute;
      left: 50%;
      bottom: 15px;
      transform: translateX(-50%);
      .back-login {
        position: absolute;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
      }
      .ant-steps-item-icon {
        background: var(--theme-color2);
        border: none;

        svg {
          color: #fff;
        }
      }

      .ant-steps-item-content {
        color: var(--theme-color2);

        .ant-steps-item-description {
          color: var(--theme-color2);
          font-size: large;
        }

        .ant-steps-item-title::after {
          background: none;
        }
      }
    }

    .logo {
      width: 192px;
      height: 73px;
      position: absolute;
      left: 50%;
      top: 116px;
      transform: translateX(-50%);
    }

    .findPsw {
      position: relative;

      img:nth-child(2) {
        top: 40px;
      }

      img:nth-child(3) {
        top: 80px;
      }

      img {
        position: absolute;
        width: 100%;
        height: 540px;
        left: 2px;
        right: 2px;
        top: 0;
      }
    }

  }

  .aside-title {
    width: 223px;
    height: 539px;
    position: relative;
    top: 0;
    left: -82px;

    a {
      font-size: 48px;
      font-family: SourceHanSansCN;
      font-weight: bold;
      position: absolute;
      top: 20px;
      right: -15px;
      transform: rotate(90deg);
      color: #ECE8F2;
    }
  }

  .origin {
    background: url("../assets/images/SIGNIN2.png") no-repeat;

  }

  .blue {
    background: url("../assets/images/WELLCOME2.png") no-repeat;
  }

}

.txt {
  position: absolute;
  color: var(--theme-color);
  bottom: 4px;
  left: 10px;
  transition: all .5s;
  pointer-events: none;
}

.line {
  position: absolute;
  left: 0;
  bottom: 0;
  display: inline-block;
  width: 360px;
  height: 1.5px;
  z-index: 999;
  background: var(--theme-line);
}

.ant-btn {
  &:hover {
    background: var(--theme-color2);
    color: #fff;
    border: none;
  }
}

.ant-input-suffix {
  svg {
    width: 22px;
    height: 19px;
    color: var(--theme-color);
  }
}


</style>
