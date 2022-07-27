import { convertCyrilicToLatin } from "../../util/CyrilicToLatinConveterUtils";

describe("CyrilicToLatinUtils", (): void => {
  it("should convert cyrilic letters to latin letters", (): void => {
    const result = convertCyrilicToLatin(
      "а б в г д ђ е ж з и ј к л љ м н њ о п р с т ћ у ф х ц ч џ ш А Б В Г Д Ђ Е Ж З И Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш"
    );

    expect(result).toBe(
      "a b v g d đ e ž z i j k l lj m n nj o p r s t ć u f h c č dž š A B V G D Đ E Ž Z I J K L Lj M N Nj O P R S T Ć U F H C Č Dž Š"
    );
  });
});
