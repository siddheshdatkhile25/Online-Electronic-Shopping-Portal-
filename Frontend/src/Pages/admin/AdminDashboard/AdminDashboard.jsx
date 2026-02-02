import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../../../api/axiosInstance";
import "./AdminDashboard.css";

const CategorySalesChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    fetchCategorySales();
    fetchMonthlyRevenue();
  }, []);

  // fetch ONLY total revenue, orders and users
  const fetchDashboardStats = async () => {
    try {
      const ordersRes = await api.get("/admin/orders");
      const usersRes = await api.get("/api/users/getUser?page=0&size=1");

      const orders = ordersRes.data;
      const totalUsers = usersRes.data.data.totalElements;

      let totalRevenue = 0;

      orders.forEach((order) => {
        if (order.paymentStatus === "SUCCESS") {
          order.items.forEach((item) => {
            totalRevenue += Number(item.totalAmount);
          });
        }
      });

      setStats((prev) => ({
        ...prev,
        totalRevenue,
        totalOrders: orders.length,
        totalUsers,
      }));
    } catch (error) {
      console.error("Dashboard stats error", error);
    }
  };

  const fetchCategorySales = async () => {
    try {
      const res = await api.get("/admin/analytics/sales");
      setCategoryData(res.data);
    } catch (error) {
      console.error("Failed to load category sales", error);
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const res = await api.get("/admin/analytics/monthly-revenue");

      const formatted = res.data.map((item) => ({
        month: getMonthName(item.month),
        revenue: Number(item.revenue),
      }));

      setMonthlyRevenue(formatted);
    } catch (error) {
      console.error("Failed to load monthly revenue", error);
    }
  };

  const getMonthName = (m) => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    return months[m - 1];
  };

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="dashboard-wrapper">

      {/* ===== CATEGORY SALES PIE ===== */}
      <div className="category-chart-container">
        <h2>Category Wise Sales</h2>

        {categoryData.length === 0 ? (
          <p className="empty-text">No sales data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="totalRevenue"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ categoryName }) => categoryName}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== MONTHLY REVENUE BAR ===== */}
      <div className="revenue-chart-container">
        <h2>Monthly Revenue</h2>

        {monthlyRevenue.length === 0 ? (
          <p className="empty-text">No revenue data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default CategorySalesChart;
