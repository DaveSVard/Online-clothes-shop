import { selectArr, stripeCheckoutSessionData } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P3IivRqeV16kmePZgGsJAWrQyHu9Zh84bhKZkEZy5YWTGQTVF0C74AZRz3gXQsuozs9FETp1MDyYyCQLFvjUSMr00RrRBwwa3"
);

export default function Checkout() {
  const arr = useAppSelector(selectArr)
  console.log(arr);
  
  const handleClick = async () => {
    const stripe:any = await stripePromise;
    // Call your backend to create a checkout session
    const response = await stripeCheckoutSessionData([4])
    // Redirect to Stripe Checkout page
    const data = await stripe.redirectToCheckout({ sessionId:response.length+''});
    console.log(
      data
    );
    console.log("data", data);
    
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
}
