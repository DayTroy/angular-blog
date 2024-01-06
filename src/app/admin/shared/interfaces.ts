export interface User {
    email: string | null | undefined
    password: string | null | undefined
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}