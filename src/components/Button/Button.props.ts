import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearence?: "big" | "small";
}

// Example of generics usage
// function printAnything<T>(collection: T[]): void {
//     for (const item of collection) {
//         console.log(item)
//     }
// }

// printAnything<number>([1,2,3,4,5,6])
