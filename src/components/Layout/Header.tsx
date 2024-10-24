import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import FilledButton from "../ui/Button/FilledButton";
import Alarm from "/public/icons/ic_alarm.svg";
import Profile from "/public/icons/ic_profile.svg";
import Menu from "/public/icons/ic_menu.svg";

export const Header = () => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState("");
  const { isLoggedIn } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchedName },
    });
  };

  return (
    <div className="w-screen p-6 h-20 bg-gray-50 flex justify-between items-center">
      <Link href="/" aria-label="홈으로 이동">
        <Image
          src={"/logo/wikied.svg"}
          width={107}
          height={30}
          alt="wikied logo"
        />
      </Link>

      <ul className="flex items-center flex-row-reverse flex-grow gap-10 mr-10">
        <li
          className={`${
            router.pathname === "/boards" ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold Mobile:hidden`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/wikilist" ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold Mobile:hidden`}
        >
          <Link href="/wikilist" aria-label="모든 위키">
            모든 위키
          </Link>
        </li>
        <li className="Mobile:hidden">
          <SearchInput
            size="small"
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={searchedName}
          />
        </li>
      </ul>

      {isLoggedIn ? (
        <div className="flex items-center">
          <Alarm className="w cursor-pointer text-gray-400 hover:text-gray-500" />
          <Profile className="ml-[20px] cursor-pointer text-gray-400 hover:text-gray-500 Mobile:hidden" />
          <Menu className="PC:hidden Tablet:hidden ml-[20px] cursor-pointer text-gray-400 hover:text-gray-500" />
        </div>
      ) : (
        <Link href="/login">
          <FilledButton>로그인</FilledButton>
        </Link>
      )}
    </div>
  );
};
