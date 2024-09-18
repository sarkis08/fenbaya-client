
import React from "react";
import fetchProduct from "../../../../actions/get-product";
import fetchProducts from "../../../../actions/get-products";
import Container from "../../../../components/ui/container";
import ProductList from "../../../../components/product-list";
import Gallery from "../../../../components/gallery";
import Info from "../../../../components/info";

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product = await fetchProduct(params.productId);
   
    const suggestedProduct = await fetchProducts({
        categoryId: product?.category?.id,
    })

    return ( <div className="bg-white">
        <Container>
            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
                    {/* Gallery */}
                    <Gallery images={product.images} />
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        {/* Info */}
                        <Info data={product} />
                    </div>
                </div>
                {/* Suggested Products */}
                <hr className="my-10" />
                <ProductList title="Related Items" items={suggestedProduct} />
            </div>
        </Container>
    </div> );
}
 
export default ProductPage;