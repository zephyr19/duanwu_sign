import * as React from "react";
import { View } from "remax/wechat";
import { useState } from "react";
import styles from "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "@/components/Login";
import Scan from "@/components/Scan";
import QRcode from "@/components/QRcode";

const queryClient = new QueryClient();

export default () => {
  const [page, setPage] = useState<"login" | "scan">("login");
  return (
    <QueryClientProvider client={queryClient}>
      {page === "login" ? <Login jump={() => setPage("scan")} /> : <QRcode />}
    </QueryClientProvider>
  );
};
