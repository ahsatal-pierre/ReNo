export interface ServerErrorResponse {
    response: {
      data: {
        statusCode: number | string;
        message: string[] | string;
      };
    };
}

export interface DbServerErrorResponse {
    response: {
      status: number | string;
      data: {
        status_message: string;
      };
    };
}

export interface LoginData{
    email: string;
    password: string;
}

export interface UserData extends LoginData {
    firstName: string;
    lastName: string;
}

export interface ApiTaskData {
    title: string;
    overview: string; 
    done: boolean;
}

export interface TaskData extends ApiTaskData {
    id: number;
}

export interface LoginResponse {
    acces_token: string;
}
