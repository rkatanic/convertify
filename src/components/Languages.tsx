import { ChangeEvent } from "react";
import { LANGUAGES } from "../constants/LANGUAGES";
import { Language } from "../types/Language";

interface Props {
  setLanguage: (languageKey: string) => void;
  selectedLanguage: string;
}

const Languages = ({ setLanguage, selectedLanguage }: Props): JSX.Element => {
  const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex justify-between flex-wrap gap-4 items-baseline">
      <label
        htmlFor="languages"
        className="text-white flex-[1.25] whitespace-nowrap"
      >
        Character specific language
      </label>
      <select
        data-testid="languages"
        id="languages"
        className="focus:ring-blue-500 border-0 text-md rounded focus:border-blue-500 outline-0 p-2 px-3 text-white bg-neutral-800 flex-1"
        onChange={handleLanguageSelect}
        value={selectedLanguage}
      >
        {LANGUAGES.map((language: Language) => (
          <option key={language.key} value={language.key}>
            {language.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Languages;
