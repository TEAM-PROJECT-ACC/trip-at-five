import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';
import { DIARY_REQUESTS } from './requests';

// axios default options
const API_OPTIONS = {
  // baseURL
  baseURL: serverBaseURL,
  withCredentials: true,
};

/**
 * axios instance 생성
 */
const instance = axios.create(API_OPTIONS);

/**
 * [GET] 일지 목록 조회
 * @param {
 * memNo : 로그인되어 있는 회원의 번호
 * pageNo : 페이지 번호 (default = 1)
 * numOfRows : 페이지 당 표시 아이템 수 (default = 10)
 * }
 * @returns Array<Diary>
 */
export const selectAllList = async ({ memNo, pageNo = 1, numOfRows = 10 }) => {
  const response = await instance.get(DIARY_REQUESTS.selectAllList, {
    method: 'GET',
    params: {
      memNo,
      pageNo,
      numOfRows,
    },
  });
  return response.data;
};

/**
 * [GET] 일지 정보 조회
 * @param {
 * memNo 로그인 중인 회원 번호
 * diarySq 조회할 일지 번호
 * }
 * @returns Diary: {}
 */
export const selectDiary = async ({ memNo, diarySq }) => {
  const response = await instance.get(DIARY_REQUESTS.selectDiary, {
    params: {
      memNo,
      diarySq,
    },
  });
  return response.data;
};

/**
 * [POST] 일지 정보 수정
 * @param {*} modifiedDiary 수정된 일지
 * @returns Diary: {}
 */
export const modifyDiary = async (modifiedDiary) => {
  const response = await instance.put(
    DIARY_REQUESTS.modifyDiary,
    modifiedDiary
  );
  return response.data;
};

/**
 * [DELETE] 일지 삭제
 * @param {*} diary
 * @returns Deleted DiaryList: []
 */

export const deleteDiary = async ({ diary, pageNo = 1, numOfRows = 10 }) => {
  const response = await instance.delete(DIARY_REQUESTS.deleteDiary, {
    params: {
      memNo: diary.memNo,
      diarySq: diary.diarySq,
      pageNo,
      numOfRows,
    },
  });
  return response.data;
};

export const insertDiary = async ({ diary, pageNo = 1, numOfRows = 10 }) => {
  const response = await instance.post(DIARY_REQUESTS.insertDiary, {
    diary,
    pageNo,
    numOfRows,
  });
  console.log(response);
  return response.data;
};
