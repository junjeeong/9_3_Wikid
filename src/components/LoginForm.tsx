import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./ui/Button";
import { postSignIn } from "@/api/auth";
import { AxiosError } from "axios";

export interface InputVlaues {
  email: string;
  name?: string;
  password: string;
  passwordConfirmation?: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputVlaues>({
    mode: "onSubmit",
  });

  const router = useRouter();

  const onSubmit = async (data: InputVlaues) => {
    try {
      const res = await postSignIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        window.alert(err.response?.data.message);
      }
    }
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">로그인</h2>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mb-10"
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-md text-gray-500">
              이메일
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px]gray100 bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
                errors.email ? "outline-red-200" : "outline-green-200"
              }`}
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "이메일 형식으로 작성해 주세요.",
                },
              })}
            ></input>
            {errors.email && (
              <span className="text-xs text-red-200" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="password"
              className="text-md font-normal text-gray-500"
            >
              비밀번호
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray4-00 ${
                errors.password ? "outline-red-200" : "outline-green-200"
              }`}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
            ></input>
            {errors.password && (
              <span className="text-xs text-red-200" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            로그인
          </Button>
        </form>
        <div className="flex justify-center">
          <Link href="/login" className="text-md font-normal text-green-200">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
