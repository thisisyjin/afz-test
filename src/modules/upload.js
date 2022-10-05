import createRequestSaga, {
  createRequestActionTypes,
} from "../assets/lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";
import * as uploadAPI from "../assets/lib/api/upload";

const PUT_IMAGE_FORM = "upload/PUT_IMAGE_FORM";

const [UPLOAD_ALL_DATA, UPLOAD_ALL_DATA_SUCCESS, UPLOAD_ALL_DATA_FAILURE] =
  createRequestActionTypes("upload/UPLOAD_ALL_DATA");

export const putImageForm = createAction(
  PUT_IMAGE_FORM,
  ({ imgCnt, imgForm }) => ({ imgCnt, imgForm })
);

export const uploadAllData = createAction(
  UPLOAD_ALL_DATA,
  ({ userId, userName, userTel, prvAgr }) => ({
    userId,
    userName,
    userTel,
    prvAgr,
  })
);

// saga 생성
const uploadDataSaga = createRequestSaga(UPLOAD_ALL_DATA, uploadAPI.user);

export function* uploadSaga() {
  yield takeLatest(UPLOAD_ALL_DATA, uploadDataSaga);
}

const initialState = {
  userId: "",
  userName: "",
  userTel: "",
  prvAgr: false,

  imgCnt: 0,
  imgForm: null,

  error: null,
};

const upload = handleActions(
  {
    [PUT_IMAGE_FORM]: (state, { payload: { imgCnt, imgForm } }) => ({
      ...state,
      imgCnt: imgCnt,
      imgForm: imgForm,
    }),

    [UPLOAD_ALL_DATA_SUCCESS]: (
      state,
      { payload: { userId, userName, userTel, prvAgr } }
    ) => ({
      ...state,
      userId: userId,
      userName: userName,
      userTel: userTel,
      prvAgr: prvAgr,
      error: null,
    }),
    [UPLOAD_ALL_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
  },
  initialState
);

export default upload;
