import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/Redux/Hooks';
import { deleteRequest, fetchRequest } from '@/Redux/main/actions/actions';
import Datatable from '@/CommonComponents/DataTable';
import CommonBreadcrumb from '@/CommonComponents/CommonBreadcrumb';
import CommonCardHeader from '@/CommonComponents/CommonCardHeader';
import {  subscribe } from '@/Constants';
import { isPlainObject } from '@reduxjs/toolkit';

const Subscribe = () => {
    const dispatch = useDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const { data, loading, success } = entities.subscribe;
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const [subscribeData, setSubscribeData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        if (!loading) {
            dispatch(fetchRequest(subscribe, { page, perPage }));
            setPage(page + 1);
        }
    }, [dispatch]);

        useEffect(() => {
            // console.log(data)
        if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200&&!isDelete) {
            const dataT = 'responseData' in data ? (data as { responseData: any[] }).responseData : [];
            // if (isPlainObject(dataT)) {
                // if ('listCoupon' in dataT) {
                //     const newProducts = 'listCoupon' in dataT ? (dataT as { listCoupon: any[] }).listCoupon : [];    
                    setSubscribeData(dataT);
                    setIsDelete(false);
        
                // }
            // }
        }
    }, [data]);

    const handleDelete = (id:number) => {
        dispatch(deleteRequest(subscribe, id));
        setSubscribeData(subscribeData.filter((subscribe: { id: number; }) => subscribe.id !== id));
    };

    useEffect(()=>{

        if (success != null && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ?  (success as { responseMessage: string}).responseMessage:''));
            // console.log(isDelete)
            setIsDelete(false);
        }
    },[success])
// {console.log(subscribeData)}
    return (
        <Fragment>
            <CommonBreadcrumb title="Subscribe" parent="Marketing" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Manage Subscribe" />
                            <CardBody>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable
                                        myData={subscribeData}
                                        multiSelectOption={false}
                                        pageSize={10}
                                        pagination={true}
                                        perPage={perPage}
                                        edit={false}
                                        deleteAction={handleDelete}
                                        className="-striped -highlight"
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

export default Subscribe;
