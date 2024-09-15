"use client";
import CustomButton from "@/components/app-components/button";
import Testimonials from "@/components/home/customersReview";
import WhyChooseUsComponent from "@/components/home/whychooseus";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { exchangeCodeForSession } from "./actions";

const Index = function () {
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      // exchange code for a session and redirect user back to this page
      exchangeCodeForSession(code);
    }
  }, []);
  return (
    <main className="flex-1 flex flex-col gap-6 px-4 lg:container">
      <div className="flex px-4 py-4 my-5">
        <section className="w-[35rem] space-y-8">
          <h1 className="text-7xl font-bold text-gray-700 leading-[4.5rem]">
            Rent the perfect car for every journey
          </h1>
          <p>
            From luxury to economy, find the ideal car for your trip, whether
            it's a weekend getaway or a business meeting.
          </p>
          <div className="flex gap-2">
            <CustomButton
              title="Book a car now"
              style="bg-green-500 hover:bg-green-600"
            />
            <Link href={"/sign-up"}>
              <CustomButton
                title="Signin"
                style="bg-gray-200 hover:bg-gray-300 text-gray-800 px-10"
              />
            </Link>
          </div>
        </section>
        <section className="flex-1">
          <Image
            src={"/images/hero_image.svg"}
            height={500}
            width={500}
            alt="Car sideways"
            className="w-full h-auto"
          />
        </section>
      </div>
      {/* why choose us */}
      <section className="p-4  text-center space-y-8 my-5">
        <h1 className="text-6xl font-bold">Why choose us?</h1>
        <p className="text-center mx-auto max-w-[700px] ">
          At Nasandan, we make car rentals simple, affordable, and hassle-free.
          With a wide range of vehicles to choose from, flexible rental periods,
          and unbeatable customer service, we ensure you get the best driving
          experience possible.
        </p>
        <WhyChooseUsComponent />
      </section>
      <Testimonials />
      <section className="flex p-4 items-center gap-[30px] my-5">
        <div className="flex-1">
          <Image
            src={"/images/hero_image2.svg"}
            height={500}
            width={500}
            alt="Car sideways"
            className="w-full h-auto"
          />
        </div>
        <div className=" w-[30rem] space-y-5">
          <h1 className="text-6xl font-bold">Ready to hit the road?</h1>
          <p>
            Find the perfect car for your next trip and start your journey
            today.
          </p>
          <CustomButton
            title="Book a car now"
            style="bg-green-500 hover:bg-green-600"
          />
        </div>
      </section>
    </main>
  );
};

export default Index;
