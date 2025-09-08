import React, { useState, useEffect } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    // const [clientSecret, setClientSecret] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    // useEffect(() => {
    //     const getClientSecret = async () => {
    //         const response = await axios({
    //             method: 'post',
    //             url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         });
    //         setClientSecret(response.data.clientSecret)
    //     }
    //     getClientSecret();
    // }, [basket])

    useEffect(() => {
    const getClientSecret = async () => {
        try {
            const response = await axios.post(
                `/payments/create?total=${getBasketTotal(basket) * 100}`
            );
            console.log("Response from backend:", response.data);
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error("Error getting client secret:", error);
        }
    };
    getClientSecret();
}, [basket]);


    console.log('THE SECRET IS >>>', clientSecret)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setProcessing(true);

    //     const payload = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }).then(({ paymentIntent }) => {

    //         db.collection('users')
    //         .doc(user?.uid)
    //         .collection('orders')
    //         .doc(paymentIntent.id)
    //         .set({
    //             basket: basket,
    //             amount: paymentIntent.amount,
    //             created: paymentIntent.created
    //         })

    //         setSucceeded(true);
    //         setError(null)
    //         setProcessing(false)

    //         dispatch({
    //             type: 'EMPTY_BASKET'
    //         })

    //         navigate("/orders", { replace: true });
    //     })
    // }

    const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!clientSecret) {
        console.error("Client secret belum tersedia");
        return;
    }

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    });

    const paymentIntent = payload.paymentIntent;

    db.collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
      });

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({
        type: 'EMPTY_BASKET'
    });

    navigate("/orders", { replace: true });
};


    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)  
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                // key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value) => (  
                                        <h3>Order Total: {value}</h3>                                      
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment