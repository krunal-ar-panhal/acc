import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import { Card, CardBody, Container, Row } from "reactstrap";
import ProductDetailSlider from "./ProductDetailSlider";
import ProductInformation from "./ProductInformation";
import {useAppSelector} from "../../../../Redux/Hooks";
import {useEffect, useState} from "react";
import {editRequest} from "../../../../Redux/main/actions/actions";
import {product} from "../../../../Constants/index";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
interface EditResponse {
  images_array: Array<string | ArrayBuffer | null>;
  title: string;
  sku: string;
  summary?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  categoryId?: string;
  price?: number;
  status?: boolean;
  // Add other properties as needed
}

interface ApiResponse {
  responseCode: number;
  responseData: EditResponse | null;
}

interface AddProductProps {
  id: string;
  lng: string;
}
const ProductDetail = (params:any) => {
    const { entities } = useAppSelector((store) => store.rootReducer);
    const { loading, error, success,editData } = entities.product;
    const dispatch = useDispatch();
    const [editResponse, setEditResponse] = useState<EditResponse | null>(null);
    const {id,lng} = params;
    useEffect(() => {
        if (id) {
            // Fetch product details when the component mounts
            dispatch(editRequest(product,id));
        }
    }, [id]);
    useEffect(() => {
        // console.log(editData);
        if (editData && 'responseCode' in editData && (editData as ApiResponse).responseCode === 200) {
          const editRes = (editData as ApiResponse).responseData;
          if (editRes)
          setEditResponse(editRes);
      }
  }, [editData]);

    return (
    <>
      <CommonBreadcrumb title="Product Detail" parent="Physical" />
      <Container fluid>
        <Card>
          <CardBody>
            <Row className="product-page-main">
              <ProductDetailSlider images={editResponse?.images_array??[]} />
              <ProductInformation editData={editResponse??null} />
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetail;
