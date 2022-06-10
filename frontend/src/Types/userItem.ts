export type signInUserItem = {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    userInfo: {
      id: string;
    };
};

export type signUpUserItem = {
    id: string;
};