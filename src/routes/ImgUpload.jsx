import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/common/Modal";
import StepHeader from "../components/common/StepHeader";

import { ReactComponent as Camera } from "../assets/icons/camera.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";
import Button from "../components/common/Button";
import PrevModalContainer from "../components/common/PrevModalContainer";
import guide from "../assets/images/guide.png";

import { useDispatch, useSelector } from "react-redux";
import { putImageForm } from "../modules/upload";
import { useLocation } from "react-router-dom";

const ImgUploadBlock = styled.div`
  margin-top: 75px;
  margin-bottom: 80px;

  .btn-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 82px;
    background-color: #fff;
  }
`;

const HosInfoBlock = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;

  .hos-name {
    font-size: 18px;
    font-weight: 500;
    color: #171717;
    margin-bottom: 2px;
    line-height: 1.4444444444;
  }

  .hos-add {
    font-size: 14px;
    font-weight: 400;
    color: #7a7a7a;
  }
`;

const ImgUploadForm = styled.div`
  padding: 18px 0;
  .upload-desc {
    color: #171717;
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 32px;
    letter-spacing: -0.02em;
  }

  .upload-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 0 6px;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
      color: #171717;
      font-size: 16px;

      .camera-icon {
        height: 22px;
      }
    }

    .upload-count {
      color: #2e2e2e;

      .bold {
        color: #171717;
      }
    }
  }
`;

const UploadLabel = styled.label`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  color: #fff;
  border-radius: 10px;
  margin-bottom: 22px;
  input#img-uploader {
    display: none;
  }
`;

const StyledClose = styled(Close)`
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 16px;
  border-radius: 50%;
`;

const PreviewBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
`;

const PreviewWrap = styled.div`
  position: relative;
  margin-right: 8px;
  &:nth-child(4n) {
    margin-right: 0;
  }

  .button-wrap {
    position: absolute;
    bottom: 10px;
    right: 2px;
    padding: 8px;
  }
`;

const PreviewImg = styled.img`
  position: relative;
  width: ${({ innerWidth }) => `${innerWidth}px`};
  height: ${({ innerWidth }) => `${innerWidth}px`};
  margin-bottom: 10px;
`;

const SubInfoBlock = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f4f4f4;
  border-radius: 10px;
  color: #171717;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.02em;

  li {
    margin-bottom: 6px;

    .indent {
      padding-left: 8px;
      color: #2e2e2e;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const IsErrorBlock = styled.div`
  width: 100%;
  .err-title {
    text-align: center;
    color: #171717;
    font-size: 24px;
    margin-top: 80%;
    margin-bottom: 8px;
  }
  .err-desc {
    font-size: 18px;
    text-align: center;
  }
`;

////////////////

const ImgUpload = () => {
  const formData = new FormData();
  const location = useLocation();
  const dispatch = useDispatch();

  const [fileImgs, setFileImgs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isVisibleGuide, setVisibleGuide] = useState(true);

  const [hosName, setHosName] = useState("");
  const [hosAdd, setHosAdd] = useState("");

  const onCloseModal = () => {
    setVisibleGuide(false);
  };

  const onUploadImg = (e) => {
    const fileObjs = e.target.files;
    let imgUrlArr = [...fileImgs];

    const recentFiles = [...selectedFiles];

    if (recentFiles.length + fileObjs.length > 10) {
      alert("????????? ?????? 10????????? ?????? ???????????????.");
      return;
    }

    // ???????????? ????????? url ??????
    for (let i = 0; i < fileObjs.length; i++) {
      const currentImgUrl = URL.createObjectURL(fileObjs[i]);
      imgUrlArr.push(currentImgUrl);
    }

    setSelectedFiles([...selectedFiles, ...fileObjs]);
    setFileImgs(imgUrlArr);

    // formData append ??????
    for (let i = 0; i < fileObjs.length; i++) {
      formData.append("img", fileObjs[i]);
    }
    for (const key of formData) console.log(key); // formData ?????? ?????? ??????
  };

  // ????????? ??????
  const deleteImg = (id) => {
    setFileImgs(fileImgs.filter((v, i) => i !== id));
    setSelectedFiles([...selectedFiles].filter((v, i) => i !== id));
  };

  // ????????????
  const onClickButton = (e) => {
    console.log(selectedFiles);
    console.log(selectedFiles.length); // Redux -> image.uploadPicCnt

    // Array -> FileList ??????
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach((selectedFile) => {
      dataTransfer.items.add(selectedFile);
    });
    console.log(dataTransfer.files); // FileList ??????
    // Redux -> image.imgId

    // dataTransfer.files??? redux??? ???????????? (post ????????? ??????????????? ??????)
  };

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setHosName(location.state.name);
      setHosAdd(location.state.add);
    }
  }, []);

  useEffect(() => {
    console.log(hosAdd, hosName);
  }, [hosName, hosAdd]);

  return (
    <>
      <PrevModalContainer prev="/search">
        <ImgUploadBlock>
          <StepHeader title="????????? ?????? ??????" step={2} prevPath="/search" />

          {!hosName || !hosAdd ? (
            <IsErrorBlock>
              <h3 className="err-title">??????????????? ???????????????.</h3>
              <p className="err-desc">
                <span className="semi-bold hl">?????? ??????</span>??? ????????? ??????
                ??????????????????.
              </p>
              <Button to="/search" text="????????????" />
            </IsErrorBlock>
          ) : (
            <>
              <HosInfoBlock>
                <h3 className="hos-name">{hosName && hosName}</h3>
                <span className="hos-add">{hosAdd && hosAdd}</span>
                {/* redux?????? ???????????? */}
              </HosInfoBlock>
              <ImgUploadForm>
                <div className="upload-wrap">
                  <div className="upload-desc">
                    ???????????? ????????? ????????? ?????? ??? ????????? ?????????.
                  </div>
                  <div className="upload-form">
                    <div className="upload-header">
                      <h4 className="title">
                        <div className="camera-icon">
                          <Camera />
                        </div>
                        ????????????
                      </h4>
                      <div className="upload-count">
                        <span className="bold">
                          {selectedFiles ? selectedFiles.length : "0"}
                        </span>{" "}
                        / 10??? ??????
                      </div>
                    </div>
                    <PreviewBlock>
                      {fileImgs &&
                        fileImgs.map((img, id) => (
                          <PreviewWrap key={id}>
                            <PreviewImg
                              src={img}
                              alt="gu"
                              innerWidth={(window.innerWidth - 56) / 4}
                            />
                            <div
                              className="button-wrap"
                              onClick={() => deleteImg(id)}
                            >
                              <StyledClose />
                            </div>
                          </PreviewWrap>
                        ))}
                    </PreviewBlock>
                    <UploadLabel>
                      + ?????? ?????? ??? ??????
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        id="img-uploader"
                        onChange={onUploadImg}
                      />
                    </UploadLabel>
                  </div>
                  <SubInfoBlock>
                    <ul className="sub-info">
                      <li>
                        ?? <span className="semi-bold hl">???????????? ?????????</span>
                        ??? ??????????????? ?????????.
                        <div className="indent">
                          (???????????? ???????????? ?????? ?????? ?????? ??? ???????????? <br />
                          ????????? ???????????? ???????????? ?????? ????????? ?????????)
                        </div>
                      </li>
                      <li>
                        ?? ????????? ??? ??????{" "}
                        <span className="semi-bold">?????? 10??? ??????</span> ??????
                        ???????????????.
                      </li>
                      <li>
                        ?? ?????? ?????? ??? ????????? ???????????? ????????? ??? ????????????.
                      </li>
                      <li>?? ?????????????????? ????????????????????? ????????? ??? ????????????.</li>
                      <li>
                        ?? ?????? ????????? ????????? ??????{" "}
                        <span className="semi-bold">?????? ???????????? ??????</span>???
                        ??? ????????????.
                      </li>
                    </ul>
                  </SubInfoBlock>
                </div>
              </ImgUploadForm>
              <div className="btn-wrap">
                <Button
                  text="????????????"
                  isError={!selectedFiles.length}
                  onClickFnc={onClickButton}
                  to="/info"
                />
              </div>
              {isVisibleGuide && (
                <Modal title="?????? ?????? ?????????" onCloseModal={onCloseModal}>
                  <div className="guide-wrap">
                    <img src={guide} alt="????????????" className="guide-img" />
                    <div className="desc">
                      <span className="semi-bold">????????? ?????? ?????????</span>???{" "}
                      <span className="semi-bold">????????????</span>??? <br />
                      ?????? ??????????????????.
                    </div>
                  </div>
                </Modal>
              )}
            </>
          )}
        </ImgUploadBlock>
      </PrevModalContainer>
    </>
  );
};

export default ImgUpload;
