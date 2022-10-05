import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import share from "../../assets/images/share.svg";

const ShareBannerBlock = styled.div`
  position: fixed;
  bottom: ${({ end }) => (end ? "20px" : "86px")};

  .share-button {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #aaa;
    background-image: url(${share});
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

const ShareBanner = ({ end }) => {
  const navigator = useNavigate();
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "아프지마 - 병의원 가격등록",
        text: "우리동네 병의원 비급여항목 가격정보 등록하고 이디야 커피 받아가자!",
        // url: "",
      });
    } else {
      const someData = "https://afzima.com";
      let tempInput = document.createElement("input");
      tempInput.value = someData;

      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("주소가 복사되었습니다.");
    }
  };

  return (
    <ShareBannerBlock end={end}>
      <div
        className="share-button"
        onClick={() => {
          handleShare();
        }}
      ></div>
    </ShareBannerBlock>
  );
};

export default ShareBanner;
