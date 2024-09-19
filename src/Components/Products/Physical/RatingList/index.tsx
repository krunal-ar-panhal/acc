import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Datatable from "@/CommonComponents/DataTable";
import { rating } from "@/Constants";
import { logoutUser } from "@/Helper";
import { useAppSelector } from "@/Redux/Hooks";
import { fetchRequest, updateRequest } from "@/Redux/main/actions/actions";
// import { isPlainObject } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "react-feather";
import Rating from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Card, CardBody, Col, Container, Row } from "reactstrap";

interface ApiResponse {
    responseCode: number;
    responseData: object | null;
}

const RatingList = () => {
    const dispatch = useDispatch();
    const { entities } = useAppSelector((store) => store.rootReducer);
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const perPage = 10;
    const { data, loading, error, success } = entities.rating;

    interface Rating {
        id: number;
        productId: number;
        userId: number;
        rating: JSX.Element;
        review: string;
        createdAt: string;
        status: JSX.Element;
    }

    const [ratingData, setRatingData] = useState<Rating[]>([]);    
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [rowId, setRowId] = useState<number | null>(null);

    const handleStatusChange = (id: number, isPublished: boolean) => {
        setIsUpdate(true);
        const updatedStatus = !isPublished;
        dispatch(updateRequest(rating, { isPublished: updatedStatus }, id.toString()));
        setRowId(id);
    };

    useEffect(() => {
        if (!loading) {
            dispatch(fetchRequest(rating, { 'page': page, 'perPage': perPage }));
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (data && 'responseCode' in data && (data as ApiResponse).responseCode === 200) {
            const dataT = (data as { responseData: any[] }).responseData;
            console.log("new data",dataT);
            
            setRatingData(dataT.map((item: { id: number; productId: number; userId: number; rating: number; review: string; createdAt: string; isPublished: boolean }) => ({
                id: item.id,
                productId: item.productId,
                userId: item.userId,
                rating: <Rating count={5} value={item.rating} edit={false} readonly={true}/>,
                review: item.review,
                createdAt: new Date(item.createdAt).toLocaleString(), // Format the date
                status: (
                    <Button
                        color={item.isPublished ? "success" : "danger"}
                        onClick={() => handleStatusChange(item.id, item.isPublished)}
                    >
                        {item.isPublished ? "Published" : "Unpublished"}
                    </Button>
                )
            })));
        }
    }, [data]);

    useEffect(() => {
        if (success && 'responseCode' in success && (success as { responseCode: number }).responseCode === 200) {
            toast.success(('responseMessage' in success ? (success as { responseMessage: string }).responseMessage : ''));
            if (!loading && isUpdate) {
                dispatch(fetchRequest(rating, { 'page': page, 'perPage': perPage }));
                setIsUpdate(false);
                setRowId(null);
            }
        }
    }, [success, loading, isUpdate, dispatch, page]);

    useEffect(() => {
        if (error) {
            const responseCode = (error as { responseCode: number }).responseCode;
            const responseMessage = (error as { responseMessage: string }).responseMessage;
            if (responseCode === 403) {
                logoutUser();
                router.push(`/auth/login`);
            } else {
                toast.error(responseMessage);
            }
        }
    }, [error, router]);

    return (
        <Fragment>
            <CommonBreadcrumb title="Ratings" parent="Product" />
            {loading && <Loader />}
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Product Ratings" />
                            <CardBody>
                                {/* <ButtonGroup className="pull-right">
                                    <Button color="primary" onClick={() => setPage(prevPage => prevPage + 1)}>
                                        Load More
                                    </Button>
                                </ButtonGroup> */}
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable
                                        myData={ratingData}
                                        multiSelectOption={false}
                                        pageSize={10}
                                        pagination={true}
                                        edit={false}
                                        deleteBtn={false}

                                        class="-striped -highlight"
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

export default RatingList;
