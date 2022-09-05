import { ChangeEvent } from "react";
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
      <label htmlFor="languages" className="text-xs text-gray-500 mb-1 block">
        Language
      </label>
      <select
        data-testid="languages"
        id="languages"
        className="text-md font-thin border-b-2 focus:border-indigo-500 outline-0 pb-2.5 w-full"
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
