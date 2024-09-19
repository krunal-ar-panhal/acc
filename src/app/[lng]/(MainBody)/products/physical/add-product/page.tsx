// components/AddProductContainer.tsx
"use client";

import React from 'react';
import AddProduct from '@/Components/Products/Physical/AddProduct';

interface AddProductContainerProps {
    params: {
        id: string;
        lng: string;
    };
}

const AddProductContainer: React.FC<AddProductContainerProps> = ({ params }) => {
    const { id, lng } = params;
    return <AddProduct id={id} lng={lng} />;
};

export default AddProductContainer;
