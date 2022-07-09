import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth_api';
import { Link } from 'react-router-dom';
import { createProduct,getCategories } from './apiAdmin';



const AddProduct = ()=>{
    // this is our useState with all these values
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructing all the value from usState values 
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const {user,token} = isAuthenticated();

    // we have to send form-data to uour backend so any time any data comes
    // we update our formData component of setState for this we use useEffect
    // load categories and set form data
      const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data, // loading categories
                    formData: new FormData()
                });
            }
        });
    };


    useEffect(() =>{
        init()
      },  [] )



    // if its photo then use event.target.file otherwise
    // use event.target.value and set the coming value to the 
    // values of useState like grab the name what user typein and 
    // update the state or values of useState 
    // here we are also updating our formData with type and value
    //that are coming type-{name,description,price etc..}
    const handleChange = type => event => {
        const value = type === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(type, value);
        setValues({ ...values, [type]: value });
    };

    // onSubmit from request api or our backend to regiester data in database
    const clickSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});

        createProduct(user._id,token,formData).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        })
    }
    
    // this is our form to get the data
    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
             <div className="form-group" >
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option >Please Select</option>
                    {categories && categories.map((categry,index)=>(
                        <option key={index} value={categry._id}>{categry.name}</option>
                    ))}
                   
                    </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );
    
    // if there is error showit
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
   
    // if product created successfully then show this CreatedProduct have name of product only when product register successfully
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    //if loading happen show this
    const showLoading = () =>
    loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );



    return(
        <Layout
            title="Add a new Product"
            description={`G'day ${user.name}, ready to add a new Product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                    
                   
                </div>
            </div>
        </Layout>
    );

};

export default AddProduct;