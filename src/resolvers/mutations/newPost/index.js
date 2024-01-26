import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';
import {
    asyncForEach,
    fileUpload
} from '../../../utils';
import {
    BACKSLASH_REGEX
} from '../../../constants';
import fs from 'fs';

const newPost = async (obj, args, context) => {
    const {
        userID
    } = context;

    const postID = await r.uuid();

    let newPost = {
        id: postID,
        userID: userID,
        content: args.content,
        isDeleted: false,
        createdAt: new Date().toISOString(),
    };

    if(args.image) {

        let imageID = await r.uuid();
        const pureFileName = imageID + "." + args.image.file.mimetype.split("/")[1];
        let newDir = "";
        let _dir = __dirname.replace(BACKSLASH_REGEX, "/");
        const dirSplitter = _dir.split("/");
        dirSplitter.forEach((item, index) => {
            if(index < dirSplitter.length - 4 && item !== "") {
                if(process.platform === "win32" && index === 0) {
                    newDir += item;
                } else {
                    newDir += "/" + item;
                }
            }
        });

        const fileName = newDir + "/upload/" + pureFileName;
        console.log(fileName);

        if(fs.existsSync(fileName)) fs.rmSync(fileName);

        const fileCreateResponse = await fileUpload(args.image.file.createReadStream, fileName);

        if(fileCreateResponse) {
            newPost.image = pureFileName;
        } else {
            return {
                message: "Fotoğraf yükleme başarısız. Kod: " + err.message,
                code: 503
            };
        }
    }

    return await r
        .db(DB)
        .table("posts")
        .insert(newPost)
        .then(() => {          
            return {
                message: "Gönderi başarıyla eklendi.",
                code: 200,
                data: newPost
            };
        })
        .catch(err => {
            return {
                message: `Hata: ${err.message}`,
                code: 500
            };
        });
};

export default newPost;