"use client";

import type { ReactNode } from "react";
import { Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";
import "@/themes/productTheme/theme.css";

const App = ({ children }: { children: ReactNode }) => {
  return <Reshaped theme="productTheme">{children}</Reshaped>;
};

export default App;
