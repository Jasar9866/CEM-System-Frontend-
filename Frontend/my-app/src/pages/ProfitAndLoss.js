
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import axios from "axios";
import ProfitAndLossResult from "./ProfitAndLossResult";



function ProfitAndLoss() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [salesInwards, setSalesInwards] = useState("");
  const [costOfSales, setCostOfSales] = useState([]);
  const [otherIncome, setOtherIncome] = useState([]);


  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const profitAndLoss = {
      dateFrom,
      dateTo,
      totalSales,
      salesInwards,
      costOfSales,
      otherIncome,
    };
  
    try {
      await axios.post("http://localhost:8080/profitAndLoss/add", profitAndLoss);
      console.log("Form submitted successfully!");
      setFormSubmitted(true); // Set formSubmitted to true after submitting the form
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  
  

  const handleCostOfSalesAdd = () => {
    if (costOfSales.length < 3) {
      setCostOfSales([...costOfSales, { type: "", amount: 0 }]);
    } 
  };

  const handleOtherIncomeAdd = () => {
    setOtherIncome([...otherIncome, { type: "", amount: 0 }]);
  };

  const handleCostOfSalesDelete = (index) => {
    const updatedCostOfSales = [...costOfSales];
    updatedCostOfSales.splice(index, 1);
    setCostOfSales(updatedCostOfSales);
  };

  const handleOtherIncomeDelete = (index) => {
    const updatedOtherIncome = [...otherIncome];
    updatedOtherIncome.splice(index, 1);
    setOtherIncome(updatedOtherIncome);
  };

  const handleCostOfSalesChange = (index, field, value) => {
    const updatedCostOfSales = [...costOfSales];
    updatedCostOfSales[index][field] = value;
    setCostOfSales(updatedCostOfSales);
  };

  const handleOtherIncomeChange = (index, field, value) => {
    const updatedOtherIncome = [...otherIncome];
    updatedOtherIncome[index][field] = value;
    setOtherIncome(updatedOtherIncome);
  };

  return (
    <div
      className="container-fluid"
      style={{
        
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "115vh",
      }}
    >
     {formSubmitted ? (
      <ProfitAndLossResult formData={{ dateFrom, dateTo, totalSales, salesInwards, costOfSales, otherIncome }}></ProfitAndLossResult>
    ) : (
      <div className="row p-5">
        <div
          className="col-sm-5 ms-auto me-auto pt-5 mt-3  shadow"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255)",
            borderWidth: "5px",
          }}
        >
          <h2
            className="text-center"
            style={{
              fontWeight: "900",
              fontFamily: "sen sarif",
            }}
          >
            Profit & Loss and Other <br></br>
            Comprehensive Statement
            <i class="fa-solid fa-paper-plane" style={{ color: "#640513" }}></i>
          </h2>

          <form
            className="ms-auto me-auto p-5 profit_and_loss-form"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Date From</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Date To</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Total Sales</Form.Label>
                <Form.Control
                  type="number"
                  value={totalSales}
                  onChange={(e) => setTotalSales(parseFloat(e.target.value))}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Sales Inwards</Form.Label>
                <Form.Control
                  type="number"
                  value={salesInwards}
                  onChange={(e) => setSalesInwards(parseFloat(e.target.value))}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>Cost of Sales</Form.Label>
              {costOfSales.slice(0, 3).map((cost, index) => (
                <Row className="mb-3" key={index}>
                  <Col>
                    <Form.Select
                      value={cost.type}
                      onChange={(e) =>
                        handleCostOfSalesChange(index, "type", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Purchases">Purchases</option>
                      <option value="Carriage charges">Carriage charges</option>
                      <option value="Purchase returns">Purchase returns</option>
                    </Form.Select>
                  </Col>

                  <Col>
                    <Form.Control
                      type="number"
                      value={cost.amount}
                      onChange={(e) =>
                        handleCostOfSalesChange(
                          index,
                          "amount",
                          parseFloat(e.target.value)
                        )
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <button
                      variant="contained"
                      type="button"
                      onClick={() => handleCostOfSalesDelete(index)}
                      style={{
                        backgroundColor: "#FF9494",
                        borderRadius: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </Col>
                </Row>
              ))}
              <button type="button" onClick={handleCostOfSalesAdd}>
                Add Cost of Sales
              </button>
            </Form.Group>
            <br></br>

            <Form.Group>
              <Form.Label>Other Income</Form.Label>
              {otherIncome.map((income, index) => (
                <Row className="mb-3" key={index}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={income.type}
                      onChange={(e) =>
                        handleOtherIncomeChange(index, "type", e.target.value)
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      value={income.amount}
                      onChange={(e) =>
                        handleOtherIncomeChange(
                          index,
                          "amount",
                          parseFloat(e.target.value)
                        )
                      }
                      required
                    />
                  </Col>
                  <Col className="mb-3">
                    <button
                      variant="contained"
                      type="button"
                      onClick={() => handleOtherIncomeDelete(index)}
                      style={{
                        backgroundColor: "#FF9494",
                        borderRadius: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </Col>
                </Row>
              ))}
              <button type="button" onClick={handleOtherIncomeAdd}>
                Add Other Income
              </button>
            </Form.Group>
            <br></br>
            <Row className="mb-3">
              <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
                <Button
                  variant="contained"
                  type="submit"
                  className="w-100 mt-3 p-3 mb-5"
                  style={{ backgroundColor: "#032740", borderRadius: "30px" }}
                >
                  Submit &nbsp;
                  <i class="fa-solid fa-paper-plane"></i>
                </Button>
              </Form.Group>

              <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
                <Button
                  variant="contained"
                  type="reset"
                  className="w-100 mt-3 p-3 mb-5"
                  style={{ backgroundColor: "#032740", borderRadius: "30px" }}
                >
                  Cancel &nbsp;
                  <i class="fa-solid fa-paper-plane"></i>
                </Button>
              </Form.Group>
            </Row>
          </form>
        </div>
      </div>
      
    )}
      
    </div>
  );
}

export default ProfitAndLoss;


