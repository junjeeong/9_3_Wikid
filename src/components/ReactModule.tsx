import VideoIcon from "/public/icons/ic_video.svg";

const ReactModule = () => {
  return (
    <div className="flex gap-5">
      <span className="">
        <button type="button" className="ql-bold">
          {/* <VideoIcon className="w-6 h-24 text-gray-400" /> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.49021 12.75V15C9.49021 15.2128 9.562 15.391 9.70559 15.5346C9.84917 15.6782 10.0274 15.75 10.2402 15.75C10.453 15.75 10.6312 15.6782 10.7748 15.5346C10.9184 15.391 10.9902 15.2128 10.9902 15V12.75H13.2402C13.453 12.75 13.6312 12.6782 13.7748 12.5346C13.9184 12.391 13.9902 12.2128 13.9902 12C13.9902 11.7872 13.9184 11.609 13.7748 11.4654C13.6312 11.3218 13.453 11.25 13.2402 11.25H10.9902V8.99998C10.9902 8.78716 10.9184 8.60896 10.7748 8.46538C10.6312 8.32179 10.453 8.25 10.2402 8.25C10.0274 8.25 9.84917 8.32179 9.70559 8.46538C9.562 8.60896 9.49021 8.78716 9.49021 8.99998V11.25H7.24018C7.02737 11.25 6.84917 11.3218 6.70558 11.4654C6.562 11.609 6.49021 11.7872 6.49021 12C6.49021 12.2128 6.562 12.391 6.70558 12.5346C6.84917 12.6782 7.02737 12.75 7.24018 12.75H9.49021ZM4.54791 19.5C4.04278 19.5 3.61521 19.325 3.26521 18.975C2.91523 18.625 2.74023 18.1974 2.74023 17.6923V6.3077C2.74023 5.80257 2.91523 5.375 3.26521 5.025C3.61521 4.675 4.04278 4.5 4.54791 4.5H15.9325C16.4376 4.5 16.8652 4.675 17.2152 5.025C17.5652 5.375 17.7402 5.80257 17.7402 6.3077V10.8846L20.4863 8.1385C20.6337 7.99107 20.7994 7.95421 20.9834 8.02793C21.1674 8.10164 21.2593 8.24234 21.2593 8.45003V15.5499C21.2593 15.7576 21.1674 15.8983 20.9834 15.972C20.7994 16.0457 20.6337 16.0089 20.4863 15.8615L17.7402 13.1153V17.6923C17.7402 18.1974 17.5652 18.625 17.2152 18.975C16.8652 19.325 16.4376 19.5 15.9325 19.5H4.54791ZM4.54791 18H15.9325C16.0222 18 16.096 17.9711 16.1536 17.9134C16.2113 17.8557 16.2402 17.782 16.2402 17.6923V6.3077C16.2402 6.21795 16.2113 6.14423 16.1536 6.08652C16.096 6.02882 16.0222 5.99998 15.9325 5.99998H4.54791C4.45816 5.99998 4.38443 6.02882 4.32673 6.08652C4.26903 6.14423 4.24018 6.21795 4.24018 6.3077V17.6923C4.24018 17.782 4.26903 17.8557 4.32673 17.9134C4.38443 17.9711 4.45816 18 4.54791 18Z"
              fill="#8F95B2"
            />
          </svg>
        </button>
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline" />
        <button type="button" className="ql-blockquote" />
        <button type="button" className="ql-code-block" />
      </span>
      <span className="ql-separator">|</span>
      <span className="ql-formats">
        <select className="ql-header" defaultValue="7">
          <option value="1">제목</option>
          <option value="2">소제목</option>
          <option value="7">본문</option>
        </select>
      </span>

      <span className="ql-formats">
        <button type="button" className="ql-list" value="ordered" />
        <button type="button" className="ql-list" value="bullet" />
      </span>

      <span className="ql-formats">
        <button type="button" className="ql-align" value="" />
        <button type="button" className="ql-align" value="center" />
        <button type="button" className="ql-align" value="right" />
      </span>

      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>

      <span className="ql-formats">
        <button type="button" className="ql-image" />
        <button type="button" className="ql-video" />
        <button type="button" className="ql-link" />
      </span>
    </div>
  );
};

export default ReactModule;
