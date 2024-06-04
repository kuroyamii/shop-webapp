"use client";
import BackButton from "@/components/button/backButton";
import { Button } from "@/components/button/customButton";
import SearchBar from "@/components/search-bar/searchBar";
import CreateProductSection, {
  CreateProductFormValues,
} from "@/components/sections/createProductSection";
import EditProductSection from "@/components/sections/editProductSection";
import CustomTable from "@/components/table/table";
import {
  ProductRequestInterface,
  ProductType,
} from "@/interfaces/api-interfaces";
import { ProductAPI } from "@/service/api-fetch";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Modal } from "antd";
import { SearchProps } from "antd/es/input";
import { AxiosError } from "axios";
import { useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

const ManageProductPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const { isLoading, error, data } = useQuery<
    boolean,
    AxiosError | null,
    ProductType[]
  >({
    queryKey: ["products"],
    queryFn: () => ProductAPI.getAllProducts(""),
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setColumnFilters((prev) => {
      const res = prev
        .filter((f) => f.id !== "title")
        .concat({ id: "title", value: value });
      return res;
    });
  };

  if (data) {
    return (
      <div>
        <CreateProductSection
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        <BackButton />
        <div className="flex flex-row w-full justify-between items-center">
          <SearchBar onSearch={onSearch} />
          <Button
            variant={"outline"}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <PlusCircleFilled /> Add Product
          </Button>
        </div>
        <div>
          <CustomTable columnFilters={columnFilters} products={data} />
        </div>
      </div>
    );
  }
};

export default ManageProductPage;
