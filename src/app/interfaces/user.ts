export interface User {
    uid:string,
    email:string| null,
    role?:number,
    photoUrl?: string,
    displayName?: string
    password?:string
}
