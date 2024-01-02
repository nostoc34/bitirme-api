import {
    USER_NAME_REGEX
} from '../../../constants';
import validator from 'validator';

export const userName = (field) => {
    if(typeof field !== "string") {
        return {
            message: "Kullanıcı adı string türünde olmalıdır.",
            status: false
        };
    }

    if(!field || !field.trim() || field.trim() === "") {
        return {
            message: "Kullanıcı adı boş olamaz.",
            status: false
        };
    }

    if(field.trim().length > 50 || field.trim().length < 5) {
        return {
            message: "Kullanıcı adı minimum 5 maksimum 50 uzunlukta olmalıdır.",
            status: false
        };
    }

    const isUserName = USER_NAME_REGEX.test(field.trim());

    if(!isUserName) {
        return {
            message: "Kullanıcı adı geçersiz.",
            status: false
        };
    }

    return {
        status: true
    };
};

const mail = (field) => {
    if(typeof field !== "string") {
        return {
            message: "E - Posta string türünde olmalıdır.",
            status: false
        };
    }

    if(!field || !field.trim() || field.trim() === "") {
        return {
            message: "E - Posta boş olamaz.",
            status: false
        };
    }

    const isEmail = validator.isEmail(field.trim());

    if(!isEmail) {
        return {
            message: "Uygunsuz E - Posta formatı.",
            status: false
        };
    }

    return {
        status: true
    };
};

const password = (field) => {
    if(typeof field !== "string") {
        return {
            message: "Parola string türünde olmalıdır.",
            status: false
        };
    }

    if(!field || !field.trim() || field.trim() === "") {
        return {
            message: "Parola boş olamaz.",
            status: false
        };
    }

    if(field.trim() === "d41d8cd98f00b204e9800998ecf8427e") {
        return {
            message: "Parola boş olamaz.",
            status: false
        };
    }

    // if(!validator.isMD5(field)) {
    //     return {
    //         message: "Parola güvenli olmayan bir yol ile gönderildi.",
    //         status: false
    //     };
    // }

    return {
        status: true
    };
};

const fullName = (field) => {
    if(typeof field !== "string") {
        return {
            message: "Tam ad string türünde olmalıdır.",
            status: false
        };
    }

    if(!field || !field.trim() || field.trim() === "") {
        return {
            message: "Tam ad boş olamaz.",
            status: false
        };
    }

    if(field.trim().length > 100 || field.trim().length < 4) {
        return {
            message: "Tam ad uzunluğu 4 ile 100 hane arasında olmalıdır.",
            status: false
        };
    }

    return {
        status: true
    };
};

const vRegister = (args) => {
    try {
        const userNameValidation = userName(args.userName);
        if(!userNameValidation.status) {
            return {
                message: userNameValidation.message,
                code: 403
            };
        }

        const mailValidation = mail(args.email);
        if(!mailValidation.status) {
            return {
                message: mailValidation.message,
                code: 403
            };
        }

        const passwordValidation = password(args.password);
        if(!passwordValidation.status) {
            return {
                message: passwordValidation.message,
                code: 403
            };
        }

        const fullNameValidation = fullName(args.fullName);
        if(!fullNameValidation.status) {
            return {
                message: fullNameValidation.message,
                code: 403
            };
        }

        return {
            code: 200
        };
    } catch(err) {
        return {
            message: `Eksik veya hatalı arguman. Hata açıklaması: ${err.message}. Hata kodu: 3bd5115d6825c7368ec6b076e151a1ba `,
            schema: {
                userName: {
                    type: "String",
                    length: "5 < x < 50",
                    format: "userName",
                    example: "exampleX1"
                },
                mail: {
                    type: "String",
                    format: "mail"
                },
                password: {
                    type: "String",
                    format: "md5"
                },
                fullName: {
                    type: "String",
                    length: "4 < x < 100"
                }
            },
            code: 403
        };
    }
};
export default vRegister;
