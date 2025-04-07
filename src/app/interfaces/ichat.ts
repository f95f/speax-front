interface IChat {
    id: string;
    active: boolean;
}

interface IStartChatRequest {
    inviterId: string;
    inviteeId: string;
}

export type { IChat, IStartChatRequest };