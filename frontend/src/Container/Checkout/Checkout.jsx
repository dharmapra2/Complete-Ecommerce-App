import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { cart } from "../../APi/commonApi";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import swal from "sweetalert";
function Checkout() {
  const navigate = useNavigate();
  const [temp, SetTemp] = useState({
    price: 0,
    pname: [],
    uid: 0,
  });
  useEffect(() => {
    SetTemp(JSON.parse(localStorage.getItem("temp")));
  }, [SetTemp]);
  let prodList = Object.values(temp.pname).join(", ");
  // console.log(prodList);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  const [order, SetOrder] = useState({});
  let orderedData = {};
  const handleApprove = (data) => {
    // here calling the backend function to fulfill the order
    // if response is success
    if (data.status === "COMPLETED") {
      SetOrder(data);
      setPaid(true);
      // console.log(orderedData);
    } else {
      // if response is error
      setError("error");
    }
  };
  if (paid) {
    // display sucess message and redirect to sucess page
    console.log("Thank you for your purches");
    // console.log(order);
    const orderedData = {
      orderId: order.id,
      order_time: order.create_time,
      orderedItems: order.purchase_units[0].description,
      price: +order.purchase_units[0].amount.value,
      email: order.payer.email_address,
      uid: temp.uid,
      full_name: Object.values(order.payer.name).join(" "),
    };
    const storeOrder = async () => {
      await cart.post("storeOrder", JSON.stringify(orderedData)).then((res) => {
        let Href = "";
        if (res.status === 200) {
          swal("Success", res.data.success, "success");
          Href = "/home";
        } else {
          swal("Canceled", "Your order is cancled", "error");
          Href = "/cart";
        }
        setTimeout(() => {
          localStorage.removeItem("temp");
          window.location.reload();
          window.location.href = Href;
        }, 1000);
      });
    };
    storeOrder();
  }
  if (error) {
    // display error message & redirect to error page
    console.log(`error : ${error}`);
    swal("Error", "Somthing went wrong..", "error");
    window.location.reload();
    navigate("/cart");
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
                  swal("", `You alredy purchased these products.`, "warning");
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
                      amount: {
                        value: (temp.price / 78.28).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                // console.log(data);
                handleApprove(order);
              }}
              onError={(err) => {
                setError(err);
                console.error(`Payment checkout error: ${err}`);
              }}
              onCancel={() => {
                // displaying cancel message and redirect to cancel page or back to cart
                swal("Error", "Your order is cancelled.", "error");
                setTimeout(() => {
                  window.location.reload();
                  window.location.href = "/cart";
                }, 1500);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
