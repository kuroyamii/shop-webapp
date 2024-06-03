"use client";
import { Skeleton } from "antd";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between h-full space-y-4 w-[240px] bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-[16px] hover:cursor-pointer translate-y-0 transition-all duration-500">
      <div className="flex flex-col space-y-4">
        <div
          className={`relative w-52 h-52 top-0 left-0 overflow-hidden rounded-[8px] "border border-gray-500 bg-gray-900 bg-opacity-30"`}
        >
          <Skeleton.Image
            style={{ height: "100%", width: "13rem" }}
            className="w-52 h-52"
            active
          />
        </div>

        <div className="flex flex-row w-full justify-between">
          <Skeleton paragraph={{ rows: 2 }} title={false} active />
        </div>
      </div>

      <div className="w-full">
        <Skeleton.Button></Skeleton.Button>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
