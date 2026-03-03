import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Menumast() {

  const [data, setData] = useState([]);
  const [mn, setMn] = useState("");
  const [mp, setMp] = useState("");
  const [gid, setGid] = useState("");
  const [qid, setQid] = useState("");
  const [groups, setGroups] = useState([]);
  const [qty, setQty] = useState([]);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    Menu();
     axios.get("http://192.168.29.139:3000/food_group")
    .then(res => setGroups(res.data.food_group));

  axios.get("http://192.168.29.139:3000/qtymast")
    .then(res => setQty(res.data.qtymast));

  }, []);

  // 🔹 FETCH MENU
  function Menu() {
    axios
      .get("http://192.168.29.139:3000/menu")
      .then(res => setData(res.data.menulist))
      .catch(err => console.error(err));
  }

  // 🔹 ADD MENU (NO DATE SENT)
function Menumn() {

  if (!mn || !mp || !gid || !qid || !nid) {
    alert("Please fill all fields");
    return;
  }

  axios.post("http://192.168.29.139:3000/addmenu", {
    menu_name: mn,
    menu_price: mp,
    gid: gid,
    qid: qid
  })
  .then(() => {
    Menu();
    setMn("");
    setMp("");
    setGid("");
    setQid("");
    setShowForm(false);
  })
  .catch(err => console.error(err));
}

  // 🔹 DELETE MENU
 function DeleteMenu(id) {
  axios.delete("http://192.168.29.139:3000/delmenu", {
    data: { id: id }
  })
  .then(() => {
    Menu();
  })
  .catch(err => {
    console.error(err.response?.data || err.message);
  });
}


  // 🔹 ROW ADD BUTTON → ONLY OPEN FORM
  function handleRowAdd() {
    setShowForm(true);
    setMn("");
    setMp("");
  }

  return (
    <>
      <Card className="m-3">
        <Card.Header as="h3">Menu Master</Card.Header>

        <Card.Body>

          {/* TOGGLE FORM */}
          {showForm && (
            <Form className="mb-4">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Menu Name"
                  value={mn}
                  onChange={e => setMn(e.target.value)}
                />
              </Form.Group>
               
<Form.Group className="mb-3">
  <Form.Select value={gid} onChange={e => setGid(e.target.value)}>
    <option value="">Select Food Group</option>
    {groups.map(g => (
      <option key={g.gid} value={g.gid}>
        {g.group_name}
      </option>
    ))}
  </Form.Select>
</Form.Group> 

<Form.Group className="mb-3">
  <Form.Select value={qid} onChange={e => setQid(e.target.value)}>
    <option value="">Select Quantity</option>
    {qty.map(q => (
      <option key={q.qid} value={q.qid}>
        {q.quantity}
      </option>
    ))}
  </Form.Select>
</Form.Group>


              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Enter Menu Price"
                  value={mp}
                  onChange={e => setMp(e.target.value)}
                 />
              </Form.Group>

              <Button variant="primary" onClick={Menumn}>
                Save Menu
              </Button>
            </Form>
          )}

          {/* TABLE */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>MID</th>
                <th>Menu Name</th>
                <th>Price</th>
                 <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map(val => (
                <tr key={val.mid}>
                  <td>{val.mid}</td>
                  <td>{val.menu_name}</td>
                  <td>{val.menu_price}</td>
                  <td>{val.created_at}</td>

              
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={handleRowAdd}
                    >
                      Add
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => DeleteMenu(val.mid)}
                    >
                      Delete
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






