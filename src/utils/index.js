import {
    createWriteStream
} from "fs";

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};


export const fileUpload = (readStream, directoryAndFileName) => {
    return new Promise((resolve, reject) => {
        readStream().pipe(createWriteStream(directoryAndFileName)).on("finish", () => {
            resolve(true);
        }).on("error", (err) => {
            reject(false);
        });
    });
};