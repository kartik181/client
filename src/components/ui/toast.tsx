"use client";
import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      expand={true}
      toastOptions={{
        className: "p-4 text-sm shadow-lg rounded-lg",
        style: {
          padding: "16px",
          margin: "10px",
          fontSize: "16px",
          borderRadius: "10px",
        },
      }}
    />
  );
}
