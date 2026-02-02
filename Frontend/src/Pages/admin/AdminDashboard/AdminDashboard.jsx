import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { DollarSign, Package, CreditCard, BarChart2 } from "lucide-react";
import api from "../../../api/axiosInstance";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  /* ================= STATES ================= */
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    conversionRate: 0,
  });

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchDashboardStats();
    fetchCategorySales();
    fetchMonthlyRevenue();
    loadStaticAnalytics();
  }, []);

  /* ================= API: DASHBOARD STATS ================= */
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

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalUsers,
        conversionRate: ((orders.length / totalUsers) * 100).toFixed(1),
      });
    } catch (err) {
      console.error("Dashboard stats error", err);
    }
  };

  /* ================= API: CATEGORY SALES ================= */
  const fetchCategorySales = async () => {
    try {
      const res = await api.get("/admin/analytics/sales");
      setCategoryData(
        res.data.map((c) => ({
          name: c.categoryName,
          value: c.totalRevenue,
        }))
      );
    } catch (err) {
      console.error("Category sales error", err);
    }
  };

  /* ================= API: MONTHLY REVENUE ================= */
  const fetchMonthlyRevenue = async () => {
    try {
      const res = await api.get("/admin/analytics/monthly-revenue");
      setMonthlyRevenue(
        res.data.map((m) => ({
          month: getMonthName(m.month),
          revenue: Number(m.revenue),
        }))
      );
    } catch (err) {
      console.error("Monthly revenue error", err);
    }
  };

  const getMonthName = (m) =>
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];

  /* ================= STATIC ANALYTICS (UI DEMO) ================= */
  const loadStaticAnalytics = () => {
    setSalesData([
      { month: "Jan", sales: 4200, orders: 145 },
      { month: "Feb", sales: 5100, orders: 178 },
      { month: "Mar", sales: 6800, orders: 210 },
      { month: "Apr", sales: 5500, orders: 195 },
      { month: "May", sales: 7200, orders: 240 },
      { month: "Jun", sales: 8100, orders: 268 },
    ]);

    setRevenueData([
      { quarter: "Q1", revenue: 16100, target: 15000 },
      { quarter: "Q2", revenue: 20800, target: 18000 },
      { quarter: "Q3", revenue: 27600, target: 25000 },
      { quarter: "Q4", revenue: 34500, target: 30000 },
    ]);

    setProductPerformance([
      { product: "iPhone 15 Pro", sold: 245, revenue: 39175500, rating: 4.8 },
      { product: "Samsung S24", sold: 189, revenue: 23624811, rating: 4.6 },
      { product: "MacBook Pro", sold: 156, revenue: 22620000, rating: 4.9 },
    ]);
  };

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

  /* ================= UI ================= */
  return (
    <div className="data-analysis-dashboard">

      <h1>Welcome To Admin Dashboard</h1>

      {/* ===== KPI CARDS ===== */}
      <div className="metrics-grid">
        <Metric icon={<DollarSign />} title="Revenue" value={`₹${(stats.totalRevenue / 1e6).toFixed(2)}M`} />
        <Metric icon={<Package />} title="Orders" value={stats.totalOrders} />
        <Metric icon={<CreditCard />} title="Users" value={stats.totalUsers} />
        <Metric icon={<BarChart2 />} title="Conversion" value={`${stats.conversionRate}%`} />
      </div>


      <div className="charts-grid">

        {/* ===== CATEGORY WISE SALES ===== */}
        <ChartCard title="Category Wise Sales">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" label>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ===== MONTHLY REVENUE ===== */}
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>


    </div>
  );
};

/* ===== REUSABLE COMPONENTS ===== */
const Metric = ({ icon, title, value }) => (
  <div className="metric-card">
    <div className="metric-icon">{icon}</div>
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h2>{title}</h2>
    {children}
  </div>
);

export default AdminDashboard;
