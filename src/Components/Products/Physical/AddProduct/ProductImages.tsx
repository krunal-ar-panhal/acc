// // ProductImages.tsx
// import React, { useState, useEffect } from 'react';
// import { Col, Input, Row } from 'reactstrap';
// import { useFormContext, Controller } from 'react-hook-form';
// import { ImagePath } from "@/Constants";

// const ProductImages = (images:any) => {
//     const {  setValue, getValues } = useFormContext();
//     const [dummyImages, setDummyImages] = useState<Array<string | ArrayBuffer | null>>([
//         ImagePath+"/dashboard/user.png", ImagePath+"/dashboard/user.png", ImagePath+"/dashboard/user.png", ImagePath+"/dashboard/user.png", ImagePath+"/dashboard/user.png", ImagePath+"/dashboard/user.png"
//     ]);
//     useEffect(() => {
//         // Initialize the form values for images
//         setValue('images', []);
//     }, [setValue]);
//     useEffect(() => {
//         if (images && images.length > 0) {
//             const updatedDummyImages = [...dummyImages];
//             images.forEach((img:any, index:number) => {
//                 updatedDummyImages[index] = img.image_url ;
//             });
//             setDummyImages(updatedDummyImages);
//         }
//     }, [images]);


//     const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
//         e.preventDefault();
//         let reader = new FileReader();
//         const image = e.target.files && e.target.files[0];

//         if (image) {
//             reader.onload = () => {
//                 const updatedDummyImages = [...dummyImages];
//                 updatedDummyImages[i] = reader.result as string; // Ensure result is a string
//                 setDummyImages(updatedDummyImages);
//                             const currentImages = getValues('images');
//                             currentImages[i] = image;
//                             setValue('images', currentImages);
//             };

//             reader.readAsDataURL(image);
//         }
//     };

//     // const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
//     //     e.preventDefault();
//     //     const reader = new FileReader();
//     //     const image = e.target.files && e.target.files[0];
//     //
//     //     if (image) {
//     //         reader.onload = () => {
//     //             const updatedDummyImages = [...dummyImages];
//     //             updatedDummyImages[i] = reader.result;
//     //             setDummyImages(updatedDummyImages);
//     //
//     //             const currentImages = getValues('images');
//     //             currentImages[i] = image;
//     //             setValue('images', currentImages);
//     //         };
//     //
//     //         reader.readAsDataURL(image);
//     //     }
//     // };

//     return (
//         <Col xl="5">
//             <div className="add-product">
//                 <Row>
//                     <Col xl="9" className="xl-50" sm="6" xs="9">
//                         <div className="add-product-image">
//                             <img src={`${ImagePath}/pro3/2.jpg`} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
//                         </div>
//                     </Col>
//                     <Col xl="3" className="xl-50" xs="3" sm="6">
//                         <ul className="file-upload-product">
//                             {dummyImages.length>0&&dummyImages.map((res, i) => (
//                                 <li key={i}>
//                                     <div className="box-input-file">
//                                         <Input className="upload" name="images[]" type="file" onChange={(e) => handleImgChange(e, i)} />
//                                         <img alt="" src={typeof res === 'string' ? res : `${ImagePath}/dashboard/user.png`} style={{ width: 50, height: 50 }} />

//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </Col>
//                 </Row>
//             </div>
//         </Col>
//     );
// };

// export default ProductImages;
// ProductImages.tsx
import React, { useState, useEffect } from 'react';
import { Col, Input, Row, Button } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { ImagePath } from "@/Constants";

interface ProductImagesProps {
  images: Array<{ image_url: string }> | undefined;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const { setValue, getValues } = useFormContext();
  const [dummyImages, setDummyImages] = useState<Array<string | ArrayBuffer | null>>([]);

  useEffect(() => {
    setValue('images', []);
  }, [setValue]);

  useEffect(() => {
    if (images && images.length > 0) {
      const initialDummyImages = images.map(img => img.image_url);
      setDummyImages(initialDummyImages);
      setValue('images', images.map(img => img.image_url));
    }
  }, [images, setValue]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();
    const reader = new FileReader();
    const image = e.target.files && e.target.files[0];

    if (image) {
      reader.onload = () => {
        const updatedDummyImages = [...dummyImages];
        updatedDummyImages[i] = reader.result as string;
        setDummyImages(updatedDummyImages);

        const currentImages = getValues('images') || [];
        currentImages[i] = image;
        setValue('images', currentImages);
      };

      reader.readAsDataURL(image);
    }
  };

  const addImageInput = () => {
    setDummyImages([...dummyImages, `${ImagePath}/dashboard/user.png`]);
  };

  const removeImageInput = (index: number) => {
    const updatedDummyImages = [...dummyImages];
    updatedDummyImages.splice(index, 1);
    setDummyImages(updatedDummyImages);

    const currentImages = getValues('images') || [];
    currentImages.splice(index, 1);
    setValue('images', currentImages);
  };

  return (
    <Col xl="5">
      <div className="add-product">
        <Row>
          {dummyImages.map((res, i) => (
            
            <Col xl="4" sm="3" xs="6" className="mb-3" key={i}>
              <div className="box-input-file">
                <Input
                  className="upload"
                  name={`images[${i}]`}
                  type="file"
                  onChange={(e) => handleImgChange(e, i)}
                />
                <img
                  alt=""
                  src={typeof res === 'string' ? res : `${ImagePath}/dashboard/user.png`}
                  style={{ width: 100, height: 100 }}
                />
                <Button color="danger" onClick={() => removeImageInput(i)}>
                  Remove
                </Button>
              </div>
            </Col>
          ))}
          <Col xl="12" className="mt-3">
            <Button color="primary" onClick={addImageInput}>
              Add Image
            </Button>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductImages;

