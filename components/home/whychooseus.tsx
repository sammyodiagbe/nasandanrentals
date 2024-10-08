import Image from "next/image";
import { FC } from "react";

type TWhyChooseItem = {
  title: string;
  description: string;
  src: string;
};

const features = [
  {
    title: "Multiple Options",
    description:
      "We pride ourselves on offering diverse fleet of vehicles to suit every driver's beeds abd preferences. Whether you'are looking for a fuel-efficient compact car to navigate through city streets, a comfortable sedan for long drives, a spacious SUV fro a family vacation.",
    src: "/images/Car.svg",
  },
  {
    title: "Flexible Pricing",
    description:
      "We believe that renting a car shouldn't break the bank. That's why we offer competitive pricing across our entire range of vehicles. Our transparent pricing model means you'll never be surprised by hidden fees or unexpected charges.",
    src: "/images/Wallet.svg",
  },
  {
    title: "24/7 Support",
    description:
      "Your journey is our priority, and we're here to assist you every step of the way. Our 24/7 customer support team is always on hand to help with any questions you may have.",
    src: "/images/Headset.svg",
  },
  {
    title: "Easy Bookings",
    description:
      "Renting a car with us is designed to be quick and effortless. Our intuitive online booking system allows you to reserve your car in just a few clicks. We've removed the hassle from the process , so you can focus on what really matters- Planning your journey.",
    src: "/images/Laptop.svg",
  },
];

const WhyChooseUsComponent = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="md:container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why choose us?</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          At Nasandan, we make car rentals simple, affordable, and hassle-free.
          With a wide range of vehicles to choose from, flexible rental periods,
          and unbeatable customer service, we ensure you get the best driving
          experience possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={feature.src} height={30} width={40} alt="" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseItemComponent: FC<TWhyChooseItem> = ({
  title,
  description,
  src,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-100 p-4 rounded-sm">
      <div className="h-24 w-24 rounded-full  flex items-center justify-center bg-green-500 ">
        <Image
          src={src}
          alt="title"
          width={45}
          height={45}
          className="text-white"
        />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
};

export default WhyChooseUsComponent;
