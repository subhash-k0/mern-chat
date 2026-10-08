import express from 'express';
import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    // if (process.env.PORT === undefined) {
    //     process.env.PORT = 3000;
    //     console.log('Server running on port:' ,process.env.PORT);
    // }
    console.log(`Server started on port ${process.env.PORT}` || 3000);
})