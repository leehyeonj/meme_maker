const canvas = document.querySelector('canvas');

//캔버스에 그림을 그릴때 쓰는 것이다. 
const ctx = canvas.getContext('2d');

//css에서만 하는게 아니라 js에서도 캔버스의 크기를 지정해주어야한다. 
canvas.width = 500;
canvas.height = 500;

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
]
ctx.lineWidth = 2;
let isPainting = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX+3, event.offsetY+3);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX+3, event.offsetY+3);
}
function onMouseDown(event){
    isPainting = true;
}

function onMouseUp(){
    isPainting = false;
}

canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', onMouseDown)
canvas.addEventListener('mouseup', onMouseUp)
canvas.addEventListener('mouseleave', onMouseUp)