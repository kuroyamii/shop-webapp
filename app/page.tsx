"use client";
import SearchBar from "@/components/search-bar/searchBar";
import ProductPreviewSection from "@/components/sections/productPreviewSection";
import { SearchProps } from "antd/es/input";
import { useRouter } from "next/navigation";
import QueryString from "qs";

export default function Home() {
  const router = useRouter();
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    let search = value;
    let limit = 10;
    let offset = 0;
    let queryString;
    if (search !== "") {
      queryString = QueryString.stringify({
        limit: limit,
        offset: offset,
        search: search,
      });
    } else {
      queryString = QueryString.stringify({
        limit: limit,
        offset: offset,
      });
    }
    router.push(`/shop?${queryString}`);
  };
  return (
    <main className="mt-16">
      <SearchBar onSearch={onSearch} />
      <ProductPreviewSection />
    </main>
  );
}
