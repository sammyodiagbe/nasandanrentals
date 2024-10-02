import Stripe from "stripe";

export const stripeClient = new Stripe(process.env.STRIPE_API_KEY!);

export const calculateStripeFees = (price: number) => {
  const cal = price + price * 0.029 + 0.3;
  return cal * 100;
};
