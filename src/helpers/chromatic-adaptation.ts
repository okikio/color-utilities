/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://opensource.org/license/isc-license-txt/
 */

import { ADAPTIVE_MATRICES } from "../constants/adaptive_matrices";
import { BRADFORD_CONE_RESPONCE_DOMAINS } from "../constants/transform-matrixes";
import { XYZ } from "../interfaces/color-spaces.interface";
import { Matrix3x3 } from "../types/math-types";
import {
  matrix3x3Multi,
  matrixVectorMulti,
  matrixVectorMultiAsXyz,
} from "./matrix";

/**
 * Transform from XYZ into a cone response domain (ρ, γ, β),
 * then scales the vector components by factors dependent upon
 * both the source and destination reference whites
 * @param {number[]} sourceWhite source reference white
 * @param {number[]} destinationWhite destination reference white
 * @returns {Matrix3x3} - a 3 x 3 Matrix used to prefrom
 *                        linear transformation on a color
 */
const linearTransformationM = (
  sourceWhite: number[],
  destinationWhite: number[]
): Matrix3x3 => {
  const Ma = BRADFORD_CONE_RESPONCE_DOMAINS.MA;
  const Ma_1 = BRADFORD_CONE_RESPONCE_DOMAINS.MA_1;
  const PYβs = matrixVectorMulti(Ma, sourceWhite);
  const PYβd = matrixVectorMulti(Ma, destinationWhite);
  const diff: Matrix3x3 = [
    [PYβs[0] / PYβd[0], 0, 0],
    [0, PYβs[1] / PYβd[1], 0],
    [0, 0, PYβs[2] / PYβd[2]],
  ];

  return matrix3x3Multi(matrix3x3Multi(Ma_1, diff), Ma);
};

/**
 * Preforms a chromatic adaptation algorithm on given XYZ values
 * @param {XYZ} xyz color values
 * @param {{ X: number; Y: number; Z: number }} sRefWhite source reference white
 * @param {{ X: number; Y: number; Z: number }} dRefWhite destination reference white
 * @returns {XYZ} - adapted xyz values
 */
export const chromaticAdaptation = (
  xyz: XYZ,
  sRefWhite: { X: number; Y: number; Z: number },
  dRefWhite: { X: number; Y: number; Z: number }
): XYZ => {
  const M = linearTransformationM(
    [sRefWhite.X, sRefWhite.Y, sRefWhite.Z],
    [dRefWhite.X, dRefWhite.Y, dRefWhite.Z]
  );
  //linear transformation
  return matrixVectorMultiAsXyz(M, xyz);
};

/**
 * Preforms a chromatic adaptation algorithm on given XYZ values with a
 * given 3 x 3 matrix
 * @param {XYZ} xyz color values
 * @param {Matrix3x3} matrix adaptation matrix
 * @returns {XYZ} - adapted xyz values
 */
export const chromaticAdaptationPreCal = (xyz: XYZ, matrix: Matrix3x3) => {
  return matrixVectorMultiAsXyz(matrix, xyz);
};

/**
 * Chromatic adaptation from reference white A to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white A to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const AtoF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.A_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white B to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const BtoF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.B_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white C to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const CtoF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.C_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D50 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D50toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D50_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D55 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D55toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D55_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D65 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D65toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D65_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white D75 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const D75toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.D75_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white E to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const EtoF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.E_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_F7 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F2 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F2toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F2_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7ToD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F7 to reference white F11
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F7toF11Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F7_F11 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white A
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toAAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_A as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white B
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toBAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_B as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white C
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toCAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_C as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white D50
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toD50Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_D50 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white D55
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toD55Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_D55 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white D65
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11ToD65Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_D65 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white D75
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toD75Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_D75 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white E
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toEAdaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_E as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white F2
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toF2Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_F2 as Matrix3x3);
};

/**
 * Chromatic adaptation from reference white F11 to reference white F7
 * @param {XYZ} xyz color values
 * @returns {XYZ} - adapted xyz values
 */
export const F11toF7Adaptation = (xyz: XYZ) => {
  return chromaticAdaptationPreCal(xyz, ADAPTIVE_MATRICES.F11_F7 as Matrix3x3);
};
