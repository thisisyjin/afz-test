import styled from "styled-components";

import phone from "../../assets/images/phone.png";
import afzimaFull from "../../assets/images/afzimaFull.svg";
import afzimaBg from "../../assets/images/afzima-trans.png";
import qrcode from "../../assets/images/qrcode.png";

const RecommendMobileBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 130px 60px;
  background-image: url(${afzimaBg});
  background-repeat: no-repeat;
  background-position: 100% 0;
  background-size: 600px;
  height: 100vh;

  .phone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 41vw;
    position: fixed;
    bottom: -2%;
    right: 10%;
    background-image: url(${phone});
    background-repeat: no-repeat;
    background-size: contain;

    .qr-code {
      width: 20vw;
      height: 20vw;
      margin-bottom: 25px;
      margin-top: 45px;
    }

    .qr-code-desc {
      width: 20vw;
      margin: 0 auto;
      padding: 18px;
      border-radius: 10px;
      background-color: #00a79e;
      color: #fff;
      text-align: center;
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -0.03em;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    .logo-img {
      width: 200px;
    }
    .logo-desc {
      font-size: 28px;
      font-weight: 400;
      letter-spacing: -0.05em;
      color: #6a6a6a;
      margin-left: 15px;
    }
  }

  .info {
    font-size: 64px;
    letter-spacing: -0.05em;
    font-weight: 500;
    color: #171717;
    line-height: 1.21875;
    margin-bottom: 52px;
  }

  .sub-info {
    padding: 20px 26px;
    background-color: #e6e6e6;
    border-radius: 10px;
    width: 450px;
    .title {
      color: #464646;
      font-weight: 500;
      font-size: 26px;
      letter-spacing: -0.05em;
      line-height: 1.555555;
    }

    .desc {
      color: #717171;
      font-size: 24px;
      font-weight: 400;
      letter-spacing: -0.05em;
    }
  }
`;

const RecommendMobile = () => {
  return (
    <RecommendMobileBlock>
      <div className="phone">
        <img src={qrcode} alt="qr-code scan" className="qr-code" />
        <div className="qr-code-desc">QR CODE</div>
      </div>
      <h2 className="logo">
        <img src={afzimaFull} alt="afzima logo" className="logo-img" />
        <span className="logo-desc">병의원 가격 등록</span>
      </h2>
      <h3 className="info">
        <span className="bold">모바일 환경</span>으로 <br />
        접속해주세요.
      </h3>
      <div className="sub-info">
        <h4 className="title">QR코드 사용 방법</h4>
        <div className="desc">
          일반 카메라앱 {">"} QR 코드 촬영 {">"} 링크 접속
        </div>
      </div>
    </RecommendMobileBlock>
  );
};

export default RecommendMobile;
