import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "annar";
import { getSystemInfoSync, scanCode } from "remax/wechat";
import styles from "./index.css";
import drawQrcode from "weapp-qrcode";
import { useMutation } from "react-query";

const scan = async (): Promise<void> => {
  console.log("scan");
  const res = await scanCode({
    onlyFromCamera: true,
    scanType: ["qrCode"],
  });
  const { result } = res;
  console.log(res);
};

function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));

  return n;
}

const Scan = React.memo(() => {
  const size = useMemo(() => getSystemInfoSync().windowWidth * 0.6, []);
  useEffect(() => {
    drawQrcode({
      width: size,
      height: size,
      canvasId: "staticCode",
      text: "123".repeat(10) + randomString(6),
    });
  }, []);

  return (
    <view className={styles.bg}>
      <view className={styles.tip}>
        <view className={styles.title}>扫码完成签到</view>
        <view className={styles.desc}>
          扫码完成签到，按身高和两个包裹挨饿看过你共i和根本就啊
        </view>
      </view>
      <view className={styles.container}>
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
              canvas-id="staticCode"
            />
          </view>
        </view>
      </view>
      <Button type="primary" className={styles.btn} onTap={scan}>
        扫 码 签 到
      </Button>
    </view>
  );
});

export default Scan;
