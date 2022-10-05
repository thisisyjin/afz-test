import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBtnBlock = styled.button`
  display: block;
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2f69ff;
  color: #fff;
  text-align: center;
  width: ${({ innerWidth }) => `${innerWidth - 32}px`};
  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;

  &:disabled {
    background-color: #c2c2c2;
    color: #727272;
  }
`;

const Button = ({ text, isError, to, onClickFnc }) => {
  const navigate = useNavigate();
  const linkFnc = () => {
    navigate(to);
  };
  return to ? (
    <StyledBtnBlock
      disabled={isError}
      onClick={() => linkFnc(to)}
      innerWidth={window.innerWidth}
    >
      {text}
    </StyledBtnBlock>
  ) : (
    <StyledBtnBlock
      disabled={isError}
      onClick={onClickFnc}
      innerWidth={window.innerWidth}
    >
      {text}
    </StyledBtnBlock>
  );
};

export default Button;
