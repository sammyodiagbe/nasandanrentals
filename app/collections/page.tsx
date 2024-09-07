"use client";
import CustomButton from "@/components/app-components/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const Collections = () => {
  const supabase = createClient();
  const [allCars, setCars] = useState<any[] | null>([]);
  const [errorFetching, setError] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data: cars, error } = await supabase.from("cars").select();
    if (errorFetching) {
      setError(true);
      setCars(null);
      return;
    }
    if (cars) {
      setCars(cars);
      setError(false);
    }
  };

  if (errorFetching) {
    return <p>Error happened</p>;
  }
  return (
    <main className=" lg:container ">
      <h1 className="my-5 text-2xl font-bold text-gray-700">
        Our collections.
      </h1>
      <section className="grid grid-cols-3 gap-[30px]">
        {allCars?.map((car, index) => {
          return (
            <div className="flex  flex-col" key={index}>
              <Image
                src={car.image_url}
                alt={car.name}
                width={500}
                height={500}
                className="w-auto h-auto"
              />
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="my-3 font-medium">{car.name}</h2>
                  <span className="">
                    CA $ {car.price}{" "}
                    <span className="ml-1 text-xs">per day</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src={"/icons/Gauge.svg"}
                    height={24}
                    width={24}
                    className="h-5 w-5"
                    alt="allowd km per day"
                  />
                  <span className="text-sm">{car.allowed_km} KM per day</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <FeatureComponent
                      img_path="/icons/Seat.svg"
                      value={car.doors}
                    />
                    <FeatureComponent
                      img_path="/icons/Users.svg"
                      value={car.seats}
                    />
                    <FeatureComponent
                      img_path="/icons/Engine.svg"
                      value={"Automatic"}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <CustomButton
                      title="Reserve"
                      style="bg-gray-200 hover:bg-gray-300 text-black"
                    />
                    <CustomButton
                      title="Book now"
                      style="bg-green-500 hover:bg-green-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

type TFeature = {
  img_path: string;
  value: string;
};

const FeatureComponent: FC<TFeature> = ({ img_path, value }) => {
  return (
    <span className="flex gap-1 items-center">
      <Image
        src={img_path}
        alt={value}
        height={24}
        width={24}
        className="w-5 h-5"
      />
      <span className="text-xs">{value}</span>
    </span>
  );
};

export default Collections;
