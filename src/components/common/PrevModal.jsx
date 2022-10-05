import styled from "styled-components";

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000090;
  display: flex;
  align-items: center;
`;

const PrevModalBlock = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 32px 12px 12px;
  margin: 0 auto;

  .content {
    padding: 0 28px;
    font-size: 16px;
    font-weight: 400;
    color: #171717;
    text-align: center;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }

  button {
    display: block;
    padding: 13px 0;
    border-radius: 5px;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .no {
      flex: 1;
      background-color: #d4d4d4;
      color: #5a5a5a;
    }

    .yes {
      flex: 1;
      background-color: #2f69ff;
      color: #fff;
    }
  }
`;

const PrevModal = ({ onCloseModal, onMovePrevPage }) => {
  return (
    <FullScreen>
      <PrevModalBlock>
        <div className="content">
          뒤로가시면 다시 입력하셔야 합니다. <br />
          정말 뒤로가시겠습니까?
        </div>
        <div className="btns">
          <button className="no" onClick={onCloseModal}>
            취소
          </button>
          <button className="yes" onClick={onMovePrevPage}>
            확인
          </button>
        </div>
      </PrevModalBlock>
    </FullScreen>
  );
};

export default PrevModal;
