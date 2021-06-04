import { cloud } from 'remax/wechat';
import { useMutation } from 'react-query'

cloud.init({
    env: 'release-b83caf'
})

const db = cloud.database();

type QRcodeParams = {
    code: string;
    timestamp: number;
}
export const insertQRcode = (data: QRcodeParams) => db.collection('qrcode').add({ data })