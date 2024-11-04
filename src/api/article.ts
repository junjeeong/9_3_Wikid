import instance from "./axios";

interface postArticleProps {
  image: string;
  content: string;
  title: string;
}

interface getArticlesProps {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

interface patchArticleProps {
  articleId: number;
  body: {
    image: string;
    content: string;
    title: string;
  };
}

// 게시글 등록
export const postArticle = async (body: postArticleProps) => {
  const res = await instance.post(`/api/articles/`, body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 게시글 목록 조희
export const getArticles = async (query: getArticlesProps) => {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = query;

  const queryString = `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;

  try {
    const res = await instance.get(`/articles${queryString}`);
    return res.data;
  } catch (err) {
    console.error("게시글 목록을 조회하는데 실패했습니다.", err);
    return {};
  }
};

// 게시글 상세 조회
export const getArticle = async (articleId: number) => {
  const res = await instance.get(`/api/articles/${articleId}`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 게시글 수정
export const patchArticle = async (query: patchArticleProps) => {
  const res = await instance.patch(
    `/api/article/${query.articleId}`,
    query.body
  );
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 게시글 삭제
export const deleteArticle = async () => {
  const res = await instance.delete("/api/article");
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 게시글 좋아요 추가
export const postArticleLike = async () => {
  const res = await instance.post(`/api/like`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 게시글 좋아요 취소
export const deleteArticleLike = async () => {
  const res = await instance.delete(`/api/like`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
