import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-10 bg-gray-100 mt-10">
      <div className="lg:container grid md:grid-cols-3 ">
        <ul className="space-y-5 text-sm">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Collections</Link>
          </li>
          <li>
            <Link href={"/"}>Bookings</Link>
          </li>
          <li>
            <Link href={"/"}>Contact us</Link>
          </li>
        </ul>
        <ul className="space-y-5 text-sm">
          <li>
            <Link href={"/"}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={"/"}>Terms and Condition</Link>
          </li>
          <li>
            <Link href={"/"}>FAQs</Link>
          </li>
          <li>
            <span>&copy; nasandanrentanls.ca</span>
          </li>
        </ul>
        <ul className="space-y-5 text-sm">
          <li>
            <b>Contact us</b>
          </li>
          <li>+178936891</li>
          <li>nasan@nasandanrentals.ca</li>
          <li>ABC at places you know .com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
