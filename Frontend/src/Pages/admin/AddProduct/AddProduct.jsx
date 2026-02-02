import React, { useEffect, useState, useRef } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const AddProduct = () => {
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    brand: "",
    description: "",
    discountPercentage: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  // Fetch categories
  useEffect(() => {
    api
      .get("/admin/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error("You can upload a maximum of 4 images");
      return;
    }

    setProduct((prev) => ({ ...prev, images: files }));
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.images.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("categoryId", product.categoryId);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("brand", product.brand);
      formData.append("description", product.description);

      if (product.discountPercentage) {
        formData.append("discountPercentage", product.discountPercentage);
      }

      // ✅ append images correctly (VERY IMPORTANT)
      product.images.forEach((file) => {
        formData.append("images", file);
      });

      // ✅ DO NOT SET HEADERS
      await api.post("/admin/products", formData);

      toast.success("Product added successfully!");

      // Reset form
      setProduct({
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        brand: "",
        description: "",
        discountPercentage: "",
        images: [],
      });

      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="border p-4 rounded shadow"
        style={{ width: 520 }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Add Product</h3>

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-2"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          className="form-control mb-2"
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="stock"
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="discountPercentage"
          type="number"
          placeholder="Discount %"
          value={product.discountPercentage}
          onChange={handleChange}
          min="0"
          max="100"
        />

        <label className="form-label">Product Images (Max 4)</label>
        <input
          ref={fileInputRef}
          className="form-control mb-3"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* IMAGE PREVIEW */}
        {previews.length > 0 && (
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        )}

        <button className="btn btn-dark w-100" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
