import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const button = cva(["button", "transition-all"], {
  variants: {
    intent: {
      primary: ["text-white"],
      secondary: [],
      circle: ["text-white", "rounded-full"],
    },
    size: {
      small: ["text-sm", "px-2", "py-1"],
      medium: ["text-md", "px-3", "py-2"],
    },
    variant: {
      default: [""],
      outline: ["bg-transparent", "border"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      variant: "outline",
      class: [
        "border-gray-50",
        "hover:bg-gray-50",
        "hover:text-black",
        "text-gray-100",
      ],
    },
    {
      intent: "circle",
      variant: "outline",
      class: [
        "border-gray-50",
        "hover:bg-gray-50",
        "hover:text-black",
        "text-gray-100",
        "rounded-full",
      ],
    },
    {
      intent: "primary",
      variant: "default",

      class: ["hover:bg-purple-700", "bg-purple-500"],
    },
    {
      size: "small",
      intent: "primary",
      class: "rounded-sm",
    },
    {
      size: "small",
      intent: "secondary",
      class: "rounded-sm",
    },
    {
      size: "medium",
      intent: "primary",
      class: "rounded-md",
    },
    {
      size: "medium",
      intent: "secondary",
      class: "rounded-md",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    variant: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  variant,
  ...props
}) => (
  <button className={button({ intent, size, className, variant })} {...props} />
);
