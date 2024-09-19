import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { ImagePath, apiImagePath, category, subCategory } from "@/Constants";
import { logoutUser } from "@/Helper";
// import { ProductCategoryData } from "@/Data/Product/Physical";
import { useAppSelector } from "@/Redux/Hooks";
import { createRequest, deleteRequest, fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
import { fetchCategoryRequest } from "@/Redux/main/actions/productConfig";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const SubCategory = () => {
    const dispatch = useDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const router = useRouter();
    const {activeList}  = entities.category;

    const { data, loading, error,success } = entities.category;
    interface ProductCategory {
        id: number;
        image: JSX.Element;
        name: string | undefined;
        category: any;
        date: string;
    }
    interface Category {
        id: string; // Assuming id is a string, adjust the type if it's different
        name: string;
    }


    const [productCategoryData, setProductCategoryData] = useState<ProductCategory[]>([]);

    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [rowId, setRowId] = useState('');
    const [categories, setCategories] = useState<any>([]);

    const validate = () => {
        console.log(categoryId)
        const newErrors: { [key: string]: string } = {};
        if (!categoryName) newErrors.categoryName = 'Category name is required';
        if (!categoryImage) newErrors.categoryImage = 'Category image is required';
        if (!categoryId) newErrors.categoryId = 'Category is required';
        return newErrors;
    };


    const onEditOpenModal = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.id)
        setRowId(e.target.id??'')
        setOpen(true);
    };
    const onOpenModal = () => {
        setRowId('');

        setOpen(true);
    };
    const onCloseModal = () => {
        setRowId('');
        setCategoryImage(null);
        setCategoryName('');
        setCategoryId('');
        setOpen(false);
    };
    const handleDeleteCategory = (id:number) => {
        console.log(id)
        setIsDelete(true);
        dispatch(deleteRequest(subCategory,id));
        setRowId('');


    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
        if (errors.categoryName) {
            setErrors({ ...errors, categoryName: '' });
        }
    };
    const handleCatIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
        if (errors.categoryId) {
            setErrors({ ...errors, categoryId: '' });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
            if (errors.categoryImage) {
                setErrors({ ...errors, categoryImage: '' });
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
        formData.append('categoryId', categoryId);
        // console.log(categoryImage)
        if (categoryImage) {
            formData.append('image',categoryImage);
        }
// console.log(formData)
        if(rowId!=''){
            const id = rowId;
            dispatch(updateRequest(subCategory,formData,id));

        }else{
            dispatch(createRequest(subCategory,formData));

            // dispatch(saveCategoryRequest(formData));

        }
        onCloseModal();


    };

    useEffect(() => {
        if (!loading) {

            dispatch(fetchRequest(category));
            // dispatch(fetchCategoryRequest());

        }
    }, [dispatch]);

    useEffect(()=>{
        // if (activeList!=null&&activeList.responseCode==200) {
        //     const data = activeList.responseData;
        //     // console.log(data);

        //     setCategories(data??[])
        // }
    },[activeList])

    useEffect(() => {
        // console.log(data);
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
            const productCategoryData :ProductCategory[]= dataT.map((product: { id: number; name: string | undefined; image_url: any, categoryId: any, createdat: Date; }) => ({
                id: product.id,
                image: <img alt={product.name} src={product.image_url != null ? `${apiImagePath}/${product.image_url}` : `${ImagePath}/dashboard/product/1.jpg`} style={{ width: 50, height: 50 }} />,
                name: product.name,
                category: product.categoryId,
                date: new Date(product.createdat).toLocaleString(), // Format the date
            })) || [];

            setProductCategoryData(productCategoryData);
        }
        else if (error != null && 'responseCode' in error && (error as { responseCode: number }).responseCode === 400) {
            logoutUser();
            router.push(`/auth/login`);

        }else if(error!=null){
            toast.error(('responseMessage' in error ?  (error as { responseMessage: string}).responseMessage:''));

        }
    }, [data,error]);
    useEffect(()=>{

        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ?  (success as { responseMessage: string}).responseMessage:''));
            // console.log(isDelete)
            if (!loading&&isDelete==false) {
                dispatch(fetchRequest(category));
            }
            setIsDelete(false);
        }
    },[success])

    return (
        <Fragment>
            <CommonBreadcrumb title="Sub Category" parent="Physical" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Product Sub Category" />
                            <CardBody>
                                <ButtonGroup className=" pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Sub Category
                                    </Button>
                                    <Modal isOpen={open}  data-bs-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
                                        <ModalHeader>
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                                                {rowId!=''?'Edit':'Add'} Sub Category
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                        Sub Category Name :
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
                                                        Category :
                                                    </Label>
                                                    <select onChange={handleCatIdChange} className={errors.categoryId ? "invalid form-control" : " form-control"}>
                                                        <option value="">Select a category</option>
                                                        {categories!=null&&categories.map((category: Category) => ( // Type annotation for category parameter
                                                            <option selected={categoryId==category.id} key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.categoryId && (
                                                        <div className="text-danger">{errors.categoryId}</div>
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
                                    <Datatable myData={productCategoryData} multiSelectOption={false} pageSize={10} pagination={true} edit={true} editAction={onEditOpenModal} deleteAction={handleDeleteCategory} class="-striped -highlight" />

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
export default SubCategory;
