import React, { useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Home from "../Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import Payment from "../Payment/Payment";
import Orders from "../Orders/Orders";
import { auth } from "../../firebase";
import { useStateValue } from "../Context/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "../Footer/Footer";
import {
  makeStyles,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#eaeded",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
});

const promise = loadStripe("pk_test_uT7G5NbGUZfNbo9cMW0otsdc");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route path="/orders">
              <Header />
              <Orders />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
              <Footer />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
              <Footer />
            </Route>
            <Route path="/">
              <Header />
              <Home />
              <Footer />
            </Route>
          </Switch>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
