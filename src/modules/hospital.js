import createRequestSaga, {
  createRequestActionTypes,
} from "../assets/lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import * as hospitalAPI from "../assets/lib/api/hospital";

const SET_MAIN_AREA = "hospital/SET_MAIN_AREA";
const SET_SUB_AREA = "hospital/SET_SUB_AREA";

// create request sage 추가 예정
const [SEARCH_HOSPITAL, SEARCH_HOSPITAL_SUCCESS, SEARCH_HOSPITAL_FAILURE] =
  createRequestActionTypes("hospital/SEARCH_HOSPITAL");
const [SELECT_HOSPITAL, SELECT_HOSPITAL_SUCCESS, SELECT_HOSPITAL_FAILURE] =
  createRequestActionTypes("hospital/SELECT_HOSPITAL");

// const [SEARCH_HOSPITAL, SEARCH_HOSPITAL_SUCCESS, SEARCH_HOSPITAL_FAILURE] =
// const [SELECT_HOSPITAL, SELECT_HOSPITAL_SUCCESS, SELECT_HOSPITAL_FAILURE]

export const setMainArea = createAction(
  SET_MAIN_AREA,
  ({ mainArea, sidoCode }) => ({ mainArea, sidoCode })
);

export const setSubArea = createAction(
  SET_SUB_AREA,
  ({ subArea, sgguCode }) => ({ subArea, sgguCode })
);

export const search = createAction(
  SEARCH_HOSPITAL,
  ({ sidoCode, sgguCode, keyword }) => ({ sidoCode, sgguCode, keyword })
);

export const select = createAction(
  SELECT_HOSPITAL,
  ({ yKiho, hosName, hosAdd }) => ({ yKiho, hosName, hosAdd })
);

// saga 생성

const searchSaga = createRequestSaga(SEARCH_HOSPITAL, hospitalAPI.list);
const selectSaga = createRequestSaga(SELECT_HOSPITAL, hospitalAPI.info);

export function* hospitalSaga() {
  yield takeLatest(SEARCH_HOSPITAL, searchSaga);
  yield takeLatest(SELECT_HOSPITAL, selectSaga);
}

const initialState = {
  mainArea: "",
  subArea: "",
  sidoCode: "",
  sgguCode: "",

  keyword: "",
  hosName: "",
  hosAdd: "",
  yKiho: "",

  error: null,
};

const hospital = handleActions(
  {
    [SET_MAIN_AREA]: (state, { payload: { mainArea, sidoCode } }) => ({
      ...state,
      mainArea: mainArea,
      sidoCode: sidoCode,
    }),
    [SET_SUB_AREA]: (state, { payload: { subArea, sgguCode } }) => ({
      ...state,
      subArea: subArea,
      sgguCode: sgguCode,
    }),

    // 🔻 추후 수정 예정
    [SEARCH_HOSPITAL_SUCCESS]: (state, { payload: keyword }) => ({
      ...state,
      keyword: keyword,
      error: null,
    }),
    [SEARCH_HOSPITAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [SELECT_HOSPITAL_SUCCESS]: (
      state,
      { payload: { yKiho, hosName, hosAdd } }
    ) => ({
      ...state,
      hosName: hosName,
      hosAdd: hosAdd,
      yKiho: yKiho,
      error: null,
    }),
    [SELECT_HOSPITAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState
);

export default hospital;
