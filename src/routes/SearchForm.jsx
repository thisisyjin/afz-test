import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as Prev } from "../assets/icons/prev.svg";
import { ReactComponent as Geo } from "../assets/icons/geo.svg";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import info from "../assets/icons/info.svg";
import axios from "axios";
import Modal from "../components/common/Modal";

import { useDispatch, useSelector } from "react-redux";
import { search, select } from "../modules/hospital";
import Button from "../components/common/Button";

const SearchFormBlock = styled.div`
  animation-name: pop-up-bg;
  animation-duration: 500ms;

  @keyframes pop-up-bg {
    from {
      transform: translateY(60%);
    }
    to {
      transform: none;
    }
  }
`;

const SearchFormFixedBlock = styled.div`
  background-color: #fff;

  .input-wrap {
    position: relative;
  }

  .search-input {
    border: none;
    width: 100%;
    background-color: #fff;
    color: #333;
    border: 1px solid #2f69ff;
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 16px;

    &::placeholder {
      color: #797979;
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%) translateY(-5px);
  }
`;

const SearchFormHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  width: 100%;
  padding: 18px 0 20px;

  .search-header-title {
    display: flex;
    align-items: center;
    gap: 28px;
    font-weight: 500;
    font-size: 18px;
    margin-right: 20px;
  }

  .area-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-right: 4px;

    .geo-icon {
      margin-top: 4px;
    }

    .area {
      color: #afafaf;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.01em;
    }
  }
`;

const HosInfoBlock = styled.div`
  height: ${(props) => `${props.innerHeight - 150}px`};
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin-bottom: 20px;
  .hos-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 16px;

    .hos-ref {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .name {
        font-size: 16px;
        font-weight: 500;
      }

      .add {
        font-size: 14px;
        color: #686868;
        font-weight: 400;
        max-width: 215px;
        letter-spacing: -0.03em;
      }
    }

    .hos-btn {
      display: block;
      height: 32px;
      background-color: #2f69ff;
      color: #fff;
      font-size: 18px;
      line-height: 1.444;
      padding: 3px 14px;
      border-radius: 5px;
    }
  }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 46px;

    .no-data-title {
      color: #2f69ff;
      font-weight: 500;
      margin-bottom: 32px;

      &::before {
        content: "";
        display: block;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-image: url(${info});
        margin: 0 auto;
        margin-bottom: 18px;
      }
    }

    .no-data-info {
      li {
        position: relative;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.04em;
        color: #383838;
        padding-left: 20px;

        &:first-child {
          margin-bottom: 20px;

          &::before {
            position: absolute;
            left: 0;
            content: "1.";
            margin-right: 10px;
          }
        }

        &:last-child {
          &::before {
            position: absolute;
            left: 0;

            content: "2.";
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

const Loading = styled.div`
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 100%;
  height: 100%;

  .loadingio-spinner-ellipsis-e4bv9du3r5h {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  // animation - loading
  @keyframes ldio-s90hw9ncs7a {
    0% {
      transform: translate(6px, 40px) scale(0);
    }
    25% {
      transform: translate(6px, 40px) scale(0);
    }
    50% {
      transform: translate(6px, 40px) scale(1);
    }
    75% {
      transform: translate(40px, 40px) scale(1);
    }
    100% {
      transform: translate(74px, 40px) scale(1);
    }
  }
  @keyframes ldio-s90hw9ncs7a-r {
    0% {
      transform: translate(74px, 40px) scale(1);
    }
    100% {
      transform: translate(74px, 40px) scale(0);
    }
  }
  @keyframes ldio-s90hw9ncs7a-c {
    0% {
      background: #457dff;
    }
    25% {
      background: #457dff;
    }
    50% {
      background: #457dff;
    }
    75% {
      background: #457dff;
    }
    100% {
      background: #457dff;
    }
  }
  .ldio-s90hw9ncs7a div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(40px, 40px) scale(1);
    background: #457dff;
    animation: ldio-s90hw9ncs7a 2.272727272727273s infinite
      cubic-bezier(0, 0.5, 0.5, 1);
  }
  .ldio-s90hw9ncs7a div:nth-child(1) {
    background: #457dff;
    transform: translate(74px, 40px) scale(1);
    animation: ldio-s90hw9ncs7a-r 0.5681818181818182s infinite
        cubic-bezier(0, 0.5, 0.5, 1),
      ldio-s90hw9ncs7a-c 2.272727272727273s infinite step-start;
  }
  .ldio-s90hw9ncs7a div:nth-child(2) {
    animation-delay: -0.5681818181818182s;
    background: #457dff;
  }
  .ldio-s90hw9ncs7a div:nth-child(3) {
    animation-delay: -1.1363636363636365s;
    background: #457dff;
  }
  .ldio-s90hw9ncs7a div:nth-child(4) {
    animation-delay: -1.7045454545454546s;
    background: #457dff;
  }
  .ldio-s90hw9ncs7a div:nth-child(5) {
    animation-delay: -2.272727272727273s;
    background: #457dff;
  }
  .loadingio-spinner-ellipsis-e4bv9du3r5h {
    width: 90px;
    height: 90px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-s90hw9ncs7a {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.9);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-s90hw9ncs7a div {
    box-sizing: content-box;
  }
`;

const BackButton = styled.div`
  margin-top: 3px;
  margin-left: 4px;
`;

const IsErrorBlock = styled.div`
  width: 100%;
  .err-title {
    text-align: center;
    color: #171717;
    font-size: 24px;
    margin-top: 50%;
    margin-bottom: 8px;
  }
  .err-desc {
    font-size: 18px;
    text-align: center;
  }
`;

//////////////////////////

const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const dispatch = useDispatch();

  const main = location.state.main;
  const sub = location.state.sub;

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState(null);
  const [results, setResults] = useState(null);

  const [isVisibleModal, setVisibleModal] = useState(false);

  const { sidoCode, sgguCode } = useSelector(({ hospital }) => ({
    sidoCode: hospital.sidoCode,
    sgguCode: hospital.sgguCode,
  }));

  const goPrevPage = () => {
    navigate("/search");
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value.length < 2) {
      alert("2자 이상 입력하세요");
      return;
    }
    // redux 디스패치 - SEARCH_HOSPITAL

    dispatch(
      search({
        sidoCode: sidoCode,
        sgguCode: sgguCode,
        keyword: value,
      })
    );
    getHosList(); // api 이용
    inputRef.current.blur();
  };

  /* const params = { sidoCode, sgguCode, keyword};
     const hosList = await axios.post('/hospital', params); 로 변경 🔻 */

  // ⭐️ hospital API 요청
  const getHosList = async () => {
    try {
      console.log("/hospital API 요청");
      setLoading(true);
      const hosList = await axios.get(
        "https://22144ce6-c7da-4ad3-ab85-ce22c7ae5b8a.mock.pstmn.io/search"
        // API 호출 - 병원정보
      );
      setDatas(hosList.data.row.result.hospital); // [{1}, {2}, {3}, ...]
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  /* ⭐️ hospital/info API 요청
const getHosInfo = async() => {
  try {
    console.log("/hospital/info API 요청");
    const params = {
      hospital.yKiho
    }
    const hosInfo = await(axios.post("/api/hospital/info", params));
    
    // hosInfo.data.result.UPD_YN -> 등록여부
    // hosInfo.data.result.ADDR -> 주소
    // hosInfo.data.result.YADM_NM -> 병원명 
    // -> 전부 리덕스에 저장하기 (hospital)
  }
} */

  const onSelectHos = (registered, name, add, yKiho) => {
    if (registered) {
      setVisibleModal(true);
    } else {
      dispatch(
        select({
          yKiho: yKiho,
          hosName: name,
          hosAdd: add,
        })
      );
      navigate("/search", {
        state: {
          name: name,
          add: add,
        },
      });
    }
  };

  const onCloseModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    if (datas) {
      const result = datas.filter((data) => {
        return data.name.trim().includes(value.trim()) ? data.name : null;
      });
      setResults(result);
      if (!result.length) {
        setResults(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  return (
    <>
      <SearchFormBlock>
        <SearchFormFixedBlock>
          <SearchFormHeader>
            <h2 className="search-header-title">
              <BackButton onClick={goPrevPage}>
                <Prev />
              </BackButton>
              병의원 검색
            </h2>
            <div className="area-info">
              <div className="geo-icon">
                <Geo />
              </div>
              <div className="area">{`${main} ${sub}`}</div>
            </div>
          </SearchFormHeader>
          <form className="input-wrap" onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="병의원명을 입력하세요"
              className="search-input"
              value={value}
              onChange={onChangeInput}
              ref={inputRef}
              disabled={!sidoCode || !sgguCode}
            />
            <div className="search-icon" onClick={onSubmitForm}>
              <Search />
            </div>
          </form>
        </SearchFormFixedBlock>
        {sidoCode && sgguCode ? (
          <HosInfoBlock innerHeight={window.innerHeight}>
            {results &&
              results.map((result, index) => (
                <div key={index} className="hos-info">
                  <div className="hos-ref">
                    <span className="name">{result.name}</span>
                    <span className="add">{result.address}</span>
                  </div>
                  <button
                    className="hos-btn"
                    onClick={() =>
                      onSelectHos(
                        result.registered,
                        result.name,
                        result.address,
                        result.yKiHo
                      )
                    }
                  >
                    선택
                  </button>
                </div>
              ))}
            {results === false && (
              <div className="no-data">
                <h3 className="no-data-title">
                  검색하신 병의원 정보가 없습니다.
                </h3>
                <ol className="no-data-info">
                  <li>
                    정확한 병의원 상호명은 신용카드 영수증, <br /> 진료영수증을
                    통해 확인하실 수 있습니다.
                  </li>
                  <li>
                    신규 병의원은 개원 6개월 후 DB에 등록되어 <br /> 검색 및
                    등록 가능합니다.
                  </li>
                </ol>
              </div>
            )}
            {loading && (
              <Loading>
                <div className="loading">
                  <div className="loadingio-spinner-ellipsis-e4bv9du3r5h">
                    <div className="ldio-s90hw9ncs7a">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </Loading>
            )}
          </HosInfoBlock>
        ) : (
          <IsErrorBlock>
            <h3 className="err-title">비정상정인 접근입니다.</h3>
            <p className="err-desc">
              <span className="semi-bold hl">이전 단계</span>로 돌아가 다시
              진행해주세요.
            </p>
            <Button to="/search" text="이전으로" />
          </IsErrorBlock>
        )}

        {isVisibleModal && (
          <Modal onCloseModal={onCloseModal} title="안내">
            <div className="search-wrap">
              <h3 className="search-title">가격표 사진이 등록된 병원입니다.</h3>
              <div className="search-info">
                이미 다른 이용자께서 가격표 사진을
                <br /> 등록한 병원입니다. 내년 1월 1일 이후
                <br /> 가격표 등록이 가능합니다.
              </div>
            </div>
          </Modal>
        )}
      </SearchFormBlock>
    </>
  );
};

export default SearchForm;
