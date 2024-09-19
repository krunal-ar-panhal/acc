// import { useRouter } from 'next/router';
"use client";

import ProductDetail from "@/Components/Products/Physical/ProductDetail";

const ProductDetailContainer = (params:any) => {
    // const router = useRouter();
    // const { id } = router.query; // This gets the dynamic id from the URL

    // Ensure id is a string or handle undefined
    const {id} = params.params;
    // return <EditProduct/>
   // return (<h1>dfsdfdsfsdfds {console.log(id)}</h1>)
    return id ? <ProductDetail params={params} /> : <p>Loading...</p>;
};

export default ProductDetailContainer;
