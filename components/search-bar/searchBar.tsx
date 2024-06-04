import Search, { SearchProps } from "antd/es/input/Search";

const SearchBar = ({
  onSearch,
  search,
  isDisabled = false,
}: {
  isDisabled?: boolean;
  onSearch?: SearchProps["onSearch"];
  search?: string;
}) => {
  return (
    <div className="py-4 max-w-[20rem]">
      <Search
        disabled={isDisabled}
        onSearch={!isDisabled ? onSearch : undefined}
        defaultValue={!isDisabled ? search : ""}
        size="large"
        placeholder="Search Product"
        style={{}}
      />
    </div>
  );
};

export default SearchBar;
