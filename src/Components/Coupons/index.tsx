import CategorySelect from "@/CommonComponents/CategorySelect";
import CategorySelectMulty from "@/CommonComponents/CategorySelectMulty";
import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { category, couponVar } from "@/Constants";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { activeListRequest, createRequest, deleteRequest, editRequest, fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
import { isPlainObject } from "@reduxjs/toolkit";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
interface Coupon {
    name: string;
    code: string;
    startDate: string;
    endDate: string;
    discountType: string;
    freeShipping: boolean;
    isList: boolean;
    maxDiscount: string;
    minSpend: string;
    discount: string;
    category: number[]; // explicitly define category as an array of numbers
}
interface ApiResponse {
    responseCode: number;
    responseData: object | null;
}

const Coupons = () => {
    const dispatch = useDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const { activeList } = entities.category;
    const [isList, setIsList] = useState(false); // State for the toggle button

    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const { data, loading, success, editData } = entities.coupon;

    const [couponData, setCouponData] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [coupon, setCoupon] = useState<Coupon>({
        name: '',
        code: '',
        startDate: '',
        endDate: '',
        discountType: '',
        freeShipping: false,
        isList: false,
        maxDiscount: '',
        minSpend: '',
        discount: '',
        category: []
    });
        const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [rowId, setRowId] = useState('');
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [categories, setCategories] = useState<any>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        if (!loading&&!isDelete) {
            dispatch(activeListRequest(category, { isActive: true }));
            dispatch(fetchRequest(couponVar, { page, perPage }));
            setPage(page + 1);

        }
    }, [dispatch]);

    useEffect(() => {
        if (activeList && 'responseCode' in activeList && (activeList as ApiResponse).responseCode === 200) {
            const dataT = (activeList as { responseData: any[] }).responseData;
            setCategories(dataT);
        }
    }, [activeList]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!coupon.name) newErrors.name = 'Coupon name is required';
        if (!coupon.code) newErrors.code = 'Coupon code is required';
        if (!coupon.startDate) newErrors.startDate = 'Start date is required';
        if (!coupon.endDate) newErrors.endDate = 'End date is required';
        if (!coupon.discountType) newErrors.discountType = 'Discount type is required';
        if (!coupon.maxDiscount) newErrors.maxDiscount = 'Max discount is required';
        if (!coupon.minSpend) newErrors.minSpend = 'Min spend is required';
        if (!coupon.discount) newErrors.discount = 'Discount is required';
        if (coupon.category.length === 0) newErrors.category = 'At least one category is required';

        return newErrors;
    };

    const onEditOpenModal = (e: React.ChangeEvent<HTMLInputElement>) => {

        dispatch(editRequest(couponVar, e.target.id));
    };

    const handleDelete = (id: number) => {
        setIsDelete(true);
        dispatch(deleteRequest(couponVar,id));
        setRowId('');
        const d= couponData.filter((coupon: { id: number; }) => coupon.id != id);
        // console.log(d)
         setCouponData(d);
 
        // Direct mutation example (incorrect)
        // couponData.splice(id, 1);
    };
    

    const onOpenModal = () => {
        setRowId('');
        setCoupon({
            name: '',
            code: '',
            startDate: '',
            endDate: '',
            discountType: '',
            freeShipping: false,
            maxDiscount: '',
            minSpend: '',
            discount: '',
            category: [],
            isList:false,
        });
        setSelectedCategories([]);
        setOpen(true);
    };
    


    const onCloseModal = () => {
        setRowId('');
        setCoupon({
            name: '',
            code: '',
            startDate: '',
            endDate: '',
            discountType: '',
            freeShipping: false,
            isList: false,
            maxDiscount: '',
            minSpend: '',
            discount: '',
            category: []
        });
        setOpen(false);
        setErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCoupon({ ...coupon, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCoupon({ ...coupon, [name]: checked });
    };

    const handleCategoryChange = (selected: number[]) => {
        // console.log(selectedCategories)
        setSelectedCategories(selected);
        setCoupon({ ...coupon, category: selected });
    
        if (errors.category) {
            setErrors({ ...errors, category: '' });
        }
    };
            
    const onCouponSave = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        if (rowId) {
            dispatch(updateRequest(couponVar, JSON.stringify(coupon), rowId));
        } else {
            dispatch(createRequest(couponVar, JSON.stringify(coupon)));
        }
    };
    

    // useEffect(() => {
    //     if (!loading&&!isDelete) {
    //         dispatch(fetchRequest(couponVar, { page, perPage }));
    //         setPage(page + 1);
    //     }
    // }, [dispatch]);
    const formatCouponsWithCategoryNames = (coupons: any[]) => {
        return coupons.map(coupon => ({
            ...coupon,
            category: coupon.category.map((cat: { name: string }) => cat.name).join(', '),
        }));
    };
    
    useEffect(() => {
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200 && !isDelete) {
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
            if (isPlainObject(dataT)) {
                if ('listCoupon' in dataT) {
                    const newProducts = 'listCoupon' in dataT ? (dataT as { listCoupon: any[] }).listCoupon : [];
                    const formattedCoupons = formatCouponsWithCategoryNames(newProducts);
                    setCouponData(formattedCoupons);
                    setIsDelete(false);
                }
            }
        }
    }, [data]);
    
    
    // useEffect(() => {
    //     if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200&&!isDelete) {
    //         const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
    //         if (isPlainObject(dataT)) {
    //             if ('listCoupon' in dataT) {
    //                 const newProducts = 'listCoupon' in dataT ? (dataT as { listCoupon: any[] }).listCoupon : [];    
    //                 setCouponData(newProducts);
    //                 setIsDelete(false);
        
    //             }
    //         }
    //     }
    // }, [data]);

    // useEffect(() => {
    //     if (editData != null && 'responseCode' in editData && (editData as { responseCode: number }).responseCode === 200) {
    //         const edit = 'responseData' in editData ? (editData as { responseData: any }).responseData : null;
    //         setRowId(edit.id);
    //         setOpen(true);
    //     }
    // }, [editData]);
    
    useEffect(() => {
        if (editData != null && 'responseCode' in editData && (editData as { responseCode: number }).responseCode === 200) {
            const edit = 'responseData' in editData ? (editData as { responseData: any }).responseData : null;
        const formatDate = (isoDate: string) => {
            const date = new Date(isoDate);
            return date.toISOString().split('T')[0]; // YYYY-MM-DD
        };
        const categoryIds = edit.category ? edit.category.map((id: string) => parseInt(id, 10)) : [];

        setRowId(edit.id);
        setCoupon({
            name: edit.name || '',
            code: edit.code || '',
            startDate: formatDate(edit.startdate) || formatDate(edit.startDate) || '',
            endDate: formatDate(edit.enddate) || formatDate(edit.endDate) || '',
            discountType: edit.discounttype ||edit.discountType || '',
            freeShipping: edit.freeshipping ||edit.freeShipping || false,
            isList: edit.isList ||edit.isList || false,
            maxDiscount: edit.maxdiscount || edit.maxDiscount || '',
            minSpend: edit.minspend ||edit.minSpend || '',
            discount: edit.discount || '',
            category: categoryIds || [],
        });
        setSelectedCategories(categoryIds || []);
        setOpen(true);
        }
    }, [editData]);
    
    useEffect(() => {
        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ? (success as { responseMessage: string }).responseMessage : ''));
            if (!loading && isDelete == false) {
                dispatch(fetchRequest(couponVar, { page: 1, perPage }));
                onCloseModal();
            }
        }
        // setIsDelete(false);

    }, [success]);
    const handleToggleList = () => {
        setIsList(!isList);
    };


    return (
        <Fragment>
            <CommonBreadcrumb title="Coupons" parent="Marketing" />
            {loading && <Loader />}
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Manage Coupons" />
                            <CardBody>
                                <ButtonGroup className="pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Coupon
                                    </Button>
                                    <Modal isOpen={open} data-bs-backdrop="static">
                                        <ModalHeader>
                                            <h5 className="modal-title f-w-600">
                                                {rowId ? 'Edit' : 'Add'} Coupon
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="name">Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={coupon.name}
                                                        onChange={handleChange}
                                                        invalid={!!errors.name}
                                                        required
                                                    />
                                                    {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="code">Code</Label>
                                                    <Input
                                                        type="text"
                                                        name="code"
                                                        id="code"
                                                        value={coupon.code}
                                                        onChange={handleChange}
                                                        invalid={!!errors.code}
                                                        required
                                                    />
                                                    {errors.code && <FormFeedback>{errors.code}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="startDate">Start Date</Label>
                                                    <Input
                                                        type="date"
                                                        name="startDate"
                                                        id="startDate"
                                                        value={coupon.startDate}
                                                        onChange={handleChange}
                                                        invalid={!!errors.startDate}
                                                        required
                                                    />
                                                    {errors.startDate && <FormFeedback>{errors.startDate}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="endDate">End Date</Label>
                                                    <Input
                                                        type="date"
                                                        name="endDate"
                                                        id="endDate"
                                                        value={coupon.endDate}
                                                        onChange={handleChange}
                                                        invalid={!!errors.endDate}
                                                        required
                                                    />
                                                    {errors.endDate && <FormFeedback>{errors.endDate}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="discountType">Discount Type</Label>
                                                    <Input
                                                        type="select"
                                                        name="discountType"
                                                        id="discountType"
                                                        value={coupon.discountType}
                                                        onChange={handleChange}
                                                        invalid={!!errors.discountType}
                                                        required
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="Percent">Percent</option>
                                                        <option value="Fixed">Fixed</option>
                                                    </Input>
                                                    {errors.discountType && <FormFeedback>{errors.discountType}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input
                                                            type="checkbox"
                                                            name="freeShipping"
                                                            checked={coupon.freeShipping}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Free Shipping
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="maxDiscount">Max Discount</Label>
                                                    <Input
                                                        type="number"
                                                        name="maxDiscount"
                                                        id="maxDiscount"
                                                        value={coupon.maxDiscount}
                                                        onChange={handleChange}
                                                        invalid={!!errors.maxDiscount}
                                                        required
                                                    />
                                                    {errors.maxDiscount && <FormFeedback>{errors.maxDiscount}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="minSpend">Min Spend</Label>
                                                    <Input
                                                        type="number"
                                                        name="minSpend"
                                                        id="minSpend"
                                                        value={coupon.minSpend}
                                                        onChange={handleChange}
                                                        invalid={!!errors.minSpend}
                                                        required
                                                    />
                                                    {errors.minSpend && <FormFeedback>{errors.minSpend}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="discount">Discount</Label>
                                                    <Input
                                                        type="number"
                                                        name="discount"
                                                        id="discount"
                                                        value={coupon.discount}
                                                        onChange={handleChange}
                                                        invalid={!!errors.discount}
                                                        required
                                                    />
                                                    {errors.discount && <FormFeedback>{errors.discount}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                     Category :
                                                    </Label>
                                                    
                                                    <CategorySelectMulty
                                                        // name="category"
                                                        categories={categories}
                                                        selectedCategories={selectedCategories}
                                                        onChange={handleCategoryChange}
                                                    />
                                                    {errors.category && (
                                                        <div className="text-danger">{errors.category}</div>
                                                    )}

                                                </FormGroup>        
                                                <FormGroup className=" mb-3 ">
                                                        <Row>
                                                            <Col xl="3" sm="4">
                                                                <Label className="fw-bold">Is List :</Label>
                                                            </Col>
                                                            <Col xl="8" sm="7" className="description-sm">
                                                                <div className="d-flex align-items-center">
                                                                    <Label className="form-switch">
                                                                        <Input
                                                                            type="checkbox"
                                                                            id="statusToggle"
                                                                            className="custom-control-input"
                                                                            checked={coupon.isList}
                                                                            onChange={handleCheckboxChange}
                                                                                     name="isList"   />
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onCouponSave}>
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
                                    {/* <Datatable
                                        myData={couponData}
                                        page={page}
                                        perPage={perPage}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        edit={true}
                                        editRow={onEditOpenModal}
                                        deleteAction={handleDelete}
                                    /> */}
                                    <Datatable myData={couponData}
                                     multiSelectOption={false}
                                     pageSize={10}
                                     pagination={true} 
                                     edit={true} 
                                     perPage={perPage} 
                                     editAction={onEditOpenModal} 
                                     deleteAction={handleDelete} class="-striped -highlight" />

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Coupons;
