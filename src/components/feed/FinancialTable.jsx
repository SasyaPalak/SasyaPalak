import React, { useState } from 'react';

const FinancialTable = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [expectedRevenue, setExpectedRevenue] = useState(0);
  const [expectedIncome, setExpectedIncome] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const calculateFinancials = () => {
    // Calculate the interest
    const interest = (loanAmount * interestRate) / 100;
    setTotalRepayment(loanAmount + interest); // Total repayment (Loan + Interest)
    setNetIncome(expectedIncome - totalRepayment); // Net income (Expected income - Total repayment)
    return { interest, totalRepayment, netIncome };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFinancials();
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">Financial Table</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Loan Amount ($)
            </label>
            <input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Enter loan amount"
              required
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
              Interest Rate (%)
            </label>
            <input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Enter interest rate"
              required
            />
          </div>

          <div>
            <label htmlFor="expectedRevenue" className="block text-sm font-medium text-gray-700">
              Expected Revenue ($)
            </label>
            <input
              id="expectedRevenue"
              type="number"
              value={expectedRevenue}
              onChange={(e) => setExpectedRevenue(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Enter expected revenue"
            />
          </div>

          <div>
            <label htmlFor="expectedIncome" className="block text-sm font-medium text-gray-700">
              Expected Income ($)
            </label>
            <input
              id="expectedIncome"
              type="number"
              value={expectedIncome}
              onChange={(e) => setExpectedIncome(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Enter expected income"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Calculate Financials
          </button>
        </div>
      </form>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 border">Description</th>
              <th className="p-2 border text-right">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Interest</td>
              <td className="p-2 border text-right">{((loanAmount * interestRate) / 100).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2 border">Expected Revenue</td>
              <td className="p-2 border text-right">{expectedRevenue.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2 border">Expected Income</td>
              <td className="p-2 border text-right">{expectedIncome.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2 border">Total Repayment</td>
              <td className="p-2 border text-right">{totalRepayment.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2 border font-bold">Net Income</td>
              <td className={`p-2 border text-right ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netIncome.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
