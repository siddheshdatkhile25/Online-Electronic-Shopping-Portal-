import React, { useEffect, useState } from "react";
import "./CustomerOrders.css";
import { toast } from "react-toastify";
import api from "../../../api/axiosInstance"; 


function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  //  Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    if (!newStatus) {
      toast.warning("Select a status");
      return;
    }

    try {
      await api.put(`/admin/orders/${orderId}/status`, null, {
        params: { status: newStatus },
      });

      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data || "Update failed");
    }
  };

  const statuses = [
    "All",
    "PLACED",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
  ];

  const filteredOrders = orders.filter((o) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      o.userName.toLowerCase().includes(search) ||
      o.orderId.toString().includes(search) ||
      o.deliveryAddress.city.toLowerCase().includes(search);

    const matchesStatus =
      filterStatus === "All" || o.orderStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="product-page">
      <h2 className="page-title">Customer Orders</h2>

      {/* FILTER SECTION */}
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

      {/* TABLE */}
      <div className="table-container">
        <table className="table table-bordered custom-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Payment</th>
              <th>Order Status</th>
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
                <td>{new Date(o.orderDate).toLocaleDateString()}</td>

                <td>
                  <b>#{o.orderId}</b>
                </td>

                <td>
                  {o.userName}
                  <br />
                  {o.deliveryAddress.city},{" "}
                  {o.deliveryAddress.state}
                  <br />
                  {o.deliveryAddress.pincode}
                </td>

                <td>
                  {o.items.map((item) => (
                    <div key={item.productId}>
                      {item.productName} × {item.quantity}
                      <br />
                      <span className="price-green">
                        ₹{item.totalAmount}
                      </span>
                    </div>
                  ))}
                </td>

                {/* PAYMENT INFO */}
                <td>
                  Mode: {o.paymentMode ?? "COD"}
                  <br />
                  <span
                    className={`badge ${
                      o.paymentStatus === "SUCCESS"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {o.paymentStatus}
                  </span>
                </td>

                {/* ORDER STATUS */}
                <td>
                  <span className="badge bg-info p-2">
                    {o.orderStatus}
                  </span>
                </td>

                {/* ACTION */}
                <td>
                  <div className="action-box">
                    <select
                      className="filter-select"
                      onChange={(e) =>
                        (o.newStatus = e.target.value)
                      }
                    >
                      <option value="">--select--</option>
                      {o.orderStatus === "PLACED" && (
                        <option value="CONFIRMED">
                          CONFIRMED
                        </option>
                      )}
                      {o.orderStatus === "CONFIRMED" && (
                        <option value="SHIPPED">
                          SHIPPED
                        </option>
                      )}
                      {o.orderStatus === "SHIPPED" && (
                        <option value="DELIVERED">
                          DELIVERED
                        </option>
                      )}
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
