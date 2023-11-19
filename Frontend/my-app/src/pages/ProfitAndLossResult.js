import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import html2pdf from "html2pdf.js";

function ProfitAndLossResult({ formData }) {
  const [profitAndLossList, setProfitAndLossList] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [searchedDateFrom, setSearchedDateFrom] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedDateFrom]);

  const fetchData = async () => {
    try {
      let url = "http://localhost:8080/profitAndLoss/getAll";
      if (selectedDateFrom) {
        url += `?dateFrom=${selectedDateFrom}`;
      }
      const response = await axios.get(url);
      setProfitAndLossList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    setSelectedDateFrom(searchedDateFrom);
  };

  const handleDownloadPDF = (result) => {
    const element = document.getElementById(result.id);
    const buttonElement = element.querySelector("button"); // Select the button element
    if (buttonElement) {
      buttonElement.remove(); // Remove the button element from the HTML structure
    }
    const opt = {
      margin: 0.5,
      filename: "profit_and_loss.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="container">
      <h2> Profit And Loss Reports</h2>
     
      <div>
        <label htmlFor="searchDate">Search Date From: </label>
        <input
          type="date"
          id="searchDate"
          value={searchedDateFrom}
          onChange={(e) => setSearchedDateFrom(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <Paper elevation={10}>
        {profitAndLossList.map((profitAndLoss) => {
          // Calculate Net Sale, Total Cost of Sale, Total Other Income, and Net Profit
          const netSale = profitAndLoss.totalSales - profitAndLoss.salesInwards;
          let totalCostOfSale = 0;
          profitAndLoss.costOfSales.forEach((cost) => {
            if (cost.type !== "Purchase returns") {
              totalCostOfSale += cost.amount;
            } else {
              totalCostOfSale -= cost.amount;
            }
          });
          let totalOtherIncome = 0;
          profitAndLoss.otherIncome.forEach((income) => {
            totalOtherIncome += income.amount;
          });
          const netProfit = netSale + totalOtherIncome - totalCostOfSale;

          return (
            <div key={profitAndLoss.id} id={profitAndLoss.id}>
              <Paper
                elevation={7}
                style={{ margin: "50px", padding: "15px", textAlign: "left" }}
                key={profitAndLoss.id}
              ><strong>
                Profit & Loss and Other Comprehensive Statement for the Coding
                Comrades business from {profitAndLoss.dateFrom} to{" "}
                {profitAndLoss.dateTo}.
                </strong>
                <br />
                <br />
                <table style={{ margin: "20px" }}>
                  <tbody>
                    <tr>
                      <td>Total Sales:</td>
                      <td></td>
                      <td>{profitAndLoss.totalSales}</td>
                    </tr>
                    <tr>
                      <td>Sales Inwards:</td>
                      <td></td>
                      <td>({profitAndLoss.salesInwards})</td>
                    </tr>

                    <tr>
                      
                      <td><strong>Net Sale:</strong></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><strong><u>{netSale}</u></strong></td>
                    </tr>

                    <br></br>
                    <tr>
                      <td><strong>Cost of Sales:</strong></td>
                    </tr>

                    <tr>
                      <td>
                        {profitAndLoss.costOfSales.map((cost) => (
                          <div key={cost.type}>
                            <p>{cost.type}</p>
                          </div>
                        ))}
                      </td>
                      <td></td>
                      <td>
                        {profitAndLoss.costOfSales.map((cost) => (
                          <div key={cost.type}>
                            <td>{cost.amount}</td>
                          </div>
                        ))}
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Total Cost of Sale:</strong></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    
                      <strong><u><td>{totalCostOfSale}</td></u></strong>
                    </tr>
                    <br></br>
                    <tr>
                      <td><strong>Other Income:</strong></td>
                    </tr>
                    <tr>
                      <td>
                        {profitAndLoss.otherIncome.map((income) => (
                          <div key={income.type}>
                            <p>{income.type}</p>
                          </div>
                        ))}
                      </td>
                      <td></td>

                      <td>
                        {profitAndLoss.otherIncome.map((income) => (
                          <div key={income.type}>
                            <p>{income.amount}</p>
                          </div>
                        ))}
                      </td>
                    </tr>

                    <tr>
                      <td>Total Other Income:</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{totalOtherIncome}</td>
                    </tr>
                    <tr>
                      <strong>
                      <td>Net Profit:</td>
                      </strong>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      
                      <strong><u><td>{netProfit}</td></u></strong>
                    </tr>
                  </tbody>
                </table>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownloadPDF(profitAndLoss)}
              >
                Download PDF
              </Button>
            </div>
          );
        })}
      </Paper>
    </div>
  );
}

export default ProfitAndLossResult;





// the following codes contains the sending report to a particular email address for that i used emailjs but unfortunately to send email with attachment i have to pay money. so it is not accepting the attachments.



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Paper } from "@mui/material";
// import Button from "@mui/material/Button";
// import html2pdf from "html2pdf.js";
// import emailjs from "emailjs-com";

// function ProfitAndLossResult({ formData }) {
//   const [profitAndLossList, setProfitAndLossList] = useState([]);
//   const [selectedDateFrom, setSelectedDateFrom] = useState("");
//   const [searchedDateFrom, setSearchedDateFrom] = useState("");
//   const [receiverEmail, setReceiverEmail] = useState("");
//   const [pdfElement, setPdfElement] = useState(null); // State to store the PDF element

//   useEffect(() => {
//     fetchData();
//   }, [selectedDateFrom]);

//   const fetchData = async () => {
//     try {
//       let url = "http://localhost:8080/profitAndLoss/getAll";
//       if (selectedDateFrom) {
//         url += `?dateFrom=${selectedDateFrom}`;
//       }
//       const response = await axios.get(url);
//       setProfitAndLossList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSearch = () => {
//     setSelectedDateFrom(searchedDateFrom);
//   };

//   const handleDownloadPDF = (result) => {
//     const element = document.getElementById(result.id);
//     const buttonElement = element.querySelector("button");
//     if (buttonElement) {
//       buttonElement.remove();
//     }
//     setPdfElement(element); // Store the element in the state variable

//     const opt = {
//       margin: 0.5,
//       filename: "profit_and_loss.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };
//     html2pdf().from(element).set(opt).save();
//   };

//   const sendEmail = async (result) => {
//     if (!receiverEmail) {
//       alert("Please enter a receiver email address.");
//       return;
//     }
  
//     const serviceId = "service_v9gxlxd";
//     const templateId = "ytemplate_os3htfq";
//     const userId = "_1Pi1XEw7MSM4PvJG";
  
//     const templateParams = {
//       to_email: receiverEmail,
//       subject: "Profit and Loss Report",
//       message_html: "Attached is the Profit and Loss report.",
//     };
  
//     try {
//       const attachment = await createAttachment(result);
  
//       // Include the attachment in the email sending parameters
//       const emailParams = { ...templateParams, attachment };
  
//       const response = await emailjs.send(serviceId, templateId, emailParams, userId);
//       console.log("Email sent successfully:", response);
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };
  
  
//   const createAttachment = async (result) => {
//     const element = document.getElementById(result.id);
//     const buttonElement = element.querySelector("button");
//     if (buttonElement) {
//       buttonElement.remove();
//     }
  
//     const opt = {
//       margin: 0.5,
//       filename: "profit_and_loss.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };
  
//     const pdf = await html2pdf().from(element).set(opt).outputPdf();
  
//     return { name: "profit_and_loss.pdf", data: pdf };
//   };
  

//   const elementToBase64 = (element) => {
//     const source = element.outerHTML;
//     const decodedSource = window.atob(window.btoa(unescape(encodeURIComponent(source))));
//     const pdf = new Blob([decodedSource], { type: "application/pdf" });
//     return URL.createObjectURL(pdf);
//   };

//   return (
//     <div className="container">
//       <h2>Profit and Loss Result</h2>

//       <div>
//         <label htmlFor="searchDate">Search Date From: </label>
//         <input
//           type="date"
//           id="searchDate"
//           value={searchedDateFrom}
//           onChange={(e) => setSearchedDateFrom(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={handleSearch}>
//           Search
//         </Button>
//       </div>

//       <Paper elevation={10}>
//         {profitAndLossList.map((profitAndLoss) => {
//           const netSale = profitAndLoss.totalSales - profitAndLoss.salesInwards;
//           let totalCostOfSale = 0;
//           profitAndLoss.costOfSales.forEach((cost) => {
//             if (cost.type !== "Purchase returns") {
//               totalCostOfSale += cost.amount;
//             } else {
//               totalCostOfSale -= cost.amount;
//             }
//           });
//           let totalOtherIncome = 0;
//           profitAndLoss.otherIncome.forEach((income) => {
//             totalOtherIncome += income.amount;
//           });
//           const netProfit = netSale + totalOtherIncome - totalCostOfSale;

//           return (
//             <div key={profitAndLoss.id} id={profitAndLoss.id}>
//               <Paper
//                 elevation={7}
//                 style={{ margin: "50px", padding: "15px", textAlign: "left" }}
//                 key={profitAndLoss.id}
//               >
//                 <strong>
//                   Profit & Loss and Other Comprehensive Statement for the Coding
//                   Comrades business from {profitAndLoss.dateFrom} to{" "}
//                   {profitAndLoss.dateTo}.
//                 </strong>
//                 <br />
//                 <br />
//                 <table style={{ margin: "20px" }}>
//                   <tbody>
//                     <tr>
//                       <td>Total Sales:</td>
//                       <td></td>
//                       <td>{profitAndLoss.totalSales}</td>
//                     </tr>
//                     <tr>
//                       <td>Sales Inwards:</td>
//                       <td></td>
//                       <td>({profitAndLoss.salesInwards})</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <strong>Net Sale:</strong>
//                       </td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td>
//                         <strong>
//                           <u>{netSale}</u>
//                         </strong>
//                       </td>
//                     </tr>
//                     <br></br>
//                     <tr>
//                       <td>
//                         <strong>Cost of Sales:</strong>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         {profitAndLoss.costOfSales.map((cost) => (
//                           <div key={cost.type}>
//                             <p>{cost.type}</p>
//                           </div>
//                         ))}
//                       </td>
//                       <td></td>
//                       <td>
//                         {profitAndLoss.costOfSales.map((cost) => (
//                           <div key={cost.type}>
//                             <td>{cost.amount}</td>
//                           </div>
//                         ))}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <strong>Total Cost of Sale:</strong>
//                       </td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <strong>
//                         <u>
//                           <td>{totalCostOfSale}</td>
//                         </u>
//                       </strong>
//                     </tr>
//                     <br></br>
//                     <tr>
//                       <td>
//                         <strong>Other Income:</strong>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         {profitAndLoss.otherIncome.map((income) => (
//                           <div key={income.type}>
//                             <p>{income.type}</p>
//                           </div>
//                         ))}
//                       </td>
//                       <td></td>
//                       <td>
//                         {profitAndLoss.otherIncome.map((income) => (
//                           <div key={income.type}>
//                             <p>{income.amount}</p>
//                           </div>
//                         ))}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Total Other Income:</td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td>{totalOtherIncome}</td>
//                     </tr>
//                     <tr>
//                       <strong>
//                         <td>Net Profit:</td>
//                       </strong>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <td></td>
//                       <strong>
//                         <u>
//                           <td>{netProfit}</td>
//                         </u>
//                       </strong>
//                     </tr>
//                   </tbody>
//                 </table>
//               </Paper>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleDownloadPDF(profitAndLoss)}
//               >
//                 Download PDF
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   const email = prompt("Enter receiver's email address:");
//                   setReceiverEmail(email);
//                 }}
//               >
//                 Send Email
//               </Button>
//             </div>
//           );
//         })}
//       </Paper>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={sendEmail}
//         disabled={!receiverEmail}
//       >
//         Send Email
//       </Button>
//     </div>
//   );
// }

// export default ProfitAndLossResult;




