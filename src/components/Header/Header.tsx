import React, { ChangeEvent, useState } from "react";
import "./Header.scss";
import vn from "../../assets/images/vn.png";
import Logo from "../Logo/Logo";
import { ReactComponent as SortDownSvg } from "../../assets/svgs/sort-down.svg";

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("VN");

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <header>
      <Logo />

      <div className="dropdown-container">
        <button className="button-language">
          <img src={vn} alt="" />
          <span>{selectedLanguage}</span>
          <SortDownSvg />
          <select
            className="button-language__select"
            name="language"
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="VN">VN</option>
            <option value="EN">EN</option>
          </select>
        </button>
      </div>
    </header>
  );
};

export default Header;
