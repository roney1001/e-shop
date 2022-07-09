import {API} from "../config"

 // signup the user in database
 export const signup = (user)=>{
    //   console.log(name ,email ,password);
    // use fetch this is service by browser to access api 
    // fetch take (url,methos and headers & body) and give response or error
     return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
     }).then(response => {
        return response.json();
     }).catch(err=>{
        console.log(err);
     })
    };

    export const signin = (user)=>{
        //   console.log(name ,email ,password);
        // use fetch this is service by browser to access api 
        // fetch take (url,methos and headers & body) and give response or error
         return fetch(`${API}/signin`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
         }).then(response => {
            return response.json();
         }).catch(err=>{
            console.log(err);
         })
        };
// this function will store the user info that we get back
// after login from backend to local storage of our pc
// if window is not undefine then store the data of user 
// with key:jwt and value:data in json form 
// next just callback function
export const authenticate  = (data,next)=>{
      if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
      }
}
// for singout first we remove thr token from local storage
// then call model
export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

// if user is login or authenticated sucessfully then get the jwt key from local storage that we create earlier and return
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } 
    else {
        return false;
    }
};