import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch Users
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Fetch Users
  const fetchUsers = (pageNo) => {
    api
      .get(`/api/users/getUser?page=${pageNo}&size=5`)
      .then((res) => {
        setUsers(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      })
      .catch(() => {
        console.error("Failed to fetch users");
      });
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-title">Registered Users</h2>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.firstname} {u.lastname}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || "-"}</td>
                  <td>{u.userRole}</td>
                  <td>
                    <span
                      className={
                        u.isActive
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
