import { Pagination } from "antd";
import ProductCardSkeleton from "../card/productCardSkeleton";

const ProductViewSectionSkeleton = () => {
  let data = ["", "", "", "", "", "", "", "", "", ""];
  return (
    <section className="py-4">
      <div className="grid grid-cols-5 gap-4">
        {data?.map((data, idx) => (
          <div key={idx} className="place-self-center h-full">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Pagination total={0} pageSize={10} showSizeChanger={false} />
      </div>
    </section>
  );
};

export default ProductViewSectionSkeleton;
