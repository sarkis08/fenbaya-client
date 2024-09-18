import React from "react";

import Container from "../../components/ui/container";
import Billboard from "../../components/billboard";
import fetchBillboard from "../../actions/get-billboard";
import fetchProducts from "../../actions/get-products";
import ProductList from "../../components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await fetchProducts({ isFeatured: true });
  const billboard = await fetchBillboard(
    "eb832998-a69c-4b0a-85c1-49fb1d5cc8a6"
  );
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
