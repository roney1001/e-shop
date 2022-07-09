import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout,isAuthenticated } from "../auth_api";
import { itemTotal } from "./cartHelpers";


// Link is normal link like <a herf="" />
// withRouter is use because we want to access props histrory 

// if we are at home then it will highlight the navbar icon of home with given color
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


// props.history
const Menu = ({history}) => (
    
     <div>
        <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
            
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role===0 &&(
                <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Profile
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role===1 &&(
                <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>
            </li>
            )}
            
        {!isAuthenticated() && (
            <Fragment>
                
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                >
                    Signin
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                >
                    Signup
                </Link>
            </li>
            </Fragment>
        )}
           {isAuthenticated() &&(
            <li className="nav-item">
                    <span
                    // onclick singout user and redirect to home
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
           )}
            

        </ul>
        </div>
        

)



export default withRouter(Menu);
