export interface Environment {
    production: boolean;
    apiKey: string;
    fbDbUrl: string;
}

export interface FbAuthResponse{
    idToken: string;
    expiresIn: string;
}