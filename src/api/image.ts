import instance from "./axios";

// 이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
export const postImage = async (image: File) => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await instance.post(`/images/upload`, image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("이미지 업로드에 실패했습니다.", err);
    return {};
  }
};
