import { Role } from "../_enum/user";
import { UserDtos } from "./user";

export interface Token {
    accessToken: string;
    refreshToken: string;
    message: string;
    user: UserDtos;
    id : number;
    role: Role;
}
