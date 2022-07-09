import React , {useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import Layout from "../core/Layout";
import { signin,authenticate,isAuthenticated } from '../auth_api';


const Signin = ()=>{
    // any time any event happen we grab the value and update the state
    // what ever user fill in signinform we grab it in values and 
   
    const [values, setValues] = useState({
      
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer:false
    });
    const {email,password,error,loading,redirectToReferrer} = values;
     const {user} = isAuthenticated()
     // this functions return another function 
     // what ever user type in input fields that values set to the values in useState
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) =>{
        event.preventDefault() // this will prevent the browser to reload
        setValues({...values,error:false,loading:true});
        // after signup request is there any error we update error values useing usestate
        // signup function coming from apicall/index.js
        signin({email,password}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                  authenticate(data,()=>{
                    setValues({
                        ...values,
                        redirectToReferrer:true
                    });
                  })
            }
        });
    }
   


    


    // is there error in signin show error to user
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    // during signin show loading
    const showLoading = () =>
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );

    // if login sucess then redirect user accroding there role admin or regular user
    const redirectUser= ()=>{
        if(redirectToReferrer){
            if(user && user.role===1){
            return <Redirect to="/admin/dashboard" />;
            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to='/'></Redirect>
        }
     
    };


    const signInForm = () => (
        <form>
            
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
        title="SignIn"
        description='Signin to ĕ-şHöP'
        className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
            {signInForm()}
            {redirectUser()}
           
        </Layout>)
}

export  default Signin;