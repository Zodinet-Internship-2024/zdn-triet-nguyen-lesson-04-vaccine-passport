import React from "react";
import logoFooter from "../../assets/images/logo-footer.png";
import "./Footer.scss";
import { ReactComponent as FacebookSvg } from "../../assets/svgs/square-facebook.svg";
import Logo from "../Logo/Logo";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="logo">
        <Logo textColor="white" />
      </div>
      <div className="footer__content">
        <p>&copy; Bản quyền thuộc</p>
        <h3>TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA</h3>
        <p><span>Phát triển bởi: </span>Galaxy Digital</p>
        <p className="follow-us">
          <span>Theo dõi chúng tôi:</span>{" "}
          <a href="https://www.facebook.com" target="_blank">
            <FacebookSvg />
          </a>
        </p>
        <hr />
        <div className="website">www.vietnamkhoemanh.vn</div>
        <div className="logo">
          <img
            src={logoFooter}
            alt="NCSC VN - Website đat chứng nhận TIN NHIỆM MẠNG - NÂNG CAO"
            width="200"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
