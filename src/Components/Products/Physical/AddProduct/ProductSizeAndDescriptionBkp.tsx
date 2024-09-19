// import React, { useState, useEffect } from 'react';
// import MDEditor from "@uiw/react-md-editor";
// import { useController, useFormContext } from 'react-hook-form';
// import { FormGroup, Label, Row, Col, Button, Input } from "reactstrap";
// import { SketchPicker, ColorResult } from 'react-color';

// interface ProductSizeAndDescriptionProps {
//   descriptionName: string;
//   sizes: string[];
//   colorName: string;
// }

// const ProductSizeAndDescription: React.FC<ProductSizeAndDescriptionProps> = ({ descriptionName, sizes, colorName }) => {
//   const { control, setValue, getValues } = useFormContext();
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);
//   const [colorInput, setColorInput] = useState<string>('');
//   const [colorNameInput, setColorNameInput] = useState<string>('');

//   const {
//     field: { onChange: onChangeDescription, onBlur, value: valueDescription = '', ref },
//     fieldState: { invalid: descriptionInvalid, error: descriptionError }
//   } = useController({
//     name: descriptionName,
//     control,
//     rules: { required: `${descriptionName} is required` }
//   });

//   const {
//     field: { onChange: onChangeColor, value: valueColor },
//     fieldState: { invalid: colorInvalid, error: colorError }
//   } = useController({
//     name: colorName,
//     control,
//     rules: { required: `Color is required` },
//     defaultValue: [], // Initialize with empty array if null or undefined
//   });

//   // Initialize color array if it's null
//   useEffect(() => {
//     if (valueColor === null) {
//       setValue(colorName, []);
//     }
//   }, [valueColor, colorName, setValue]);

//   const handleColorChange = (color: ColorResult) => {
//     setColorInput(color.hex);
//   };

//   const addColor = () => {
//     if (colorInput && colorNameInput) {
//       const currentColors = getValues(colorName) || [];
//       if (!currentColors.some((c: any) => c.hex === colorInput)) {
//         const newColors = [...currentColors, { name: colorNameInput, hex: colorInput }];
//         setValue(colorName, newColors);
//         setColorInput('');
//         setColorNameInput('');
//       }
//     }
//   };

//   const removeColor = (colorToRemove: string) => {
//     const currentColors = getValues(colorName) || [];
//     const updatedColors = currentColors.filter((color: any) => color.hex !== colorToRemove);
//     setValue(colorName, updatedColors);
//   };

//   return (
//     <>
//       {sizes.map((size, index) => (
//         <FormGroup key={index} className="mb-3">
//           <Row>
//             <Col xl="3" sm="4">
//               <Label className="fw-bold mb-0">Size {size}:</Label>
//             </Col>
//             <Col xl="8" sm="7">
//               <Input 
//                 type="text" 
//                 name={size} 
//                 placeholder={`Enter size ${size} quantity`} 
//                 defaultValue=""
//                 onChange={(e) => setValue(size, e.target.value)}
//               />
//             </Col>
//           </Row>
//         </FormGroup>
//       ))}

//       <FormGroup className="mb-3">
//         <Row>
//           <Col xl="3" sm="4">
//             <Label className="fw-bold mb-0">Select Colors :</Label>
//           </Col>
//           <Col xl="8" sm="7">
//             <Button onClick={() => setDisplayColorPicker(!displayColorPicker)}>
//               {displayColorPicker ? 'Close Color Picker' : 'Pick Color'}
//             </Button>
//             {displayColorPicker && (
//               <SketchPicker color={colorInput} onChangeComplete={handleColorChange} />
//             )}
//             <Input
//               type="text"
//               placeholder="Color Name"
//               value={colorNameInput}
//               onChange={(e) => setColorNameInput(e.target.value)}
//               className="mt-2"
//             />
//             <div className="mt-2">
//               <Button color="primary" onClick={addColor} disabled={!colorInput || !colorNameInput}>
//                 Add Color
//               </Button>
//               <div className="mt-2">
//                 {Array.isArray(valueColor) && valueColor.map(color => (
//                   <div key={color.hex} style={{ display: 'inline-block', marginRight: '10px' }}>
//                     <div style={{ backgroundColor: color.hex, width: '30px', height: '30px', display: 'inline-block', borderRadius: '50%' }}></div>
//                     <span>{color.name}</span>
//                     <Button color="danger" size="sm" onClick={() => removeColor(color.hex)}>
//                       &times;
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {colorInvalid && <div className="invalid-feedback d-block">{colorError?.message}</div>}
//           </Col>
//         </Row>
//       </FormGroup>
      
//       <FormGroup>
//         <Row>
//           <Col xl="3" sm="4">
//             <Label className="fw-bold">Add Description :</Label>
//           </Col>
//           <Col xl="8" sm="7" className="description-sm">
//             <MDEditor
//               value={valueDescription}
//               onChange={onChangeDescription}
//               onBlur={onBlur}
//               ref={ref}
//             />
//             {descriptionInvalid && <div className="invalid-feedback d-block">{descriptionError?.message}</div>}
//           </Col>
//         </Row>
//       </FormGroup>
//     </>
//   );
// };

// export default ProductSizeAndDescription;
import React, { useState, useEffect } from 'react';
import MDEditor from "@uiw/react-md-editor";
import { useController, useFormContext } from 'react-hook-form';
import { FormGroup, Label, Row, Col, Button, Input } from "reactstrap";
import { SketchPicker, ColorResult } from 'react-color';

interface ProductSizeAndDescriptionProps {
  descriptionName: string;
  sizes: string[];
  colorName: string;
}

const ProductSizeAndDescription: React.FC<ProductSizeAndDescriptionProps> = ({ descriptionName, sizes, colorName }) => {
  const { control, setValue, getValues } = useFormContext();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorInput, setColorInput] = useState<string>('');
  const [colorNameInput, setColorNameInput] = useState<string>('');

  const {
    field: { onChange: onChangeDescription, onBlur, value: valueDescription = '', ref },
    fieldState: { invalid: descriptionInvalid, error: descriptionError }
  } = useController({
    name: descriptionName,
    control,
    rules: { required: `${descriptionName} is required` }
  });

  const {
    field: { onChange: onChangeColor, value: valueColor },
    fieldState: { invalid: colorInvalid, error: colorError }
  } = useController({
    name: colorName,
    control,
    rules: { required: `Color is required` },
    defaultValue: [], // Initialize with empty array if null or undefined
  });

  // Initialize color array if it's null
  useEffect(() => {
    if (valueColor === null) {
      setValue(colorName, []);
    }
  }, [valueColor, colorName, setValue]);

  const handleColorChange = (color: ColorResult) => {
    setColorInput(color.hex);
  };

  const addColor = () => {
    if (colorInput && colorNameInput) {
      const currentColors = getValues(colorName) || [];
      if (!currentColors.some((c: any) => c.hex === colorInput)) {
        const newColors = [...currentColors, { name: colorNameInput, hex: colorInput }];
        setValue(colorName, newColors);
        setColorInput('');
        setColorNameInput('');
      }
    }
  };

  const removeColor = (colorToRemove: string) => {
    const currentColors = getValues(colorName) || [];
    const updatedColors = currentColors.filter((color: any) => color.hex !== colorToRemove);
    setValue(colorName, updatedColors);
  };

  return (
    <>
      {sizes.map((size, index) => (
        <FormGroup key={index} className="mb-3">
          <Row>
            <Col xl="3" sm="4">
              <Label className="fw-bold mb-0">Size {size}:</Label>
            </Col>
            <Col xl="8" sm="7">
              <Input 
                type="text" 
                name={size} 
                placeholder={`Enter size ${size} quantity`} 
                defaultValue=""
                onChange={(e) => setValue(size, e.target.value)}
              />
            </Col>
          </Row>
        </FormGroup>
      ))}

      <FormGroup className="mb-3">
        <Row>
          <Col xl="3" sm="4">
            <Label className="fw-bold mb-0">Select Colors :</Label>
          </Col>
          <Col xl="8" sm="7">
            <Button onClick={() => setDisplayColorPicker(!displayColorPicker)}>
              {displayColorPicker ? 'Close Color Picker' : 'Pick Color'}
            </Button>
            {displayColorPicker && (
              <SketchPicker color={colorInput} onChangeComplete={handleColorChange} />
            )}
            <Input
              type="text"
              placeholder="Color Name"
              value={colorNameInput}
              onChange={(e) => setColorNameInput(e.target.value)}
              className="mt-2"
            />
            <div className="mt-2">
              <Button color="primary" onClick={addColor} disabled={!colorInput || !colorNameInput}>
                Add Color
              </Button>
              <div className="mt-2">
                {Array.isArray(valueColor) && valueColor.map(color => (
                  <div key={color.hex} style={{ display: 'inline-block', marginRight: '10px' }}>
                    <div style={{ backgroundColor: color.hex, width: '30px', height: '30px', display: 'inline-block', borderRadius: '50%' }}></div>
                    <span>{color.name}</span>
                    <Button color="danger" size="sm" onClick={() => removeColor(color.hex)}>
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {colorInvalid && <div className="invalid-feedback d-block">{colorError?.message}</div>}
          </Col>
        </Row>
      </FormGroup>
      
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

