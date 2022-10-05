import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/common/Button";
import StepHeader from "../components/common/StepHeader";

import { sido, sggu, sdCode, sgCode } from "../assets/lib/data/areaData.js";
import expand from "../assets/icons/expand.svg";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import PrevModalContainer from "../components/common/PrevModalContainer";

const HospitalSearchBlock = styled.div`
  margin-top: 75px;
  padding-top: 16px;

  input,
  select {
    position: relative;
    display: block;
    font-size: 16px;
    color: #111;
    -webkit-appearance: none;
    border: none;
  }

  .area-title,
  .search-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .select-form {
    display: flex;
    justify-content: space-between;
  }

  .area-select {
    width: 48.5%;
    background-color: #e6e6e6;
    color: #2e2e2e;
    outline: none;
    padding: 12px 16px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    overflow: hidden;
    background-image: url(${expand});
    background-position: 95%;
    background-repeat: no-repeat;
    background-size: 20px;

    &.active {
      background-color: #fff;
      color: #333;
      border: 1px solid #2f69ff;
    }
  }

  option.placeholder {
    display: none;
  }

  .area-wrap {
    margin-bottom: 22px;
  }

  .input-wrap {
    position: relative;
  }

  .search-input {
    width: 100%;
    background-color: #e6e6e6;
    padding: 12px 16px;
    border-radius: 10px;
    pointer-events: none;
    color: 22ee2e;
    &::placeholder {
      color: #797979;
    }

    &.active {
      background-color: #fff;
      color: #333;
      border: 1px solid #2f69ff;
      pointer-events: auto;
    }

    &.hospital {
      pointer-events: auto;
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    margin-top: 3px;
  }
`;

/////////

const HospitalSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mainArea, setMainArea] = useState("");
  const [subArea, setSubArea] = useState("");
  const [sidoCode, setSidoCode] = useState("");
  const [sgguCode, setSgguCode] = useState("");

  const [hospital, setHospital] = useState("");

  const [isActiveArea, setActiveArea] = useState(true);
  const [isActiveSearch, setActiveSearch] = useState(false);

  const onSelectMain = (e) => {
    const sidoName = e.target.value;
    const sdCodeNum = sdCode[sido.indexOf(sidoName)];
    setMainArea(sidoName);
    setSidoCode(sdCodeNum);
    console.log(sdCodeNum);
  };

  const onSelectSub = (e) => {
    const sgguName = e.target.value;
    const sidoIndex = sido.indexOf(mainArea);
    const sgCodeNum = sgCode[sidoIndex][sggu[sidoIndex].indexOf(sgguName)];
    setSubArea(sgguName);
    setSgguCode(sgCodeNum);
    console.log(sgCodeNum);

    setActiveArea(false);
    setActiveSearch(true);

    if (hospital) {
      setHospital("");
    }
  };

  const onClickInput = () => {
    navigate("/search/hospital", {
      state: {
        main: mainArea,
        sub: subArea,
      },
    });
  };

  const onClickSelect = () => {
    setActiveArea(true);
    setActiveSearch(false);
  };

  useEffect(() => {
    if (location.state) {
      const { hosName, sido, sggu } = location.state;
      setHospital(hosName);
      setMainArea(sido);
      setSubArea(sggu);
      setActiveArea(false);
      setActiveSearch(false);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>STEP 1 - 병의원찾기</title>
      </Helmet>
      <PrevModalContainer prev="/">
        <HospitalSearchBlock>
          <StepHeader title="병의원 찾기" step="1" prevPath="/" />
          <div className="area-wrap">
            <h3 className="area-title">지역 선택</h3>
            <div className="select-form" onClick={onClickSelect}>
              <select
                name="mainArea"
                id="mainArea"
                onChange={onSelectMain}
                className={`area-select ${isActiveArea && "active"}`}
                value={mainArea}
              >
                <option selected value="ph" className="placeholder">
                  시/도 선택
                </option>
                {sido.map((m, i) => (
                  <option value={m} key={`main-${i}`}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="subArea"
                id="subArea"
                onChange={onSelectSub}
                className={`area-select ${isActiveArea && "active"}`}
                value={subArea}
              >
                <option selected value="ph" className="placeholder">
                  시/군/구 선택
                </option>
                {mainArea &&
                  sggu[sido.indexOf(mainArea)].map((s, i) => (
                    <option value={s} key={`sub-${i}`}>
                      {s}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="search-wrap">
            <h3 className="search-title">병의원 검색</h3>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="병의원명을 입력하세요"
                className={`search-input ${isActiveSearch && "active"} ${
                  hospital && "hospital"
                }`}
                onClick={onClickInput}
                value={hospital}
              />
              <div className="search-icon">
                <Search />
              </div>
            </div>
          </div>
          <Button
            text="등록하기"
            to="/upload"
            isError={!(mainArea && subArea && hospital)}
            //
          />
        </HospitalSearchBlock>
      </PrevModalContainer>
    </>
  );
};

export default HospitalSearch;
