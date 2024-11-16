import React from "react";
import "../../styles/FinancialTable.css"; // Ensure the path is correct based on your project structure

const FinancialTable = ({ userData }) => {
  // Sample data - replace with actual data from backend
  const sampleData = {
    fullName: "John Doe Smith",
    interest: "12%",
    expectedOutcome: "$15,000",
    totalRepayment: "$11,200",
    netIncome: "$3,800",
  };

  // Use userData from props if available, otherwise use sample data
  const data = userData || sampleData;

  return (
    <div className="min-h-screen table-container">
      <h2 className="table-title">{data.fullName}</h2>
      <div className="table-wrapper">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount/Rate</th>
            </tr>
          </thead>
          <tbody>
            {/* Interest Row */}
            <tr>
              <td>Interest</td>
              <td>{data.interest}</td>
            </tr>
            {/* Expected Outcome Row */}
            <tr>
              <td>Expected Outcome</td>
              <td>{data.expectedOutcome}</td>
            </tr>
            {/* Total Repayment Row */}
            <tr>
              <td>Total Repayment</td>
              <td>{data.totalRepayment}</td>
            </tr>
            {/* Net Income Row */}
            <tr>
              <td>Net Income</td>
              <td>{data.netIncome}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
