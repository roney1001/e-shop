import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from "../core/Layout";
import { signup } from '../auth_api';


const Signup = ()=>{
    // any time any event happen we grab the value and update the state
    // what ever user fill in signUPform we grab it in values and 
    // register user in our database
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const {name,email,password,error,success} = values;

     // this functions return another function 
     // what ever user type in input fields that values set to the values in useState
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) =>{
        event.preventDefault() // this will prevent the browser to reload
        setValues({...values,error:false});
        // after signup request is there any error we update error values useing usestate
        // signup function coming from apicall/index.js
        signup({name,email,password}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    }
   


    //  // signup the user in database
    // const signup = (user)=>{
    // //   console.log(name ,email ,password);
    // // use fetch this is service by browser to access api 
    // // fetch take (url,methos and headers & body) and give response or error
    //  return fetch(`${API}/signup`,{
    //     method:"POST",
    //     headers:{
    //         Accept:"application/json",
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify(user)
    //  }).then(response => {
    //     return response.json();
    //  }).catch(err=>{
    //     console.log(err);
    //  })
    // };


    // is there error in signup show error to user
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    // if there is success in signup then show link to login
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );


    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );
    return (<Layout
        title="SignUp"
        description='SignUp to ĕ-şHöP'
        className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
           
        </Layout>)
}

export  default Signup;