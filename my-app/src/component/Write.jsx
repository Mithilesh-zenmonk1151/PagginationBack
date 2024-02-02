import React, { useState } from "react";
import axios from "axios";
import './write.css'

function Write() {
  const [selectAccountType, setSelectAccountType] = useState("");
  // const handleSelectChange = (event) => {
  //     setSelectAccountType(event.target.value);

  // };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  async function postData(data) {
    console.log(data);
    try {
       let response = await axios.post(
        "http://localhost:4000/api/users/write",
        data
      );
      console.log(response);
      alert("Form submitted Successfully");
    } catch (error) {
      console.log(error);
      alert("User Allready Exists");
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    postData({
      name: name,
      email: email,
      AccountType: selectAccountType,
      description: description,
    });
  };
  return (
    <div className="write-style">
      <form onSubmit={handleOnSubmit} className="signup-form">
        <input
          required
          type="text"
          placeholder=" enter your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-name"
        />
        <input
          required
          placeholder="Email "
          className="signup-name"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        /> <label> Select User Type:
        <select
          onChange={(event) => setSelectAccountType(event.target.value)}
          value={selectAccountType}
        >
          <option value="customer">Customer</option>
          <option value="retailer">Retailer</option>
        </select>
        </label>
        <textarea
          required
          type="text"
          name="text"
          className="signup-name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />

        <button type="submit" className="createac-btn ">
          Create User
        </button>
      </form>
    </div>
  );
}

export default Write;
