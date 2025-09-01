"use client"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import 'react-toastify/dist/ReactToastify.min.css';

export default function ToastNotifications() {
  return (
    <ToastContainer
      autoClose={2000}
    />
  )
}