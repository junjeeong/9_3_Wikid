import { Article } from "@/types/types";
import Image from "next/image";
import Heart from "/public/icons/ic_heart.svg";

interface ArticleDetailContainerProps {
  article: Article;
  onAddLike: () => void;
  onDeleteLike: () => void;
}

const ArticleDetail = ({
  article,
  onAddLike,
  onDeleteLike,
}: ArticleDetailContainerProps) => {
  const handleLikeToggle = () => {
    article.isLiked ? onDeleteLike() : onAddLike();
  };

  return (
    <div className="mt-[60px] py-[40px] px-[30px] shadow-[0_4px_20px_#00000014]">
      <strong className="flex text-gray-500 text-3xl font-semibold">
        {article.title}
      </strong>
      <div className="mt-[30px] flex justify-between text-gray-400 text-md">
        <div className="flex gap-[10px]">
          <small className="text-md">{article.writer.name}</small>
          <small className="text-md">
            {new Date(article.createdAt).toLocaleDateString()}
          </small>
        </div>
        <button
          onClick={handleLikeToggle}
          aria-label={article.isLiked ? "좋아요 취소" : "좋아요"}
          className="flex items-center gap-[2px] text-md"
        >
          <Heart
            style={{ fill: article.isLiked ? "red" : "gray" }}
            width={18}
            height={18}
          />
          {article.likeCount}
        </button>
      </div>
      <div className="relative mt-[38px] w-[500px] h-[300px]">
        <Image
          src={article.image ?? "/icons/ic_image.svg"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          priority
          alt={article.title}
        />
      </div>
      <p className="mt-[20px] text-gray-500 text-lg">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
