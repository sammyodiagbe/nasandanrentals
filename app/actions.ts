"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { TBooking, TbookingRequired } from "@/utils/types";
import { sendEmail } from "@/utils/sendEmail";
import { stripeClient } from "@/utils/stripe";
import Stripe from "stripe";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { UserResponse } from "@supabase/supabase-js";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}`,
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  // return redirect("/sign-in");
};

export const bookVehicle = async (formData: TBooking) => {
  console.log("checking to see if actions is triggered");
  const supabase = createClient();
  const {
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    carId,
    totalCost,
    emailAddress,
    fullname,
    address,
  } = formData;
  const user = await supabase.auth.getUser();
  const origin = headers().get("origin");

  if (!user) {
    redirect(`${origin}`);
  }

  console.log(user);
  const res = await supabase
    .from("bookings")
    .insert({
      pickup_time: pickupTime,
      pickup_date: pickupDate,
      return_time: returnTime,
      return_date: returnDate,
      total_cost: totalCost,
      car_id: carId,
      fullname,
      address,
      email: emailAddress,
      status: 1,
      user_id: user.data.user?.id,
    })
    .select();

  console.log(res);
  const { error, data } = res;
  if (error) {
    console.log(error);
    return 0;
  }
  await sendEmail({
    title: "Car booked Successfully",
    message: "Your vehicle has been successfully booked",
    email: user.data.user?.email!,
  });
  redirect(`/booking-confirmed?booking_id=${data[0].id}`);
};

export const testStripe = async (data: { name: string; price: number }) => {
  const { name, price } = data;
  const { data: products } = await stripeClient.products.list();

  console.log(products);
  let url: string | null = null;
  let product: Stripe.Product;

  product = products.find((product) => product.name === name) as Stripe.Product;
  console.log("product: ", product.default_price);
  console.log(!product);

  if (!product) {
    // creates a product
    product = await stripeClient.products.create({
      name: name,
      default_price_data: {
        currency: "cad",
        unit_amount: Math.round((price + (price * 0.029 + 0.3)) * 100),
      },
    });
  }

  // then we try to sell the product
  const session = await stripeClient.checkout.sessions.create({
    line_items: [{ quantity: 1, price: product.default_price as string }],
    mode: "payment",
    success_url: `http://localhost:3000/payment-successful?session_id={CHECKOUT_SESSION_ID}&car_name=${name}`,
  });

  url = session.url as string | null;

  return url;
};

export const getUserBookings = async () => {
  const supabase = createClient();

  const {
    data: { user },
  }: UserResponse = await supabase.auth.getUser();

  if (!user) return null;

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "created_at,status, pickup_date,total_cost, pickup_time, return_date, return_time, id, cars (name, price)"
    )
    .eq("user_id", user.id);

  return bookings;
};

export const SignupWithGoogle = async () => {
  console.log("checking");
  const supabase = createClient();
  const origin = headers().get("origin");
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // options: {
    //   redirectTo: `${origin}`,
    // },
  });
  console.log(data.url);
  if (data?.url) {
    redirect(data.url);
  }
};

export const exchangeCodeForSession = async (code: string) => {
  const supabase = createClient();
  const origin = headers().get("Origin");
  const {
    data: { user },
    error,
  } = await supabase.auth.exchangeCodeForSession(code);
  if (!error) {
    redirect(`${origin}`);
  }
};
