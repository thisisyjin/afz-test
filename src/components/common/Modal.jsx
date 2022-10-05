import styled from "styled-components";

const FullScreen = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBlock = styled.div`
  position: relative;
  width: 85%;
  padding-bottom: 70px;
  background-color: #fff;
  border-radius: 10px;

  .modal-header {
    background-color: #2e2e2e;
    color: #fff;
    width: 100%;
    height: 56px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0 0;
    margin-top: -1px;
  }

  .modal-btn {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background-color: #2f69ff;
    color: #fff;
    padding: 14px;
    border-radius: 5px;
  }

  /* home-modal */
  .home-wrap {
    padding: 16px 26px;
  }

  .home-title {
    color: #171717;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .home-info {
    color: #383838;
    font-weight: 400;
    font-size: 15px;
  }

  .home-first {
    .home-info {
      margin-bottom: 20px;
    }
  }

  .home-second {
    dl {
      display: flex;
      &:last-child dt,
      &:last-child dd {
        border-bottom: none;
      }
    }

    dt {
      padding: 4px 2px;
      padding-left: 4px;
      font-size: 14px;
      letter-spacing: -0.05em;
      text-align: center;
      width: 70px;
      font-weight: 500;
      border-bottom: 1px solid #afafaf;
      border-right: 1px solid #afafaf;
    }
    dd {
      font-size: 14px;
      letter-spacing: -0.05em;
      flex: 4;
      padding: 4px 0 4px 10px;
      border-bottom: 1px solid #afafaf;
    }
  }

  /* search-modal */

  .search-wrap {
    text-align: center;
    margin-top: 36px;
  }

  .search-title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 20px;
    color: #171717;
  }

  .search-info {
    font-weight: 400;
    font-size: 16px;
    letter-spacing: -0.05em;
    margin-bottom: 16px;
    line-height: 1.6666666667;
    color: #2e2e2e;
  }

  /* prv-modal */

  .prv-wrap {
    padding: 24px 18px 18px;
    font-size: 16px;
  }

  .main-info {
    color: #171717;
    line-height: 1.66666;
    letter-spacing: -0.06em;
    margin-bottom: 20px;
  }

  .line {
    width: 50%;
    height: 1px;
    background-color: #afafaf;
    margin: 0 auto;
    margin-bottom: 22px;
  }

  .sub-info {
    font-size: 16px;
    color: #2e2e2e;
    letter-spacing: -0.06em;

    li {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  /* guide-modal */

  .guide-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    .guide-img {
      display: block;
      width: 216px;
      margin-left: 22px;
      padding: 20px 0;
    }

    .desc {
      text-align: center;
      font-size: 17px;
    }
  }
`;

const Modal = ({ onCloseModal, title, children }) => {
  return (
    <FullScreen>
      <ModalBlock>
        <header className="modal-header">{title}</header>
        <div className="modal-content">{children}</div>
        <button className="modal-btn" onClick={onCloseModal}>
          닫기
        </button>
      </ModalBlock>
    </FullScreen>
  );
};

export default Modal;
<base href="" />;
