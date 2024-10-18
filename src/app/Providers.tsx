"use client";
import DefaultModal from "@/components/@base/modal";
import store from "@/redux/store";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <main className="bg-[#f8f9fa]">{children}</main>
      <ToastContainer />
    </Provider>
  );
}
