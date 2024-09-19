import CategorySelect from "@/CommonComponents/CategorySelect";
import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { ImagePath, category } from "@/Constants";
import { logoutUser } from "@/Helper";
// import { ProductCategoryData } from "@/Data/Product/Physical";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { activeListRequest, createRequest, deleteRequest, editRequest, fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
import { isPlainObject } from "@reduxjs/toolkit";
// import { fetchCategoryRequest } from "@/Redux/main/actions/productConfig";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
interface ApiResponse {
    responseCode: number;
    responseData: object | null;
}

const Category = () => {
    const dispatch = useAppDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const perPage = 10;
    // const {categoryList}  = product;
    const { activeList } = entities.category;

    const { data, loading, error,success ,editData} = entities.category;
    interface ProductCategory {
        id: number;
        name: string | undefined;
        parentCategory: JSX.Element;
        status: JSX.Element;
    }
    
    interface Category {
        id: string; // Assuming id is a string, adjust the type if it's different
        name: string;
    }


    const [productCategoryData, setProductCategoryData] = useState<ProductCategory[]>([]);

    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState<string>('');
    const [parentCategoryId, setparentCategoryId] = useState<string>('');
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [rowId, setRowId] = useState('');
    const [categories, setCategories] = useState<any>([]);
    const [previewUrl, setPreviewUrl] = useState('');


    const validate = () => {
        // console.log(parentCategoryId)
        const newErrors: { [key: string]: string } = {};
        if (!categoryName) newErrors.categoryName = 'Category name is required';
        if (!categoryImage&&rowId=='') newErrors.categoryImage = 'Category image is required';
        // if (!parentCategoryId) newErrors.parentCategoryId = 'Category is required';
        return newErrors;
    };


    const onEditOpenModal = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.dataset.row)


        dispatch(editRequest(category,e.target.id));

    };
    const onOpenModal = () => {
        setRowId('');

        setOpen(true);
    };
    const onCloseModal = () => {
        setRowId('');
        setCategoryImage(null);
        setCategoryName('');
        setPreviewUrl('');
        setparentCategoryId('');
        setIsActive(true);
        setOpen(false);
        setErrors({});
    };
    const handleDeleteCategory = (id:number) => {
        // console.log(id)
        setIsDelete(true);
        dispatch(deleteRequest(category,id));
        setRowId('');


    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
        if (errors.categoryName) {
            setErrors({ ...errors, categoryName: '' });
        }
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(!isActive)
        setIsActive(!isActive);
        // if (errors.isActive) {
        //   setErrors({ ...errors, isActive: '' });
        // }
    };
    const handleCatIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setparentCategoryId(e.target.value);
        if (errors.parentCategoryId) {
            setErrors({ ...errors, parentCategoryId: '' });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {

            const file = e.target.files[0];
            if (file) {
                setCategoryImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                if (errors.categoryImage) {
                    setErrors({ ...errors, categoryImage: '' });
                }

            }
        }
    };


    const onCategorySave =async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validate();
        // console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            // if(newErrors.categoryName||newErrors.categoryImage){


            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('parentCategoryId', parentCategoryId);
        formData.append('isActive', isActive.toString());
        // console.log(categoryImage)
        if (categoryImage) {
            formData.append('image',categoryImage);
        }
// console.log(formData)
        if(rowId!=''){
            const id = rowId;
            dispatch(updateRequest(category,formData,id));

        }else{
            dispatch(createRequest(category,formData));

            // dispatch(saveCategoryRequest(formData));

        }


    };
    useEffect(() => {
        if (!loading) {
            dispatch(activeListRequest(category, { isActive: true }));
        }
    }, [dispatch]);

    useEffect(() => {
        if (activeList && 'responseCode' in activeList && (activeList as ApiResponse).responseCode === 200) {
            const dataT = (activeList as { responseData: any[] }).responseData;
            setCategories(dataT);
        }
    }, [activeList]);

    useEffect(() => {
        if (!loading) {

            dispatch(fetchRequest(category,{'page':page,'perPage':perPage}));
            setPage(page+1);
            // dispatch(fetchCategoryRequest());

        }
    }, [dispatch]);
    

    useEffect(()=>{
        // console.log(editData)
        if (editData != null && 'responseCode' in editData && (editData as { responseCode: number }).responseCode === 200) {
            // setCategories(data??[])


            const edit = 'responseData' in editData ? (editData as { responseData:any }).responseData : null;
            // setCategories(dataT);
            if(edit){
                setCategoryName(edit.name);
                setRowId(edit.id);
                setIsActive(edit.isActive);
                setparentCategoryId(edit.parentCategoryId??'');
                setPreviewUrl(edit.image_url);
                setOpen(true);

            }
        }

        //   if (categoryList!=null&&categoryList.responseCode==200) {
        //     const data = categoryList.responseData;
        //   // console.log(data);

        //   setCategories(data??[])
        //   }
    },[editData,error])

    useEffect(() => {
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
            // Set data
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
    
            if (isPlainObject(dataT) && 'listCategory' in dataT) {
                const pList = 'listCategory' in dataT ? (dataT as { listCategory: any[] }).listCategory : [];
    
                // Mapping product category data with 'image' and 'date' columns
                const productCategoryData: ProductCategory[] = Array.isArray(pList) && pList.map((product: { id: number; name: string | undefined; parentCategory: any | null; isActive: boolean; image_url: string; created_at: string; }) => {
                    const parentCategoryName = product.parentCategory ? product.parentCategory.name : '';
                    const parentCategoryImage = product.parentCategory ? (
                        <img 
                        // alt={parentCategoryName} 
                        // src={product.parentCategory.image_url != null ? `${product.parentCategory.image_url}` : `${ImagePath}/dashboard/product/1.jpg`} 
                        style={{ width: 0, height: 0 }} 
                        />
                    ) : '';
    
                    return {
                        id: product.id,
                        name: product.name,
                        parentCategory: (
                            <span>
                                {parentCategoryImage} {parentCategoryName}
                            </span>
                        ),
                       
                        status: product.isActive ? <i className="fa fa-circle font-success f-12" /> : <i className="fa fa-circle font-danger f-12" />,
                    };
                }) || [];
    
                setProductCategoryData(productCategoryData);
            }
        }
    }, [data]);
    
    
    useEffect(()=>{

        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ?  (success as { responseMessage: string}).responseMessage:''));
            // console.log(isDelete)
            if (!loading&&isDelete==false) {
                dispatch(fetchRequest(category));
                dispatch(activeListRequest(category, { isActive: true }));

                onCloseModal();

            }
            setIsDelete(false);
        }
    },[success])
    useEffect(()=>{
        // console.log(error)
        if (error != null && 'responseCode' in error && (error as { responseCode: number }).responseCode === 403) {
            logoutUser();
            router.push(`/auth/login`);

        }
        else if (error != null && 'responseCode' in error && (error as { responseCode: number }).responseCode === 400) {
            // logoutUser();
            // router.push(`/auth/login`);
            toast.error(('responseMessage' in error ?  (error as { responseMessage: string}).responseMessage:''));


        }else if(error!=null){
            toast.error(('responseMessage' in error ?  (error as { responseMessage: string}).responseMessage:''));

        }
    },[error])
    // {console.log(loading)}
    // {console.log(productCategoryData)}

    return (
        <Fragment>

            <CommonBreadcrumb title="Category" parent="Physical" />
            {loading && <Loader />}

            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Product Category" />
                            <CardBody>
                                <ButtonGroup className=" pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Category
                                    </Button>
                                    <Modal isOpen={open}  data-bs-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <ModalHeader>
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                                                {rowId!=''?'Edit':'Add'} Category
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                        Category Name :
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        value={categoryName}
                                                        onChange={handleNameChange}
                                                        invalid={!!errors.categoryName}
                                                        required
                                                    />
                                                    {errors.categoryName && (
                                                        <FormFeedback>{errors.categoryName}</FormFeedback>
                                                    )}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                        Parent Category :
                                                    </Label>
                                                    <CategorySelect
                                                        name="parentCategoryId"
                                                        categories={categories}
                                                        selectedCategoryId={parentCategoryId}
                                                        onChange={handleCatIdChange}
                                                        errors={errors}
                                                    />
                                                    {errors.parentCategoryId && (
                                                        <div className="text-danger">{errors.parentCategoryId}</div>
                                                    )}

                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="message-text" className="col-form-label">
                                                        Category Image:
                                                    </Label>
                                                    <Input
                                                        id="validationCustom02"
                                                        type="file"
                                                        onChange={handleImageChange}
                                                        invalid={!!errors.categoryImage}
                                                        required
                                                    />
                                                    {errors.categoryImage && (
                                                        <FormFeedback>{errors.categoryImage}</FormFeedback>
                                                    )}
                                                    {previewUrl && (
                                                        <div>
                                                            <img src={previewUrl} alt="Category Preview" style={{ maxHeight: '200px', marginTop: '10px' }} />
                                                        </div>
                                                    )}

                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="statusToggle">Status</Label>
                                                    <div className="d-flex align-items-center">
                                                        <Label className="form-switch">
                                                            <Input
                                                                type="checkbox"
                                                                id="statusToggle"
                                                                checked={isActive}
                                                                onChange={handleStatusChange}
                                                                className="custom-control-input"
                                                            />
                                                            <span className="custom-control-label"></span>
                                                        </Label>
                                                        <span className="ms-2">{isActive ? 'Active' : 'Inactive'}</span>
                                                    </div>
                                                </FormGroup>

                                            </Form>           </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onCategorySave}>
                                                Save
                                            </Button>
                                            <Button color="secondary" onClick={onCloseModal}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </ButtonGroup>
                                <div className="clearfix"></div>
                                
                                <div id="basicScenario" className="product-physical">
                                    <Datatable myData={productCategoryData} multiSelectOption={false} pageSize={10} pagination={true} edit={true} perPage={perPage} editAction={onEditOpenModal} deleteAction={handleDeleteCategory} class="-striped -highlight" />

                                    {/* <Datatable myData={productCategoryData} multiSelectOption={false} pageSize={10} pagination={true} class="-striped -highlight" /> */}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default Category;
