import React, { useState, useEffect } from "react";
import "./CustomerOrders.css";
import { toast } from "react-toastify";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    loadDummyOrders();
  }, []);

  const loadDummyOrders = () => {
    const dummyOrders = [
      {
        orderId: "ORD12345",
        orderDate: "2025-01-10",
        customerName: "Rohit Sharma",
        mobile: "9876543210",
        address: "Sector 15, Noida",
        productName: "Samsung 55-inch LED TV",
        quantity: 1,
        price: 45999,
        paymentType: "Online",
        status: "Order Received",
      },
      {
        orderId: "ORD12346",
        orderDate: "2025-01-12",
        customerName: "Priya Verma",
        mobile: "9123456780",
        address: "MG Road, Delhi",
        productName: "HP Gaming Laptop",
        quantity: 1,
        price: 72999,
        paymentType: "Cash on Delivery",
        status: "Packed",
      },
      {
        orderId: "ORD12347",
        orderDate: "2025-01-14",
        customerName: "Amit Kumar",
        mobile: "9988776655",
        address: "Andheri West, Mumbai",
        productName: "iPhone 15 Pro",
        quantity: 1,
        price: 134999,
        paymentType: "Online",
        status: "Shipped",
      },
    ];

    setOrders(dummyOrders);
  };

  const updateStatus = (orderId, newStatus) => {
    if (!newStatus) {
      toast.warning("Select a status first");
      return;
    }

    const updated = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updated);
    toast.success("Order status updated!");
  };

 
  const statuses = ["All", ...new Set(orders.map((o) => o.status))];

  
  const filteredOrders = orders.filter((o) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      o.customerName.toLowerCase().includes(search) ||
      o.productName.toLowerCase().includes(search) ||
      o.orderId.toLowerCase().includes(search) ||
      o.address.toLowerCase().includes(search) ||
      o.mobile.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "All" || o.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="product-page">
      <h2 className="page-title">Customer Orders</h2>

     
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <label className="filter-label">Status:</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="stats-box">
          <span className="stats-text">
            Total Orders: <strong>{filteredOrders.length}</strong>
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="table table-bordered custom-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Order ID</th>
              <th>Delivery Address</th>
              <th>Product Details</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  No Orders Found
                </td>
              </tr>
            )}

            {filteredOrders.map((o) => (
              <tr key={o.orderId}>
                <td>{o.orderDate}</td>
                <td><b>{o.orderId}</b></td>

                <td>
                  {o.customerName} <br />
                  {o.address}
                  <br />
                  Mob: {o.mobile}
                </td>

                <td>
                  {o.productName}
                  <br />
                  Quantity: {o.quantity}
                  <br />
                  <span className="price-green">₹{o.price}</span>
                </td>

                <td>{o.paymentType}</td>

                <td>
                  <span className="badge bg-info p-2">{o.status}</span>
                </td>

                <td>
                  <div className="action-box">
                    <select
                      className="filter-select"
                      onChange={(e) => (o.newStatus = e.target.value)}
                    >
                      <option value="">--select--</option>
                      <option value="Order Received">Order Received</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">
                        Out For Delivery
                      </option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      className="btn btn-edit"
                      onClick={() =>
                        updateStatus(o.orderId, o.newStatus)
                      }
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerOrders;
