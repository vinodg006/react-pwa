import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";

function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => {
        res.json().then((result) => {
          console.log(result);
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((err) => {
        setData(JSON.parse(localStorage.getItem("users")));
        setMode("offline");
      });
  }, []);
  return (
    <div style={{ margin: "50px auto" }}>
      {mode === "offline" && <Alert variant="warning">You are offline.</Alert>}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val) => (
            <tr>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
