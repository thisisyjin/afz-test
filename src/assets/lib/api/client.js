import axios from "axios";

const client = axios.create();

export default client;

/* 

// API 주소 다른곳으로 사용시
client.defaults.baseURL = 'https://external-api-server.com/'
// 헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

*/
