import styled from "styled-components";
import KakaoBanner from "../components/banner/KakaoBanner";
import ShareBanner from "../components/banner/ShareBanner";
import StepHeader from "../components/common/StepHeader";

import { ReactComponent as Check } from "../assets/icons/check.svg";
import { Link } from "react-router-dom";
import ediya from "../assets/images/ediyaSmall.png";

import ios from "../assets/images/ios.png";
import aos from "../assets/images/aos.png";

const DataUploadedBlock = styled.div`
  margin-top: 75px;
`;

const UploadInfoBlock = styled.div`
  padding: 48px 54px;
  text-align: center;
  border-bottom: 1px solid #efefef;

  .check-icon {
    display: block;
    width: 55px;
    height: 55px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2f69ff;
    border-radius: 50%;
    margin-bottom: 15px;

    svg {
      width: 25px;
      height: 20px;
      path {
        fill: #fff;
      }
    }
  }

  .desc-title {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;
    color: #2e2e2e;
  }

  .desc-text {
    margin-bottom: 24px;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: #171717;
  }

  .btn-wrap {
    padding: 0 26px;
  }
  .home-btn {
    display: block;
    font-size: 16px;
    background-color: #fff;
    color: #171717;
    font-weight: 500;
    border: 2px solid #2f69ff;
    padding: 12px 10px;
    border-radius: 50px;
  }
`;

const AddBannerBlock = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;

  .add-desc {
    width: 100%;
    text-align: center;
    font-weight: 400;
    letter-spacing: -0.05em;
    margin-bottom: 16px;
  }

  .app-banners {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;

    a {
      display: block;
      flex: 1;
      height: 50px;
      border-radius: 8px;
    }

    .aos {
      background-image: url(${aos});
      background-position: 0;
      background-size: cover;
    }

    .ios {
      background-image: url(${ios});
      background-position: 0;
      background-size: cover;
    }
  }

  .add-banner {
    background-color: #98c1ff;
    color: #171717;
    padding: 20px 16px;
    border-radius: 5px;
    background-image: url(${ediya});
    background-repeat: no-repeat;
    background-position: 92%;
    margin-bottom: 40px;
  }
`;

const DataUploaded = () => {
  return (
    <DataUploadedBlock>
      <StepHeader title="등록 완료" step={4} prevPath="/info" />
      <UploadInfoBlock>
        <div className="check-icon">
          <Check />
        </div>
        <div className="desc-title">입력 완료되었습니다.</div>
        <div className="desc-text">
          병원명과 가격표 사진 확인 후<br />
          이디야 아메리카노 쿠폰이
          <br />
          <span className="semi-bold">5영업일</span> 이내 지급될 예정입니다.
        </div>

        <div className="btn-wrap">
          <Link to="/" className="home-btn">
            홈으로
          </Link>
        </div>
      </UploadInfoBlock>

      <AddBannerBlock>
        <div className="add-desc">
          비급여 병원비 가격 조회 서비스{" "}
          <span className="bold">아프지마 앱</span> 다운로드
        </div>
        <div className="app-banners">
          <a
            href="#"
            className="aos"
            target="_blank"
            rel="noopener noreferer"
          ></a>
          <a
            href="#"
            className="ios"
            target="_blank"
            rel="noopener noreferer"
          ></a>
        </div>
        <div className="add-banner">
          등록해주신 모든 분들에게 <br />
          <span className="bold">이디야 아메리카노 쿠폰</span>을 드립니다.
        </div>
      </AddBannerBlock>

      <KakaoBanner end="1" />
      <ShareBanner end="1" />
    </DataUploadedBlock>
  );
};

export default DataUploaded;
