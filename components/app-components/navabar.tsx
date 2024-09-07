import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex p-4 justify-between items-center sticky top-0 bg-white">
      <h1 className="font-bold text-xl">Nasandan</h1>

      <div className="navigation">
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/collections"}>Collections</Link>
          </li>
          <li>
            <Link href={"/bookings"}>Bookings</Link>
          </li>
          <li>
            <Link href={"/contact-us"}>Contact us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
