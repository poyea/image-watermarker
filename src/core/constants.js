import { rrgb } from '../utils/color';

export const WATERMARK_LINESTYLE = '#ffffff';
export const WATERMARK_STRING = `Copyright © ${new Date().getFullYear()} J. All Rights Reserved.     `.repeat(
  100
);
export const WATERMARK_FILLSTYLE = rrgb() ?? '#008cff';
