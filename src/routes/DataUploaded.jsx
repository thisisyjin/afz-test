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
      <StepHeader title="?????? ??????" step={4} prevPath="/info" />
      <UploadInfoBlock>
        <div className="check-icon">
          <Check />
        </div>
        <div className="desc-title">?????? ?????????????????????.</div>
        <div className="desc-text">
          ???????????? ????????? ?????? ?????? ???<br />
          ????????? ??????????????? ?????????
          <br />
          <span className="semi-bold">5?????????</span> ?????? ????????? ???????????????.
        </div>

        <div className="btn-wrap">
          <Link to="/" className="home-btn">
            ?????????
          </Link>
        </div>
      </UploadInfoBlock>

      <AddBannerBlock>
        <div className="add-desc">
          ????????? ????????? ?????? ?????? ?????????{" "}
          <span className="bold">???????????? ???</span> ????????????
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
          ??????????????? ?????? ???????????? <br />
          <span className="bold">????????? ??????????????? ??????</span>??? ????????????.
        </div>
      </AddBannerBlock>

      <KakaoBanner end="1" />
      <ShareBanner end="1" />
    </DataUploadedBlock>
  );
};

export default DataUploaded;
