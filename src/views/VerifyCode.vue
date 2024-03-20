<template>
  <div class="verify-code">
    <label class="code-label"> 验证码 </label>
    <div class="code-input-inline">
      <input
        name="code"
        v-model="code"
        placeholder="请输入图形验证码"
        autocomplete="off"
        maxlength="4"
        class="code-input"
      />
      <div id="randomCode" style="width: 100px; height: 46px" @click="getNewCode"></div>
      <a
        href="javascript:;"
        @click="getNewCode"
        style="line-height: 46px; color: #999; text-decoration: underline"
        >看不清楚？换一张</a
      >
    </div>
    <button @click="validate">提交验证</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VerifyCode from '@/utils/verifyCode'

const code = ref('')
const verifyCode = new VerifyCode({
  id: 'randomCode'
})
onMounted(() => {
  verifyCode.init()
})

const getNewCode = () => {
  verifyCode.refresh()
}
const validate = () => {
  if (!verifyCode.validate(code.value)) alert('请输入正确的验证码！')
  else alert('验证成功！')
}
</script>

<style scoped>
.verify-code {
  display: flex;
  height: 46px;
}
.verify-code .code-label {
  width: 100px;
  height: 46px;
  line-height: 46px;
  text-align: center;
}
.verify-code .code-input-inline {
  width: 420px;
  margin-right: 0;
  display: flex;
  justify-content: space-between;
}
.verify-code .code-input {
  height: 46px;
}
</style>
