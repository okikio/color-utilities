/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import {
  colorConverters,
  toRgbConverters,
  toXyzConverters,
} from "../color-converter/convertor-map";
import { RGB, XYZ } from "../interfaces/color-spaces.interface";

import { AllResolv, DefaultResolv } from "../constants/init-spaces";
import { sRgbToXyz } from "../conversions/rgb-conversions";
import { xyzToSrgb } from "../conversions/xyz-conversions";
import { checkAndFormat } from "../helpers/color-checks";
import { ColorData } from "../interfaces/color-data.interface";
import {
  ColorConverters,
  ToRGBConverters,
  ToXyzConverters,
} from "../interfaces/converters.interface";
import { ColorSpaceUnion, Spaces } from "../types/colors";

/**
 *  @description A class representing a color, and its values in diferente spaces
 *  @param {Spaces}                     -space / type of color from which conversions are made
 *  @param {ColorSpaceUnion}            - The actual color data (RGB, HSL etc..)
 *  @param {(Spaces | "web_safe")[]}    - What information do we want back
 */
export class Color {
  rgb!: RGB;
  xyz!: XYZ;

  constructor(
    space: Spaces,
    color: ColorSpaceUnion,
    resolv: (Spaces | "web_safe")[] | "all" = DefaultResolv
  ) {
    resolv = resolv === "all" ? AllResolv : resolv;
    color = checkAndFormat(space, color);
    this[space as keyof this] = color as any;
    if (!this.rgb && /hex|cmy|sl|hc|hs|hwb|ryb|xyz|yc|yd|yiq|yp/g.test(space)) {
      this.rgb = toRgbConverters[space as keyof ToRGBConverters](color);
      if (this.xyz) this.xyz = sRgbToXyz(this.rgb);
    }

    if (!this.xyz && /rgb|ab|uv|lch|lms|ps5|xyy/g.test(space)) {
      this.xyz = toXyzConverters[space as keyof ToXyzConverters](color);
      if (!this.rgb) this.rgb = xyzToSrgb(this.xyz);
    } else this.xyz = toXyzConverters.rgb(this.rgb);

    for (let resolution of resolv) {
      if (!this[resolution as keyof this]) {
        const fun = colorConverters[resolution as keyof ColorConverters]
          ?.fun as Function;
        const param = colorConverters[resolution as keyof ColorConverters]
          ?.from as string;
        this[resolution as keyof this] = fun(this[param as keyof this]);
      }
    }
  }

  get data(): ColorData {
    return this as ColorData;
  }
}
