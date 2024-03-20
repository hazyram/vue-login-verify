<template>
  <div class="slider-container">
    <div class="slider-background">
      <div class="gap-fixed"></div>
      <!-- 固定缺口位置 -->
      <div class="slider" ref="sliderRef">
        <div class="gap"></div>
        <!-- 缺口图放置在滑块内部 -->
      </div>
      <div class="slider-bar" ref="sliderBarRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const sliderRef = ref()
const sliderBarRef = ref()

const mockPositionX = 360 // 模拟横轴滑动位置
const isDragging = ref(false) // 是否拖拽
const isContinueDragging = ref(true) // 是否可继续拖拽
const startPositionX = ref(0) // 起始点坐标

onMounted(() => {
  sliderRef.value.addEventListener('mousedown', (e: MouseEvent) => {
    if (isContinueDragging.value) {
      isDragging.value = true
      startPositionX.value = e.clientX
    }
  })

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (isDragging.value) {
      const offsetX = e.clientX - startPositionX.value
      if (offsetX <= 0 || offsetX >= 500 - 75) return
      sliderRef.value.style.transform = `translateX(${offsetX}px)`
    }
  })

  document.addEventListener('mouseup', () => {
    if (isDragging.value) {
      const transformX = Math.abs(parseInt(sliderRef.value.style.transform.slice(11)))
      if (transformX < mockPositionX + 10 && transformX > mockPositionX - 10) {
        // 验证通过
        sliderBarRef.value.style.background = 'rgb(12 160 18 / 50%)'
        alert('验证通过，继续后续操作！')
      } else {
        // 验证失败
        sliderBarRef.value.style.background = 'rgb(249 2 2 / 50%)'
        isContinueDragging.value = false
        setTimeout(() => {
          sliderBarRef.value.style.background = 'rgb(204 204 204 / 50%)'
          sliderRef.value.style.transform = 'translateX(0)'
          isContinueDragging.value = true
          alert('验证失败，请重新尝试！')
        }, 1500)
      }
      isDragging.value = false
    }
  })
})
</script>

<style scoped>
.slider-container {
  width: 500px; /* 背景图宽度 */
  height: 300px; /* 背景图高度 */
  margin: 20px auto;
  position: relative;
}

.slider-background {
  width: 100%;
  background: url('@/assets/789.jpg'); /* 背景图URL */
  background-size: 100% 100%; /* 背景图铺满 */
  border-radius: 5px;
  height: 300px;
  position: relative;
  overflow-x: hidden;
}

.slider {
  width: 80px; /* 滑块宽度 */
  height: 50px;
  background-color: #3498db;
  border-radius: 5px;
  position: absolute;
  cursor: pointer;
  user-select: none; /* 禁止文本选中 */
  bottom: 0; /* 滑块位于底部 */
  left: 1px;
  z-index: 2;
  transition: transform 0.2s ease; /* 添加平滑动画效果 */
}
.slider-bar {
  bottom: 0;
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 1;
  background: rgb(204 204 204 / 50%);
}

.gap {
  width: 75px; /* 缺口图的宽度 */
  height: 50px; /* 缺口图的高度 */
  background-image: url('@/assets/789.jpg'); /* 缺口图的URL */
  background-size: 100% 100%;
  position: absolute;
  top: -112px;
  left: 1px;
  box-shadow: 0px 0px 5px 1px #ccc;
}
.gap-fixed {
  width: 75px; /* 缺口图的宽度 */
  height: 50px; /* 缺口图的高度 */
  position: absolute;
  bottom: 112px;
  left: 358px;
  box-shadow: 0px 0px 5px 1px #ff0000;
}
</style>
