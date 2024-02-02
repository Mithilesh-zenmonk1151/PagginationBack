import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import "./usert.css";

function UserTable() {
  const navigate = useNavigate();
  const [length, setLength] = useState(1);

  const [searchName, setSearchName]= useState("");
  const [acccountType, setAcccountType] = useState("customer");

  // = (name, email , AccountType, description) =>

  function navigateEdit(_id, name, email, AccountType, description) {
    // navigate('/edit', state :"ggg" );
    navigate("/edit", {
      state: {
        _id: _id,
        name,
        email,
        AccountType,
        description,
      },
    });
  }

  const [posts, setPosts] = useState([]);
  // const [cp , setCp]= useState(1);
  // const [dataLength, setDataLength] = useState(0);

  const [page, setPage] = useState(1);
  // const npage = Math.ceil(dataLength / 4);
  //   const numbers= [...Array(npage+1).keys()].slice(1);
  const [count, setCount] = useState(1);
  function increasePage() {
    if (posts.length < 4) return;

    setPage((cp) => {
      setCount(count + 1);
      return cp + 1;
    });
  }

  function decreasePage() {
    if (page !== 1) {
      setCount(count - 1);
      setPage((cp) => {
        return cp - 1;
      });
    }
  }

  const client = axios.create({
    baseURL: "http://localhost:4000/api/users/get",
  });

  async function getData() {
    client.get(`?page=${page}&limit=4&AccountType=${acccountType}&name=${searchName}`).then((response) => {
      console.log("thus is response",response)
      const postData =  response.data?.search;
      const lengthPage = response.data.page;
      setPosts(postData);
      setLength(lengthPage);
      console.log("hello");
      // setDataLength(postData.length);
    });
  }
  useEffect(() => {
    getData();

    console.log("inside page");
  }, [page,searchName,acccountType]);

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/users/${email}`
      );
      console.log(response.data);
      console.log("user delete hogaya");
      getData();
    } catch (error) {
      console.log("error in deletion ");
    }
  };

  console.log(posts);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="ttble">
       <div className="user-tablev">
     <div className="select-search">
     <InputLabel>AccountType</InputLabel>
      <Select
        value={acccountType}
        label="AccountType"
        onChange={(e) => setAcccountType(e.target.value)}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="retailer">Retailer</MenuItem>
      </Select>
      <form >
          <TextField
            id="outlined-basic"
            placeholder="Type to search"
            variant="outlined"
            value={searchName}
            onChange={(e)=>{ setSearchName(e.target.value)}}
          />
          
        </form>
     </div>

      <div className="user-table">
        

        {posts.length !== 0 ? (
          <>
            <table className="table">
              <thead className="table-head">
                <th>Name</th>
                <th>Email</th>
                <th>AccountType</th>
                <th>Description</th>
                <th>Actions</th>
              </thead>
              {posts?.map((post) => {
                return (
                  <tbody>
                    <tr className="post-table">
                      <td>{post.name}</td>
                      <td>{post.email}</td>
                      <td>{post.AccountType}</td>
                      <td>{post.description}</td>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigateEdit(
                            post._id,
                            post.name,
                            post.email,
                            post.AccountType,
                            post.description
                          )
                        }
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(post.email)}
                      >
                        Delete
                      </Button>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <div className="paggin">
              {/* <button  className="">
 Prev
</button> */}
              <Button variant="contained" onClick={decreasePage}>
                Prev
              </Button>
              <span className="count-span">{count} </span>{" "}
              <span className="count-span">of</span>
              <p className="length">{length}</p>
              {/* <button  onClick={increasePage}>Next</button> */}
              <Button variant="contained" onClick={increasePage}>
                Next
              </Button>
            </div>
          </>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </div>
    </div>
   
  );
}

export default UserTable;
