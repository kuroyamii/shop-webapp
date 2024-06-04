"use client";
import {
  ProductsResponseInterface,
  ProductType,
} from "@/interfaces/api-interfaces";
import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { notification, Popconfirm, Table, TableColumnType } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../button/customButton";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { ProductAPI } from "@/service/api-fetch";
import { queryClient } from "@/providers/tanstackQueryProvider";
import EditProductSection from "../sections/editProductSection";
import { openNotification } from "@/lib/notification";

const CustomTable: React.FC<{
  products: Array<ProductsResponseInterface>;
  columnFilters?: ColumnFiltersState;
}> = ({ products, columnFilters }) => {
  const [api, contextHolder] = notification.useNotification();
  const deleteProductMutation = useMutation({
    mutationFn: ProductAPI.deleteProduct,
    onError: (data) => {
      openNotification(
        api,
        "Something went wrong! it seems like there is some trouble on our system",
        "Failed to Delete Product"
      );
    },
    onSuccess(data, variables, context) {
      openNotification(
        api,
        "You've successfully deleted a product!",
        "Product Deleted"
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  function handleOnClickDelete(id: number) {
    deleteProductMutation.mutate(id);
  }
  const [isEditing, setIsEditing] = useState(false);
  const [productEdited, setProductEdited] = useState<number>();

  const columns: ColumnDef<ProductsResponseInterface>[] = [
    {
      header: "ID",
      accessorKey: "id",
      id: "id",
      footer: "ID",
    },
    {
      header: "Title",
      accessorKey: "title",
      id: "title",
      footer: "Title",
      filterFn: "includesString",
      enableColumnFilter: true,
    },
    {
      header: "Price",
      accessorKey: "price",
      id: "price",
      footer: "Price",
    },
    {
      header: "Description",
      accessorKey: "description",
      id: "description",
      footer: "Description",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      id: "updatedAt",
      footer: "Updated At",
      cell: (info) => {
        if (info.getValue() && typeof info.getValue() == "string") {
          let value = "" + info.getValue();
          return dayjs(value).format("ddd, DD MMMM YYYY");
        }
      },
    },
    {
      header: "Created At",
      accessorKey: "creationAt",
      id: "creationAt",
      footer: "Created At",
    },
    {
      header: "Category",
      accessorKey: "category.name",
      id: "category.name",
      footer: "Category",
    },
    {
      header: "Images",
      accessorKey: "images",
      id: "images",
      footer: "Images",
    },
  ];

  const table = useReactTable({
    data: products,
    columns: columns,
    enableColumnFilters: true,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const antColumns: ColumnType<ProductsResponseInterface>[] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Product Name",
      dataIndex: "title",
      render: (value, record, index) => (
        <div className="max-w-[10rem] break-words">{value}</div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (value, record, index) => (
        <div className="max-w-[20rem] break-words">{value}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "6rem",
      render: (value, record, index) => <div>{`$ ${value}`}</div>,
    },
    {
      title: "Category",
      dataIndex: "category.name",
      render: (value, record, index) => (
        <div className="max-w-[10rem] break-words">{value}</div>
      ),
    },
    {
      title: "Image Links",
      dataIndex: "images",
      render: (value, record, index) => (
        <div key={record.id}>
          {value.map((link: string, idx: number) => (
            <div key={idx}>
              <Link
                target="_blank"
                href={link
                  .toString()
                  .replaceAll('"', "")
                  .replaceAll("[", "")
                  .replaceAll("]", "")}
              >
                {link
                  .toString()
                  .replaceAll('"', "")
                  .replaceAll("[", "")
                  .replaceAll("]", "").length > 20
                  ? link
                      .toString()
                      .replaceAll('"', "")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                      .substring(0, 20) + "..."
                  : link
                      .toString()
                      .replaceAll('"', "")
                      .replaceAll("[", "")
                      .replaceAll("]", "")}
              </Link>
              <br />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (value, record, index) => (
        <div className="flex flex-row space-x-4">
          <Button
            onClick={() => {
              setProductEdited(record.id);
              setIsEditing(true);
            }}
            className="!border-blue-400 !text-blue-400 hover:!bg-blue-400 hover:!text-white"
            variant={"outline"}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure to delete this product?"}
            description={"Delete product"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleOnClickDelete(record.id);
            }}
          >
            <Button
              variant={"outline"}
              className="!border-red-400 !text-red-400 hover:!bg-red-400 hover:!text-white"
            >
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const dataSource: any = table.getFilteredRowModel().rows.map((row) => {
    const rowData: { [key: string]: any } = { key: row.id };
    row.getVisibleCells().forEach((cell) => {
      rowData[cell.column.id] = cell.getValue();
    });
    return rowData;
  });

  return (
    <>
      {contextHolder}
      <EditProductSection
        productID={productEdited}
        openModal={isEditing}
        setOpenModal={setIsEditing}
      />
      <Table
        columns={antColumns}
        dataSource={dataSource}
        rowKey={"id"}
        pagination={{ position: ["bottomLeft"], defaultPageSize: 10 }}
      />
    </>
  );
};

export default CustomTable;
