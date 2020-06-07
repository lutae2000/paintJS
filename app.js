const canvas = document.getElementById("jsCanvas");

const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

let filling = false;
let painting  = false;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function stopPating(){
    painting = false;
}
function startPating(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
        //ctx.closePath();
    }
}



function onMouseUp(event){
    stopPating();
}

function onMouseLeave(event){
    stopPating();
}

function handleRangeChange(event){
    const lineWidth= event.target.value;
    ctx.lineWidth = lineWidth;
}

function handelColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handelModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "fill"
    } else{
        filling = true
        mode.innerText = "paint"
    }
    

}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }

}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const img = canvas.toDataURL("image/png");
    console.log(img);
    
    const link = document.createElement("a");
    link.href = img;
    link.download = "paintDownloaded💈";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPating);
    canvas.addEventListener("mouseup", stopPating);
    canvas.addEventListener("mouseleave", stopPating);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}


Array.from(colors).forEach(color=>
    color.addEventListener("click", handelColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handelModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}