import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { option } from "@/Constants";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createRequest, deleteRequest, editRequest, fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const Options = () => {
    const dispatch = useAppDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const { data, loading, success, editData } = entities.options;

    const [optionsData, setOptionsData] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [attributes, setOptions] = useState<Array<{ name: string, values: string[] }>>([{ name: '', values: [''] }]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [rowId, setRowId] = useState('');
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        attributes.forEach((option, attrIndex) => {
            if (!option.name) newErrors[`name${attrIndex}`] = 'Option name is required';
            option.values.forEach((value, valueIndex) => {
                if (!value) newErrors[`values${attrIndex}-${valueIndex}`] = 'Value is required';
            });
        });
        return newErrors;
    };

    const onEditOpenModal = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editRequest(option, e.target.id));
    };

    const handleDelete = (id: number) => {
        setIsDelete(true);
        dispatch(deleteRequest(option, id));
        setRowId('');
        const d= optionsData.filter((option: { id: number; }) => option.id != id);
        // console.log(d)
         setOptionsData(d);

    }

    const onOpenModal = () => {
        setRowId('');
        setOptions([{ name: '', values: [''] }]);
        setOpen(true);
    };

    const onCloseModal = () => {
        setRowId('');
        setOptions([{ name: '', values: [''] }]);
        setOpen(false);
        setErrors({});
    };

    const handleNameChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedOptions = [...attributes];
        updatedOptions[index].name = e.target.value;
        setOptions(updatedOptions);
        if (errors[`name${index}`]) {
            setErrors({ ...errors, [`name${index}`]: '' });
        }
    };

    const handleValueChange = (attrIndex: number, valueIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedOptions = [...attributes];
        updatedOptions[attrIndex].values[valueIndex] = e.target.value;
        setOptions(updatedOptions);
        if (errors[`values${attrIndex}-${valueIndex}`]) {
            setErrors({ ...errors, [`values${attrIndex}-${valueIndex}`]: '' });
        }
    };

    const addAttributeField = () => {
        setOptions([...attributes, { name: '', values: [''] }]);
    };

    const removeAttributeField = (index: number) => {
        const updatedOptions = [...attributes];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const addValueField = (attrIndex: number) => {
        const updatedOptions = [...attributes];
        updatedOptions[attrIndex].values.push('');
        setOptions(updatedOptions);
    };

    const removeValueField = (attrIndex: number, valueIndex: number) => {
        const updatedOptions = [...attributes];
        updatedOptions[attrIndex].values.splice(valueIndex, 1);
        setOptions(updatedOptions);
    };

    const onAttributeSave = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const attributesJson = attributes.map(option => ({
            "name": option.name,
            "values": option.values
        }));

        const requestPayload = {
            "options": attributesJson
        };

        if (rowId) {
            dispatch(updateRequest(option, JSON.stringify(requestPayload), rowId));
        } else {
            dispatch(createRequest(option, JSON.stringify(requestPayload)));
        }
    };

    useEffect(() => {
        if (!loading) {
            dispatch(fetchRequest(option, { page, perPage }));
            setPage(page + 1);
        }
    }, [dispatch]);

    useEffect(() => {
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
            setOptionsData(dataT);
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
        // console.log(success)
        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ? (success as { responseMessage: string }).responseMessage : ''));
            if (!loading && isDelete == false) {
                dispatch(fetchRequest(option, { page: 1, perPage }));
                onCloseModal();
            }
        }
    }, [success]);

    return (
        <Fragment>
            <CommonBreadcrumb title="Options" parent="Physical" />
            {loading && <Loader />}
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Product Options" />
                            <CardBody>
                                <ButtonGroup className="pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Option
                                    </Button>
                                    <Modal isOpen={open} data-bs-backdrop="static">
                                        <ModalHeader>
                                            <h5 className="modal-title f-w-600">
                                                {rowId ? 'Edit' : 'Add'} Option
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                {attributes.map((option, attrIndex) => (
                                                    <Fragment key={attrIndex}>
                                                        <FormGroup>
                                                            <Label>Option Name {attrIndex + 1}:</Label>
                                                            <Input
                                                                type="text"
                                                                value={option.name}
                                                                onChange={(e) => handleNameChange(attrIndex, e)}
                                                                invalid={!!errors[`name${attrIndex}`]}
                                                                required
                                                            />
                                                            {errors[`name${attrIndex}`] && (
                                                                <FormFeedback>{errors[`name${attrIndex}`]}</FormFeedback>
                                                            )}
                                                        </FormGroup>
                                                        {option.values.map((value, valueIndex) => (
                                                            <Fragment key={valueIndex}>
                                                                <FormGroup>
                                                                    <Label>Value {valueIndex + 1}:</Label>
                                                                    <Input
                                                                        type="text"
                                                                        value={value}
                                                                        onChange={(e) => handleValueChange(attrIndex, valueIndex, e)}
                                                                        invalid={!!errors[`values${attrIndex}-${valueIndex}`]}
                                                                        required
                                                                    />
                                                                    {errors[`values${attrIndex}-${valueIndex}`] && (
                                                                        <FormFeedback>{errors[`values${attrIndex}-${valueIndex}`]}</FormFeedback>
                                                                    )}
                                                                </FormGroup>
                                                                {option.values.length > 1 && (
                                                                    <Button color="danger" onClick={() => removeValueField(attrIndex, valueIndex)}>
                                                                        Remove Value
                                                                    </Button>
                                                                )}
                                                                {valueIndex === option.values.length - 1 && (
                                                                    <Button color="primary" onClick={() => addValueField(attrIndex)}>
                                                                        Add Another Value
                                                                    </Button>
                                                                )}
                                                                <hr />
                                                            </Fragment>
                                                        ))}
                                                        {attributes.length > 1 && (
                                                            <Button color="danger" onClick={() => removeAttributeField(attrIndex)}>
                                                                Remove Option
                                                            </Button>
                                                        )}
                                                        {attrIndex === attributes.length - 1 && (
                                                            <Button color="primary" onClick={addAttributeField}>
                                                                Add Another Option
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
                                        myData={optionsData}
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

export default Options;
