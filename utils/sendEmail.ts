import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (emailData: {
  title: string;
  message: string;
  link?: string;
  email: string;
}) => {
  const { title, message, link, email } = emailData;
  const { data, error } = await resend.emails.send({
    from: "nasan@nasandanrentals.ca>",
    to: [email],
    subject: title,
    react: EmailTemplate({ message, title, link }),
  });

  console.log(error);
  console.log(data);
  if (error) {
    return false;
  }

  return true;
};
