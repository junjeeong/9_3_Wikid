import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bgColor?: string;
  closeButtonSize?: string;
  closeButtonColor?: string;
}

const ModalOverlay = ({
  isOpen,
  onClose,
  children,
  bgColor = "bg-background",
  closeButtonSize = "w-5 h-5",
  closeButtonColor = "#8f95b2", //config color 안먹힘
}: ModalProps) => {
  
  if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-30"
        }
      >
        <div className={`${bgColor} rounded-[10px] px-5 py-5 relative z-10`}>
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-5 right-5 bg-cover ${closeButtonSize}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={closeButtonColor}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0005 13.0543L6.92737 18.1274C6.78892 18.2658 6.61489 18.3367 6.40527 18.3399C6.19567 18.3431 6.01844 18.2723 5.87357 18.1274C5.72869 17.9825 5.65625 17.8069 5.65625 17.6005C5.65625 17.3941 5.72869 17.2184 5.87357 17.0736L10.9466 12.0005L5.87357 6.92737C5.73511 6.78892 5.66427 6.61489 5.66107 6.40527C5.65786 6.19567 5.72869 6.01844 5.87357 5.87357C6.01844 5.72869 6.19407 5.65625 6.40047 5.65625C6.60687 5.65625 6.78251 5.72869 6.92737 5.87357L12.0005 10.9466L17.0736 5.87357C17.212 5.73511 17.3861 5.66427 17.5957 5.66107C17.8053 5.65786 17.9825 5.72869 18.1274 5.87357C18.2723 6.01844 18.3447 6.19407 18.3447 6.40047C18.3447 6.60687 18.2723 6.78251 18.1274 6.92737L13.0543 12.0005L18.1274 17.0736C18.2658 17.212 18.3367 17.3861 18.3399 17.5957C18.3431 17.8053 18.2723 17.9825 18.1274 18.1274C17.9825 18.2723 17.8069 18.3447 17.6005 18.3447C17.3941 18.3447 17.2184 18.2723 17.0736 18.1274L12.0005 13.0543Z"
                fill={closeButtonColor}
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalOverlay;
