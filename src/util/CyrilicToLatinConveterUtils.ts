const CYRILIC_LETTERS =
  "а б в г д ђ е ж з и ј к л љ м н њ о п р с т ћ у ф х ц ч џ ш А Б В Г Д Ђ Е Ж З И Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш".split(
    " "
  );
const LATIN_LETTERS =
  "a b v g d đ e ž z i j k l lj m n nj o p r s t ć u f h c č dž š A B V G D Đ E Ž Z I J K L Lj M N Nj O P R S T Ć U F H C Č Dž Š".split(
    " "
  );

export const convertCyrilicToLatin = (string: string): string => {
  return string
    .split("")
    .map((char: string): string => {
      const characterIndex = CYRILIC_LETTERS.indexOf(char);
      if (!~characterIndex) {
        return char;
      }

      return LATIN_LETTERS[characterIndex];
    })
    .join("");
};
