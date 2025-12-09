import React from "react";

const AddProduct = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f2f2f2" }}>

      <form className="border p-4 rounded shadow" style={{ width: "520px" }}>
        <h3 className="text-center mb-4">Add Product</h3>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select">
            <option value="">Select Category</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Add Product
        </button>
      </form>

    </div>
  );
};

export default AddProduct;
