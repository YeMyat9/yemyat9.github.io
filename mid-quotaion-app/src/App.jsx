import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discountRef.current.value) || 0,
    };

    // Check if item already exists
    const existingItemIndex = dataItems.findIndex(
      (v) => v.item === newItem.item && v.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      // Update the existing item
      const updatedItems = dataItems.map((v, index) => {
        if (index === existingItemIndex) {
          return {
            ...v,
            qty: v.qty + newItem.qty,
            discount: v.discount + newItem.discount,
          };
        }
        return v;
      });
      setDataItems(updatedItems);
    } else {
      // Add the new item
      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const resetForm = () => {
    itemRef.current.value = products[0].code;
    ppuRef.current.value = products[0].price;
    qtyRef.current.value = 1;
    discountRef.current.value = 0;
    setPpu(products[0].price);
  };

  const clearTable = () => {
    clearDataItems();
    resetForm();
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(Number(e.target.value))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearTable={clearTable}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default App;
