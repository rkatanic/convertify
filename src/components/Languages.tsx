import { useEffect, useRef, useState } from "react";
import { Language } from "../types/Language";
import { ReactComponent as ChevronDownIcon } from "../icons/chevron-down.svg";
import { LANGUAGES } from "../constants/languages";

import "./Languages.scss";

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
    <div className="languages">
      <span>Language:</span>
      <div className="languages-select" ref={ref}>
        <div className="selected-language" onClick={handleDropdownToggle}>
          {selectedLanguage.value}
          <div className="caret-down"></div>
        </div>
        {showDropdown && (
          <ul data-testid="languages-list">
            {LANGUAGES.map((language: Language, i) => (
              <>
                <li
                  className={`option ${
                    selectedLanguage.key === language.key ? "option-active" : ""
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                  key={i}
                  value={language.key}
                >
                  {language.value}
                </li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Languages;
