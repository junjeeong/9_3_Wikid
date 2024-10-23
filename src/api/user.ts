import instance from "./axios";

interface PatchUserQuery {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export const getUser = async () => {
  try {
    const res = await instance.get(`/users/me`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 400) {
      return {}; // undefined를 반환하는 것이 아닌 빈 객체를 반환하게 함.
    }
  } catch (err) {
    // 오류가 발생한 경우에도 빈 객체를 반환
    console.error("유저 정보를 불러오지 못했습니다.", err);
    return {};
  }
};

// 새로운 비밀번호와 현재 비밀번호를 formData로 받아서 변경하는 함수
export const patchUser = async (body: PatchUserQuery) => {
  try {
    const res = await instance.patch(`/users/me/password`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    // 오류가 발생한 경우에도 빈 객체를 반환
    console.error("비밀번호 변경에 실패했습니다.", err);
    return {};
  }
};
