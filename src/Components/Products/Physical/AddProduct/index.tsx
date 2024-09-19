import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Button, Card, CardBody, Col, Container, Row, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import CommonBreadcrumb from '@/CommonComponents/CommonBreadcrumb';
import CommonCardHeader from '@/CommonComponents/CommonCardHeader';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import CategorySelect from '@/CommonComponents/CategorySelect';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import ProductImages from '@/Components/Products/Physical/AddProduct/ProductImages';
import ProductSizeAndDescription from '@/Components/Products/Physical/AddProduct/ProductSizeAndDescription';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { logoutUser } from "@/Helper";
import { activeListRequest, createRequest, updateRequest, editRequest, fetchRequest } from "../../../../Redux/main/actions/actions";
import { attribute, category, option, product } from "@/Constants";
import _ from 'lodash';
import { setOptions } from 'react-chartjs-2/dist/utils';

interface EditResponse {
    images_array: Array<{ image_url: string }> | undefined;
    title: string;
    sku: string;
    summary?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    categoryId?: string;
    price?: number;
    discountPrice?: any;
    status?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    isSpecial?: boolean;
    options: Array<any> | undefined;
    attributes: Array<any> | undefined;
    size: Array<any> | undefined;
}

interface Option {
    name: string;
    values: { name: string; hex: string }[] | string[]; // Values can be an array of objects or strings
}

interface Attribute {
    name: string;
    values: string | string[]; // Values can be a string or an array of strings
}

interface ApiResponse {
    responseCode: number;
    responseData: EditResponse | null;
}

interface AddProductProps {
    id: string;
    lng: string;
}

const AddProduct: React.FC<AddProductProps> = ({ id, lng }) => {
    const dispatch = useAppDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const router = useRouter();
    const { loading, error, success, editData ,data} = entities.product;
    const { activeList } = entities.category;
    const { loading: optionsLoading, error: optionsError, success: optionsSuccess, data: optionData } = entities.options;
    const { loading: attributeLoading, error: attributeError, success: attributeSuccess, data: attributeData } = entities.attribute;

    const [categoryId, setCategoryId] = useState<string>('');
    const [categories, setCategories] = useState<any[]>([]);
    const [optionsData, setOptionsData] = useState<any[]>([]);
    const [attributesData, setAttributesData] = useState<any[]>([]);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [editResponse, setEditResponse] = useState<EditResponse | null>(null);
    const [sizes, setSizes] = useState<string[]>(editResponse?.size ?? []);


    const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleAddSizes = () => {
        const mergedSizes: string[] = Array.from(new Set<string>([...sizes, ...defaultSizes]));
        setSizes(mergedSizes);
    };
    

    const methods = useForm();
    const { control, formState: { errors }, reset, getValues } = methods;
    const handleBack = useCallback(
        _.debounce(() => {
          router.back();
        }, 300), // Adjust the debounce time as needed
        []
      );
    

    //   const pathname = usePathname();
    //   const searchParams = useSearchParams();
    
    //   useEffect(() => {
    //     // Refetch data or reset state here based on pathname or search params
    //     // For example: resetForm() or fetchData()
    //       reset([]);
    //       setEditResponse(null)
    //   }, [pathname, searchParams]);
        
    useEffect(() => {
        if (id) {
            dispatch(editRequest(product, id));
        } else {
            reset(); // Reset the form state
            setEditResponse(null); // Reset the editResponse state
        }
    }, [id, dispatch, reset]);


    
    useEffect(() => {
        if (editData && 'responseCode' in editData && (editData as ApiResponse).responseCode === 200) {
            const editRes = (editData as ApiResponse).responseData;
            if (editRes) {
                const attributes: Record<string, string> = {};
                editRes.attributes?.forEach(attr => {
                    attributes[`attributes_[]`] = attr as string;
                    // attributes[`attributes[${attr.name}]`] = attr.values as string;
                });

                const options: Record<string, string> = {};
                editRes.options?.forEach(option => {
                    options[`options_[]`] = option as string;
                    // options[`options[${option.name}]`] = option.values as string[];
                });

                const size = editRes.size?.map((item: { size: string; quantity: number; id: number }) => ({
                    size: item.size,
                    quantity: item.quantity,
                    // id: item.id
                })) || [];
    
                // Combine all processed data
                const processedData = { ...editRes, ...attributes, ...options, size };
                
                    reset(processedData);
                setEditResponse(editRes);
            }
        }
    }, [reset,editData]);

    const onSubmit = async (data: any) => {
        data.status = isActive ? true : false;
        const formData = new FormData();
    
        // Handle images
        if (data.images && Array.isArray(data.images)) {
            data.images.forEach((image: File) => {
                // Ensure the image is a File object before appending
                if (image instanceof File) {
                    formData.append('images', image); // No '[]' if your backend expects 'images' without array syntax
                }
            });
        }
    
        // Fields to exclude from FormData
        const excludeFields = [
            'images_array', 
            'images', 
            'categoryName', 
            'is_deleted', 
            'createdAt', 
            'updatedAt',
            'attributes',
            'attributes_array',
            'options_array',
            'attributes_',
            'options',
            'options_',
            'star',
            'size',
            // Add any other fields you want to exclude
        ];
    
        // Append other data fields to FormData
        Object.keys(data).forEach(key => {
            if (!excludeFields.includes(key) && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });
        // const commaSeparatedOptions = data.options_.join(', ');
// console.log(data.attributes_); // Output: "Option1, Option2, Option3"

    var attributes="5,6";
    // var attributes=JSON.stringify(["5"]);

        // Append attributes and options
        formData.append('attributes',attributes);
        formData.append('options', attributes);
    
        // Append size as a JSON string
        formData.append('size', JSON.stringify(data.size ?? []));
    
        // Dispatch the request
        if (id) {
            dispatch(updateRequest(product, formData, id));
        } else {
            dispatch(createRequest(product, formData));
        }
    };
    
//     const onSubmit = async (data: any) => {
//         data.status = isActive==true?true:false;
//         const formData = new FormData();

//         // Handle images
// //         if (data.images) {
// //             Array.from(data.images as File[]).forEach((image: File) => {
// //               // newImages.push(image);
// //   // console.log(image)
// //               if(typeof image === 'object'){
// //               formData.append('images[]', image);
// //               }
// //             });
// //           }
// if (data.images && Array.isArray(data.images)) {
//     data.images.forEach((image: File) => {
//       // Ensure the image is a File object before appending
//       if (image instanceof File) {
//         formData.append('images', image);
//       }
//     });
//   }
  
          
      
//           // Append new image files to FormData
//           // newImages.forEach((image: File) => {
//           //   formData.append('images[]', image);
//           // });
      
//           // Append existing image URLs as JSON
//           // if (existingImages.length > 0) {
//           //   formData.append('existingImages', JSON.stringify(existingImages));
//           // }
      
//           // Append other data fields to FormData
//           const excludeFields = [
//               'images_array', 
//               'images', 
//               'categoryName', 
//               'is_deleted', 
//               'createdAt', 
//               'updatedAt',
//               'attributes',
//               'attributes_',
//               'options',
//               'options_',
//               'size',
//             //   'attributes[Material]',
//             //   'options[name]'
//               // add any other fields you want to exclude
//             ];
            
  
//         // Transform attributes
//         // const transformedAttributes: Attribute[] = Object.keys(data.attributes)
//         // .filter(key => key === "gender" || key === "material")
//         // .map(key => ({
//         //     name: key,
//         //     values: data.attributes[key]
//         // }));

//         // // Transform options
//         // const transformedOptions: Option[] = Object.keys(data.options).filter(key => key === "color" || key === "size").map(key => ({
//         //     name: key,
//         //     values: data.options[key]
//         // }));

//         // Append other data fields to FormData
//         Object.keys(data).forEach(key => {
//             if (!excludeFields.includes(key) && data[key] !== undefined) {
//                                 formData.append(key, data[key]);
//             }
//         });
// // console.log(data)
//         // Append transformed attributes and options
//         // formData.append('attributes', JSON.stringify(data.attributes_));
//         // formData.append('options', JSON.stringify(data.options_));
//         // formData.append('attributes', JSON.stringify(['5','6']));
//         // formData.append('options', JSON.stringify(['5']));
//         formData.append('attributes',"5");
//         formData.append('options',"5");
//         formData.append('size', JSON.stringify(data.size??[]));

//         // formData.forEach((value, key) => {
//         //     console.log(`${key}: ${value}`);
//         // });

//         // Dispatch the request
//         if (id) {
//             dispatch(updateRequest(product, formData, id));
//         } else {
//             dispatch(createRequest(product, formData));
//         }
//     };

    useEffect(() => {
        if (!loading) {
            dispatch(activeListRequest(category, { isActive: true }));
            dispatch(fetchRequest(option, { isActive: true }));
            dispatch(fetchRequest(attribute, { isActive: true }));
        }
    }, [dispatch]);
    useEffect(() => {
        console.log(entities.options)

      if (optionData && 'responseCode' in optionData && (optionData as ApiResponse).responseCode === 200) {
          const dataT = (optionData as { responseData: any[] }).responseData;
          setOptionsData(dataT);
      }
  }, [optionData]);
  
    useEffect(() => {

      if (attributeData && 'responseCode' in attributeData && (attributeData as ApiResponse).responseCode === 200) {
          const dataT = (attributeData as { responseData: any[] }).responseData;
          setAttributesData(dataT);
      }

  }, [attributeData]);
  

    useEffect(() => {
        if (activeList && 'responseCode' in activeList && (activeList as ApiResponse).responseCode === 200) {
            const dataT = (activeList as { responseData: any[] }).responseData;
            setCategories(dataT);
        }
    }, [activeList]);

    useEffect(() => {
        if (error && typeof error === 'object' && !Array.isArray(error)) {
            if ('responseCode' in error && (error as ApiResponse).responseCode === 403) {
                logoutUser();
                router.push(`/auth/login`);
            } else if ('responseCode' in error && (error as ApiResponse).responseCode === 400) {
                toast.error((error as { responseMessage: string }).responseMessage);
            } else {
                toast.error((error as { responseMessage: string }).responseMessage);
            }
        }
    }, [error]);

    useEffect(() => {
        if (success && 'responseCode' in success && (success as ApiResponse).responseCode === 200) {
            toast.success((success as { responseMessage: string }).responseMessage);
        }
    }, [success]);

    return (
        <Fragment>
            <CommonBreadcrumb title={id ? 'Edit Product' : 'Add Product'} parent="Physical" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title={id ? 'Edit Product' : 'Add Product'} />
                            <CardBody>
                                <FormProvider {...methods}>
                                    <Form className="add-product-form" method="POST" encType="multipart/form-data" onSubmit={methods.handleSubmit(onSubmit)}>
                                        <Row className="product-adding">
                                            <ProductImages images={editResponse ? editResponse.images_array : []} />
                                            <Col xl="7">
                                                <div className="digital-add needs-validation">
                                                    <FormGroup className="mb-3">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold mb-0">Category :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7">
                                                                <Controller
                                                                    name="categoryId"
                                                                    control={control}
                                                                    defaultValue=""
                                                                    rules={{ required: 'Category is required' }}
                                                                    render={({ field }) => (
                                                                        <CategorySelect
                                                                            name="categoryId"
                                                                            categories={categories}
                                                                            selectedCategoryId={field.value ?? editResponse?.categoryId ?? ''}
                                                                            onChange={(e) => {
                                                                                field.onChange(e);
                                                                                setCategoryId(e.target.value);
                                                                            }}
                                                                            errors={{ 'categoryId': `${errors.categoryId?.message}` }}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.categoryId && <h6 className="text-danger ">{`${errors.categoryId?.message}`}</h6>}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold mb-0">Product Name :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7">
                                                                <Controller
                                                                    name="title"
                                                                    control={control}
                                                                    defaultValue={editResponse?.title ?? ''}
                                                                    rules={{ required: 'Product name is required' }}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.title ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.title && (
                                                                    <FormFeedback className="d-block">
                                                                        {errors.title.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold mb-0">Sku :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7">
                                                                <Controller
                                                                    name="sku"
                                                                    control={control}
                                                                    defaultValue={editResponse?.sku ?? ''}
                                                                    rules={{ required: 'SKU is required' }}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.sku ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.sku && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.sku.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold mb-0">Price :</Label>
                                                            </Col>
                                                            <Col sm="7" xl="8">
                                                                <Controller
                                                                    name="price"
                                                                    control={control}
                                                                    defaultValue={editResponse?.price ?? ''}
                                                                    rules={{ required: 'Price is required' }}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="number"
                                                                            {...field}
                                                                            className={errors.price ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.price && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.price.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold mb-0">Discount Price:</Label>
                                                            </Col>
                                                            <Col sm="7" xl="8">
                                                                <Controller
                                                                    name="discountPrice"
                                                                    control={control}
                                                                    defaultValue={editResponse?.discountPrice ?? ''}
                                                                    rules={{ required: 'Discount Price is required' }}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.discountPrice ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.discountPrice && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.discountPrice.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Summary :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className=" description-sm">
                                                                <Controller
                                                                    name="summary"
                                                                    control={control}
                                                                    defaultValue={editResponse?.summary ?? ''}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.summary ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.summary && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.summary.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    {/* <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Material :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className=" description-sm">
                                                                <Controller
                                                                    name="attributes[material]"
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                        <FormGroup className="mb-3">
        <Row>
          <Col xl="3" sm="4">
            <Label className="fw-bold">Gender :</Label>
          </Col>
          <Col xl="8" sm="7" className="description-sm">
            <Controller
              name="attributes[gender]"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </Input>
              )}
            />
          </Col>
        </Row>
      </FormGroup> */}

                                                    <ProductSizeAndDescription descriptionName="description"  optionsData={optionsData} attributesData={attributesData} initialSizes={editResponse?.size ?? []} />
                                                    <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Meta Title :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className=" description-sm">
                                                                <Controller
                                                                    name="metaTitle"
                                                                    control={control}
                                                                    defaultValue={editResponse?.metaTitle ?? ''}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.metaTitle ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.metaTitle && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.metaTitle.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Meta Description :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className=" description-sm">
                                                                <Controller
                                                                    name="metaDescription"
                                                                    control={control}
                                                                    defaultValue={editResponse?.metaDescription ?? ''}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            {...field}
                                                                            className={errors.metaDescription ? 'is-invalid' : ''}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors.metaDescription && (
                                                                    <FormFeedback className="invalid-feedback">
                                                                        {errors.metaDescription.message?.toString()}
                                                                    </FormFeedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Status :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className="description-sm">
                                                                <div className="d-flex align-items-center">
                                                                    <Label className="form-switch">
                                                                        <Input
                                                                            type="checkbox"
                                                                            id="statusToggle"
                                                                            className="custom-control-input"
                                                                            checked={isActive}
                                                                            value={isActive.toString()}
                                                                            onChange={(e) => {
                                                                                setIsActive(e.target.checked);
                                                                            }}
                                                                        />
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <Row>
                                                  <Col md="4">
                                                  <FormGroup check>
  <Label className="fw-bold" check>
    <Controller
      name="isNew"
      control={control}
      defaultValue={editResponse?.isNew ?? false}
      render={({ field }) => (
        <Input
          type="checkbox"
          {...field}
          className="form-check-input"
          checked={field.value} // Use field.value to manage the checked state
          onChange={(e) => field.onChange(e.target.checked)} // Update value on change
        />
      )}
    />
    Is New
  </Label>
</FormGroup>

                                    </Col>
                                    <Col md="4">
                                        <FormGroup check>
                                            <Label className="fw-bold" check>
                                                <Controller
                                                    name="isFeatured"
                                                    control={control}
                                                    defaultValue={editResponse?.isFeatured??false}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="checkbox"
                                                            {...field}
                                                            className="form-check-input"
                                                            checked={field.value} // Use field.value to manage the checked state
                                                            onChange={(e) => field.onChange(e.target.checked)} // Update value on change
                                                        />
                                                    )}
                                                />
                                                Is Featured
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup check>
                                            <Label className="fw-bold" check>
                                                <Controller
                                                    name="isSpecial"
                                                    control={control}
                                                    defaultValue={editResponse?.isSpecial??false}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="checkbox"
                                                            {...field}
                                                            className="form-check-input"
                                                            checked={field.value} // Use field.value to manage the checked state
          onChange={(e) => field.onChange(e.target.checked)} // Update value on change
                                                        />
                                                    )}
                                                />
                                                Is Special
                                            </Label>
                                        </FormGroup>
                                    </Col>

                                                  </Row>
                                                    <div className="offset-xl-3 offset-sm-4">
                                                        <Button type="submit" color="primary">
                                                            {id ? 'Edit' : 'Add'}
                                                        </Button>
                                                        <Button type="button" color="light" onClick={router.back}>
                                                            Discard
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </FormProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default AddProduct;