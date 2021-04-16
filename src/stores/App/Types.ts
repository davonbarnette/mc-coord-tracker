export interface TUser {
    activated: number,
    blocked: boolean | null,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    role: TUserRole,
    user_group: number,
    username: string,
}

export interface TSignupValues {
    username?: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}


export interface TUserRole {
    description: string,
    id: number,
    name: string,
    type: string,
}

export interface TLoginValues {
    username: string,
    password: string,
}

export interface TLoginResponse {
    jwt: string,
    user: TUser,
}

export interface TSignupResponse {
    jwt: string,
    user: TUser,
}

export const LSAuthTokenKey = 'corl_jwt';