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
      alert("사진은 최대 10장까지 첨부 가능합니다.");
      return;
    }

    // 미리보기 이미지 url 등록
    for (let i = 0; i < fileObjs.length; i++) {
      const currentImgUrl = URL.createObjectURL(fileObjs[i]);
      imgUrlArr.push(currentImgUrl);
    }

    setSelectedFiles([...selectedFiles, ...fileObjs]);
    setFileImgs(imgUrlArr);

    // formData append 하기
    for (let i = 0; i < fileObjs.length; i++) {
      formData.append("img", fileObjs[i]);
    }
    for (const key of formData) console.log(key); // formData 객체 내부 조회
  };

  // 이미지 삭제
  const deleteImg = (id) => {
    setFileImgs(fileImgs.filter((v, i) => i !== id));
    setSelectedFiles([...selectedFiles].filter((v, i) => i !== id));
  };

  // 업로드시
  const onClickButton = (e) => {
    console.log(selectedFiles);
    console.log(selectedFiles.length); // Redux -> image.uploadPicCnt

    // Array -> FileList 변환
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach((selectedFile) => {
      dataTransfer.items.add(selectedFile);
    });
    console.log(dataTransfer.files); // FileList 객체
    // Redux -> image.imgId

    // dataTransfer.files를 redux에 저장하기 (post 요청은 개인정보와 함께)
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
          <StepHeader title="가격표 사진 등록" step={2} prevPath="/search" />

          {!hosName || !hosAdd ? (
            <IsErrorBlock>
              <h3 className="err-title">비정상정인 접근입니다.</h3>
              <p className="err-desc">
                <span className="semi-bold hl">이전 단계</span>로 돌아가 다시
                진행해주세요.
              </p>
              <Button to="/search" text="이전으로" />
            </IsErrorBlock>
          ) : (
            <>
              <HosInfoBlock>
                <h3 className="hos-name">{hosName && hosName}</h3>
                <span className="hos-add">{hosAdd && hosAdd}</span>
                {/* redux에서 가져오기 */}
              </HosInfoBlock>
              <ImgUploadForm>
                <div className="upload-wrap">
                  <div className="upload-desc">
                    병원에서 가격표 사진을 촬영 후 등록해 주세요.
                  </div>
                  <div className="upload-form">
                    <div className="upload-header">
                      <h4 className="title">
                        <div className="camera-icon">
                          <Camera />
                        </div>
                        첨부사진
                      </h4>
                      <div className="upload-count">
                        <span className="bold">
                          {selectedFiles ? selectedFiles.length : "0"}
                        </span>{" "}
                        / 10장 첨부
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
                      + 사진 촬영 및 선택
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
                        · <span className="semi-bold hl">병원명과 가격표</span>
                        가 등록되어야 합니다.
                        <div className="indent">
                          (가격표에 병원명이 없을 경우 병원 내 병원명이 <br />
                          표시된 게시물을 촬영하여 같이 등록해 주세요)
                        </div>
                      </li>
                      <li>
                        · 사진은 한 번에{" "}
                        <span className="semi-bold">최대 10장 까지</span> 등록
                        가능합니다.
                      </li>
                      <li>
                        · 사진 전송 시 데이터 통화료가 발생할 수 있습니다.
                      </li>
                      <li>· 진료영수증은 민감정보이므로 첨부할 수 없습니다.</li>
                      <li>
                        · 내용 확인이 어려운 경우{" "}
                        <span className="semi-bold">사진 재등록을 요청</span>할
                        수 있습니다.
                      </li>
                    </ul>
                  </SubInfoBlock>
                </div>
              </ImgUploadForm>
              <div className="btn-wrap">
                <Button
                  text="등록하기"
                  isError={!selectedFiles.length}
                  onClickFnc={onClickButton}
                  to="/info"
                />
              </div>
              {isVisibleGuide && (
                <Modal title="사진 촬영 가이드" onCloseModal={onCloseModal}>
                  <div className="guide-wrap">
                    <img src={guide} alt="가이드임" className="guide-img" />
                    <div className="desc">
                      <span className="semi-bold">비급여 항목 가격표</span>를{" "}
                      <span className="semi-bold">병의원명</span>과 <br />
                      함께 촬영해주세요.
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
