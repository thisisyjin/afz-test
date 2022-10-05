import client from "./client";

const headers = {
  Content_type: "application/json",
}; // 수정 필요

export const list = ({ sidoCode, sgguCode, hospName }) =>
  client.post("/api/hospital", { sidoCode, sgguCode, hospName }, headers);

export const info = ({ yKiho }) =>
  client.post("/api/hospital/info", { yKiho }, headers);
