import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth_api";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();
    
    // whatever user is typing grab it as event(e) set it to name use setName
    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        // then we get back data if there is error we setError
        createCategory(user._id,token,{name}).then(data=>{
            console.log(data)
            if(data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
            }
        });


    };
    // if success to add category 
    const showSuccess = () => {
        if (success) {
           
            return <h3 className="text-success">{name} is created</h3>;
           
        }
    };
    
    // if error in add category
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    // link to go back to dashboard
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );


    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                     {goBack()}
                   
                </div>
            </div>
        </Layout>
    );

    };
export default AddCategory;