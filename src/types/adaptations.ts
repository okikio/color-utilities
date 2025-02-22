import {
  LAB,
  LAB_M,
  LCH,
  LCH_M,
  LMS,
  LUV,
  RGB,
  RGBA,
  RGBA_M,
  RGB_M,
  UVW,
  XYY,
  XYZ,
} from "interfaces/color-spaces.interface";

export type Adaptations =
  | "A_B"
  | "A_C"
  | "A_D50"
  | "A_D55"
  | "A_D65"
  | "A_D75"
  | "A_E"
  | "A_F2"
  | "A_F7"
  | "A_F11"
  | "B_A"
  | "B_C"
  | "B_D50"
  | "B_D55"
  | "B_D65"
  | "B_D75"
  | "B_E"
  | "B_F2"
  | "B_F7"
  | "B_F11"
  | "C_A"
  | "C_B"
  | "C_D50"
  | "C_D55"
  | "C_D65"
  | "C_D75"
  | "C_E"
  | "C_F2"
  | "C_F7"
  | "C_F11"
  | "D50_A"
  | "D50_B"
  | "D50_C"
  | "D50_D55"
  | "D50_D65"
  | "D50_D75"
  | "D50_E"
  | "D50_F2"
  | "D50_F7"
  | "D50_F11"
  | "D55_A"
  | "D55_B"
  | "D55_C"
  | "D55_D50"
  | "D55_D65"
  | "D55_D75"
  | "D55_E"
  | "D55_F2"
  | "D55_F7"
  | "D55_F11"
  | "D65_A"
  | "D65_B"
  | "D65_C"
  | "D65_D50"
  | "D65_D55"
  | "D65_D75"
  | "D65_E"
  | "D65_F2"
  | "D65_F7"
  | "D65_F11"
  | "D75_A"
  | "D75_B"
  | "D75_C"
  | "D75_D50"
  | "D75_D55"
  | "D75_D6"
  | "D75_E"
  | "D75_F"
  | "D75_F7"
  | "D75_F11"
  | "E_A"
  | "E_B"
  | "E_C"
  | "E_D50"
  | "E_D55"
  | "E_D65"
  | "E_D75"
  | "E_F2"
  | "E_F7"
  | "E_F11"
  | "F2_A"
  | "F2_B"
  | "F2_C"
  | "F2_D50"
  | "F2_D55"
  | "F2_D65"
  | "F2_D75"
  | "F2_E"
  | "F2_F7"
  | "F2_F11"
  | "F7_A"
  | "F7_B"
  | "F7_C"
  | "F7_D50"
  | "F7_D55"
  | "F7_D65"
  | "F7_D75"
  | "F7_E"
  | "F7_F2"
  | "F7_F11"
  | "F11_A"
  | "F11_B"
  | "F11_C"
  | "F11_D50"
  | "F11_D5"
  | "F11_D65"
  | "F11_D75"
  | "F11_E"
  | "F11_F2"
  | "F11_F7";

export type AdaptiveColors = 
 | RGB 
 | RGBA 
 | RGB_M 
 | RGBA_M 
 | LAB 
 | LAB_M 
 | LUV 
 | LCH 
 | LCH_M 
 | LMS 
 | UVW 
 | XYY 
 | XYZ;

export type AdaptiveColorSpaces =
  | "adobe_98_rgb"
  | "apple_rgb"
  | "best_rgb"
  | "beta_rgb"
  | "bruce_rgb"
  | "cie_rgb"
  | "color_match_rgb"
  | "don_rgb_4"
  | "eci_rgb_v2"
  | "etka_space_ps5"
  | "hunter_lab"
  | "lab"
  | "luv"
  | "lch_ab"
  | "lch_uv"
  | "lms"
  | "ntsc_rgb"
  | "pal_secam_rgb"
  | "pro_photo_rgb"
  | "rgb"
  | "uvw"
  | "smpte_c_rgb"
  | "wide_gamut_rgb"
  | "xyy"
  | "xyz";
