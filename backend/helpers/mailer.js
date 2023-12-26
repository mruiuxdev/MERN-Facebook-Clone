const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  EMAIL,
  AUTH_LINK_URL,
} = process.env;

const auth = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  AUTH_LINK_URL
);

const sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div><table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td align="center" style="background-color: #dbe5ea;padding-left: 8px;padding-right: 8px;padding-top: 32px;"> <div style="z-index: 90;"></div> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 800px;margin: 0 auto;"> <tbody> <tr> <td align="center" style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;background-color: #ffffff;border-radius: 4px 4px 0px 0px;padding-left: 16px;padding-right: 16px;padding-top: 24px;padding-bottom: 24px;"> <p style="margin-top: 0px;margin-bottom: 0px;"><a class="o_text-primary" href=${process.env.FRONT_URL} style="text-decoration: none;outline: none;color: #126de5;"> <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/13/rhGVHjO4wJyCzZ3lPYeiKINm/account_code/images/logo.png" width="136" height="36" alt="SimpleApp" style="max-width: 136px;-ms-interpolation-mode: bicubic;vertical-align: middle;border: 0;line-height: 100%;height: auto;outline: none;text-decoration: none;"></a> </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td align="center" style="background-color: #dbe5ea;padding-left: 8px;padding-right: 8px;"> <div style="z-index: 90;"></div> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 800px;margin: 0 auto;"> <tbody> <tr> <td align="center" style="background-color: #126de5;padding-left: 24px;padding-right: 24px;padding-top: 64px;padding-bottom: 64px;"> <div style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;max-width: 584px;color: #ffffff;text-align: center;"> <table cellspacing="0" cellpadding="0" border="0" style="text-align: center;margin-left: auto;margin-right: auto;"> <tbody> <tr> <td align="center" style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #ffffff;border: 2px solid #ffffff;border-radius: 96px;padding-left: 16px;padding-right: 16px;padding-top: 16px;padding-bottom: 16px;"> <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2020/03/13/rhGVHjO4wJyCzZ3lPYeiKINm/account_code/images/vpn_key-48-white.png" width="48" height="48" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;vertical-align: middle;border: 0;line-height: 100%;height: auto;outline: none;text-decoration: none;"> </td> </tr> <tr> <td style="font-size: 24px; line-height: 24px; height: 24px;"> &nbsp; </td> </tr> </tbody> </table> <h2 style="font-family: Helvetica, Arial, sans-serif;font-weight: bold;margin-top: 0px;margin-bottom: 4px;font-size: 30px;line-height: 39px;"> Hello ${name}, your account access code</h2> <p style="margin-top: 0px;margin-bottom: 0px;">Vulture far against far burped besides amongst decided crud selfish kangaroo intensely unblushing more therefore some.</p> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td style="background-color: #dbe5ea;padding-left: 8px;padding-right: 8px;"> <div style="z-index: 90;"></div> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 800px;margin: 0 auto;"> <tbody> <tr> <td style="font-size: 48px;line-height: 48px;height: 48px;background-color: #ffffff;"> &nbsp; </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td align="center" style="background-color: #dbe5ea;padding-left: 8px;padding-right: 8px;"> <div style="z-index: 90;"></div> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 800px;margin: 0 auto;"> <tbody> <tr> <td align="center" style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 14px;line-height: 21px;background-color: #ffffff;color: #82899a;padding-left: 24px;padding-right: 24px;padding-top: 16px;padding-bottom: 16px;"> <p style="margin-top: 0px;margin-bottom: 16px;"><strong>SimpleApp Access Code</strong></p> <table cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td width="384" align="center" style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;background-color: #ebf5fa;border-radius: 4px;padding-left: 8px;padding-right: 8px;padding-top: 24px;padding-bottom: 24px;"> <p class="o_text-dark" data-color="Dark" style="color: #242b3d;margin-top: 0px;margin-bottom: 0px;"> <strong></strong> </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td align="center" style="background-color: #dbe5ea;padding-left: 8px;padding-right: 8px;"> <div style="z-index: 90;"></div> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 800px;margin: 0 auto;"> <tbody> <tr> <td align="center" data-bgcolor="Bg White" style="background-color: #ffffff;padding-left: 24px;padding-right: 24px;padding-top: 8px;padding-bottom: 30px;"> <table align="center" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td width="300" align="center" style="font-family: Helvetica, Arial, sans-serif;font-weight: bold;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;mso-padding-alt: 12px 24px;background-color: #0ec06e;border-radius: 4px;"> <a href="${url}" data-color="White" style="text-decoration: none;outline: none;color: #ffffff;display: block;padding: 12px 24px;mso-text-raise: 3px;">Verify Your Account</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td align="center" style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;background-color: #dbe5ea;border-radius: 4px 4px 0px 0px;padding-left: 16px;padding-right: 16px;padding-top: 24px;padding-bottom: 24px;"> <p style="margin-top: 0px;margin-bottom: 0px;"> </p> </td> </td> </tr> </tbody> </table></div>`,
  };

  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;

    return res;
  });
};

module.exports = { sendVerificationEmail };
