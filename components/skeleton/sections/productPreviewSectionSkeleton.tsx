import { Pagination } from "antd";
import ProductCardSkeleton from "../card/productCardSkeleton";

const ProductPreviewSectionSkeleton = () => {
  let data = ["", "", "", "", ""];
  return (
    <section className="">
      <div className="grid grid-cols-5 gap-4">
        {data?.map((data, idx) => (
          <div key={idx} className="place-self-center h-full">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Pagination
          current={1}
          total={0}
          pageSize={10}
          showSizeChanger={false}
        />
      </div>
    </section>
  );
};

export default ProductPreviewSectionSkeleton;
