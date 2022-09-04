import { ChangeEvent, useRef } from "react";
import { LANGUAGES } from "../constants/languages";

interface Props {
  setLanguage: (languageKey: string) => void;
  selectedLanguage: string;
}

const Languages = ({ setLanguage, selectedLanguage }: Props): JSX.Element => {
  const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <label htmlFor="languages" className="text-xs text-gray-400 mb-1 block">
        Language
      </label>
      <select
        data-testid="languages"
        id="languages"
        className="text-md border-b focus:border-indigo-500 outline-0 border-gray-200 pb-2.5 w-full"
        onChange={handleLanguageSelect}
        value={selectedLanguage}
      >
        {LANGUAGES.map((language) => (
          <option key={language.key} value={language.key}>
            {language.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Languages;
