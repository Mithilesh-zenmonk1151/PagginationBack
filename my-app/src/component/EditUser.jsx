import { React, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { convertLength } from "@mui/material/styles/cssUtils";
// import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import './edit.css'

function EditUser() {
 
 
 const location= useLocation();
 const data = location.state;
 const nav= useNavigate();

  const [posts, setPosts] = useState(data );
  const [name , setName]= useState(data.name);
  const [accountType,setAccountType]= useState(data.AccountType);
  const [description,setDescription] =useState(data.description);
  const [email, setEmail]= useState(data.email);

  const _id=data._id;
  console.log("this is a id of perticular user", data._id);
  
  const client = axios.create({
    baseURL: "http://localhost:4000/api/users/get",
  });

  // async function putData(data){
  //   try{
  //     let response= await axios.put(
  //       `http://localhost:4000/api/users/${_id}`,
  //       data
  //     );
  //     console.log(response);
  //     alert("Form updated Successfully")

  //   }catch(error){
  //     console.log(error);
  //     alert("Form Not Updated")

  //   }
  // }
  console.log(data);


  async function handleOnSubmit(event){
    
// event.preventDefault();
// putData({
//   name:name,
//   email:data.email,
//   AccountType:accountType,
// description:description
// })
nav("/view-user")
event.preventDefault();
const result = await axios.put(`http://localhost:4000/api/users/${_id}`,{
  name:name,
  email:email,
   AccountType:accountType,
  description:description
});
console.log( "This is result of api",result);
  }



  


  return (
    <div className="edit-user">
      <form onSubmit={handleOnSubmit} className="edit-form">
       <label   ></label>
        
        <input
          type="text"
          
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          
        />
      

        <input
          className="signup-name"
            value={email}
          disabled
         
          name="email"
        />
        <label>
          {" "}
          Select User Type:
          <select value={accountType} onChange={(e)=> setAccountType(e.target.value)}>
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
          placeholder="Enter Description"
        onChange={(e)=> setDescription(e.target.value)}
        />
          <Button variant="contained" color="success" type="submit">
        Update
      </Button>
        {/* <button type="submit"> Update</button> */}
      </form>
    </div>
  );
}

export default EditUser;
