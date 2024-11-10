import React from "react";
import { ReactComponent as ShadowIcon } from "../../images/icons/button-shadow-lg.svg";
import { ReactComponent as ShadowIconSm } from "../../images/icons/button-shadow-sm.svg";
import "./Button.global.css";
import classNames from "classnames";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "icon";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const buttonVariant = variant === "primary" ? "btn" : "btn btn-icon";
  return (
    <button
      {...props}
      className={classNames(
        `${buttonVariant} font-button uppercase text-white`,
        className
      )}
    >
      {variant === "primary" ? (
        <ShadowIcon className="btn-shadow-icon" />
      ) : (
        <ShadowIconSm className="btn-shadow-icon btn-shadow-sm" />
      )}
      {children}
    </button>
  );
}
