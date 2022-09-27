export interface IData {
    readonly _id: string;
    readonly name: string;
    readonly  type: 'bun' | 'sauce' | 'main';
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
    dropId?: number;
}

export interface ILogin {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string
    };
    success: boolean;
}

export interface IForm {
    [name: string]: string;
}

export interface IOptions {
    method?: 'POST' | 'PATCH';
    mode: 'cors';
    credentials: 'same-origin';
    headers: {
        'Content-Type': 'application/json';
        Authorization?: string;
    },
    body?: BodyInit;
}
