import { createTransport } from "nodemailer";
import { templateDeleteUser } from "../templates/templateDeleteUser.js";
import { templateDeleteProd } from "../templates/templateDeleteProd.js";
import { templateRegister } from "../templates/templateRegister.js";
import { logger } from "../utils/logger.js";
import "dotenv/config";

export const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendGmail = async (user, service) => {
    try {
        const { first_name, email } = user;

        let msg = '';
        let subj = '';

        switch (service) {
            case 'register':
                msg = templateRegister;
                subj = 'Bienvenido/a a Mundopuzzle';
                break;
            case 'deleteUsers':
                msg = templateDeleteUser;
                subj = 'Usuario eliminado';
                break;
            case 'deleteProd':
                msg = templateDeleteProd;
                subj = 'Producto eliminado';
                break;
            default:
                return;
        }

        const gmailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg,
        };

        const response = await transporter.sendMail(gmailOptions);
        logger.info(`Email sent successfully to ${first_name}`);
        return response

    } catch (error) {
        logger.error(`Error sending email to ${email}: ${error.message}`);
    }
};