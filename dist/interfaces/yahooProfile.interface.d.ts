export type YahooProfile = {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    nickname: string;
    locale: string;
    email: string;
    email_verified: boolean;
    birthdate: string;
    profile_images: {
        image32: string;
        image64: string;
        image128: string;
        image192: string;
    };
    picture: string;
    accessToken?: string;
    refreshToken?: string;
};
