import instance, { proxy } from "@/api/axios";
import { PatchBody } from "@/types/types";

interface GetProfilesQuery {
  page?: number;
  pageSize?: number;
  name?: string;
}

interface PostProfileQuery {
  securityAnswer: string;
  securityQuestion: string;
}

export interface PostProfilePingQuery {
  securityAnswer: string;
}

interface PatchProfileQuery {
  code: string;
  body: PatchBody;
}

// 프로필 목록 조회
export const getProfiles = async (query: GetProfilesQuery = {}) => {
  const baseUrl = "/profiles";
  const page = query?.page || 1;
  const pageSize = query?.pageSize || 10;

  const queryString = `?page=${page}&pageSize=${pageSize}&name=${
    query?.name || ""
  }`;
  try {
    const res = await instance.get(`${baseUrl}${queryString}`);

    return res.data.list;
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return [];
  }
};

// 프로필 이름 조회
export const getProfilesByName = async (query: GetProfilesQuery = {}) => {
  const baseUrl = "/profiles";
  const page = query?.page || 1;

  const queryString = `?page=${page}&pageSize=3&name=${query?.name || ""}`;

  try {
    const res = await instance.get(`${baseUrl}${queryString}`);

    // 이름 검색과 관련한 api 요청은 totalCount도 받아야 하기 때문에 data까지만 return
    return res.data;
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return [];
  }
};

//사용자 프로필 조회
export const getUserProfile = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}`);
    return res;
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return;
  }
};

export const patchProfile = async (query: PatchProfileQuery) => {
  const { code, body } = query;
  const res = await proxy.patch(`/api/profiles/${code}`, body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 프로필 수정 중 체크
export const getProfilePing = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}/ping`);
    return res;
  } catch (err) {
    console.error("프로필 핑 요청 중 에러 발생: ", err);
    return;
  }
};

// 프로필 생성
export const postProfile = async (body: PostProfileQuery) => {
  const res = await proxy.post(`/api/profiles`, body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 프로필 수정 중 갱신
export const postProfilePing = async (
  content: PostProfilePingQuery,
  code: string
) => {
  const res = await proxy.post(`/api/profiles/${code}`, content);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
