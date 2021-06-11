import { cloud } from 'remax/wechat';
import { UserInfo, QRcodeParams } from "../interfaces"

cloud.init({
    env: 'release-b83caf'
})

const db = cloud.database();

export const insertQRcode = (data: QRcodeParams) => db.collection('qrcode').add({ data })

export const fetchUserInfo = () => ({
    queryKey: 'user',
    queryFn: () => db.collection('user').get()
})

export const postUserInfo = (data: UserInfo) => db.collection("user").add({ data: data })
