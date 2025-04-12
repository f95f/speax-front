interface IUser {
    id: string;
    name: string;
    age: number;
    createdAt: string;
    updatedAt: string | null;
}

interface IUserResume {
    id: string;
    name: string;
    age: number;
    createdAt: string;
    updatedAt: string | null;
}

interface ISignUp {
    name: string;
    email: string;
    birthdate: string;
}

export type { 
    IUser,
    IUserResume,
    ISignUp
};