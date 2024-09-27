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
    <main className="max-w-screen  md:container">
      <div className="flex flex-col md:flex-row px-4 py-4 my-5">
        <section className="mb-10 md:md-0 text-center md:text-left max-w-full md:w-[35rem] space-y-8 ">
          <h1 className="text-5xl leading-[2.5rem] md:text-7xl font-bold text-gray-700 md:leading-[4.5rem]">
            Rent the perfect car for every journey
          </h1>
          <p>
            From luxury to economy, find the ideal car for your trip, whether
            it's a weekend getaway or a business meeting.
          </p>
          <div className="w-auto md:flex gap-2">
            <Link href={"/collections"}>
              <CustomButton
                title="Book a car now"
                style="bg-green-500 hover:bg-green-600 text-white px-10"
              />
            </Link>
          </div>
        </section>
        <section className="flex-1 py-4 md:py-0 text-center overflow-hidden">
          <Image
            src={"/images/hero_image.svg"}
            height={500}
            width={500}
            alt="Car sideways"
            className=" max-w-full"
          />
        </section>
      </div>
      <WhyChooseUsComponent />
      {/* section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            What our customers have to say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nolan dananji",
                text: "Amazing service! The car was in perfect condition, and the booking process was so easy.",
              },
              {
                name: "Alejandro simons",
                text: "Great selection of cars and very affordable prices. Highly recommend!",
              },
              {
                name: "Barceloa nimbo",
                text: "Amazing service! The car was in perfect condition, and the booking process was so easy.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                  <span className="font-semibold">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* call to action */}
      <section className="flex flex-col md:flex-row p-4 items-center gap-8 my-5">
        <div className="flex-1">
          <Image
            src={"/images/hero_image2.svg"}
            height={500}
            width={500}
            alt="Car sideways"
            className="max-w-full"
          />
        </div>
        <div className=" space-y-5 text-center md:text-left">
          <h1 className="text-6xl font-bold">Ready to hit the road?</h1>
          <p>
            Find the perfect car for your next trip and start your journey
            today.
          </p>
          <div>
            <Link href={"/collections"} className="">
              <CustomButton
                title="Book a car now"
                style="bg-green-500 hover:bg-green-600 text-white px-10"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
{
  /* 
      {/* why choose us 

      

      
      <section className="flex flex-col md:flex-row p-4 items-center gap-8 my-5">
        <div className="flex-1">
          <Image
            src={"/images/hero_image2.svg"}
            height={500}
            width={500}
            alt="Car sideways"
            className="max-w-full"
          />
        </div>
        <div className=" w-[30rem] space-y-5">
          <h1 className="text-6xl font-bold">Ready to hit the road?</h1>
          <p>
            Find the perfect car for your next trip and start your journey
            today.
          </p>
          <div>
            <Link href={"/collections"} className="">
              <CustomButton
                title="Book a car now"
                style="bg-green-500 hover:bg-green-600 text-white px-10"
              />
            </Link>
          </div>
        </div>
      </section> */
}
