"use client";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { tokenName } from "@/Constants";
import DataTable, { TableColumn } from "react-data-table-component";
import { Edit, Trash2 } from "react-feather";
import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import { Card, CardBody, Col, Container, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
interface Banner {
  id: number;
  displaySequence: number;
  image: string;
  isList: boolean;
}
const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [displaySequence, setDisplaySequence] = useState<number>(0);
  const [isList, setIsList] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = sessionStorage.getItem(tokenName);
        const res = await fetch("https://api.acsa.co.in/admin/banner/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("GET KIYA HUA DATA", data);
        if (res.ok) {
          setBanners(data.responseData || []);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        alert("An error occurred while fetching banners.");
      }
    };
    fetchBanners();
  }, []);
  const handleAddBanner = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("displaySequence", displaySequence.toString());
    formData.append("isList", isList.toString());
    formData.append("image", image);
    try {
      const token = sessionStorage.getItem(tokenName);
      const res = await fetch("https://api.acsa.co.in/admin/banner/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Banner added successfully");
        setShowModal(false);
        // Refresh banners list after adding a new banner
        await fetchAndSetBanners();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("An error occurred while adding the banner.");
    }
  };
  const handleUpdateBanner = async () => {
    if (!selectedBanner || !image) {
      alert("Please select a banner and an image to update");
      return;
    }
    const formData = new FormData();
    formData.append("displaySequence", displaySequence.toString());
    formData.append("isList", isList.toString());
    formData.append("image", image);
    try {
      const token = sessionStorage.getItem(tokenName);
      const res = await fetch(
        `https://api.acsa.co.in/admin/banner/update/${selectedBanner.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      console.log("updated data :", data);
      if (res.ok) {
        alert("Banner updated successfully");
        setShowModal(false);
        // Refresh banners list after updating a banner
        await fetchAndSetBanners();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("An error occurred while updating the banner.");
    }
  };
  const handleDeleteBanner = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );
    if (confirmDelete) {
      try {
        const token = sessionStorage.getItem(tokenName);
        const res = await fetch(
          `https://api.acsa.co.in/admin/banner/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log("delete", data);
        if (res.ok) {
          alert("Banner deleted successfully");
          // Refresh banners list after deleting a banner
          await fetchAndSetBanners();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("An error occurred while deleting the banner.");
      }
    }
  };
  const fetchAndSetBanners = async () => {
    try {
      const token = sessionStorage.getItem(tokenName);
      const res = await fetch("https://api.acsa.co.in/admin/banner/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : data.banners || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
      alert("An error occurred while fetching banners.");
    }
  };
  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setDisplaySequence(banner.displaySequence);
    setIsList(banner.isList);
    setShowModal(true);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const columns: TableColumn<Banner>[] = [
    {
      name: "ID",
      selector: (row: Banner) => row.id,
      sortable: true,
    },
    {
      name: "Display Sequence",
      selector: (row: Banner) => row.displaySequence,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: Banner) => (
        <img src={row.image} alt={`Banner ${row.id}`} width="100" />
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row: Banner) => (
        <div>
          <a
            onClick={() => handleEdit(row)}
            style={{ color: "#FF8084", marginRight: "15px" }}
          >
            <Edit />
          </a>
          <a onClick={() => handleDeleteBanner(row.id)}>
            <Trash2 />
          </a>
        </div>
      ),
      sortable: false,
    },
  ];
  return (
    <Fragment>
      <CommonBreadcrumb title="Banner List" parent="" />
      <div>
        <Row>
          <Col xl="12" sm="12" className="mb-3">
            <p
              onClick={() => {
                setSelectedBanner(null); // Ensure we're adding a new banner
                setDisplaySequence(0);
                setIsList(false);
                setImage(null);
                setShowModal(true);
              }}
              className="btn btn-primary pull-right"
            >
              Add Banner
            </p>
          </Col>
        </Row>
      </div>
      <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title=" Home Banner " />
                            <CardBody>
      <DataTable columns={columns} data={banners} pagination />
      </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <ModalHeader>
              <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                {selectedBanner ? "Update Banner" : "Add Banner"}
              </h5>
            </ModalHeader>
            <hr/>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                selectedBanner ? handleUpdateBanner() : handleAddBanner();
              }}
            >
              <ModalBody>
              <div>
                <label className="form-label"> Display Sequence:</label>
                <input
                  type="number"
                  className="form-control"
                  value={displaySequence}
                  onChange={(e) => setDisplaySequence(Number(e.target.value))}
                />
              </div>
              <div className="my-3">
                <label className="form-label">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              <div className="my-3">
                <label className="form-label " >Is List:</label>
<br/>
                <input
                  type="checkbox"
                  checked={isList}
                  className="form-check-input"
                  onChange={(e) => setIsList(e.target.checked)}
                />
              </div>
              </ModalBody>
              <hr/>
              <ModalFooter>
              <button type="submit" className="btn btn-primary mx-2">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              </ModalFooter>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default BannerList;