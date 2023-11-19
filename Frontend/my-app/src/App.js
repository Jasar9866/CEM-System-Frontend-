import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Feedback from "./pages/Feedback";
import Reports from "./pages/Reports";
import FeedbackList from "./pages/FeedbackList";
import SendEmail from "./pages/SendEmail";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProfitAndLoss from "./pages/ProfitAndLoss";
import Product from "./pages/ProfitAndLossResult";
import ProfitAndLossResult from "./pages/ProfitAndLossResult";


function App() {

  return (
    
    <div className="App" >
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/sendemail" element={<SendEmail/>}/>
          <Route exact path="/profitAndLoss" element={<ProfitAndLoss />} />
          <Route exact path="/reports" element={<Reports />} />
          <Route exact path="/product" element={<Product />}/>
          <Route exact path="/feedbackList" element={<FeedbackList />} />
          <Route exact path="/profitAndLossResult" element={<ProfitAndLossResult />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;

