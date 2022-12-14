import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import StepHeader from "../components/common/StepHeader";

import { ReactComponent as Check } from "../assets/icons/check.svg";
import expand from "../assets/icons/expand.svg";
import Modal from "../components/common/Modal";
import PrevModalContainer from "../components/common/PrevModalContainer";
import { Navigate, useNavigate } from "react-router-dom";

const UserInfoFormBlock = styled.div`
  margin-top: 75px;
`;

const UploadedInfoBlock = styled.div`
  padding: 26px 0;
  text-align: center;
  margin-bottom: 12px;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #171717;
    margin-bottom: 4px;
  }

  .desc {
    font-size: 15px;
    font-weight: 400;
    color: #2e2e2e;
    letter-spacing: -0.01em;
  }
`;

const FormWrap = styled.div`
  label {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #171717;
    margin-bottom: 10px;
    width: 100%;
  }

  input.active {
    background-color: #fff;
    border: 1px solid #2f69ff;
    color: #171717;
  }

  select.active {
    background-color: #fff;
    border: 1px solid #2f69ff;
    color: #171717;
  }

  .input-second-third.active {
    background-color: #fff;
    border: 1px solid #2f69ff;
    color: #171717;
  }
`;

const UserNameForm = styled.form`
  display: block;
  margin-bottom: 24px;

  input {
    font-size: 16px;
    border: none;
    width: 100%;
    background-color: #e6e6e6;
    color: #333;
    padding: 12px 16px;
    border-radius: 10px;
    &::placeholder {
      color: #6d6d6d;
    }
  }
`;

const UserTelForm = styled.div`
  margin-bottom: 20px;

  .placeholder {
    display: none;
  }

  select {
    font-size: 16px;
    border: none;
    width: 30%;
    height: 48px;
    background-color: #e6e6e6;
    color: #333;
    padding: 12px 16px;
    border-radius: 10px;
    -webkit-appearance: none;
    background-image: url(${expand});
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: 90%;
  }

  input {
    font-size: 16px;
    width: 30%;
    border: none;
    letter-spacing: 0.05em;
    background-color: transparent;
  }

  .input-second-third {
    display: flex;
    font-size: 16px;
    border: none;
    height: 48px;
    background-color: #e6e6e6;
    color: #333;
    border-radius: 10px;
    padding: 0 16px;
    &::placeholder {
      color: #6d6d6d;
    }
  }

  .number-form {
    display: flex;
    gap: 8px;

    select {
      flex: 1;
    }

    .input-second-third {
      flex: 3;
    }
  }
`;

const UserPrivCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  label {
    width: auto;
    margin: 0;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .check-box {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border: 1.8px solid #818181;
    border-radius: 3px;

    svg {
      width: 25px;
    }
  }

  .check-input {
    display: none;
  }

  .check-input:checked + .check-box svg path {
    fill: #fff;
  }

  .check-input:checked + .check-box {
    background-color: #2f69ff;
    border: none;
  }

  .prv-desc {
    font-weight: 400;
    color: #171717;
  }

  .prv-about {
    font-size: 14px;
    font-weight: 400;
    color: #838383;
    border-bottom: 1px solid #838383;
  }
`;

///////////////////////

const UserInfoForm = () => {
  const navigate = useNavigate();

  const inputNameRef = useRef(null);
  const inputSecRef = useRef(null);
  const inputThirdRef = useRef(null);

  const [name, setName] = useState("");
  const [telNum, setTelNum] = useState({ first: "", second: "", third: "" }); // redux
  const [checked, setChecked] = useState(false);

  const [isActiveName, setActiveName] = useState(true);
  const [isActiveTel, setActiveTel] = useState(false);

  const [isVisibleModal, setVisibleModal] = useState(false);
  const [isvisibleBtn, setVisibleBtn] = useState(true);

  const [isNumErr, setNumErr] = useState(true);

  const onOpenModal = () => {
    setVisibleModal(true);
  };
  const onCloseModal = () => {
    setVisibleModal(false);
  };

  const onCheckBox = () => {
    setChecked((prev) => !prev);
  };

  const onClickName = () => {
    setActiveName(true);
    setActiveTel(false);
  };

  const onClickTelSel = () => {
    setActiveTel(true);
    setActiveName(false);
  };

  const onClickTelSec = () => {
    setActiveTel(true);
    setActiveName(false);
    if (!telNum.second) inputSecRef.current.focus();
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeFirst = (e) => {
    setTelNum({ ...telNum, first: e.target.value });
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      alert("2?????? ?????? ???????????????.");
      return;
    }
    inputNameRef.current.blur();
    setActiveTel(true);
    setActiveName(false);
  };

  const onHideBtn = () => {
    setVisibleBtn(false);
  };

  const onShowBtn = () => {
    setVisibleBtn(true);
  };

  ////////

  const handleNumber = (e) => {
    const { value, name } = e.target;
    const regex = /^[0-9\b -]{0,13}$/; // regExp
    const keyDown = e.nativeEvent.inputType;

    if (value === ".") return;

    if (telNum[name].length === 4) {
      if (keyDown === "deleteContentBackward") {
        setTelNum({ ...telNum, [name]: value });
      }
      return;
    }

    if (regex.test(value)) {
      setTelNum({ ...telNum, [name]: value });
    }

    if (name === "third" && !value) {
      if (keyDown === "deleteContentBackward") {
        inputSecRef.current.focus();
      }
    }
  };

  const onBackspace = (e) => {
    if (e.target.value === "" && e.keyCode === 8) {
      inputSecRef.current.focus();
    }
  };

  // ?????? upload API ??????
  const onSubmitInfo = () => {
    // 1. redux - user ??????
    // 2. axios.post('/api/upload');
    // 3. loading??? ???????????????
    // 4. ????????? ?????? ???????????? navigate (/info/save)

    navigate("/info/save");
  };

  useEffect(() => {
    console.log(telNum);
  }, [telNum]);

  useEffect(() => {
    // ????????? ?????????
    if (telNum.second.length === 4) {
      inputThirdRef.current.focus();
    }
    // ????????? ??????
    if (telNum.second.length === 4 && telNum.third.length === 4) {
      inputThirdRef.current.blur(); // focus ??????
    }

    // valid check

    if (
      telNum.first &&
      telNum.second.length === 4 &&
      telNum.third.length === 4
    ) {
      setNumErr(false);
    } else {
      setNumErr(true);
    }
  }, [telNum.first, telNum.second.length, telNum.third.length]);

  return (
    <>
      <PrevModalContainer prev="/upload">
        <UserInfoFormBlock>
          <StepHeader title="????????? ?????? ??????" step={3} prevPath="/upload" />
          <UploadedInfoBlock>
            <h3 className="title">????????? ????????? ???????????????.</h3>
            <p className="desc">?????? ????????? ?????? ??????????????? ????????? ?????????.</p>
          </UploadedInfoBlock>

          <FormWrap>
            <UserNameForm onSubmit={onSubmitName}>
              <label htmlFor="userName">??????</label>
              <input
                id="userName"
                type="text"
                placeholder="?????? ??????"
                value={name}
                className={isActiveName && "active"}
                ref={inputNameRef}
                onClick={onClickName}
                onChange={onChangeName}
                onFocus={onHideBtn}
                onBlur={onShowBtn}
              />
            </UserNameForm>
            <UserTelForm>
              <label htmlFor="userTel">????????? ??????</label>
              <div className="number-form" onClick={onClickTelSel}>
                <select
                  name="first"
                  id="first"
                  className={`first ${isActiveTel && "active"}`}
                  onChange={onChangeFirst}
                  onClick={onClickTelSel}
                  value={telNum.first}
                >
                  <option selected value="ph" className="placeholder">
                    ??????
                  </option>
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="011">016</option>
                  <option value="011">017</option>
                  <option value="011">018</option>
                  <option value="0310">019</option>
                </select>
                <div
                  className={`input-second-third ${isActiveTel && "active"}`}
                  onClick={onClickTelSel}
                >
                  <input
                    id="userTel"
                    name="second"
                    type="number"
                    pattern="[0-9]*"
                    inputMode="decimal"
                    ref={inputSecRef}
                    value={telNum.second}
                    className="second"
                    placeholder="0000"
                    onChange={handleNumber}
                    onClick={onClickTelSel}
                    onFocus={onHideBtn}
                    onBlur={onShowBtn}
                  />
                  <input
                    id="userTel"
                    name="third"
                    type="number"
                    pattern="[0-9]*"
                    inputMode="decimal"
                    ref={inputThirdRef}
                    value={telNum.third}
                    className="third"
                    placeholder="0000"
                    onChange={handleNumber}
                    onKeyDown={onBackspace}
                    onClick={onClickTelSec}
                    onFocus={onHideBtn}
                    onBlur={onShowBtn}
                  />
                </div>
              </div>
            </UserTelForm>
            <UserPrivCheck>
              <label>
                <input type="checkbox" id="check" className="check-input" />
                <div className="check-box" onClick={onCheckBox}>
                  <Check />
                </div>
              </label>
              <div className="prv-desc">(??????) ???????????? ??????/?????? ??????</div>
              <div className="prv-about" onClick={onOpenModal}>
                ????????????
              </div>
            </UserPrivCheck>
          </FormWrap>
          {isvisibleBtn && (
            <Button
              text="??????"
              isError={!name || isNumErr || !checked}
              onClickFnc={onSubmitInfo}
            />
          )}

          {isVisibleModal && (
            <Modal title="???????????? ??????/?????? ??????" onCloseModal={onCloseModal}>
              <div className="prv-wrap">
                <div className="main-info">
                  ????????? ?????????(?????????)??? ????????? ??????????????? ???????????? ?????????
                  ??????????????????????????? ??? ??????????????? ?????? ?????? ????????? ????????????
                  ????????????. ????????????????????????????????? ????????????, ???????????? ????????????
                  ??????????????? ????????? ????????? ???????????? ???????????? ?????????
                  ????????????????????? ?????? ????????? ????????? ???????????? ????????? ??????
                  ????????????.
                </div>
                <div className="line"></div>
                <div className="sub-info">
                  <ul>
                    <li>1. ???????????? ????????? : ???????????????</li>
                    <li>2. ???????????? ?????? ?????? : ??????, ??????????????????</li>
                    <li>3. ???????????? ?????? ?????? ?????? : ????????? ?????? ??????</li>
                    <li>
                      4. ???????????? ?????? ?????? : ????????? ?????? ??? 1?????? ?????? ??? ??????
                    </li>
                  </ul>
                </div>
              </div>
            </Modal>
          )}
        </UserInfoFormBlock>
      </PrevModalContainer>
    </>
  );
};

export default UserInfoForm;
