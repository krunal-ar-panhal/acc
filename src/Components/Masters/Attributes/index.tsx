import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { attribute } from "@/Constants";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createRequest, deleteRequest, editRequest, fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "react-feather";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const Attributes = () => {
    const dispatch = useAppDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const { data, loading, success, editData } = entities.attribute;

    const [attributeData, setAttributeData] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [attributes, setAttributes] = useState<Array<{ name: string, values: string[] }>>([{ name: '', values: [''] }]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [rowId, setRowId] = useState('');
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        attributes.forEach((attribute, attrIndex) => {
            if (!attribute.name) newErrors[`name${attrIndex}`] = 'Attribute name is required';
            attribute.values.forEach((value, valueIndex) => {
                if (!value) newErrors[`value${attrIndex}-${valueIndex}`] = 'Value is required';
            });
        });
        return newErrors;
    };

    const onEditOpenModal = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editRequest(attribute, e.target.id));
    };

    const handleDelete = (id: number) => {
        setIsDelete(true);
        dispatch(deleteRequest(attribute, id));
        setRowId('');
        const d= attributeData.filter((attribute: { id: number; }) => attribute.id != id);
        // console.log(d)
         setAttributeData(d);

    }

    const onOpenModal = () => {
        setRowId('');
        setAttributes([{ name: '', values: [''] }]);
        setOpen(true);
    };

    const onCloseModal = () => {
        setRowId('');
        setAttributes([{ name: '', values: [''] }]);
        setOpen(false);
        setErrors({});
    };

    const handleNameChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[index].name = e.target.value;
        setAttributes(updatedAttributes);
        if (errors[`name${index}`]) {
            setErrors({ ...errors, [`name${index}`]: '' });
        }
    };

    const handleValueChange = (attrIndex: number, valueIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attrIndex].values[valueIndex] = e.target.value;
        setAttributes(updatedAttributes);
        if (errors[`value${attrIndex}-${valueIndex}`]) {
            setErrors({ ...errors, [`value${attrIndex}-${valueIndex}`]: '' });
        }
    };

    const addAttributeField = () => {
        setAttributes([...attributes, { name: '', values: [''] }]);
    };

    const removeAttributeField = (index: number) => {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAttributes(updatedAttributes);
    };

    const addValueField = (attrIndex: number) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attrIndex].values.push('');
        setAttributes(updatedAttributes);
    };

    const removeValueField = (attrIndex: number, valueIndex: number) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[attrIndex].values.splice(valueIndex, 1);
        setAttributes(updatedAttributes);
    };

    const onAttributeSave = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const attributesJson = attributes.map(attribute => ({
            "name": attribute.name,
            "value": attribute.values
        }));

        const requestPayload = {
            "attribute": attributesJson
        };

        if (rowId) {
            dispatch(updateRequest(attribute, JSON.stringify(requestPayload), rowId));
        } else {
            dispatch(createRequest(attribute, JSON.stringify(requestPayload)));
        }
    };

    useEffect(() => {
        if (!loading) {
            dispatch(fetchRequest(attribute, { page, perPage }));
            setPage(page + 1);
        }
    }, [dispatch]);

    useEffect(() => {
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
            setAttributeData(dataT);
            setIsDelete(false);
        }
    }, [data]);

    useEffect(() => {
        if (editData != null && 'responseCode' in editData && (editData as { responseCode: number }).responseCode === 200) {
            const edit = 'responseData' in editData ? (editData as { responseData: any }).responseData : null;
            setRowId(edit.id);
            setOpen(true);
        }
    }, [editData]);

    useEffect(() => {
        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ? (success as { responseMessage: string }).responseMessage : ''));
            if (!loading && isDelete == false) {
                dispatch(fetchRequest(attribute, { page: 1, perPage }));
                onCloseModal();
            }
        }
    }, [success]);

    return (
        <Fragment>
            <CommonBreadcrumb title="Attributes" parent="Physical" />
            {loading && <Loader />}
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Product Attributes" />
                            <CardBody>
                                <ButtonGroup className="pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Attribute
                                    </Button>
                                    <Modal isOpen={open} data-bs-backdrop="static">
                                        <ModalHeader>
                                            <h5 className="modal-title f-w-600">
                                                {rowId ? 'Edit' : 'Add'} Attribute
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                {attributes.map((attribute, attrIndex) => (
                                                    <Fragment key={attrIndex}>
                                                        <FormGroup>
                                                            <Label>Attribute Name {attrIndex + 1}:</Label>
                                                            <Input
                                                                type="text"
                                                                value={attribute.name}
                                                                onChange={(e) => handleNameChange(attrIndex, e)}
                                                                invalid={!!errors[`name${attrIndex}`]}
                                                                required
                                                            />
                                                            {errors[`name${attrIndex}`] && (
                                                                <FormFeedback>{errors[`name${attrIndex}`]}</FormFeedback>
                                                            )}
                                                        </FormGroup>
                                                        {attribute.values.map((value, valueIndex) => (
                                                            <Fragment key={valueIndex}>
                                                                <FormGroup>
                                                                    <Label>Value {valueIndex + 1}:</Label>
                                                                    <Input
                                                                        type="text"
                                                                        value={value}
                                                                        onChange={(e) => handleValueChange(attrIndex, valueIndex, e)}
                                                                        invalid={!!errors[`value${attrIndex}-${valueIndex}`]}
                                                                        required
                                                                    />
                                                                    {errors[`value${attrIndex}-${valueIndex}`] && (
                                                                        <FormFeedback>{errors[`value${attrIndex}-${valueIndex}`]}</FormFeedback>
                                                                    )}
                                                                </FormGroup>
                                                                {attribute.values.length > 1 && (
                                                                    <Button color="danger" onClick={() => removeValueField(attrIndex, valueIndex)}>
                                                                        Remove Value
                                                                    </Button>
                                                                )}
                                                                {valueIndex === attribute.values.length - 1 && (
                                                                    <Button color="primary" onClick={() => addValueField(attrIndex)}>
                                                                        Add Another Value
                                                                    </Button>
                                                                )}
                                                                <hr />
                                                            </Fragment>
                                                        ))}
                                                        {attributes.length > 1 && (
                                                            <Button color="danger" onClick={() => removeAttributeField(attrIndex)}>
                                                                Remove Attribute
                                                            </Button>
                                                        )}
                                                        {attrIndex === attributes.length - 1 && (
                                                            <Button color="primary" onClick={addAttributeField}>
                                                                Add Another Attribute
                                                            </Button>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onAttributeSave}>
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
                                    <Datatable
                                        myData={attributeData}
                                        page={page}
                                        perPage={perPage}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        edit={false}
                                        // editRow={onEditOpenModal}
                                        deleteAction={handleDelete}
                                        
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Attributes;
