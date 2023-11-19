import React from "react";
import { Link } from "react-router-dom";

/**
 * 
 * @returns 
 */

export default function Navbar() {
  return (
    
    <div>
      <nav className="navbar" style={{backgroundColor:"#0B2952"}}>
        <div className="container-fluid ">
          <h4 style={{color:"whitesmoke"}}>
          Customer Employee Management System <i style={{fontSize:"15px"}}>(Mohamed Al Jasar)</i><p></p>
          </h4>
          
          <div className="d-flex justify-content-center">
         
          <Link className="btn btn-outline-info mx-4" to="/Reports">
            Financial Reports
          </Link>
          <Link className="btn btn-outline-info mx-4" to="/SendEmail">
            Send Email
          </Link>
          
          <Link className="btn btn-outline-info mx-2" to="/Feedback">
            Feedback Form
          </Link>
          <Link className="btn btn-outline-info mx-2" to="/FeedbackList">
            Feedbacks
          </Link>
          
          <Link className="btn btn-outline-info mx-2" to="/ProfitAndLossResult">
          Profit And Loss Reports
          </Link>
          
          

          </div>

        </div>
      </nav>
      
    </div>
  );
}