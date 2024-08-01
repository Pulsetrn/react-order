import { HTMLAttributes, ReactNode } from "react";

export interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
