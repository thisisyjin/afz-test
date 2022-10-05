import client from "./client";

const headers = {
  Content_type: "multipart/form-data",
}; // 수정 필요

export const user = ({
  yKiho,
  hospName,
  updId,
  updName,
  updTel,
  imgCnt,
  imgFormData,
  prvYn,
}) =>
  client.post(
    "/api/upload",
    { yKiho, hospName, updId, updName, updTel, imgCnt, imgFormData, prvYn },
    headers
  );
