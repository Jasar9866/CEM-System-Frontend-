import React from 'react';
import { Link } from 'react-router-dom';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

/**
 * This page is about the Reporting part.
 * @returns the type of report.
 */

function Reports() {
    return (

        <div className="container-fluid" style={{ backgroundImage: "url()", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh" }}>

            <div className='Reports'>

                <h2 style={{
                    fontWeight: "900",
                    fontFamily: "sanserif",
                    textAlign: "center",
                    color:"#0B2952"
                }}>
                    Reports
                    
                </h2>
                <Link to="/ProfitAndLoss">
                    <div className="col-sm-4 ms-auto me-auto pt-5 mt-3  shadow-sm"
                        style={{
                            backdropFilter: "blur(5px)",
                            backgroundColor: "#0B2952",
                            borderRadius: "30px"
                        }}>

                        <h1>
                            <StackedLineChartOutlinedIcon fontSize='large'
                                style={{
                                    color: "white",
                                    textAlign: "center"
                                }} />
                        </h1>

                        <h4 style={{
                            fontWeight: "900",
                            fontFamily: "sen sarif",
                            color: "#F9FCFC",
                            textAlign: "center"
                        }}>
                            Profit & Loss and Other <br></br>
                            Comprehensive Income Statement
                        </h4>

                    </div>
                    </Link>
                <Report2></Report2>

            </div>

        </div>

    );
}

function Report2() {
    return (
        <Link to="/ProfitAndLoss">
            <div className="col-sm-4 ms-auto me-auto pt-5 mt-3  shadow-sm"
                        style={{
                            backdropFilter: "blur(5px)",
                            backgroundColor: "#0B2952",
                            borderRadius: "30px",
                            margin: "500px 550px"
                        }}>

                        <h1>
                            <ProductionQuantityLimitsIcon fontSize='large'
                                style={{
                                    color: "white",
                                    textAlign: "center"
                                }} />
                        </h1>

                        <h4 style={{
                            fontWeight: "900",
                            fontFamily: "sen sarif",
                            color: "#F9FCFC",
                            textAlign: "center"
                        }}>
                            Product  <br></br>
                            Report
                        </h4>

                    </div>

        </Link>
    )


}

export default Reports;