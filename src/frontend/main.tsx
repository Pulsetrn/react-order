import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu.tsx";
import { Cart } from "./pages/Cart/Cart.tsx";
import { Error } from "./pages/Error/Error.tsx";
import { Layout } from "./layout/Layout/Layout.tsx";
import { ProductPage } from "./pages/Product/ProductPage.tsx";
import { PREFIX } from "./helpers/API.ts";
import axios from "axios";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./storage/store.ts";
import { Success } from "./pages/Success/Success.tsx";

// Конфигурация для router - массив объектов, каждый из которых представляет из себя конфигурацию пути и
// компонента, который будет отображаться по этому пути
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <RequireAuth>
        <Layout></Layout>
      // </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Menu></Menu>,
      },
      {
        path: "/success",
        element: <Success></Success>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      /* 
      Используем двоеточие, чтобы указать, что тут используются параметры пути, которые можно получить 
      с использованием хука useParams уже непосредственно на страничке (компоненте), который
      указан в качестве компонента, отображаемого при переход по данному пути 
      */
      {
        path: "/product/:id",
        element: <ProductPage></ProductPage>,
        // Если произошла ошибка при рендеринге компонента ИЛИ при отработке функции loader
        // то будет зарендерен errorElement вместо того компонента, который должен был быть
        errorElement: (
          <>
            <h1>ERROR OCCURED</h1>
          </>
        ),
        // loader - функция, которая будет отрабатывать перед тем, как зарендерить компонент
        // Чтобы получить результат функции в компоненте - использум useLoaderData()
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
