export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface Post {
    id?: string;
    title: string;
    text: string;
    author: string;
    date: Date;
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export interface FbCreateResponse{
    name: string;
}