import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postSignUp } from "@/api/auth";
import { InputValues } from "@/containers/LoginFormContainer";
import { AxiosError } from "axios";
import Link from "next/link";
import FilledButton from "@/components/ui/Button/FilledButton";
import FormInput from "@/components/FormInput";

const SignUpFormContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });

  const password = watch("password");
  const router = useRouter();

  const onSubmit = async (data: InputValues) => {
    try {
      const res = await postSignUp({
        email: data.email,
        name: data.name,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      alert("가입이 완료되었습니다");
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          alert(err.response.data.message);
        } else alert("이미 사용 중인 이름입니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-background">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">
          회원가입
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mb-10"
        >
          <FormInput
            id="name"
            label="이름"
            placeholder="이름을 입력해 주세요"
            type="text"
            register={register("name", {
              required: true,
              maxLength: {
                value: 10,
                message: "열 자 이하로 작성해 주세요",
              },
            })}
            error={errors.name}
          />
          <FormInput
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="text"
            register={register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "이메일 형식으로 작성해 주세요.",
              },
            })}
            error={errors.email}
          />
          <FormInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            register={register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "8자 이상 작성해 주세요",
              },
            })}
            error={errors.password}
          />
          <FormInput
            id="passwordConfirmation"
            label="비밀번호확인"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            register={register("passwordConfirmation", {
              required: true,
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            })}
            error={errors.password}
          />
          <FilledButton type="submit" disabled={isSubmitting}>
            회원가입
          </FilledButton>
        </form>
        <div className="flex justify-center gap-[10px]">
          <span className="text-md text-gray-400">이미 회원이신가요?</span>
          <Link href="/login" className="text-md font-normal text-green-200">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormContainer;
