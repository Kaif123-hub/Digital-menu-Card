import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Qtymast() {
  const [data, setData] = useState([]);
  const [qid, setQid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchQty();
  }, []);

  function fetchQty() {
    axios
      .get("http://192.168.29.139:3000/qtymast")
      .then((res) => setData(res.data.qtymast))
      .catch((err) => console.error(err));
  }

  function openModal() {
    setQid("");
    setQuantity("");
    setShow(true);
  }

  function closeModal() {
    setShow(false);
  }

  function saveQty() {
  if (!qid || !quantity) {
    alert("Please enter QID and Quantity");
    return;
  }

  axios
    .post("http://192.168.29.139:3000/addqtymast", {
      qid,
      quantity,
    })
    .then(() => {
      fetchQty();     // 🔥 UI update
      closeModal();
    })
    .catch(err => console.error(err));
}


  // ✅ DELETE FUNCTION (OUTSIDE saveQty)
  function deleteQty(id) {  

    axios
      .delete("http://192.168.29.139:3000/delqtymast", {
        data: { id },
      })
      .then(() => {
        alert(`QID ${id} deleted successfully`);
        fetchQty();
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  }

  return (
    <Card>
      <Card.Header as="h3">QtyMast</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>QID</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.qid}>
                <td>{item.qid}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button size="sm" onClick={openModal}>
                    Add
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteQty(item.qid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Modal show={show} onHide={closeModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Add New Quantity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter QID"
            value={qid}
            onChange={(e) => setQid(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={saveQty}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
