export interface JwtPayload {
    isVerified: boolean;
    sub: string;
    role: string;
    _id: string;
}
