export{}
declare global {
  namespace Express {
    export interface Request {
      user?:{
        id:number;
        name:string;
        email:string;
        role:"super_admin"|"admin"|"user";
      };
    }
  }
}