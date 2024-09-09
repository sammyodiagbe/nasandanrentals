import { FC } from "react";

type TFormErrorMessage = {
  message?: string;
};

const FormErrorMessage: FC<TFormErrorMessage> = ({ message }) => {
  return <span className="text-sm text-red-500">{message}</span>;
};

export default FormErrorMessage;
