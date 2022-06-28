import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
// import { cart } from "../../APi/commonApi";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
function Checkout() {
  const [temp, SetTemp] = useState({
    price: 0,
    pname: [],
    uid: 0,
  });
  useEffect(() => {
    SetTemp(JSON.parse(localStorage.getItem("temp")));
  }, [SetTemp]);
  // console.log(temp);
  // const p=Object.entries(temp.pname)
  let prodList = Object.values(temp.pname).join(", ");
  // console.log(prodList);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  // console.log((temp.price / 78.28).toFixed(2));
  const handleApprove = (data) => {
    // here calling the backend function to fulfill the order
    // if response is success
    // let orderedData = {
    //   name: Object.values(data.payer.name).join(" "),
    //   email: data.payer.email_address,
    //   orderId: data.id,
    //   create_time: data.create_time,
    //   purchase_units: data.purchase_units[0].amout.value,
    //   orderedItems: data.purchase_units[0].description,
    // };
    if (data.status === "COMPLETED") {
      setPaid(true);
      // console.log(orderedData);
    } else {
      // if response is error
      setError("error");
    }
    console.log(data);
  };
  if (paid) {
    // display sucess message and redirect to sucess page
    console.log("Thank you for your purches");
    // window.location.reload();
    // window.location.href = "/sucess";
  }
  if (error) {
    // display error message & redirect to error page
    console.log(`error : ${error}`);
    // window.location.reload();
    // window.location.href = "/cart";
  }
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container-md">
        <div className="container p-1 m-2 align-center">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AXVa38MVxxJn8BJJbG_AsSbY_Yh3SZ79tQ_jNKBsIoWaE4DjxUtMtqRaGAxJT_54qSUGvkwv-FlRpmWZ",
            }}
          >
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "pill",
                label: "pay",
              }}
              onClick={(data, action) => {
                const purchased = false;
                if (purchased) {
                  setError(`You alredy purchased these products.`);
                  return action.reject();
                } else {
                  return action.resolve();
                }
              }}
              createOrder={(data, actions) => {
                // Set up the transaction
                return actions.order.create({
                  purchase_units: [
                    {
                      description: prodList,
                      // amount: (temp.price / 78.28).toFixed(2),
                      amount: "0.1",
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log(data);
                handleApprove(order);
              }}
              onError={(err) => {
                setError(err);
                console.error(`Payment checkout error: ${err}`);
              }}
              onCancel={() => {
                // displaying cancel message and redirect to cancel page or back to cart
                console.log(`Error on cancel`);
                // window.location.reload();
                // window.location.href = "/error";
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
