"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Input, Modal, notification, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ProductCategoryInterface } from "@/interfaces/api-interfaces";
import { ProductAPI } from "@/service/api-fetch";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../button/customButton";
import { queryClient } from "@/providers/tanstackQueryProvider";
import { openNotification } from "@/lib/notification";
export type CreateProductFormValues = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};
const CreateProductSection = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const [imageForm, setImageForm] = useState([""]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    isLoading,
    error,
    data: categoryData,
  } = useQuery<boolean, AxiosError | null, ProductCategoryInterface[]>({
    queryKey: ["categories"],
    queryFn: () => ProductAPI.getCategories(),
  });
  const CreateProductSchema = z.object({
    title: z
      .string({
        invalid_type_error: "Product Name must be an alphabet",
        required_error: "Product Name can't be empty",
      })
      .min(1, "Product Name can't be empty"),
    price: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price can't be empty",
      })
      .positive("Price must be postive number"),
    description: z
      .string({
        invalid_type_error: "Description must be in alphabet",
        required_error: "Description can't be empty",
      })
      .min(1, "Description can't be empty"),
    categoryId: z
      .number({
        invalid_type_error: "Something went wrong with the category",
        required_error: "Category can't be empty",
      })
      .positive("Price must be postive number"),
    images: z.array(
      z
        .string({
          invalid_type_error: "Image must be in alphabet",
          required_error: "This field can't be empty",
        })
        .min(1, "This field can't be empty")
    ),
  });

  type CreateProductType = z.infer<typeof CreateProductSchema>;
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(CreateProductSchema),
  });
  const createPostMutation = useMutation({
    mutationFn: ProductAPI.createProduct,
    onError: (data) => {
      openNotification(
        api,
        "Something went wrong! it seems like there is some trouble on our system",
        "Failed to Add Product"
      );
    },
    onSuccess: (data) => {
      openNotification(
        api,
        "Yay! you've successfully added a product to the server",
        `Product Added!`,
        "bottomRight"
      );
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const onSubmit: SubmitHandler<CreateProductFormValues> = (data) => {
    createPostMutation.mutate(data);
    if (createPostMutation.isSuccess) {
      setOpenModal(false);
      setImageForm([""]);
      reset();
    }
  };
  function convertToLabelValue(source: ProductCategoryInterface[]) {
    return source.map((src) => ({ label: src.name, value: src.id }));
  }

  const transform = {
    input: (value: number) =>
      isNaN(value) || value === 0 ? 0 : value.toString(),
    output: (e: ChangeEvent<HTMLInputElement>) => {
      const output = parseInt(e.target.value, 10);

      return isNaN(output) ? 0 : output;
    },
  };

  const handleCancel = () => {
    setImageForm([""]);
    setOpenModal(false);
    reset();
  };

  if (categoryData) {
    return (
      <>
        {contextHolder}
        <Modal
          title="Create Product"
          open={openModal}
          onCancel={handleCancel}
          footer={null}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8"
          >
            <div className="">
              <label htmlFor="title" className="font-semibold">
                Product Name
              </label>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <div>
                    <Input {...field} type="text" placeholder="Product Name" />
                    {errors?.title && fieldState.isTouched && (
                      <p className="text-red-500 text-sm">
                        {errors?.title.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label htmlFor="price" className="font-semibold">
                Price
              </label>
              <Controller
                control={control}
                name="price"
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(transform.output(e))}
                      value={transform.input(field.value)}
                      type="text"
                      placeholder="Product Name"
                    />
                    {errors?.price && fieldState.isTouched && (
                      <p className="text-red-500 text-sm">
                        {errors?.price.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label htmlFor="categoryId" className="font-semibold">
                Category
              </label>
              <Controller
                control={control}
                name="categoryId"
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      {...field}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select Category"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={convertToLabelValue(categoryData)}
                    />
                    {errors?.categoryId && fieldState.isTouched && (
                      <p className="text-red-500 text-sm">
                        {errors?.categoryId.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <div>
                    <TextArea
                      {...field}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      placeholder="Description"
                    />
                    {errors?.description && fieldState.isTouched && (
                      <p className="text-red-500 text-sm absolute">
                        {errors?.description.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="mt-8">
              <label htmlFor="title" className="font-semibold">
                Images
              </label>
              <div>
                {imageForm.map((value, key) => (
                  <Controller
                    key={key}
                    control={control}
                    name={`images.${key}`}
                    render={({ field, fieldState }) => (
                      <div className="mb-6">
                        <div className="flex flex-row space-x-4">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Product Name"
                          />
                          {key !== 0 && (
                            <Button
                              className="!bg-red-500 hover:!bg-red-400"
                              onClick={() => {
                                let imageValue = getValues("images");
                                if (imageValue.length !== 1) {
                                  setValue(
                                    "images",
                                    imageValue.filter((val, i) => i !== key)
                                  );
                                  setImageForm(
                                    imageValue.filter((val, i) => i !== key)
                                  );
                                }
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        {/* {errors?.images?.[key] && fieldState.isTouched && (
                          <p className="text-red-500 text-sm absolute">
                            {errors !== undefined
                              ? errors?.images?.[key].message
                              : ""}
                          </p>
                        )} */}
                      </div>
                    )}
                  />
                ))}
                <Button
                  className="!bg-blue-500 hover:!bg-blue-400"
                  onClick={() => {
                    let newImageValue = getValues("images");
                    newImageValue.push("");
                    setValue("images", newImageValue);
                    setImageForm(newImageValue);
                  }}
                >
                  Add Image
                </Button>
              </div>
            </div>
            <Button className="!bg-blue-500 hover:!bg-blue-400" type="submit">
              Submit
            </Button>
          </form>
        </Modal>
      </>
    );
  }
};

export default CreateProductSection;
