import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Prev } from "../../assets/icons/prev.svg";

const StepHeaderBlock = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border-bottom: 1px solid #bebebe;

  .container {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .step-number {
    color: #afafaf;
    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
    letter-spacing: 0.07em;
  }
`;

const StepTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
`;

const StepProgressWrap = styled.div`
  position: relative;
  width: 64px;
  height: 6px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const StepProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ step }) => `${step * 16}px`};
  height: 6px;
  background-color: #2f69ff;
  border-radius: 10px;
`;

const BackButton = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const StepHeader = ({ title, prevPath, step }) => {
  const navigate = useNavigate();

  const goPrevPage = () => {
    navigate(prevPath);
  };

  return (
    <StepHeaderBlock>
      <StepTitle>{title}</StepTitle>
      <div className="container">
        <StepProgressWrap>
          <StepProgress step={step} />
        </StepProgressWrap>
        <span className="step-number">{step}/4</span>
      </div>
      <BackButton onClick={goPrevPage}>
        <Prev />
      </BackButton>
    </StepHeaderBlock>
  );
};

export default StepHeader;
