import { useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";

function App() {
  return (
    <>
      <Input placeholder={"Email"}></Input>
      <Button appearence="big">text</Button>
    </>
  );
}

export default App;
