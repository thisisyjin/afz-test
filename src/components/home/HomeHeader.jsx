import styled from "styled-components";

const HomeHeaderBlock = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  .header-title {
    width: 100%;
    height: 65px;
    font-weight: 700;
    font-size: 22px;
    background-color: #fff;
    color: #0f0f0f;
    padding: 18px;
  }

  .header-desc {
    font-weight: 400;
    font-size: 16px;
    color: #727272;
    margin-left: 12px;
  }
`;

const HomeHeader = () => {
  return (
    <HomeHeaderBlock>
      <h1 className="header-title">
        아프지마<span className="header-desc">우리동네 병의원 가격 등록</span>
      </h1>
    </HomeHeaderBlock>
  );
};

export default HomeHeader;
