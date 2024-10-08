export type Booking = {
  id: number;
  created_at?: any;
  pickup_time: Date;
  pickup_date: Date;
  return_time: Date;
  return_date: Date;
  car: object;
  fullname: string;
  email: string;
  address: string;
  total_cost: string;
  phone_number: string;
  user_id: string;
};

export type Car = {
  id: string;
  name: string;
  seats: number;
  doors: number;
  price: number;
  allowed_kms: number;
  available: boolean;
  image_url?: string;
};
