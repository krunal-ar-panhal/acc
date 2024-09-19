import React, { useState, ChangeEvent } from "react";
import { Table, Button } from "reactstrap";

// Define a type for the profile state
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  dob: string;
  location: string;
}

const TabTable: React.FC = () => {
  // State to hold the form data with type Profile
  const [profile, setProfile] = useState<Profile>({
    firstName: "John",
    lastName: "Deo",
    email: "johndeo@gmail.com",
    gender: "Male",
    mobile: "2124821463",
    dob: "Dec, 15 1993",
    location: "USA",
  });

  // State to handle edit mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Function to handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">Profile</h5>
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  profile.firstName
                )}
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  profile.lastName
                )}
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                ) : (
                  profile.email
                )}
              </td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>
                {isEditing ? (
                  <select
                  className ='form-control'
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  profile.gender
                )}
              </td>
            </tr>
            <tr>
              <td>Mobile Number:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="text"
                    name="mobile"
                    value={profile.mobile}
                    onChange={handleChange}
                  />
                ) : (
                  profile.mobile
                )}
              </td>
            </tr>
            <tr>
              <td>DOB:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="text"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                  />
                ) : (
                  profile.dob
                )}
              </td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>
                {isEditing ? (
                  <input
                  className ='form-control'
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                ) : (
                  profile.location
                )}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button color="primary" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default TabTable;
