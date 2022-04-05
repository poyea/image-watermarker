import { toRGB } from '../utils/color';
import { WATERMARK_LINESTYLE } from './constants';

const addTextToImage = (imagePath, text, color, id) => {
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
    // context.rotate(Math.PI / 4);
    context.textAligh = 'center';
    context.fillText(text, 0, toModifyCanvas.height / 10);
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
