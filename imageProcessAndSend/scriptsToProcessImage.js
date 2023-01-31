const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');
// var srcBox, srcImg, dstImg;
// var epdArr, epdInd, palArr;
var curPal;
// var uploadImageData;
var ipAddr = '192.168.0.159';
// var ipAddr = '192.168.1.159';
// var ipAddr = 'localhost:9999';

// window.onload = function() {
    // srcBox = getElm('srcBox');
    // srcBox.ondragenter = ignoreDrag;
    // srcBox.ondragover = ignoreDrag;
    // srcBox.ondrop = drop;
    // srcImg = 0;
    // epdInd = 23;
    // palArr = [[[0, 0, 0], [255, 255, 255]], [[0, 0, 0], [255, 255, 255], [127, 0, 0]], [[0, 0, 0], [255, 255, 255], [127, 127, 127]], [[0, 0, 0], [255, 255, 255], [127, 127, 127], [127, 0, 0]], [[0, 0, 0], [255, 255, 255]], [[0, 0, 0], [255, 255, 255], [220, 180, 0]], [[0, 0, 0]], [[0, 0, 0], [255, 255, 255], [0, 255, 0], [0, 0, 255], [255, 0, 0], [255, 255, 0], [255, 128, 0]]];
    // epdArr = [[200, 200, 0], [200, 200, 3], [152, 152, 5], [122, 250, 0], [104, 212, 1], [104, 212, 5], [104, 212, 0], [176, 264, 0], [176, 264, 1], [128, 296, 0], [128, 296, 1], [128, 296, 5], [128, 296, 0], [400, 300, 0], [400, 300, 1], [400, 300, 5], [600, 448, 0], [600, 448, 1], [600, 448, 5], [640, 384, 0], [640, 384, 1], [640, 384, 5], [800, 480, 0], [800, 480, 1], [880, 528, 1], [600, 448, 7], [880, 528, 0], [280, 480, 0], [152, 296, 0], [648, 480, 1], [128, 296, 1], [200, 200, 1], [104, 214, 1], [128, 296, 0], [400, 300, 1], [152, 296, 1], [648, 480, 0], [640, 400, 7], [176, 264, 1], [122, 250, 0], [122, 250, 1]];
    // setInn('BT', Btn(0, 'Select image file', 'processFiles(this.files);') + Btn(1, 'Level: mono', 'procImg(true,false);') + Btn(2, 'Level: color', 'procImg(true,true);') + Btn(3, 'Dithering: mono', 'procImg(false,false);') + Btn(4, 'Dithering: color', 'procImg(false,true);') + Btn(5, 'Upload image', 'uploadImage();'));
    // setInn('XY', getNud('x', '0') + getNud('y', '0'));
    // setInn('WH', getNud('w', '200') + getNud('h', '200'));
    // setInn('RB', RB(0, '1.54&ensp;') + RB(1, '1.54b') + RB(2, '1.54c') + RB(3, '2.13&ensp;') + RB(4, '2.13b') + RB(5, '2.13c<br>') + RB(6, '2.13d<br>') + RB(7, '2.7&ensp;&ensp;') + RB(8, '2.7b&ensp;<br>') + RB(9, '2.9&ensp;&ensp;') + RB(10, '2.9b&ensp;') + RB(11, '2.9c&ensp;<br>') + RB(12, '2.9d<br>') + RB(13, '4.2&ensp;&ensp;') + RB(14, '4.2b&ensp;') + RB(15, '4.2c&ensp;<br>') + RB(16, '5.83&ensp;') + RB(17, '5.83b') + RB(18, '5.83c<br>') + RB(19, '7.5&ensp;&ensp;') + RB(20, '7.5b&ensp;') + RB(21, '7.5c&ensp;<br>') + RB(22, '7.5 V2') + RB(23, '7.5b V2<br>') + RB(24, '7.5b HD') + RB(25, '5.65f<br>') + RB(26, '7.5 HD') + RB(27, '3.7<br>') + RB(28, '2.66') + RB(29, '5.83b V2<br>') + RB(30, '2.9b V3') + RB(31, '1.54b V2<br>') + RB(32, '2.13b V3') + RB(33, '2.9 V2<br>') + RB(34, '4.2b V2') + RB(35, '2.66b<br>') + RB(36, '5.83 V2') + RB(37, '4.01 f<br>') + RB(38, '2.7b V2') + RB(39, '2.13 V3<br>') + RB(40, '2.13 B V4'));
// }

// var source;
// var dX, dY, dW, dH, sW, sH;
function getVal(p, i) {
    if ((p.data[i] == 0x00) && (p.data[i + 1] == 0x00))
        return 0;
    if ((p.data[i] == 0xFF) && (p.data[i + 1] == 0xFF))
        return 1;
    if ((p.data[i] == 0x7F) && (p.data[i + 1] == 0x7F))
        return 2;
    return 3;
}
function getVal_7color(p, i) {
    if ((p.data[i] == 0x00) && (p.data[i + 1] == 0x00) && (p.data[i + 2] == 0x00))
        return 0;
    if ((p.data[i] == 0xFF) && (p.data[i + 1] == 0xFF) && (p.data[i + 2] == 0xFF))
        return 1;
    if ((p.data[i] == 0x00) && (p.data[i + 1] == 0xFF) && (p.data[i + 2] == 0x00))
        return 2;
    if ((p.data[i] == 0x00) && (p.data[i + 1] == 0x00) && (p.data[i + 2] == 0xFF))
        return 3;
    if ((p.data[i] == 0xFF) && (p.data[i + 1] == 0x00) && (p.data[i + 2] == 0x00))
        return 4;
    if ((p.data[i] == 0xFF) && (p.data[i + 1] == 0xFF) && (p.data[i + 2] == 0x00))
        return 5;
    if ((p.data[i] == 0xFF) && (p.data[i + 1] == 0x80) && (p.data[i + 2] == 0x00))
        return 6;
    return 7;
}
function setVal(p, i, c) {
    p.data[i] = curPal[c][0];
    p.data[i + 1] = curPal[c][1];
    p.data[i + 2] = curPal[c][2];
    p.data[i + 3] = 255;
}
function addVal(c, r, g, b, k) {
    return [c[0] + (r * k) / 32, c[1] + (g * k) / 32, c[2] + (b * k) / 32];
}
function getErr(r, g, b, stdCol) {
    r -= stdCol[0];
    g -= stdCol[1];
    b -= stdCol[2];
    return r * r + g * g + b * b;
}
function getNear(r, g, b) {
    var ind = 0;
    var err = getErr(r, g, b, curPal[0]);
    for (var i = 1; i < curPal.length; i++) {
        var cur = getErr(r, g, b, curPal[i]);
        if (cur < err) {
            err = cur;
            ind = i;
        }
    }
    return ind;
}

async function procImg(isLvl, isRed) {
    // if (document.getElementsByClassName('sourceImage').length == 0) {
    //     alert('First select image');
    //     return;
    // }
    const epdInd = 23;
    const palArr = [[[0, 0, 0], [255, 255, 255]], [[0, 0, 0], [255, 255, 255], [127, 0, 0]], [[0, 0, 0], [255, 255, 255], [127, 127, 127]], [[0, 0, 0], [255, 255, 255], [127, 127, 127], [127, 0, 0]], [[0, 0, 0], [255, 255, 255]], [[0, 0, 0], [255, 255, 255], [220, 180, 0]], [[0, 0, 0]], [[0, 0, 0], [255, 255, 255], [0, 255, 0], [0, 0, 255], [255, 0, 0], [255, 255, 0], [255, 128, 0]]];
    const epdArr = [[200, 200, 0], [200, 200, 3], [152, 152, 5], [122, 250, 0], [104, 212, 1], [104, 212, 5], [104, 212, 0], [176, 264, 0], [176, 264, 1], [128, 296, 0], [128, 296, 1], [128, 296, 5], [128, 296, 0], [400, 300, 0], [400, 300, 1], [400, 300, 5], [600, 448, 0], [600, 448, 1], [600, 448, 5], [640, 384, 0], [640, 384, 1], [640, 384, 5], [800, 480, 0], [800, 480, 1], [880, 528, 1], [600, 448, 7], [880, 528, 0], [280, 480, 0], [152, 296, 0], [648, 480, 1], [128, 296, 1], [200, 200, 1], [104, 214, 1], [128, 296, 0], [400, 300, 1], [152, 296, 1], [648, 480, 0], [640, 400, 7], [176, 264, 1], [122, 250, 0], [122, 250, 1]];
    const { createCanvas, loadImage, ImageData } = require('canvas')

    // const img = await loadImage('testImage.jpeg');
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

    var palInd = epdArr[epdInd][2];
    if (isRed && ((palInd & 1) == 0)) {
        alert('This white-black display');
        return;
    }
    
    if (!isRed)
        palInd = palInd & 0xFE;

    curPal = palArr[palInd];
    // getElm('dstBox').innerHTML = '<span class="title">Processed image</span><br><canvas id="canvas"></canvas>';
    // var canvas = getElm('canvas');
    
    // source = getElm('source');
    // source.getContext('2d').drawImage(srcImg, 0, 0, sW, sH);
    // dX = parseInt(getElm('nud_x').value);
    // dY = parseInt(getElm('nud_y').value);
    // dW = parseInt(getElm('nud_w').value);
    // dH = parseInt(getElm('nud_h').value);
    const sW = source.width;
    const sH = source.height;
    const dX = 0;
    const dY = 0;
    const dW = 800;
    const dH = 480;

    if ((dW < 3) || (dH < 3)) {
        alert('Image is too small');
        return;
    }

    // const canvas = createCanvas()
    // canvas.width = dW;
    // canvas.height = dH;
    var index = 0;
    var pSrc = source.getContext('2d').getImageData(0, 0, sW, sH);
    const uintc8 = new Uint8ClampedArray(dW*dH*4);
    var pDst = new ImageData(uintc8, dW, dH)
    // var pDst = canvas.getContext('2d').getImageData(0, 0, dW, dH);
    // console.log(pSrc)
    // console.log(pDst)

    if (isLvl) {
        for (var j = 0; j < dH; j++) {
            var y = dY + j;
            if ((y < 0) || (y >= sH)) {
                for (var i = 0; i < dW; i++,
                index += 4)
                    setVal(pDst, index, (i + j) % 2 == 0 ? 1 : 0);
                continue;
            }
            for (var i = 0; i < dW; i++) {
                var x = dX + i;
                if ((x < 0) || (x >= sW)) {
                    setVal(pDst, index, (i + j) % 2 == 0 ? 1 : 0);
                    index += 4;
                    continue;
                }
                var pos = (y * sW + x) * 4;
                setVal(pDst, index, getNear(pSrc.data[pos], pSrc.data[pos + 1], pSrc.data[pos + 2]));
                index += 4;
            }
        }
    } else {
        var aInd = 0;
        var bInd = 1;
        var errArr = new Array(2);
        errArr[0] = new Array(dW);
        errArr[1] = new Array(dW);
        for (var i = 0; i < dW; i++)
            errArr[bInd][i] = [0, 0, 0];
        for (var j = 0; j < dH; j++) {
            var y = dY + j;
            if ((y < 0) || (y >= sH)) {
                for (var i = 0; i < dW; i++,
                index += 4)
                    setVal(pDst, index, (i + j) % 2 == 0 ? 1 : 0);
                continue;
            }
            aInd = ((bInd = aInd) + 1) & 1;
            for (var i = 0; i < dW; i++)
                errArr[bInd][i] = [0, 0, 0];
            for (var i = 0; i < dW; i++) {
                var x = dX + i;
                if ((x < 0) || (x >= sW)) {
                    setVal(pDst, index, (i + j) % 2 == 0 ? 1 : 0);
                    index += 4;
                    continue;
                }
                var pos = (y * sW + x) * 4;
                var old = errArr[aInd][i];
                var r = pSrc.data[pos] + old[0];
                var g = pSrc.data[pos + 1] + old[1];
                var b = pSrc.data[pos + 2] + old[2];
                var colVal = curPal[getNear(r, g, b)];
                pDst.data[index++] = colVal[0];
                pDst.data[index++] = colVal[1];
                pDst.data[index++] = colVal[2];
                pDst.data[index++] = 255;
                r = (r - colVal[0]);
                g = (g - colVal[1]);
                b = (b - colVal[2]);
                if (i == 0) {
                    errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 7.0);
                    errArr[bInd][i + 1] = addVal(errArr[bInd][i + 1], r, g, b, 2.0);
                    errArr[aInd][i + 1] = addVal(errArr[aInd][i + 1], r, g, b, 7.0);
                } else if (i == dW - 1) {
                    errArr[bInd][i - 1] = addVal(errArr[bInd][i - 1], r, g, b, 7.0);
                    errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 9.0);
                } else {
                    errArr[bInd][i - 1] = addVal(errArr[bInd][i - 1], r, g, b, 3.0);
                    errArr[bInd][i] = addVal(errArr[bInd][i], r, g, b, 5.0);
                    errArr[bInd][i + 1] = addVal(errArr[bInd][i + 1], r, g, b, 1.0);
                    errArr[aInd][i + 1] = addVal(errArr[aInd][i + 1], r, g, b, 7.0);
                }
            }
        }
    }
    // console.log(pDst)
    // await canvas.getContext('2d').putImageData(pDst, 0, 0);
    // let outputCanvasUrl = canvas.toDataURL("image/png");
    // var base64Data = outputCanvasUrl.replace(/^data:image\/png;base64,/, "");
    // require("fs").writeFile("output.png", base64Data, 'base64', function(err) {
    //     if (err)
    //         console.log(err);
    // });

    // uploadImageData = pDst
    // uploadImageData = pSrc
    uploadImage(pDst, epdInd, dW, dH)

    
}
var pxInd, stInd;
// var dispW, dispH;
var xhReq, dispX;
// var rqPrf, rqMsg;
function byteToStr(v) {
    return String.fromCharCode((v & 0xF) + 97, ((v >> 4) & 0xF) + 97);
}
function wordToStr(v) {
    return byteToStr(v & 0xFF) + byteToStr((v >> 8) & 0xFF);
}
function u_send(cmd, next) {
    const rqPrf = 'http://' + ipAddr + '/';
    xhReq.open('POST', rqPrf + cmd, true);
    xhReq.send('');
    if (next)
        stInd++;
    return 0;
}
function u_next() {
    lnInd = 0;
    pxInd = 0;
    u_send('NEXT_', true);
}
function u_done() {
    // setInn('logTag', 'Complete!');
    return u_send('SHOW_', true);
}
function u_show(a, k1, k2, rqMsg) {
    var x = '' + (k1 + k2 * pxInd / a.length);
    if (x.length > 5)
        x = x.substring(0, 5);
    // setInn('logTag', 'Progress: ' + x + '%');
    return u_send(rqMsg + wordToStr(rqMsg.length) + 'LOAD_', pxInd >= a.length);
}
function u_data(a, c, k1, k2) {
    let rqMsg = '';
    if (c == -1) {
        while ((pxInd < a.length) && (rqMsg.length < 1000)) {
            var v = 0;
            for (var i = 0; i < 16; i += 2)
                if (pxInd < a.length)
                    v |= (a[pxInd++] << i);
            rqMsg += wordToStr(v);
        }
    } else if (c == -2) {
        while ((pxInd < a.length) && (rqMsg.length < 1000)) {
            var v = 0;
            for (var i = 0; i < 16; i += 4)
                if (pxInd < a.length)
                    v |= (a[pxInd++] << i);
            rqMsg += wordToStr(v);
        }
    } else {
        while ((pxInd < a.length) && (rqMsg.length < 1000)) {
            var v = 0;
            for (var i = 0; i < 8; i++)
                if ((pxInd < a.length) && (a[pxInd++] != c))
                    v |= (128 >> i);
            rqMsg += byteToStr(v);
        }
    }
    return u_show(a, k1, k2, rqMsg);
}
function u_line(a, c, k1, k2) {
    var x;
    let rqMsg = '';
    while (rqMsg.length < 1000) {
        x = 0;
        while (x < 122) {
            var v = 0;
            for (var i = 0; (i < 8) && (x < 122); i++,
            x++)
                if (a[pxInd++] != c)
                    v |= (128 >> i);
            rqMsg += byteToStr(v);
        }
    }
    return u_show(a, k1, k2, rqMsg);
}


function uploadImage(uploadImageData, epdInd, dW, dH) {
    // var c = getElm('canvas');
    // console.log(uploadImageData);
    // const { createCanvas, loadImage } = require('canvas')
    
    // const c = createCanvas()
    // c.width = dW;
    // c.height = dH;
    // c.getContext('2d').putImageData(uploadImageData, 0, 0);

    // var w = dispW = c.width;
    // var h = dispH = c.height;
    // var p = c.getContext('2d').getImageData(0, 0, w, h);
    // var w = dW;
    // var h = dH;
    var p = uploadImageData;
    var a = new Array(dW * dH);
    var i = 0;
    for (var y = 0; y < dH; y++)
        for (var x = 0; x < dW; x++,
        i++) {
            if (epdInd == 25 || epdInd == 37)
                a[i] = getVal_7color(p, i << 2);
            else
                a[i] = getVal(p, i << 2);
        }
    // dispX = 0;
    pxInd = 0;
    stInd = 0;
    // xhReq = new XMLHttpRequest();
    var XMLHttpRequest = require('xhr2');
    xhReq = new XMLHttpRequest();

    // rqPrf = 'http://' + ipAddr + '/';
    if ((epdInd == 3) || (epdInd == 39)) {
        xhReq.onload = xhReq.onerror = function() {
            if (stInd == 0)
                return u_line(a, 0, 0, 100);
            if (stInd == 1)
                return u_done();
        }
        ;
        if (epdInd > 25)
            return u_send('EPD' + String.fromCharCode(epdInd + -26 + 65) + '_', false);
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    }
    if ((epdInd == 40)) {
        xhReq.onload = xhReq.onerror = function() {
            if (stInd == 0)
                return u_line(a, 0, 0, 50);
            if (stInd == 1)
                return u_next();
            if (stInd == 2)
                return u_line(a, 3, 50, 50);
            if (stInd == 3)
                return u_done();
        }
        ;
        if (epdInd > 25)
            return u_send('EPD' + String.fromCharCode(epdInd + -26 + 65) + '_', false);
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    }
    if ((epdInd == 0) || (epdInd == 3) || (epdInd == 6) || (epdInd == 7) || (epdInd == 9) || (epdInd == 12) || (epdInd == 16) || (epdInd == 19) || (epdInd == 22) || (epdInd == 26) || (epdInd == 27) || (epdInd == 28)) {
        xhReq.onload = xhReq.onerror = function() {
            if (stInd == 0)
                return u_data(a, 0, 0, 100);
            if (stInd == 1)
                return u_done();
        }
        ;
        if (epdInd > 25)
            return u_send('EPD' + String.fromCharCode(epdInd + -26 + 65) + '_', false);
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    }
    if (epdInd > 15 && epdInd < 22) {
        xhReq.onload = xhReq.onerror = function() {
            if (stInd == 0)
                return u_data(a, -1, 0, 100);
            if (stInd == 1)
                return u_done();
        }
        ;
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    }
    if (epdInd == 25 || epdInd == 37) {
        xhReq.onload = xhReq.onerror = function() {
            if (stInd == 0)
                return u_data(a, -2, 0, 100);
            if (stInd == 1)
                return u_done();
        }
        ;
        if (epdInd > 25)
            return u_send('EPD' + String.fromCharCode(epdInd + -26 + 65) + '_', false);
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    } else {
        xhReq.onload = xhReq.onerror = function() {
            console.log('*************');
            console.log(stInd);
            console.log('*************');
            if (stInd == 0 && epdInd == 23)
                return u_data(a, 0, 0, 100);
            if (stInd == 0)
                return u_data(a, ((epdInd == 1) || (epdInd == 12)) ? -1 : 0, 0, 50);
            if (stInd == 1)
                return u_next();
            if (stInd == 2)
                return u_data(a, 3, 50, 50);
            if (stInd == 3)
                return u_done();
        }
        ;
        if (epdInd > 25)
            return u_send('EPD' + String.fromCharCode(epdInd + -26 + 65) + '_', false);
        return u_send('EPD' + String.fromCharCode(epdInd + 97) + '_', false);
    }
}

procImg(false,false);

// console.log("THE END")
