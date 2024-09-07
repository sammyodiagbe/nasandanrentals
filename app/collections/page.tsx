"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

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
    <main>
      <h1>{allCars?.length}</h1>
    </main>
  );
};

export default Collections;
