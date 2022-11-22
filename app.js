const saveBtn = document.getElementById('save')
const fileInput = document.getElementById('file')
const textInput = document.getElementById('text-input')
const eraserBtn = document.getElementById('eraser-btn')
const destroyBtn = document.getElementById('destroy-btn')
const modeBtn = document.getElementById('mode-btn')
const colorOptions = Array.from(document.getElementsByClassName('color-option'))

const lineWidth = document.getElementById('line-width')

const color = document.getElementById('color')
const canvas = document.querySelector('canvas');

//캔버스에 그림을 그릴때 쓰는 것이다. 
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
//css에서만 하는게 아니라 js에서도 캔버스의 크기를 지정해주어야한다. 
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap= 'round'

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
]
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event){
        
    if(isPainting){
        ctx.lineTo(event.offsetX+100, event.offsetY+100);
        ctx.stroke();
        return;
    }
    ctx.beginPath()
    ctx.moveTo(event.offsetX+100, event.offsetY+100);
}
function onMouseDown(event){
    isPainting = true;
}

function onMouseUp(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onCanvasClick(event) {
      console.log(event)

    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

//console.dir
function onColorClick(event){
const colorValue = event.target.dataset.color
  ctx.strokeStyle =colorValue
  ctx.fillStyle = colorValue
  color.value = colorValue
}

function onModeClick(event){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "fill"
    }else{
        isFilling = true;
        modeBtn.innerText = "draw"
    }
}

function onDestroyClick(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = 'white';
    isFilling = false;
    modeBtn.innerText = 'fill'
}

function onFileChange (event){
    console.dir(event.target)
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image()
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        //ctx의 현재상태를 저장하는 함수
        ctx.save()   
        ctx.lineWidth = 1;
        ctx.font = "48px serif"
        ctx.fillText(text, event.offsetX, event.offsetY)
        //텍스트는 1로그리고 브러시 크기는 돌아와야하기 때문에
        ctx.restore()
    }
    
}

function onSaveClick(){
    //url로 인코딩 되어있는 이미지가 나온다.
    const url = canvas.toDataURL();
    //fake link 를 만들어주고 저장해줌.
    const a = document.createElement('a')
    a.href = url;
    a.download = 'myDrawing.png';
    a.click();
}

canvas.addEventListener('dblclick', onDoubleClick)
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', onMouseDown)
canvas.addEventListener('mouseup', onMouseUp)
canvas.addEventListener('mouseleave', onMouseUp)
canvas.addEventListener('click', onCanvasClick)

lineWidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)


colorOptions.forEach(color => color.addEventListener('click', onColorClick))
modeBtn.addEventListener('click', onModeClick)
destroyBtn.addEventListener('click', onDestroyClick)
eraserBtn.addEventListener('click', onEraserClick)
fileInput.addEventListener('change', onFileChange)
saveBtn.addEventListener('click', onSaveClick)