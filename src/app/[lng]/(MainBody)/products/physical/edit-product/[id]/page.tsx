// import { useRouter } from 'next/router';
"use client";

import AddProduct from '@/Components/Products/Physical/AddProduct';
import React from "react";
interface AddProductContainerProps {
    params: {
        id: string;
        lng: string;
    };
}
const EditProductContainer: React.FC<AddProductContainerProps> = ({ params }) => {
    const { id, lng } = params;
    return <AddProduct id={id} lng={lng} />;
};

export default EditProductContainer;
