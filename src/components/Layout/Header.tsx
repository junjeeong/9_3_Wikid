import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Logo from "../Logo";
import Navigation from "../Navigation";
import UserMenu from "../UserMenu";

export const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchedName },
    });
    setSearchedName("");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen p-6 h-20 bg-background flex justify-between items-center fixed top-0 z-[999] shadow-[0_4px_20px_#00000014]">
      <Logo />
      <div className="ml-auto Mobile:hidden">
        <SearchInput
          size="small"
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchedName}
        />
      </div>
      <div className="mx-10">
        <Navigation />
      </div>
      <UserMenu isMobile={isMobile} />
    </div>
  );
};
