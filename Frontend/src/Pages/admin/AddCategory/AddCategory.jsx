import React, { useState } from "react";
import api from "../../../api/axiosInstance"; 

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      setMessage("Please enter category name and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);       
    formData.append("image", image); 

    try {
      setLoading(true);
      const res = await api.post("/admin/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Category added successfully!");
      setName("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <form
        className="border p-4 rounded shadow"
        style={{ width: "420px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Add Category</h3>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-dark w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
