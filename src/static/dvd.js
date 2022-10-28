var colors = ['red', 'green', 'blue', 'orange', 'yellow', 'cyan'];

let fontColor = colors[Math.floor(Math.random() * colors.length)];
const bgColor = "black";
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const fontHeight = 60;
const fontWidth = 60;
const logoHeight = fontHeight * (5/3);
const logoWidth = fontWidth * (3);

let animationSpeedX = 4;
let animationSpeedY = 4;

let logoPositionX = 0;
let logoPositionY = 0;

function main() {
    let canvasDiv = document.getElementById("canvasDiv"); 
    let canvasDvdOld = document.getElementById("canvasDvd");
    if (canvasDvdOld) {
        canvasDiv.removeChild(canvasDvdOld);
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    }

    let canvasDvd = document.createElement("canvas"); //HTMLCanvasElement
    canvasDvd.setAttribute("style", `width: ${windowWidth}px; height: ${windowHeight}; position: absolute`);
    canvasDvd.setAttribute("width", windowWidth + "px");
    canvasDvd.setAttribute("height", windowHeight + "px");
    canvasDvd.setAttribute("id", "canvasDvd");

    canvasDiv.appendChild(canvasDvd);

    if (canvasDvd.getContext) {
        const dvdCtx = canvasDvd.getContext("2d"); //CanvasRenderingContext2D
        dvdCtx.fillStyle = bgColor;
        dvdCtx.fillRect(0, 0, windowWidth, windowHeight);
        
        let startAnimation = function() {
            setTimeout(function() {
                clearLogo(dvdCtx, logoPositionX, logoPositionY);
                logoPositionY+=animationSpeedY;
                logoPositionX+=animationSpeedX;
                drawDvdLogo(dvdCtx, logoPositionX, logoPositionY, fontWidth, fontHeight);
                if (logoPositionX + animationSpeedX + logoWidth > windowWidth || logoPositionX + animationSpeedX <= 0) {
                    animationSpeedX *= -1;
                    fontColor = colors[Math.floor(Math.random() * colors.length)];
                }
                if (logoPositionY + animationSpeedY + logoHeight > windowHeight || logoPositionY + animationSpeedY <= 0) {
                    animationSpeedY *= -1;
                    fontColor = colors[Math.floor(Math.random() * colors.length)];
                }
                startAnimation();
            }, 10);
        }
        startAnimation();
        
    }
}

function drawDvdLogo(renderingContext, x, y, fontWidth, fontHeight) {
    let fontSize = ((fontHeight + fontWidth) / 2) * 0.4;

    renderingContext.lineWidth = 0;
    renderingContext.fillStyle = fontColor;
    renderingContext.font = `${fontSize}px sans-serif`;
    renderingContext.fillStyle = fontColor;
    renderingContext.strokeStyle = fontColor;

    drawLetterD(renderingContext, x, y, fontHeight, fontWidth)
    drawLetterV(renderingContext, x + fontWidth - (0.15 * fontWidth), y, fontHeight, fontWidth)
    drawLetterD(renderingContext, x + 2 * fontWidth, y, fontHeight, fontWidth)
    drawElipse(renderingContext, x, y + fontHeight * 0.7, (3 * fontWidth) * 0.9, fontHeight);
    renderingContext.fillStyle = bgColor;
    renderingContext.fillText("VIDEO", x + (0.65 * fontWidth), y + fontHeight + (fontHeight * .4))
}

function drawLetterD(renderingContext, x, y, fontHeight = 100, fontWidth = 100) {
    let ticc = getThickness(fontWidth, fontHeight);
    x+=6,y+=9;
    renderingContext.beginPath();
    renderingContext.fillStyle = fontColor;
    renderingContext.strokeStyle = fontColor;
    renderingContext.moveTo(x,y);
    renderingContext.lineTo(x,y + fontHeight);
    renderingContext.bezierCurveTo(x + fontWidth, y + fontHeight + 20, x + fontWidth, y - 20, x, y);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();

    x = x + ticc;
    y = y + ticc;
    renderingContext.strokeStyle = bgColor;
    renderingContext.fillStyle = bgColor;
    renderingContext.beginPath();
    renderingContext.moveTo(x,y);
    renderingContext.lineTo(x,y + fontHeight - (2 * ticc));
    renderingContext.bezierCurveTo(x + fontWidth - (2.5 * ticc), y + fontHeight - (2 * ticc), x + fontWidth - (2.5 * ticc), y, x, y);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();

}

function drawLetterV(renderingContext, x, y, fontHeight = 100, fontWidth = 100) {
    let ticc = getThickness(fontWidth, fontHeight);
    x+=5,y+=6;

    renderingContext.beginPath();
    renderingContext.fillStyle = fontColor;
    renderingContext.strokeStyle = fontColor;
    renderingContext.moveTo(x,y);
    renderingContext.lineTo(x + (fontWidth / 2) - (ticc / 2), y + fontHeight);
    renderingContext.lineTo(x + (fontWidth / 2) + (ticc / 2), y + fontHeight);
    renderingContext.lineTo(x + fontWidth, y);
    renderingContext.lineTo(x + fontWidth - ticc, y);
    renderingContext.lineTo(x + fontWidth / 2, y + fontHeight - ticc);
    renderingContext.lineTo(x + ticc, y);
    renderingContext.closePath();
    renderingContext.fill();
    renderingContext.stroke();
}

function drawElipse(renderingContext, x, y, width, height) {
    x+=6;

    renderingContext.beginPath();
    renderingContext.fillStyle = fontColor;
    renderingContext.strokeStyle = fontColor;
    renderingContext.moveTo(x, y + (height / 2));
    renderingContext.bezierCurveTo(x, y, x + width, y, x + width, y + (height / 2));
    renderingContext.moveTo(x, y + (height / 2));
    renderingContext.bezierCurveTo(x, y + height, x + width, y + height, x + width, y + (height / 2));
    renderingContext.fill();
    renderingContext.stroke();
}

function getThickness(fontWidth, fontHeight) {
    return ((fontHeight / 5) + (fontWidth / 5)) / 2
}

function clearLogo(dvdCtx, x, y) {
    dvdCtx.fillStyle = bgColor;
    dvdCtx.fillRect(x,y, logoWidth, logoHeight);
}

function hideLogo(dvdCtx, x, y) {
    dvdCtx.fillStyle = fontColor;
    dvdCtx.fillRect(x,y, logoWidth, logoHeight);
}
