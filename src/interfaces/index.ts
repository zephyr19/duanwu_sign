export type UserInfo = {
	name: string
	school: string
	class: string
	phone: string
}

export type QRcodeParams = {
	code: string;
	timestamp: number;
}

export interface JumpPage {
	jump: () => void;
}