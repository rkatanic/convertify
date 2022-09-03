import { useEffect, useRef, useState } from "react";
import { Language } from "../types/Language";
import { LANGUAGES } from "../constants/languages";
import { ReactComponent as CaretDownIcon } from "../icons/caret-down.svg";

interface Props {
  setLanguage: (language: Language) => void;
  selectedLanguage: Language;
}

const Languages = ({ setLanguage, selectedLanguage }: Props): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<any>();

  const handleDropdownToggle = (): void => {
    setShowDropdown((prevState: boolean) => !prevState);
  };

  const handleLanguageSelect = (language: Language): void => {
    setLanguage(language);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="text-sm">
      <label htmlFor="languages" className="text-xs text-gray-400 mb-2 block">
        Language
      </label>
      <select
        id="languages"
        className="border border-gray-200 rounded py-2 px-4 w-full"
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
