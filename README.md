# Amazon Clone

A full-stack e-commerce web application inspired by Amazon, built with **React**, **Firebase**, and **Stripe**, featuring authentication, a shopping basket, and checkout with real payment processing.

![Image](https://github.com/WarrenBillTT/Amazon-Clone/blob/main/amazon-clone.png?raw=true)

🔗 **Live Demo:** Coming soon

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-8-FFCA28?logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

---

## About the Project

This project is a clone of Amazon's core shopping experience, including:
- **Authentication**: sign up / sign in with Firebase Auth
- **Product Listing**: browse products on the home page
- **Shopping Basket**: add and remove items using React Context + a reducer (`StateProvider` / `reducer.js`)
- **Checkout**: review basket items and subtotal before payment
- **Payments**: secure card payments powered by Stripe Elements
- **Order History**: view past orders after successful payment, stored in Firestore
- **Cloud Functions**: a Firebase Functions backend (Express + Stripe) handles payment intent creation

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, React Router 7 |
| UI | Material UI (MUI), Emotion |
| State Management | React Context API + useReducer |
| Backend | Firebase Cloud Functions (Express) |
| Auth & Database | Firebase Authentication, Firestore |
| Payments | Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`) |
| HTTP Client | Axios |
| Utilities | Moment.js, react-currency-format |

## Project Structure

```
Amazon-Clone-main/
├── functions/            # Firebase Cloud Functions (Stripe payment backend)
│   └── index.js
├── public/
├── src/
│   ├── App.js             # Route definitions
│   ├── Header.js / .css   # Navbar and search bar
│   ├── Home.js / .css     # Product listing / landing page
│   ├── Product.js / .css  # Individual product card
│   ├── Checkout.js / .css # Basket review page
│   ├── CheckoutProduct.js # Item row within checkout
│   ├── Subtotal.js / .css # Order summary and "Proceed to checkout"
│   ├── Payment.js / .css  # Stripe payment form
│   ├── Login.js / .css    # Sign in / sign up
│   ├── Orders.js / .css   # Order history
│   ├── Order.js / .css    # Single order details
│   ├── StateProvider.js   # React Context provider
│   ├── reducer.js         # Basket + user state reducer
│   ├── firebase.js        # Firebase configuration
│   └── axios.js           # Axios instance (points to Cloud Functions)
├── firebase.json
└── package.json
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/WarrenBillTT/Amazon-Clone.git
   cd Amazon-Clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Set up Firebase & Stripe**
   - Create a Firebase project and enable **Authentication** and **Firestore**.
   - Update `src/firebase.js` with your own Firebase config.
   - Replace the Stripe publishable key in `src/App.js` with your own test key.
   - Add your Stripe secret key to the Cloud Functions environment config for payment processing.

4. **Run the development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Cloud Functions locally (optional)**
   ```bash
   cd functions
   npm run serve
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm test` | Runs tests |
| `firebase deploy` | Deploys the app and functions to Firebase Hosting |

## Note

This project uses Stripe **test mode** keys and is intended for learning/demo purposes. Do not use it to process real payments without replacing the keys with your own production credentials and securing them properly (never commit real secret keys to version control).

## License

This project was built for personal/educational use. Feel free to use it as a reference, but please don't copy it identically for your own portfolio.
