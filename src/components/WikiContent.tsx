import FilledButton from "./ui/Button/FilledButton";

interface WikiContent {
  content: string;
}

const WikiContent = ({ content }: WikiContent) => {
  const isEmpty = content === "" ? true : false;

  return (
    <>
      {isEmpty ? (
        <div className="flex flex-col rounded-[10px] items-center justify-center w-full h-48 Mobile:h-[184px] gap-5 bg-gray-100">
          <p className="text-center text-gray-400">
            아직 작성된 내용이 없네요.
            <br />
            위키에 참여해 보세요!
          </p>
          <FilledButton size="small">시작하기</FilledButton>
        </div>
      ) : (
        <div className="w-full">{content}</div>
      )}
    </>
  );
};

export default WikiContent;