const BookingsPage = () => {
  return (
    <main className="lg:container space-y-2">
      <h1 className="text-3xl font-bold">Hi, Devan.</h1>
      <h1>Bookings</h1>

      <div className="grid grid-cols-3 gap-[1.9rem] ">
        <div className="booking-card"></div>
        <div className="booking-card"></div>
        <div className="booking-card"></div>
      </div>

      <div className="mt-10">
        <h1>Recent Bookings.</h1>
      </div>

      <div className=""></div>
    </main>
  );
};

export default BookingsPage;
