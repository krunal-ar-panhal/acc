import React, { useState, useEffect } from 'react';
import MDEditor from "@uiw/react-md-editor";
import { useController, useFormContext } from 'react-hook-form';
import { FormGroup, Label, Row, Col, Button, Input } from "reactstrap";
import Select from 'react-select';

interface ProductSizeAndDescriptionProps {
  descriptionName: string;
  optionsData: Array<{ id: number; name: string; values: string }>;
  attributesData: Array<{ id: string; name: string; value: string }>;
  initialSizes?: Array<{ size: string; quantity: number }>; // Add an initialSizes prop
}

const ProductSizeAndDescription: React.FC<ProductSizeAndDescriptionProps> = ({
  descriptionName,
  optionsData,
  attributesData,
  initialSizes = [], // Set default empty array if no initial sizes are provided
}) => {
  const { control, setValue, getValues } = useFormContext();
  const [size, setSizes] = useState<Array<{ size: string; quantity: number }>>(initialSizes);

  const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Populate sizes when initialSizes prop changes
  useEffect(() => {
    if (initialSizes.length === 0) {
      setSizes(defaultSizes.map(size => ({ size, quantity: 0 })));
    } else {
      setSizes(initialSizes);
    }
    setValue('size', initialSizes.length === 0 ? defaultSizes.map(size => ({ size, quantity: 0 })) : initialSizes); // Ensure form values are updated with initial sizes
  }, [initialSizes, setValue]);

  const {
    field: { onChange: onChangeDescription, onBlur, value: valueDescription = '', ref },
    fieldState: { invalid: descriptionInvalid, error: descriptionError }
  } = useController({
    name: descriptionName,
    control,
    rules: { required: `${descriptionName} is required` }
  });

  const handleAddSize = () => {
    setSizes([...size, { size: '', quantity: 0 }]);
  };

  const handleSizeChange = (index: number, field: 'size' | 'quantity', value: string | number) => {
    const updatedSizes = size.map((sizeObj, i) =>
      i === index ? { ...sizeObj, [field]: value } : sizeObj
    );
    setSizes(updatedSizes);
    setValue('size', updatedSizes); // Update the form values
  };

  const handleRemoveSize = (index: number) => {
    const updatedSizes = size.filter((_, i) => i !== index);
    setSizes(updatedSizes);
    setValue('size', updatedSizes); // Update the form values
  };

  const handleSelectChange = (selectedOption: any, fieldName: string) => {
    if (Array.isArray(selectedOption)) {
      setValue(fieldName, selectedOption.map(option => option.value)); // Store as an array of values
    } else {
      setValue(fieldName, selectedOption ? selectedOption.value : []); // Handle single select or no selection
    }
  };

  return (
    <>
      {size.map((sizeObj, index) => (
        <FormGroup key={index} className="mb-3">
          <Row>
            <Col xl="3" sm="4">
              <Label className="fw-bold mb-0">Size:</Label>
            </Col>
            <Col xl="3" sm="3">
              <Input
                type="text"
                placeholder="Enter size"
                value={sizeObj.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              />
            </Col>
            <Col xl="3" sm="3">
              <Input
                type="number"
                placeholder="Enter quantity"
                value={sizeObj.quantity}
                onChange={(e) => handleSizeChange(index, 'quantity', parseInt(e.target.value))}
              />
            </Col>
            <Col xl="2" sm="2">
              <Button color="danger" onClick={() => handleRemoveSize(index)}>
                &times;
              </Button>
            </Col>
          </Row>
        </FormGroup>
      ))}

      <Button color="primary" onClick={handleAddSize} className="mb-3">
        Add Size
      </Button>

      {attributesData && attributesData.map((attribute, index) => (
        <FormGroup key={index} className="mb-3">
          <Row>
            <Col xl="3" sm="4">
              <Label className="fw-bold mb-0">{attribute.name}:</Label>
            </Col>
            <Col xl="8" sm="7">
              <Select
                name={`attributes_[]`}
                options={attribute.value.split(',').map(value => ({
                  label: value,
                  value: attribute.id,
                }))}
                value={Array.isArray(getValues('attributes_[]')) 
                  ? getValues('attributes_[]').map((value: string) => ({ label: value, value })) 
                  : []} // Ensure it's an array before mapping
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'attributes_[]')} // Handle change
              />
            </Col>
          </Row>
        </FormGroup>
      ))}
      {optionsData && optionsData.map((option, index) => (
        <FormGroup key={index} className="mb-3">
          <Row>
            <Col xl="3" sm="4">
              <Label className="fw-bold mb-0">{option.name}:</Label>
            </Col>
            <Col xl="8" sm="7">
              <Select
                name={`options_[]`}
                options={option.values.split(',').map((value: any) => ({
                  label: value,
                  value: option.id,
                }))}
                value={Array.isArray(getValues('options_[]')) 
                  ? getValues('options_[]').map((value: string) => ({ label: value, value })) 
                  : []} // Ensure it's an array before mapping
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'options_[]')} // Handle change
              />
            </Col>
          </Row>
        </FormGroup>
      ))}

      <FormGroup>
        <Row>
          <Col xl="3" sm="4">
            <Label className="fw-bold">Add Description :</Label>
          </Col>
          <Col xl="8" sm="7" className="description-sm">
            <MDEditor
              value={valueDescription}
              onChange={onChangeDescription}
              onBlur={onBlur}
              ref={ref}
            />
            {descriptionInvalid && <div className="invalid-feedback d-block">{descriptionError?.message}</div>}
          </Col>
        </Row>
      </FormGroup>
    </>
  );
};

export default ProductSizeAndDescription;
