import bcrypt from "bcrypt";

const PW = 'tasdfasdfasfasfd';
const encryptedPW = bcrypt.hashSync(PW, 10);


bcrypt.compare('hello', '$2b$10$g0Yw9cmhEFi4dODYCOtH9.txNyEQQzSlm6dPx6cSZgt.F8o7cli4i', (err, same) => {
    if(same) {
        console.log("true!");
    }
})
