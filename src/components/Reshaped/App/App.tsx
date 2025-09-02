"use client";

import type { ReactNode } from "react";
import { Reshaped, ToastProvider } from "reshaped";
import "reshaped/themes/slate/theme.css";
import "@/themes/productTheme/theme.css";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <Reshaped theme="productTheme">
      <ToastProvider
        options={{
          "bottom-end": { width: "initial" },
          "top-end": { width: "initial" },
        }}
      >
        {children}
      </ToastProvider>
    </Reshaped>
  );
};

export default App;
