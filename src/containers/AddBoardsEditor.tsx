import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "@/components/CustomToolbar";
import { useState, useRef, useMemo } from "react";
import { stripHTML, calculateCharCount } from "@/utils/calculatedCharCount";
import { postArticle } from "@/api/article";
import ImageAddModalContainer from "./ImageAddModalContainer";
import ReactQuill, { ReactQuillProps } from "react-quill";
import CountSpace from "@/components/AddBoardsCountSpace";
import AddBordsTitle from "@/components/AddBoardsTitle";
import AddBoardsRegisterSection from "@/components/AddBoardsRegisterSection";
import { useRouter } from "next/router";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import OutlineButton from "@/components/ui/Button/OutlineButton";


interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

// dynamic import로 'react-quill'을 클라이언트 사이드에서만 로드
//Document 객체에 접근해야 하기 때문에
const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    QuillComponent.Quill.register("modules/imageActions", ImageActions); 
    QuillComponent.Quill.register("modules/imageFormats", ImageFormats);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { ssr: false }
);

interface AddBoardsEditorProps {
  addPage?: boolean;
}

const AddBoardsEditor = ({ addPage = true }: AddBoardsEditorProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [charCountWithSpaces, setCharCountWithSpaces] = useState<number>(0);
  const [charCountWithoutSpaces, setCharCountWithoutSpaces] =
    useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태
  const quillRef = useRef<ReactQuill | null>(null); // ReactQuill ref 타입 지정
  const router = useRouter();

  const modules = useMemo(
    () => ({
      imageActions: {}, //추가
      imageFormats: {}, //추가
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: () => setIsOpen(true), // 커스텀 이미지 핸들러 설정
        },
        ImageResize: {
          modules: ["Resize"],
        },
      },
    }),
    []
  );

  const formats = [
    "bold",
    "italic",
    "underline",
    "align",
    "list",
    "bullet",
    "color",
    "image",
    "clean",
    "float",
    "height",
    "width",
  ];

  const isButtonDisabled =
    title.trim() === "" || stripHTML(content).trim() === "";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 30) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    const plainText = stripHTML(value);

    //공백 있는/없는 문자열세기
    const { withSpaces, withoutSpaces } = calculateCharCount(plainText);
    setCharCountWithSpaces(withSpaces);
    setCharCountWithoutSpaces(withoutSpaces);
  };

  //이미지 url 추출(src)
  const extractImageUrl = (contentHtml: string): string | null => {
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") : null;
  };

  //html로 작성된 문서에서 태그 제거하고 텍스트만 추출
  const stripContentHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const defaultUrl = "https://example.com/...";

  const onSubmit = async () => {
    const extractedImageUrl = extractImageUrl(content) || defaultUrl;
    setImageUrl(extractedImageUrl);

    const plainTextContent = stripContentHTML(content);

    await postArticle({
      image: imageUrl || defaultUrl,
      content: plainTextContent,
      title: title,
    });
    router.push("/boards");
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    router.push("/boards");
  };

  const onImageUpload = (url: string) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(); // 현재 커서 위치 가져오기

      editor.insertEmbed(range?.index || 0, "image", url); // 에디터에 이미지 삽입
      if (range) {
        editor.setSelection(range.index + 2, 0); // 커서를 이미지 다음 위치로 이동
      }
      quillRef.current.focus(); // 에디터에 포커스
    }
    setImageUrl(url); // 이미지 URL 상태 업데이트
    setContent(quillRef.current?.getEditor().root.innerHTML || ""); // 삽입 후 content 업데이트
    setIsOpen(false); // 모달 닫기
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[23px] min-h-screen bg-background Tablet:px-[60px] Mobile:px-5">
      <div className="w-full max-w-[1060px] min-h-[846px] px-[30px] pt-[46px] pb-[40px] shadow-[0_4px_20px_#00000014]">
        <AddBoardsRegisterSection
          onSubmit={onSubmit}
          isButtonDisabled={isButtonDisabled}
        />
        <AddBordsTitle title={title} onChange={handleTitleChange} />
        <CountSpace
          charCountWithSpaces={charCountWithSpaces}
          charCountWithoutSpaces={charCountWithoutSpaces}
        />
        <QuillNoSSRWrapper
          forwardedRef={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="본문을 입력해주세요"
        />
        <CustomToolbar />
        <ImageAddModalContainer
          isOpen={isOpen}
          onClose={onClose}
          onImageUpload={onImageUpload}
        />
      </div>
      {addPage && <OutlineButton onClick={handleClick}>목록으로</OutlineButton>}
    </div>
  );
};

export default AddBoardsEditor;
