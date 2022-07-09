import React, { useState, useEffect } from 'react';
import { getProducts , getBraintreeClientToken,processPayment,createOrder} from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth_api';
import { Link } from 'react-router-dom';

import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products})=>{

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });
    
    //userId
    const userId = isAuthenticated() && isAuthenticated().user._id;
    // user token
    const token = isAuthenticated() && isAuthenticated().token;

    //get client token from braintree
    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };
  // any time there is change in state run this 
    useEffect(() => {
        getToken(userId, token);
    }, []);

    // get total price
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };


// show checkout button if user is signin
const showCheckout = () => {
    return isAuthenticated() ? (
        <div>{showDropIn()}</div>
    ) : (
        <Link to="/signin">
            <button className="btn btn-primary">Sign in to checkout</button>
        </Link>
    );
};

const handleAddress = event => {
    setData({ ...data, address: event.target.value });
};

// onblur means when user is typing
const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && products.length > 0 ? (
            <div>
                <div className="gorm-group mb-3">
                    <label className="text-muted">Delivery address:</label>
                    <textarea
                        onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder="Type your delivery address here..."
                    />
                </div>

                <DropIn
                    options={{
                        authorization: data.clientToken,
                       
                    }}
                    onInstance={instance => (data.instance = instance)}
                />
                <button onClick={buy} className="btn btn-success btn-block">
                    Pay
                </button>
            </div>
        ) : null}
    </div>
);

let deliveryAddress = data.address;

// on click of pay button we need to grab the amount and payment type send it to backend
const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
        .requestPaymentMethod()
        .then(data => {
            // console.log(data);
            nonce = data.nonce;
            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            // console.log(
            //     "send nonce and total to process: ",
            //     nonce,
            //     getTotal(products)
            // );
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            };

            processPayment(userId, token, paymentData)
                .then(response => {
                    console.log(response);
                    // empty cart
                    // create order

                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    };

                    createOrder(userId, token, createOrderData)
                        .then(response => {
                            emptyCart(() => {
                                // setRun(!run); // run useEffect in parent Cart
                                console.log('payment success and empty cart');
                                setData({
                                    loading: false,
                                    success: true
                                });
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            setData({ loading: false });
                        });
                })
                .catch(error => {
                    console.log(error);
                    setData({ loading: false });
                });
        })
        .catch(error => {
            // console.log("dropin error: ", error);
            setData({ ...data, error: error.message });
        });
};


const showError = error => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = success => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
        Thanks! Your payment was successful!
    </div>
);

const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;


return (
    <div>
        <h2>Total: ₹{getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
    </div>
);

}
export default Checkout;