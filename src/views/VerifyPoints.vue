<template>
  <div class="points-container">
    <div class="box" ref="boxRef">
      <div class="bg-blur"></div>
      <div v-for="(item, index) in place" :style="item" :key="index" class="fl">
        <span class="fl-text" :data-index="index" :data-judge="true">{{ extra_str[index] }}</span>
      </div>
    </div>
    <div class="tit-box" ref="titBoxRef">
      请依次点击：<span>{{ randomWord }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const randomWord = ref('')
const boxRef = ref()
const titBoxRef = ref()

// 要点击的词语
const arr = ['一帆风顺', '二龙腾飞', '三羊开泰', '四季平安', '五福临门']
// 混淆的字
const dic =
  '一乙二十丁厂七卜人入八九几儿了力乃刀又三于干亏士工土才寸下大丈与万上小口巾山千乞川亿个勺久凡及夕丸么广亡门义之尸弓己已子卫也女飞刃习叉马乡丰王井开夫天无元专云扎艺木五支厅不太犬区历尤友匹车巨牙屯比互切瓦止少日中冈贝内水见午牛手毛气升长仁什片仆化仇币仍仅斤爪反介父从今凶分乏公仓月氏勿欠风丹匀乌凤勾文六方火为斗忆订计户认心尺引丑巴孔队办以允予劝双书幻玉刊示末未击打巧正扑扒功扔去甘世古节本术可丙左厉右石布龙平灭轧东卡北占业旧帅归且旦目叶甲申叮电号田由史只央兄叼叫另叨叹四生失禾丘付仗代仙们仪白仔他斥瓜乎丛令用甩印乐句匆册犯外处冬鸟务包饥主市立闪兰半汁汇头汉宁穴它讨写让礼训必议讯记永司尼民出辽奶奴加召皮边发孕圣对台矛纠母幼丝式刑动扛寺吉扣考托老执巩圾扩扫地扬场耳共芒亚芝朽朴机权过臣再协西压厌在有百存而页匠夸夺灰达列死成夹轨邪划迈毕至此贞师尘尖劣光当早吐吓虫曲团同吊吃因吸吗屿帆岁回岂刚则肉网年朱先丢舌竹迁乔伟传乒乓休伍伏优伐延件任伤价份华仰限妹姑姐姓始驾参艰线练组细驶织终驻驼绍经贯奏春帮珍玻毒型挂封帘实试郎诗肩房诚衬衫视话诞询该详建肃录隶居届刷屈弦承孟孤陕降河沾泪油泊沿泡注泻泳泥沸波泼泽治怖性怕怜怪学宝宗定宜审宙官空京享店夜庙府底剂郊废净盲放刻育闸闹郑券卷单炒炊炕炎炉沫浅法泄斧爸采受乳贪念贫肤肺肢肿胀朋股肥服胁周昏鱼兔狐忽狗备饰饱饲变'

// 每个字的位置
const place = [
  { left: '120px', top: '0px' },
  { left: '160px', top: '20px' },
  { left: '80px', top: '200px' },
  { left: '240px', top: '260px' },
  { left: '40px', top: '260px' },
  { left: '240px', top: '50px' },
  { left: '40px', top: '150px' },
  { left: '40px', top: '110px' },
  { left: '160px', top: '120px' }
]

const extra_str = ref('')

// 获取随机的词语
const handleRandomWord = () => {
  const word = arr[Math.floor(Math.random() * arr.length)]
  return word
}

// 清空重置元素
/* const clear = () => {
  const radios: NodeListOf<HTMLElement> = document.querySelectorAll('.radio')
  radios.forEach((radio: HTMLElement) => {
    radio.style.opacity = '0'
  })
}
 */
// 初始化内容
const init = () => {
  // clear()

  randomWord.value = handleRandomWord()

  place.sort(() => {
    return Math.random() - 0.5
  })

  for (let i = 0; i < 5; i++) {
    extra_str.value += dic[Math.floor(Math.random() * dic.length)]
  }
  extra_str.value = randomWord.value + extra_str.value

  const verify: string[] = []
  for (let i in extra_str.value as any) {
    verify.push(i)
  }

  const cspan: string[] = []
  const fspans = boxRef.value.querySelectorAll('.fl-text')
  let a = 0
  // 为每个字绑定点击事件
  fspans.forEach((fspan: HTMLElement) => {
    fspan.addEventListener('click', (event: MouseEvent) => {
      if (JSON.parse(fspan.getAttribute('data-judge')!)) {
        cspan.push(fspan.getAttribute('data-index') as string)
        fspan.setAttribute('data-judge', false + '')

        // 小绿点（点击显示序号）
        a++
        const rad = document.createElement('div')
        rad.classList.add('radio')
        rad.innerText = a + ''
        // 小绿点样式
        const radStyle = {
          width: '30px',
          height: '30px',
          'border-radius': '50%',
          'background-color': '#1abd6c',
          color: '#fff',
          'text-align': 'center',
          'line-height': '30px',
          position: 'absolute',
          'z-index': 1
        }
        rad.style.left = event.pageX - boxRef.value.offsetLeft - 20 + 'px'
        rad.style.top = event.pageY - boxRef.value.offsetTop - 20 + 'px'
        Object.assign(rad.style, radStyle)
        boxRef.value.appendChild(rad)
        // 小绿点 结束
        // 共四个字
        if (a === 4) {
          console.log(cspan.join(), verify.slice(0, 4).join())
          if (cspan.join() == verify.slice(0, 4).join()) {
            titBoxRef.value.innerHTML = '验证成功'
            titBoxRef.value.style.color = 'green'
          } else {
            titBoxRef.value.innerHTML = '验证失败'
            titBoxRef.value.style.color = 'red'
          }

          // 1秒后执行 init
          setTimeout(() => {
            alert('即将刷新页面！')
            location.reload()
          }, 1000)
        }
      } else {
        alert('重复点击')
      }
    })
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.box {
  width: 420px;
  height: 420px;
  border: 10px solid #fff;
  border-radius: 10px;
  position: relative;
  user-select: none;
}
.box .fl {
  width: 200px;
  height: 200px;
  position: absolute;
}
/* 要点击的文字 */
.box span {
  font-size: 20px;
  color: blueviolet;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  cursor: pointer;
}
/* 底部提示区 */
.tit-box {
  width: 420px;
  height: 50px;
  border-radius: 10px;
  font-size: 26px;
  text-align: center;
  line-height: 50px;
  color: #333;
  background-color: #fff;
}
.tit-box span {
  color: #6097eb;
  font-weight: bold;
}
/* 背景图 模糊 */
.bg-blur {
  background: url('@/assets/789.jpg') no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  /* 模糊滤镜 */
  filter: blur(10px);
}
</style>
