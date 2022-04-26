import { toRGB } from '../utils/color';
import { WATERMARK_LINESTYLE } from './constants';

const addTextToImage = (imagePath, text, color, id, rotateCnt = 0) => {
  let toModifyCanvas = document.getElementById(id);
  let context = toModifyCanvas.getContext('2d');
  let img = new Image();
  img.src = imagePath;
  img.onload = () => {
    toModifyCanvas.width = img.width;
    toModifyCanvas.height = img.height;
    context.drawImage(img, 0, 0);
    context.lineWidth = 1;
    context.fillStyle = toRGB(color);
    context.lineStyle = WATERMARK_LINESTYLE;
    context.font = `${toModifyCanvas.height / 10}px serif`;
    for (let i = 0; i < rotateCnt; ++i) {
      context.rotate(Math.PI / 12);
    }
    let row = toModifyCanvas.height / 10;
    for (let i = 0; i < 11; ++i) {
      context.fillText(text, 0, row * i);
    }
    /*
     * Drawings
     */
    context.save();

    // for (let mul = -1; mul <= 1; mul += 2) {
    //   for (
    //     let xTran = 0, yTran = 0, count = toModifyCanvas.width / 200;
    //     count >= 2;
    //     count -= 1
    //   ) {

    //     yTran -= (toModifyCanvas.height / count) * mul;
    //   }
    // }
  };
};

export { addTextToImage };
