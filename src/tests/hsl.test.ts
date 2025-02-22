import { PRECEPTABLE_THROUGH_CLOSE_OBESERVATION } from '../constants/conditionals';
import { deltaECIE00Rgb, hslToRgb, sRgbToHsl } from '../public_api';

const Test = (
  rgb: { red: number; green: number; blue: number },
  colorName: string
) => {
  test(`Checking RGB <-> HSL conversions for ${colorName}`, () => {
    expect(deltaECIE00Rgb(hslToRgb(sRgbToHsl(rgb)), rgb)).toBeLessThanOrEqual(
      PRECEPTABLE_THROUGH_CLOSE_OBESERVATION
    );
  });
};

Test({ red: 238, green: 200, blue: 27 }, 'Yellow');
Test({ red: 217, green: 122, blue: 37 }, 'Orange');
Test({ red: 72, green: 91, blue: 165 }, 'Purplish Blue');
Test({ red: 194, green: 84, blue: 98 }, 'Moderate Red');
Test({ red: 91, green: 59, blue: 107 }, 'Purple');
Test({ red: 160, green: 188, blue: 60 }, 'Yellow Green');
Test({ red: 230, green: 163, blue: 42 }, 'Orange Yellow');
Test({ red: 46, green: 60, blue: 153 }, 'Blue');
Test({ red: 94, green: 123, blue: 156 }, 'Blue Sky');
Test({ red: 130, green: 129, blue: 177 }, 'Blue Flower');
Test({ red: 100, green: 190, blue: 171 }, 'Bluish Green');
Test({ red: 71, green: 150, blue: 69 }, 'Green');
Test({ red: 177, green: 44, blue: 56 }, 'Red');
Test({ red: 187, green: 82, blue: 148 }, 'Magenta');
Test({ red: -49, green: 135, blue: 166 }, 'Cyan');
Test({ red: 243, green: 242, blue: 237 }, 'White');
Test({ red: 50, green: 49, blue: 50 }, 'Printer Black');
