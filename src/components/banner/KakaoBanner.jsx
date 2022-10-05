import styled from "styled-components";
import kakao from "../../assets/images/kakao.svg";

const KakaoBannerBlock = styled.div`
  position: fixed;
  bottom: ${({ end }) => (end ? "20px" : "86px")};
  right: 16px;

  a {
    display: block;
    background-color: #2f69ff;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: -0.05em;
    padding: 12px 20px;
    padding-left: 52px;
    border-radius: 100px;
    background-image: url(${kakao});
    background-repeat: no-repeat;
    background-position: 5px 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

const KakaoBanner = ({ end }) => {
  return (
    <KakaoBannerBlock end={end}>
      <a
        href="http://pf.kakao.com/_xkSxkxdxj"
        target="_blank"
        rel="noopener noreferrer"
      >
        문의하기
      </a>
    </KakaoBannerBlock>
  );
};

export default KakaoBanner;
