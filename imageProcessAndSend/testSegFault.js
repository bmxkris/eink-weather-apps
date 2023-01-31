const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');

async function procImg(isLvl, isRed) {
 
    const { createCanvas, loadImage, ImageData } = require('canvas')

    const img = await loadImage('dash.png');
    const source = createCanvas(img.width, img.height);
    const source_ctx = source.getContext("2d");
    source_ctx.drawImage(img, 0, 0, source.width, source.height);
    
    // let canvasUrl = source.toDataURL();
    // var base64Data = canvasUrl.replace(/^data:image\/[jpeg|png];base64,/, "");
    // require("fs").writeFile("output.jpeg", base64Data, 'base64', function(err) {
    //     if (err)
    //         console.log(err);
    // });
    
    // var palInd = epdArr[epdInd][2];
    
    // if (isRed && ((palInd & 1) == 0)) {
    //     alert('This white-black display');
    //     return;
    // }
    
    // if (!isRed)
    //     palInd = palInd & 0xFE;

    // const curPal = palArr[palInd];
    // getElm('dstBox').innerHTML = '<span class="title">Processed image</span><br><canvas id="canvas"></canvas>';
    // var canvas = getElm('canvas');
    
    // source = getElm('source');
    // source.getContext('2d').drawImage(srcImg, 0, 0, sW, sH);
    // dX = parseInt(getElm('nud_x').value);
    // dY = parseInt(getElm('nud_y').value);
    // dW = parseInt(getElm('nud_w').value);
    // dH = parseInt(getElm('nud_h').value);
    const sW = 800;
    const sH = 480;
    const dX = 0;
    const dY = 0;
    const dW = 800;
    const dH = 480;

    if ((dW < 3) || (dH < 3)) {
        alert('Image is too small');
        return;
    }

    const canvas = createCanvas()
    canvas.width = dW;
    canvas.height = dH;
    var index = 0;
    var pSrc = source.getContext('2d').getImageData(0, 0, sW, sH);
    // var pSrc = source.getContext('2d').getImageData(0, 0, source.width, source.height);
    // var pDst = canvas.getContext('2d').getImageData(0, 0, dW, dH);
    // console.log(pSrc)
    // console.log(pDst)

    console.log(pSrc)

    const uintc8 = new Uint8ClampedArray(800*480*4);
    const imageData = new ImageData(uintc8, 800, 480)
    console.log(imageData)

}

procImg(false,true);
