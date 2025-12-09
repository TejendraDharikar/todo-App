// import * as crypto from "crypto";

// const SYMMETRIC_ALGORITH ="aes-gcm";
// const ENCRYPTION_KEY = crypto.randomBytes(32);

// /**
//  * 
//  * @param plaintext 
//  * @returns
//  */


// function encrypt (plaintext:string):{
// ciphertext:string;
// iv:string;
// tag:string;
// } {
//   const iv=crypto.randomBytes(16);
//   const ciphertext=crypto.createCipheriv(SYMMETRIC_ALGORITH,ENCRYPTION_KEY,iv);

//   let ciphertext = cipher.update(plaintext,"utf8","hex");
//   ciphertext+= cipher.final("hex");

//   const tag = ciphertext.getAuthTag().toString("hex");

//   return {ciphertext,iv:iv.toString("hex"),tag};
// }