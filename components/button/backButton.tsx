"use client";
import { BackwardFilled } from "@ant-design/icons";
import { Button } from "./customButton";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      className="flex flex-row items-center space-x-4 hover:bg-yellow-200 hover:text-black border-yellow-200 border bg-transparent text-yellow-200 font-bold"
    >
      <div>&larr;</div>
      <div>Back</div>
    </Button>
  );
};

export default BackButton;
