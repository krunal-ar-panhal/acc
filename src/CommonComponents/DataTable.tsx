//@ts-nocheck
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { json } from "stream/consumers";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

const Datatable = ({ myData, myClass, multiSelectOption, pagination,edit=true,perPage=10,editAction='',deleteAction='',deleteBtn=true }: any) => {
    const [open, setOpen] = useState(false);
    const [checkedValues, setCheckedValues] = useState([]);
    const [data, setData] = useState(myData);
    
    useEffect(()=>{
        setData(myData);
        console.log(myData)
    });
    const selectRow = (e, i) => {
        if (!e.target.checked) {
            setCheckedValues(checkedValues.filter((item, j) => i !== item));
        } else {
            checkedValues.push(i);
            setCheckedValues(checkedValues);
        }
    };

    const handleRemoveRow = () => {
        const updatedData = myData.filter(function (el) {
            return checkedValues.indexOf(el.id) < 0;
        });
        setData([...updatedData]);
        // toast.success("Successfully Deleted !");
        
    };

    const renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
                    setData({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: myData[cellInfo.index][cellInfo.index.id],
                }}
            />
        );
    };

    const handleDelete = (index: number,id:number) => {
        if (window.confirm("")) {
            deleteAction(id);

            const del = data;
            del.splice(index, 1);
            setData([...del]);
            // console.log(id)
        }
        // toast.success("Successfully Deleted !");
    };
    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    const Capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const columns = [];
    for (const key in myData[0]) {
        let editable = renderEditable;
        let hidden=false;
        if (key === "image") {
            editable = null;
        }
        if (key === "status") {
            editable = null;
        }
        if (key === "avtar") {
            editable = null;
        }
        if (key === "vendor") {
            editable = null;
        }
        if (key === "orderStatus") {
            editable = '';
        }
        if(key=='id'){
            hidden=true;
        }

        columns.push({
            name: <b>{Capitalize(key.toString())}</b>,
            header: <b>{Capitalize(key.toString())}</b>,

            hidden:hidden,
            selector: (row) => row[key],
            Cell: editable,
            style: {
                textAlign: "center",
            },
        });
    }


    if (multiSelectOption === true) {
        columns.push({
            name: (
                <Button
                    color="danger"
                    size="sm"
                    className=" btn-delete mb-0 b-r-4"
                    onClick={(e) => {
                        if (window.confirm("Are you sure you wish to delete this item?")) handleRemoveRow();
                    }}
                >
                    Delete
                </Button>
            ),
            id: "delete",
            accessor: () => "delete",
            cell: (row) => (
                <div>
          <span>
            <Input type="checkbox" name={row.id} defaultChecked={checkedValues.includes(row.id)} onChange={(e) => selectRow(e, row.id)} />
          </span>
                </div>
            ),
            style: {
                textAlign: "center",
            },
            sortable: false,
        });
    } else {
        deleteBtn||edit? columns.push({
            name: <b>Action</b>,
            id: "delete",
            accessor: (str) => "delete",
            cell: (row, index) => (
                <div>
         {deleteBtn?<span onClick={() => handleDelete(index,row.id)}>
            <i
                className="fa fa-trash"
                style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                    cursor: "pointer",
                }}
            ></i>
          </span>:''

            }
                    {edit?<span>
            <i
                onClick={editAction}
                className="fa fa-pencil"
                data-index={index}
                id={row.id}
                style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "rgb(40, 167, 69)",
                    cursor: "pointer",
                }}
            ></i>

          </span>:''}
                </div>
            ),
            style: {
                textAlign: "center",
            },
            sortable: false,
        }):'';

    }
    const visibleColumns = columns.filter(column => !column.hidden);

    // console.log(myData)
    return (
        <div>
            <Fragment>
                <DataTable data={data} columns={visibleColumns} className={myClass} pagination={pagination} paginationPerPage={perPage} striped={true} center={true} />

                <ToastContainer />
            </Fragment>
        </div>
    );
};

export default Datatable;
