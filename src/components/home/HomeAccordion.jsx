import { useState } from "react";
import styled from "styled-components";

const HomeAccordionBlock = styled.div`
  /* 전체 여백 */
  margin-bottom: 145px;
  .acc-title {
    position: relative;
    background-color: #fff;
    color: #333;
    padding: 18px 20px;
    border-top: 1.8px solid #e4e4e4;

    &::after {
      font-weight: 700;
      position: absolute;
      content: "⌵";
      font-size: 20px;
      color: #aaa;
      line-height: 10px;
      right: 6%;
      top: 20px;
    }

    &::before {
      position: absolute;
      content: "";
      top: -1.8px;
      left: 0;
      width: 0;
      height: 1.8px;
      background-color: #2f69ff;
      transition: all 0.15s ease-out;
    }
  }

  .active .acc-title {
    color: #222;
    font-weight: 500;
    /* border-top: 1.8px solid #2f69ff; */
    &::after {
      color: #2f69ff;
      transform: rotate(-180deg);
      bottom: 20px;
    }

    &::before {
      width: 100%;
    }
  }

  .acc-1 .acc-content {
    border-top: 1px solid #e4e4e4;
    .progress-step {
      z-index: -2;
      background-color: #f4f4f4;
      position: relative;
      padding: 24px 26px;
      display: flex;
      gap: 22px;
      font-size: 13px;
      justify-content: space-between;

      &::before {
        /* line */
        content: "";
        z-index: -1;
        position: absolute;
        top: 34px;
        left: 50%;
        transform: translateX(-50%);
        width: 230px;
        height: 1px;
        background-color: #ccc;
      }

      li {
        display: flex;
        flex-direction: column;
        align-items: center;

        .step {
          font-size: 15px;
          margin-bottom: 3px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #111;
        }

        .desc {
          text-align: center;
          font-size: 14.5px;
          letter-spacing: -0.03em;
          line-height: 1.35;
          color: #222;
        }

        .step::before {
          content: "";
          display: block;
          z-index: 2;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #2f69ff;
          margin: 0 auto;
          margin-bottom: 8px;
          border: 6px solid #f4f4f4;
        }
      }
    }
  }

  .acc-2 {
    .acc-title {
      border-bottom: 1px solid #e4e4e4;
    }

    .acc-content {
      padding: 22px 32px;
      font-size: 15px;
      letter-spacing: -0.01em;
      line-height: 1.5;
      background-color: #f4f4f4;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      color: #1f1f1f;
    }
  }

  .acc-2.active .acc-title {
    border-bottom: none;
  }
`;

const HomeAccordion = () => {
  const [isActiveFirst, setActiveFirst] = useState(true);
  const [isActiveSecond, setActiveSecond] = useState(false);

  const onClickFirstAcc = () => {
    setActiveFirst((prev) => !prev);
    setActiveSecond(false);
  };

  const onClickSecondAcc = () => {
    setActiveFirst(false);
    setActiveSecond((prev) => !prev);
  };

  return (
    <HomeAccordionBlock>
      <div className={`acc-1 ${isActiveFirst && "active"}`}>
        <div className="acc-title" onClick={onClickFirstAcc}>
          진행 과정
        </div>
        {isActiveFirst && (
          <div className="acc-content">
            <ul className="progress-step">
              <li>
                <span className="step">STEP1</span>
                <span className="desc">병원 찾기</span>
              </li>
              <li>
                <span className="step">STEP2</span>
                <span className="desc">사진 등록</span>
              </li>
              <li>
                <span className="step">STEP3</span>
                <span className="desc">정보 입력</span>
              </li>
              <li>
                <span className="step">STEP4</span>
                <span className="desc">쿠폰 수령</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={`acc-2 ${isActiveSecond && "active"}`}>
        <div className="acc-title" onClick={onClickSecondAcc}>
          안내사항
        </div>
        {isActiveSecond && (
          <div className="acc-content">
            의료법에 의해 병의원은 비급여 진료항목과 <br /> 가격을 적은 책자
            등을 접수창구 등에 두어야 합니다. <div className="mb"></div>
            비급여 가격 정보는 개인정보 및 영업비밀에 해당하지 않습니다.
          </div>
        )}
      </div>
    </HomeAccordionBlock>
  );
};

export default HomeAccordion;
