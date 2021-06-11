import * as React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import { getSystemInfoSync } from "remax/wechat";
import styles from "./index.css";
import { insertQRcode } from "@/api";
import drawQrcode from "weapp-qrcode";
import { useMutation } from "react-query";

const getCode = (): string => {
  return String(Date.now());
};

const QRcode = React.memo(() => {
  const [code, setCode] = useState(getCode());

  const { mutate, isLoading, isError, isSuccess } = useMutation(insertQRcode);

  const size = useMemo(() => getSystemInfoSync().windowWidth * 0.6, []);
  useEffect(() => {
    drawQrcode({
      width: size,
      height: size,
      canvasId: "myQrcode",
      text: code,
    });
    console.log(code);
  }, [code]);

  const codeRef = useRef(code);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const code = getCode();
      mutate({
        code,
        timestamp: Date.now(),
      });
      codeRef.current = code;
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCode(codeRef.current);
  }, [isSuccess]);

  return (
    <view className={styles.bg}>
      <view className={styles.container}>
        <view className={styles.tip}>扫码完成签到</view>
        <view className={styles.qrcodewrapper}>
          <>
            <view className={`${styles.border} ${styles.tl}`} />
            <view className={`${styles.border} ${styles.tr}`} />
            <view className={`${styles.border} ${styles.bl}`} />
            <view className={`${styles.border} ${styles.br}`} />
          </>
          <view className={styles.qrcode}>
            <canvas
              style={{ width: "60vw", height: "60vw" }}
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
        </view>
      </view>
    </view>
  );
});

export default QRcode;
