import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

// email transporter
let transporter = nodemailer.createTransport({
  // host: "premium230.web-hosting.com",
  // port: 465,
  // secure: true, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

export default async (
  to: string,
  subject: string,
  data: string,
  template: string
) => {
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: to,
    subject: subject,
    template: template,
    context: {
      token: data,
    },
  };

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "../templates/"),
        defaultLayout: false,
        partialsDir: path.join(__dirname, "../templates/"),
      },
      viewPath: path.join(__dirname, "../templates/"),
      extName: ".hbs",
    })
  );
  try {
    const data = await transporter.sendMail(mailOptions);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
