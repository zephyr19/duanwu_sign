import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { getSystemInfoSync } from "remax/wechat";
import styles from "./index.css";
import { insertQRcode } from "@/api";
import drawQrcode from "weapp-qrcode";
import { Loading } from "annar";
import { useMutation } from "react-query";

function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));

  return n;
}

const QRcode = React.memo(() => {
  const [code, setCode] = useState("hello");

  const { mutate, isLoading, isError } = useMutation(insertQRcode);

  const size = useMemo(() => getSystemInfoSync().windowWidth * 0.8, []);
  useEffect(() => {
    drawQrcode({
      width: size,
      height: size,
      canvasId: "myQrcode",
      text: "123".repeat(10) + code,
    });
  }, [code]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      mutate({
        code: randomString(6),
        timestamp: Date.now(),
      });
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <view className={styles.container}>
        <canvas
          style={{ width: "80vw", height: "80vw" }}
          canvas-id="myQrcode"
        />
        {isLoading && (
          <view className={styles.loading}>
            <view className={styles.loader}>
              <view className={`${styles.inner} ${styles.one}`} />
              <view className={`${styles.inner} ${styles.two}`} />
              <view className={`${styles.inner} ${styles.three}`} />
            </view>
          </view>
        )}
      </view>
    </>
  );
});

export default QRcode;
