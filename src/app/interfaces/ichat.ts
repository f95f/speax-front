import { IUserResume } from "./iuser";

interface IChat {
    id: string;
    active: boolean;
    invitee: IUserResume;
}

interface IStartChatRequest {
    inviterId: string;
    inviteeId: string;
}

export type { IChat, IStartChatRequest };