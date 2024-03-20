type IOpitons = {
  id: string, // 容器Id
  canvasId?: string, // canvas的Id
  width?: number, // 默认canvas的宽度
  height?: number, // 默认canvas的高度
  type?: string, // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
  code?: string, // 验证码
  numArr?: Array<any>, // 数字数组
  letterArr?: Array<any> // 字母数组
}

class VerifyCode {
  options: IOpitons = {
    id: '',
    canvasId: 'verifyCanvas',
    width: 100,
    height: 46,
    type: 'blend',
    code: '',
    numArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    letterArr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }
  constructor(options: IOpitons) {
    this.options = Object.assign(this.options, options)
  }

  // 初始化方法
  init() {
    const ele = document.getElementById(this.options.id)
    if (!ele) return alert('id是否正确？')
    const canvas = document.createElement("canvas")
    this.options.width = ele.offsetWidth > 0 ? ele.offsetWidth : 100
    this.options.height = ele.offsetHeight > 0 ? ele.offsetHeight : 46
    if (!this.options.canvasId) return alert('canvasId是否正确？')
    canvas.id = this.options.canvasId
    canvas.width = this.options.width
    canvas.height = this.options.height
    canvas.style.cursor = "pointer"
    canvas.innerHTML = "您的浏览器版本不支持canvas,请更换"
    ele.appendChild(canvas)
    canvas.onclick = () => {
      this.refresh()
    }
    this.refresh()
  }
  // 生成验证码
  refresh() {
    this.options.code = ""
    let ctx: CanvasRenderingContext2D | null
    const canvas = document.getElementById(this.options.canvasId as string) as HTMLCanvasElement
    if (canvas.getContext) {
      ctx = canvas.getContext('2d')
    } else {
      return
    }

    if (!ctx) return alert('canvas生成失败！')

    ctx!.textBaseline = "middle"

    ctx!.fillStyle = randomColor(180, 240)
    ctx!.fillRect(0, 0, this.options.width as number, this.options.height as number)

    let txtArr: Array<any>
    //判断验证码类型
    if (this.options.type === "blend") {
      txtArr = (this.options.numArr as any[]).concat(this.options.letterArr)
    } else if (this.options.type == "number") {
      txtArr = this.options.numArr as any[]
    } else {
      txtArr = this.options.letterArr as any[]
    }

    for (let i = 1; i <= 4; i++) {
      const txt = txtArr[randomNum(0, txtArr.length)]
      this.options.code += txt;
      ctx!.font = randomNum((this.options.height as number) / 2, (this.options.height as number)) + 'px SimHei' //随机生成字体大小
      ctx!.fillStyle = randomColor(50, 160) //随机生成字体颜色		
      ctx!.shadowOffsetX = randomNum(-3, 3);
      ctx!.shadowOffsetY = randomNum(-3, 3);
      ctx!.shadowBlur = randomNum(-3, 3);
      ctx!.shadowColor = "rgba(0, 0, 0, 0.3)";
      const x = (this.options.width as number) / 5 * i - (this.options.width as number) / 10;
      const y = (this.options.height as number) / 2;
      const deg = randomNum(-30, 30);
      /**设置旋转角度和坐标原点**/
      ctx!.translate(x, y);
      ctx!.rotate(deg * Math.PI / 180);
      ctx!.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx!.rotate(-deg * Math.PI / 180);
      ctx!.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (let i = 0; i < 2; i++) {
      ctx!.strokeStyle = randomColor(40, 180)
      ctx!.beginPath()
      ctx!.moveTo(randomNum(0, (this.options.width as number)), randomNum(0, (this.options.height as number)))
      ctx!.lineTo(randomNum(0, (this.options.width as number)), randomNum(0, (this.options.height as number)))
      ctx!.stroke()
    }
    /**绘制干扰点**/
    for (let i = 0; i < (this.options.width as number) / 4; i++) {
      ctx!.fillStyle = randomColor(0, 255)
      ctx!.beginPath()
      ctx!.arc(randomNum(0, (this.options.width as number)), randomNum(0, (this.options.height as number)), 1, 0, 2 * Math.PI)
      ctx!.fill()
    }

    // 生成一个随机数
    function randomNum(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    // 生成一个随机色
    function randomColor(min: number, max: number) {
      const r = randomNum(min, max)
      const g = randomNum(min, max)
      const b = randomNum(min, max)
      return "rgb(" + r + "," + g + "," + b + ")"
    }
  }

  // 验证验证码
  validate(code: string) {
    code = code.toLowerCase()
    const v_code = (this.options.code as string).toLowerCase()
    if (code == v_code) {
      return true
    } else {
      return false
    }
  }
}

export default VerifyCode