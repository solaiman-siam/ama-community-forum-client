import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { axiosCommon } from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    axiosCommon
      .post("/create-payment-intent", { price: 19 })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("paymentMethod error", error?.message);
      setPaymentError(error?.message);
    } else {
      console.log("payment method", paymentMethod);
      setPaymentError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError?.message);
      setPaymentError(confirmError?.message);
    } else {
      console.log(paymentIntent);
      setPaymentError("");
      if (paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        axiosCommon.post(`/upgrade/${user?.email}`).then((res) => {
          console.log(res.data);
          navigate("/dashboard/my-profile");
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border border-gray-300 p-4 rounded-md "
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="px-10 py-2.5 rounded-full text-white transition-colors duration-300 mt-5 font-medium bg-[#078669] hover:bg-[#06BD95]"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
