import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    brand: "",
    description: "",
    discountPercentage: "",
    image: null,
  });

  // Fetch categories on component mount
  useEffect(() => {
    api
      .get("/admin/categories")
      .then((response) => {
        // If using ApiResponse wrapper: response.data.data
        setCategories(response.data.data || []);
        console.log("Categories fetched:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("categoryId", Number(product.categoryId));
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("brand", product.brand);
      formData.append("description", product.description);

      // ✅ Apply ONLY discount percentage
      if (product.discountPercentage) {
        formData.append("discountPercentage", product.discountPercentage);
      }

      if (product.image) {
        formData.append("image", product.image);
      }

      const response = await api.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product created:", response.data);
      alert("Product added successfully!");

      // Reset form
      setProduct({
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        brand: "",
        description: "",
        discountPercentage: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <form
        className="border p-4 rounded shadow"
        style={{ width: "520px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Add Product</h3>

        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="categoryId"
            className="form-select"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Discount Percentage */}
        <div className="mb-3">
          <label className="form-label">Discount Percentage (%)</label>
          <input
            type="number"
            name="discountPercentage"
            className="form-control"
            value={product.discountPercentage}
            onChange={handleChange}
            placeholder="e.g. 10"
            min="0"
            max="100"
          />
        </div>

        {/* Product Image */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
