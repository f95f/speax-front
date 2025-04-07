import { IUserResume } from "./iuser";

interface IMessage {
    id: string;
    chatId: string;
    sender_id?: IUserResume;
    content: string;
}

export type { IMessage };