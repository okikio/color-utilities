import { ColorResolver } from "./resolvers/color-resolver";
import { RGBResolver } from "./resolvers/rgb-resolver";

// const color = new RGBResolver({ red: 102, green: 51, blue: 153 });
// console.log(color.data());

// const color2 = new ColorResolver('rgb',{ r: 102, g: 51, b: 153 });
// console.log(color2.data());

// const color3 = new ColorResolver('hex','#663399');
// console.log(color3.data());

// const color4 = new ColorResolver('hsl',{h: 270, s: 50, l: 40});
// console.log(color4.data());

// const color5 = new ColorResolver('hsv',{hue: 270, saturation: 67, value: 60});
// console.log(color5.data());

// const color6 = new ColorResolver('luv',{L: 32.9024676673756, u: 12.982891995207853, v: -67.75379621014277});
// console.log(color6.data());

// const color6 = new ColorResolver('lab',{luminance: 32.9024676673756, a: 42.883074460311335, b: -47.148633770801084});
// console.log(color6.data());

// const color7 = new ColorResolver('hwb',{h: 270, w: 20, b: 40});
// console.log(color7.data());

const color8 = new ColorResolver('don_rgb_4',{r: 91, g: 64, b: 165}); 
console.log(color8.data());


