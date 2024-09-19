    // import React from 'react';
//
// // Define the types for the props
// type Category = {
//   id: number;
//   name: string;
// };
//
// type CategorySelectProps = {
//   categories: Category[];
//   selectedCategoryId: number | string;
//   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//   errors: { categoryId?: string };
// };
//
// const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selectedCategoryId, onChange, errors }) => {
//   return (
//     <select
//       onChange={onChange}
//       className={errors.categoryId ? "invalid form-control" : "form-control"}
//       value={selectedCategoryId}
//     >
//       <option value="">Select a category</option>
//       {categories.map((category) => (
//         <option key={category.id} value={category.id}>
//           {category.name}
//         </option>
//       ))}
//     </select>
//   );
// };
//
// export default CategorySelect;
import React from 'react';

// Define the types for the props
type Category = {
    id: number;
    name: string;
};

type CategorySelectProps = {
    name:string;
    categories: Category[];
    selectedCategoryId: number | string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    errors: { categoryId?: string };
};

const CategorySelect: React.FC<CategorySelectProps> = ({name, categories, selectedCategoryId, onChange, errors }) => {
    return (
        <>
            <select
                name={name}
                onChange={onChange}
                className={errors.categoryId ? "invalid form-control" : "form-control"}
                value={selectedCategoryId}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {/* {errors.categoryId&&errors.categoryId!='undefined' && <div className="text-danger">{`${errors.categoryId}`}</div>} */}

        </>

    );
};

export default CategorySelect;
