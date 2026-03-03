import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

export default function Foodgroup() {

  const [data, setData] = useState([]);
  const [gid, setGid] = useState("");
  const [fd, setFg] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // 👈 toggle state

  const getid = (e) => {
    setGid(e.target.value);
  };

  const handleFoodGroup = (e) => {
    setFg(e.target.value);
  };

  // 🔹 ADD FOOD GROUP
  const fgadd = () => {
    if (!gid || !fd) {
      alert("Please enter Group ID and Group Name");
      return;
    }
                  
    axios
      .post("http://192.168.29.139:3000/addfood_group", {
        gid: gid,
        group_name: fd
      })
      .then(response => {
      
          fg();
          setShowAddForm(false); // 👈 close form after add
          setGid("");
          setFg("");
      
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  };

  useEffect(() => {
    fg();
  }, []);

  // 🔹 DELETE FOOD GROUP
  function getFid(fid) {
    axios
      .delete("http://192.168.29.139:3000/delfood_group", {
        data: { id: fid }
      })
      .then(() => {

        fg();
      })
      .catch(error => {
        console.error("Delete error:", error);
      });
  }

  // 🔹 FETCH FOOD GROUP
  function fg() {
    axios
      .get("http://192.168.29.139:3000/food_group")
      .then(response => {
        setData(response.data.food_group);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }

  return (
    <>
      <Card>
        <Card.Header as="h1">FoodGroup</Card.Header>

        {/* 🔹 ADD SECTION (TOGGLE) */}
        {showAddForm && (
          <Card.Body>
            <input
              type="number"
              placeholder="Enter Group ID"
              className="form-control mb-2"
              value={gid}
              onChange={getid}
            />
               
            <input
              type="text"
              placeholder="Enter Food Group Name"
              className="form-control mb-3"
              value={fd}
              onChange={handleFoodGroup}
            />
            
            <Button
              variant="primary"
              onClick={fgadd}
              className="me-2"
            >
              Save
            </Button>

            <Button
              variant="secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </Card.Body>
        )}

        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>GID</th>
                <th>group_name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((val) => (
                <tr key={val.gid}>
                  <td>{val.gid}</td>
                  <td>{val.group_name}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => getFid(val.gid)}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => setShowAddForm(true)}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

