const toRGB = (hex) => {
  const p16 = parseInt(hex.substring(1), 16);
  const r = (p16 >> 16) & 255;
  const g = (p16 >> 8) & 255;
  const b = p16 & 255;
  return `rgb(${r},${g},${b},0.5)`;
};

const rrgb = () => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { toRGB, rrgb };
