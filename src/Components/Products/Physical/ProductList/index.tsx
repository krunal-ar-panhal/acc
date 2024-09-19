import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import { Href, ImagePath } from "@/Constants";
import { ColorVariant, ProductRating } from "@/Data/Product/Physical";
import { Fragment, Key, useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { Button, Col, Container, Row } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import { deleteRequest, fetchRequest, resetState } from "@/Redux/main/actions/actions";
import { product } from "@/Constants/index";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
// import DataTable from 'react-data-table-component';
// import DataTable, { Column } from 'react-data-table-component';
import DataTable, { TableColumn } from 'react-data-table-component';

// import { Product } from "@/types"; // Define this type as per your data structure

// types.ts or your types file
export interface Product {
  id: number;
  title: string;
  description: string;
  images_array: { image_url: string }[];
  category?: string;
  status?: string;
  price?: number;
  discountPrice?: number;
  size: { size: string; quantity: number }[];
}


const ProductList = () => {
  const { entities } = useAppSelector((store) => store.rootReducer);
  const { i18LangStatus } = useAppSelector((store) => store.LangReducer);
  const { data, loading, error, success } = entities.product;
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const perPage = 4;

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isPlainObject = (obj: any): obj is { [key: string]: any } =>
    Object.prototype.toString.call(obj) === '[object Object]' && obj !== null && !Array.isArray(obj);
  

  useEffect(() => {
    dispatch(resetState());
  }, [pathname, dispatch]);

  useEffect(() => {
    const storedProductList = localStorage.getItem('productList');

    if (storedProductList && data != null) {
      setProductList(JSON.parse(storedProductList));
    } else {
      setProductList([]);
      setPage(2);
      dispatch(fetchRequest(product, { 'page': 1, 'perPage': perPage }));
    }
  }, [dispatch]);
    
  useEffect(() => {
    if (data != null && 'responseCode' in data && (data as { responseCode: number }).responseCode === 200) {
      const dataT = 'responseData' in data ? (data as { responseData: Product[] }).responseData : [];

      if (isPlainObject(dataT)) {
        if ('totalPage' in dataT && 'page' in dataT && dataT.totalPage === dataT.page) {
          setIsLast(true);
        }

        if ('listProduct' in dataT) {
          const newProducts = 'listProduct' in dataT ? (dataT as { listProduct: Product[] }).listProduct : [];

          const updatedProductList = [...productList, ...newProducts];
          const uniqueProductList = updatedProductList.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.id === product.id)
          );

          setProductList(uniqueProductList);
          localStorage.setItem('productList', JSON.stringify(uniqueProductList));
        }
      }
    }
  }, [data,productList]);

  const getProductList = () => {
    if (!loading) {
      dispatch(fetchRequest(product, { 'page': page, 'perPage': perPage }));
      setPage(page + 1);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      dispatch(deleteRequest(product, id));
      const updatedProductList = productList.filter(product => product.id !== id);
      setProductList(updatedProductList);
      localStorage.setItem('productList', JSON.stringify(updatedProductList));
    }
  };

  const columns: TableColumn<Product>[] = [
    {
      name: 'Sr. No.',
      cell: (row: Product, index: number) => index + 1,
      sortable: true,
    },
    {
      name: 'Product ID',
      selector: (row: Product) => row.id,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: (row: Product) => row.title,
      sortable: true,
    },
    
    {
      name: 'Image',
      cell: (row: Product) => (
        <img
          src={row.images_array[0]?.image_url || `${ImagePath}/image.png`}
          alt={row.title}
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
    {
      name: 'Category',
      selector: (row: Product) => row.category || '-', 
      sortable: true,
    },
    
    {
      name: 'Status',
      selector: (row: Product) => row.status || '-',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: Product) => (
        <div className="text-center">
          <Link href={`/${i18LangStatus}/products/physical/edit-product/${row.id}`}>
            <Edit className="mr-2" />
          </Link>
          <Button color="transparent" onClick={() => handleDelete(row.id)}>
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <CommonBreadcrumb title="Product List" parent="Physical" />
      <div>
        <Row>
          <Col xl="12" sm="12" className="mb-3">
            <Link href={`/${i18LangStatus}/products/physical/add-product`} className="btn btn-primary pull-right">
              Add Product
            </Link>
          </Col>
        </Row>
      </div>
      <Container fluid>
        <DataTable
          columns={columns}
          data={productList}
          // pagination
          // paginationPerPage={8}
          paginationRowsPerPageOptions={[4]}
          highlightOnHover
          responsive
        />
        {!isLast && productList.length > 0 && (
          <Row>
            <Col xl="12" sm="12" className="text-center">
              <Button color="transparent" className="btn btn-primary" onClick={getProductList} disabled={loading}>
                <i className="fa fa-setting spin" /> Load More....
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
};

export default ProductList;
