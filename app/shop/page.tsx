import BackButton from "@/components/button/backButton";
import ProductViewSection from "@/components/sections/productViewSection";
import { Suspense } from "react";

const ShopPage = () => {
  return (
    <Suspense>
      <main>
        <BackButton />
        <ProductViewSection />
      </main>
    </Suspense>
  );
};

export default ShopPage;
