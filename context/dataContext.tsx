"use client";
import { getUserBookings } from "@/app/actions";
import { Booking, Car } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, FC, useContext, useEffect, useState } from "react";

type TDataContextProvider = {
  children: React.ReactNode;
};

type TDataContext = {
  bookings: Booking[];
  cars: Car[];
  user: User | null;
};

const dataContext = createContext<TDataContext>({
  cars: [],
  bookings: [],
  user: null,
});

const DataContextProvider: FC<TDataContextProvider> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    if (user) {
      console.log(user);
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    const bookings = await getUserBookings();
    setBookings(bookings ?? []);
  };

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    if (user) {
      setUser(user);
    }
  };
  return (
    <dataContext.Provider value={{ bookings, cars, user }}>
      {children}
    </dataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(dataContext);
};

export default DataContextProvider;
