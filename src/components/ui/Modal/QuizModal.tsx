import FilledButton from "../Button/FilledButton";


interface QuizModalProps {
  question: string;
  quizAnswer: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  handleSubmit:() => void;
}

const QuizModal = ({
  question,
  quizAnswer,
  handleInputChange,
  errorMessage,
  handleSubmit,
}:QuizModalProps) => {
  
  return (
    <div className="flex flex-col gap-9 pt-10 pb-[2px]">
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <div className="flex justify-center items-center rounded-full bg-gray-100 w-[42px] h-[42px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
              fill="#8F95B2"
            />
          </svg>
        </div>
        <div className="text-md text-gray-400">
          다음 퀴즈를 맞추고 <br /> 위키를 작성해보세요.
        </div>
      </div>
      <div className="flex flex-col ">
        <label
          htmlFor="quiz"
          className="text-2lg text-gray-500 font-semibold mb-[10px]"
        >
          {question}
        </label>
        <input
          value={quizAnswer}
          onChange={handleInputChange}
          id="quiz"
          className={`rounded-[10px] px-5 py-[10.5px] bg-gray-100 w-[355px] mb-[10px] placeholder:text-md placeholder:text-gray-400 Mobile:w-[295px] ${
            errorMessage ? "outline-red-200" : "outline-green-200"
          }  }`}
          placeholder="답안을 입력해 주세요"
        ></input>
        {errorMessage && (
          <span className="text-xs text-red-200">{errorMessage}</span>
        )}
        <div className="flex mt-[30px]">
          <FilledButton fullWidth={true} onClick={handleSubmit}>
            확인
          </FilledButton>
        </div>
        <p className="mt-5 text-xs text-gray-400 text-center">
          위키드는 지인들과 함께하는 즐거운 공간입니다.
          <br />
          지인에게 상처를 주지 않도록 작성해 주세요.
        </p>
      </div>
    </div>
  );
};

export default QuizModal;