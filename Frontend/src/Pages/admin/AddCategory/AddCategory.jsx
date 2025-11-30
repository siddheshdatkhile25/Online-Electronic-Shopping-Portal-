import React from 'react'

const AddCategory = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100   "style={{ backgroundColor: "#f2f2f2" }}>

      <form className="border p-4 rounded shadow" style={{ width: "420px" }}>
        <h3 className="text-center mb-4">Add Category</h3>

        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input type="file" className="form-control" />
        </div>

        <button className="btn btn-primary w-100">Add Category</button>
      </form>

    </div>
  )
}

export default AddCategory;
