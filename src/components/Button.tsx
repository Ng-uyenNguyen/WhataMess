import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
function Select({ children, ...rest }: Props) {
  return (
    <select className="py-2 px-4 bg-light-green text-green text-sm font-bold rounded-2xl">
      {children}
    </select>
  );
}

export default Select;
