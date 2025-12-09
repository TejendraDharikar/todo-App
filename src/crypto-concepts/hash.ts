import * as crypto from "crypto"

const HASH_ALGORITHM =  "sha256";

function createHash(data:string):string {

return crypto
.createHash(HASH_ALGORITHM)
.update(data)
.digest("hex");
}

const originalData = "the secret meeting is at 10 pm.";
const originalHash = createHash(originalData);


const modifiedData = "the secret meeting is at 11 pm.";
const modifiedHash = createHash(modifiedData);


// do console.log