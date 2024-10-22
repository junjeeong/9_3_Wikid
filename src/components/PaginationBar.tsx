interface PaginationBarProps {
  totalPage: number;
  pageArr: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
}

const PaginationBar = ({
  totalPage,
  pageArr,
  currentPage,
  handlePageChange,
  isLoading
}: PaginationBarProps) => {
  return (
    <div className="flex gap-[10px]">
      <button
        type="button"
        disabled={currentPage === 1 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.008)] bg-[url('../assets/icon/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform rotate-90"
      ></button>
      {pageArr.map((page) => (
        <button
          type="button"
          disabled={isLoading}
          key={page}
          className={`rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.008)] 
${currentPage === page ? "text-green-200" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPage || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.008)] bg-[url('../assets/icon/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform -rotate-90"
      ></button>
    </div>
  );
};

export default PaginationBar;
