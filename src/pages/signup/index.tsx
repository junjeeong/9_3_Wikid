import { useRouter } from "next/router";
import { postSignUp } from "@/api/auth";
import { AxiosError } from "axios";
import useNotify from "@/hooks/useNotify";
import { InputValues } from "@/containers/SignUpFormContainer";
import SignUpFormContainer from "@/containers/SignUpFormContainer";
import { useEffect } from "react";
import useAuthStore from "@/store/AuthStore";

const SignUp = () => {
  const router = useRouter();
  const notify = useNotify();
  const { isLoggedIn, user } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    try {
      await postSignUp({
        email: data.email,
        name: data.name,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      notify("가입이 완료되었습니다.", "success");
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        const msg =
          err.response?.status === 400
            ? err.response.data.message
            : "이미 사용 중인 이름입니다.";
        notify(msg, "error");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.profile) {
        router.push(`/wiki/${user.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  }, [isLoggedIn, user, router]);

  return <SignUpFormContainer onSubmit={onSubmit} />;
};

export default SignUp;
