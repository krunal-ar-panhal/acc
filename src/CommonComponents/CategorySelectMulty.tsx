import React from 'react';
import Select from 'react-select';

interface CategorySelectProps {
    categories: Array<{ id: number, name: string }>;
    selectedCategories: number[];
    onChange: (selected: number[]) => void;
}

const CategorySelectMulty: React.FC<CategorySelectProps> = ({ categories, selectedCategories, onChange }) => {

    const options = categories.map(category => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        onChange(selectedValues);
    };
    return (
        
        <Select
            isMulti
            options={options}
            value={options.filter(option => selectedCategories.includes(option.value))}
            onChange={handleChange}
        />
    );
};

export default CategorySelectMulty;
