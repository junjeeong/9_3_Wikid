// import LoginForm from "@/containers/LoginForm";

// const Login = () => {
//   return (
//     <>
//       <LoginForm />
//     </>
//   );
// };

// export default Login;
import ImageAddModal from "@/components/ui/Modal/ImageAddModal";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import LoginForm from "@/containers/LoginForm";
import { useState } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LoginForm />
      <button onClick={handleModalOpen} className="absolute left-5 top-5">
        열기
      </button>
      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <ImageAddModal />
      </ModalOverlay>
    </>
  );
};

export default Login;

