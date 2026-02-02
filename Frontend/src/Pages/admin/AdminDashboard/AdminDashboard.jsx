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

const DataAnalysisDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchAnalyticsData();
    fetchDashboardStats();
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

  const fetchAnalyticsData = () => {
    setSalesData([
      { month: "Jan", sales: 4200, orders: 145 },
      { month: "Feb", sales: 5100, orders: 178 },
      { month: "Mar", sales: 6800, orders: 210 },
      { month: "Apr", sales: 5500, orders: 195 },
      { month: "May", sales: 7200, orders: 240 },
      { month: "Jun", sales: 8100, orders: 268 },
      { month: "Jul", sales: 9200, orders: 298 },
      { month: "Aug", sales: 8600, orders: 285 },
      { month: "Sep", sales: 9800, orders: 312 },
      { month: "Oct", sales: 10500, orders: 335 },
      { month: "Nov", sales: 11200, orders: 358 },
      { month: "Dec", sales: 12800, orders: 398 },
    ]);

    setCategoryData([
      { name: "Electronics", value: 3250, percentage: 38 },
      { name: "Mobile Phones", value: 2890, percentage: 34 },
      { name: "Computers", value: 1560, percentage: 18 },
      { name: "Accessories", value: 850, percentage: 10 },
    ]);

    setRevenueData([
      { quarter: "Q1 2024", revenue: 16100, target: 15000 },
      { quarter: "Q2 2024", revenue: 20800, target: 18000 },
      { quarter: "Q3 2024", revenue: 27600, target: 25000 },
      { quarter: "Q4 2024", revenue: 34500, target: 30000 },
    ]);

    setProductPerformance([
      { product: "iPhone 15 Pro", sold: 245, revenue: 39175500, rating: 4.8 },
      { product: "Samsung S24", sold: 189, revenue: 23624811, rating: 4.6 },
      { product: "MacBook Pro", sold: 156, revenue: 22620000, rating: 4.9 },
      { product: "Sony Headphones", sold: 312, revenue: 9356880, rating: 4.5 },
      { product: "iPad Pro", sold: 198, revenue: 15840000, rating: 4.7 },
    ]);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="data-analysis-dashboard">
      <div className="dashboard-header">
        <h1> Welcome To Admin Dashboard !</h1>
        <p className="dashboard-subtitle">Comprehensive analytics and insights</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card metric-blue">
          <div className="metric-icon">
            <DollarSign size={28} />
          </div>
          <div className="metric-content">
            <h3>₹{(stats.totalRevenue / 1000000).toFixed(2)}M</h3>
            <p>Total Revenue</p>
            <span className="metric-change positive">+12.5% vs last month</span>
          </div>
        </div>

        <div className="metric-card metric-green">
          <div className="metric-icon">
            <Package size={28} />
          </div>
          <div className="metric-content">
            <h3>{stats.totalOrders.toLocaleString()}</h3>
            <p>Total Orders</p>
            <span className="metric-change positive">+8.3% vs last month</span>
          </div>
        </div>

        <div className="metric-card metric-purple">
          <div className="metric-icon">
            <CreditCard size={28} />
          </div>
          <div className="metric-content">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
            <span className="metric-change positive">Active users</span>
          </div>
        </div>

        <div className="metric-card metric-orange">
          <div className="metric-icon">
            <BarChart2 size={28} />
          </div>
          <div className="metric-content">
            <h3>{stats.conversionRate}%</h3>
            <p>Conversion Rate</p>
            <span className="metric-change negative">-1.2% vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h2>Sales Trend (Monthly)</h2>
            <select className="chart-filter">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h2>Category Distribution</h2>
            <select className="chart-filter">
              <option>By Revenue</option>
              <option>By Units</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <div className="chart-header">
            <h2>Revenue vs Target (Quarterly)</h2>
            <select className="chart-filter">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#0088FE" name="Actual Revenue" />
              <Bar dataKey="target" fill="#00C49F" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="performance-card">
        <div className="chart-header">
          <h2>Top Product Performance</h2>
          <button className="export-btn">Export Report</button>
        </div>

        <div className="performance-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Performance</th>
              </tr>
            </thead>

            <tbody>
              {productPerformance.map((product, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{product.product}</td>
                  <td>{product.sold} units</td>
                  <td>₹{(product.revenue / 1000000).toFixed(2)}M</td>
                  <td>★ {product.rating}</td>
                  <td>
                    <div className="performance-bar">
                      <div
                        className="performance-fill"
                        style={{
                          width: `${(product.revenue / 39175500) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisDashboard;
