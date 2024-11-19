import React from "react";
import { useForm } from "react-hook-form";
import "./AddService.css";
import banner1 from "../../images/banner/banner2.jpg";

const AddService = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const url = `http://localhost:5000/service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div
      className="addService-container"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="addService-card">
        <h1 className="add-service-title">Add a New Service</h1>
        <form className="add-service-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-input"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 20 })}
          />
          <textarea
            className="form-input"
            placeholder="Description"
            {...register("description")}
          />
          <input
            className="form-input"
            placeholder="Price"
            type="number"
            {...register("price")}
          />
          <input
            className="form-input"
            placeholder="Photo URL"
            type="text"
            {...register("img")}
          />
          <button type="submit" className="form-submit-btn">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
