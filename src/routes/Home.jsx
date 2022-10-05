import Ediya from "../assets/images/ediyaa.png";

import styled from "styled-components";
import HomeHeader from "../components/home/HomeHeader";
import HomeAccordion from "../components/home/HomeAccordion";
import { Link } from "react-router-dom";
import Modal from "../components/common/Modal";
import { useEffect, useState } from "react";
import KakaoBanner from "../components/banner/KakaoBanner";
import ShareBanner from "../components/banner/ShareBanner";

const HomeBlock = styled.div`
  section {
    text-align: center;
  }

  .home-content {
    margin-top: 90px;
    margin-bottom: 85px;
  }
`;

const HomeAbout = styled.section`
  margin-bottom: 24px;
  .home-about-info {
    margin-bottom: 16px;
  }

  .home-modal-btn {
    background-color: #f0f0f0;
    color: #333;
    padding: 8px 18px;
    border-radius: 100px;
  }

  .home-modal-btn {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  .home-modal-btn::before {
    display: inline-block;
    content: "?";
    padding: 2px;
    width: 16px;
    height: 16px;
    line-height: 14px;
    color: #123;
    margin-right: 4px;
    border: 1px solid #123;
    border-radius: 50%;
  }
`;
const HomeGift = styled.section`
  margin-bottom: 38px;

  .img-wrap {
    width: 150px;
    height: 150px;
    background-color: #eee;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  img {
    width: 150px;
  }

  .home-gift-img {
    margin-bottom: 16px;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2f69ff;
  color: #fff;
  text-align: center;
  width: 90%;
  padding: 15px;
  border-radius: 5px;
`;

const Home = () => {
  const [isVisibleModal, setVisibleModal] = useState(false);

  const onOpenModal = () => {
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  let supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}
  const wheelOpt = supportsPassive ? { passive: false } : false;

  const enableScroll = () => {
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
  };

  useEffect(() => {
    if (isVisibleModal) {
      window.addEventListener("touchmove", preventDefault, wheelOpt);
    }
    return () => enableScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisibleModal]);

  return (
    <HomeBlock>
      <HomeHeader />
      <div className="home-content">
        <HomeAbout>
          <p className="home-about-info">
            예방접종, 임플란트 등 우리동네 병원의
            <br />
            <span className="bold">비급여 항목</span> 가격 사진을 등록해 주세요.
          </p>
          <button className="home-modal-btn" onClick={onOpenModal}>
            비급여란
          </button>
        </HomeAbout>
        <HomeGift>
          <div className="img-wrap">
            <img src={Ediya} alt="ediya americano" className="home-gift-img" />
          </div>
          <p className="home-gift-info">
            등록해주신 모든 분들에게
            <br />
            <span className="bold">이디야 아메리카노 쿠폰</span>을 드립니다.
          </p>
        </HomeGift>
        <HomeAccordion />
      </div>
      <StyledLink to="/search">다음</StyledLink>
      {isVisibleModal && (
        <Modal title="안내" onCloseModal={onCloseModal}>
          <div className="home-wrap">
            <div className="home-first">
              <h3 className="home-title">비급여</h3>
              <div className="home-info">
                <ul>
                  <li>1. 건강보험 미 적용</li>
                  <li>2. 병의원이 가격 결정</li>
                  <li>3. 병의원별 가격 차이 크게 발생</li>
                </ul>
              </div>
            </div>
            <div className="home-second">
              <h3 className="home-title">비급여 항목 사례</h3>
              <div className="home-info">
                <dl className="home-table-row">
                  <dt>안과</dt>
                  <dd>백내장, 라식, 라섹, 스마트라섹 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>치과</dt>
                  <dd>임플란트, 크라운, 치아교정 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>정형외과</dt>
                  <dd>도수치료, 증식치료 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>피부과</dt>
                  <dd>여드름 레이저, 모발이식 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>한의원</dt>
                  <dd>추나요법, 공진단 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>산부인과</dt>
                  <dd>하이푸시술 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>이비인후과</dt>
                  <dd>비밸브재건술, 코콜이 목수술 등</dd>
                </dl>
                <dl className="home-table-row">
                  <dt>공통</dt>
                  <dd>비급여 진료 항목</dd>
                </dl>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <KakaoBanner />
      <ShareBanner />
    </HomeBlock>
  );
};

export default Home;
