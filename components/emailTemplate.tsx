import { Link } from "lucide-react";
import { FC } from "react";

type TEmailTemplate = {
  message: string;
  title: string;
  link?: string;
};
export const EmailTemplate: FC<Readonly<TEmailTemplate>> = ({
  message,
  title,
  link,
}) => {
  return (
    <div className="">
      <h1>{title}</h1>
      <p>{message}</p>
      {link && <Link href={link}>View bookings</Link>}
    </div>
  );
};
