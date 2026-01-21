import React, { useEffect, useState } from "react";
import "./PaymentPage.css";

function PaymentPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadDummyPayments();
  }, []);

  const loadDummyPayments = () => {
    const dummy = [
      {
        paymentId: "PAY12345",
        orderId: "ORD1001",
        customer: "Harshali Patil",
        mode: "UPI",
        amount: 2100,
        status: "SUCCESS",
        date: "2025-01-12 10:45 AM",
      },
      {
        paymentId: "PAY12346",
        orderId: "ORD1002",
        customer: "Siddhesh",
        mode: "CARD",
        amount: 4599,
        status: "FAILED",
        date: "2025-01-12 11:10 AM",
      },
      {
        paymentId: "PAY12347",
        orderId: "ORD1003",
        customer: "Anjali",
        mode: "WALLET",
        amount: 799,
        status: "PENDING",
        date: "2025-01-12 11:45 AM",
      },
      {
        paymentId: "PAY12348",
        orderId: "ORD1004",
        customer: "Rahul",
        mode: "UPI",
        amount: 1299,
        status: "REFUNDED",
        date: "2025-01-12 01:35 PM",
      },
    ];

    setPayments(dummy);
  };

  return (
    <div className="payment-container">
      <h2>Payment Management</h2>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Mode</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{p.paymentId}</td>
              <td>{p.orderId}</td>
              <td>{p.customer}</td>
              <td>{p.mode}</td>
              <td>₹{p.amount}</td>
              
              <td className={`status ${p.status.toLowerCase()}`}>{p.status}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentPage;
