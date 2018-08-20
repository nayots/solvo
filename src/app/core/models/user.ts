export interface Roles {
    member?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
