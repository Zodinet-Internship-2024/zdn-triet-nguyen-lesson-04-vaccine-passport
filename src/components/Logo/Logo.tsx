import React from "react";
import "./Logo.scss";
import logoCnttBoYte from "../../assets/images/logo-cntt.png";
import logoVnkm from "../../assets/images/logo-vnkm.png";

interface LogoProps {
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ textColor }) => {
  const style = textColor ? { color: textColor } : {};

  return (
    <>
      <a
        style={style}
        href="https://example.com/"
        title="CỤC CNTT BỘ Y Tế"
        className="logo__clink"
      >
        <img src={logoCnttBoYte} alt="CỤC CNTT BỘ Y Tế" />
        CỤC CNTT <br /> BỘ Y TẾ
      </a>
      <a
        style={style}
        href="https://example.com/"
        title="VIỆT NAM KHỎE MẠNH"
        className="logo__clink"
      >
        <img src={logoVnkm} alt="VIỆT NAM KHỎE MẠNH" />
        VIỆT NAM <br /> KHỎE MẠNH
      </a>
    </>
  );
};

export default Logo;
