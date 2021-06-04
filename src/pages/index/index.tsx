import * as React from "react";
import { View, Text, Image } from "remax/wechat";
import styles from "./index.css";
import QRcode from "@/components/QRcode";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View className={styles.box}>
        <QRcode />
      </View>
    </QueryClientProvider>
  );
};
