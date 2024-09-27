import { FC } from "react";

type TLabelComponent = {
  htmlFor: string;
  value: string;
};
const LabelComponent: FC<TLabelComponent> = ({ htmlFor, value }) => {
  return <label className="text-sm block mb-1">{value}</label>;
};

export default LabelComponent;
