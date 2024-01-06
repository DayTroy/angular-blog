export interface User {
    email: string | null | undefined
    password: string | null | undefined
    returnSecureToken?: boolean
}

export interface Post {
    id?: string | null | undefined;
    title: string | null | undefined;
    text: string | null | undefined;
    author: string | null | undefined;
    date: Date;
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}