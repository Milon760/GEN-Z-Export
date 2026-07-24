const activateEmailTemplate = (name, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>GEN-Z EXPORT | Account Activation</title>
        <style>
            @media screen and (max-width: 600px) {
                .email-wrapper { padding: 20px 10px !important; }
                .content-card { border-radius: 20px !important; }
                .inner-padding { padding: 30px 20px !important; }
                .otp-code { font-size: 28px !important; letter-spacing: 8px !important; }
            }

            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }
            
            @media (prefers-color-scheme: light) {
                .body-bg { background-color: #f8fafc !important; }
                .content-card { background-color: #ffffff !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 20px 40px rgba(0,0,0,0.04) !important; }
                .brand-title { color: #0f172a !important; }
                .text-main { color: #475569 !important; }
                .text-sub { color: #94a3b8 !important; }
                .otp-box { background-color: #f1f5f9 !important; border: 1px dashed #cbd5e1 !important; }
                .divider { border-top: 1px solid #e2e8f0 !important; }
                .footer-bg { background-color: #f8fafc !important; color: #64748b !important; border-top: 1px solid #e2e8f0 !important; }
            }
        </style>
    </head>
    <body class="body-bg" style="background-color: #050505; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; width: 100% !important;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-wrapper" style="padding: 50px 0; width: 100%;">
            <tr>
                <td align="center">
                    
                    <!-- Main Card -->
                    <table border="0" cellpadding="0" cellspacing="0" class="content-card" width="100%" style="max-width: 500px; background-color: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 28px; overflow: hidden; border-collapse: separate; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);">
                        <tr>
                            <td class="inner-padding" style="padding: 48px 40px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    
                                    <!-- LOGO -->
                                    <tr>
                                        <td align="center" style="padding-bottom: 36px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#C5A059" style="background-color: #C5A059; width: 42px; height: 42px; border-radius: 12px; font-weight: 900; color: #050505; font-size: 16px; letter-spacing: -0.5px;">
                                                        GZ
                                                    </td>
                                                    <td style="padding-left: 12px; text-align: left;">
                                                        <span class="brand-title" style="font-size: 18px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; display: block; line-height: 1;">GEN-Z</span>
                                                        <span style="font-size: 9px; font-weight: 700; color: #C5A059; letter-spacing: 3px; display: block; margin-top: 3px; text-transform: uppercase;">EXPORT</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- HEADER -->
                                    <tr>
                                        <td style="text-align: center; padding-bottom: 24px;">
                                            <h1 class="brand-title" style="color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 12px 0;">
                                                Welcome, <span style="color: #C5A059;">${name}</span>!
                                            </h1>
                                            <p class="text-main" style="font-size: 14px; color: #94a3b8; line-height: 1.6; font-weight: 400; margin: 0;">
                                                Thank you for joining GEN-Z EXPORT. Please use the verification code below to activate your account and complete your setup.
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- OTP DISPLAY BOX -->
                                    <tr>
                                        <td align="center" style="padding-bottom: 28px;">
                                            <table class="otp-box" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #141416; border: 1px dashed #27272a; border-radius: 16px; text-align: center;">
                                                <tr>
                                                    <td class="otp-code" style="padding: 22px; font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; color: #C5A059; letter-spacing: 10px; padding-left: 10px;">
                                                        ${otp}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- SECURITY NOTE -->
                                    <tr>
                                        <td style="text-align: center;">
                                            <p class="text-sub" style="font-size: 12px; color: #64748b; font-weight: 400; line-height: 1.5; margin: 0;">
                                                This code will expire in <strong>10 minutes</strong>. If you did not create an account with GEN-Z EXPORT, you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td class="footer-bg" bgcolor="#0a0a0a" style="background-color: #0a0a0a; padding: 20px 30px; text-align: center; border-top: 1px solid #171717;">
                                <p style="font-size: 10px; color: #52525b; font-weight: 600; text-transform: uppercase; margin: 0; letter-spacing: 1.5px;">
                                    © ${new Date().getFullYear()} GEN-Z EXPORT. ALL RIGHTS RESERVED.
                                </p>
                            </td>
                        </tr>

                    </table>
                    
                </td>
            </tr>
        </table>
        
    </body>
    </html>
    `;
};


const resetEmailTemplate = (otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>GEN-Z EXPORT | Password Reset Code</title>
        <style>
            @media screen and (max-width: 600px) {
                .bg-wrapper { padding: 20px 10px !important; }
                .card { border-radius: 20px !important; padding: 30px 20px !important; }
                .otp-code { font-size: 28px !important; letter-spacing: 8px !important; }
            }

            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }

            @media (prefers-color-scheme: light) {
                .bg-wrapper { background-color: #f8fafc !important; }
                .card { background-color: #ffffff !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 20px 40px rgba(0,0,0,0.04) !important; }
                .text-title { color: #0f172a !important; }
                .text-body { color: #475569 !important; }
                .text-sub { color: #94a3b8 !important; }
                .code-container { background-color: #f1f5f9 !important; border: 1px dashed #cbd5e1 !important; }
                .divider { border-top: 1px solid #e2e8f0 !important; }
                .footer-text { color: #64748b !important; }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505;">

        <!-- Main Outer Wrapper -->
        <table class="bg-wrapper" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 50px 16px; min-height: 100%;">
            <tr>
                <td align="center">
                    
                    <!-- Content Card Container -->
                    <table class="card" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 28px; padding: 44px 36px; box-shadow: 0 30px 80px rgba(0,0,0,0.6);">
                        
                        <!-- BRANDING HEADER -->
                        <tr>
                            <td align="center" style="padding-bottom: 32px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <!-- Gold Monogram Icon -->
                                        <td style="background-color: #E5B842; width: 42px; height: 42px; border-radius: 12px; text-align: center; font-weight: 900; color: #050505; font-size: 16px; letter-spacing: -0.5px;">
                                            GZ
                                        </td>
                                        <!-- Brand Title -->
                                        <td style="padding-left: 12px; text-align: left;">
                                            <div class="text-title" style="font-weight: 900; font-size: 18px; color: #FFFFFF; letter-spacing: 2px; text-transform: uppercase; line-height: 1;">GEN-Z</div>
                                            <div style="font-size: 9px; color: #E5B842; letter-spacing: 3px; text-transform: uppercase; font-weight: 700; margin-top: 3px;">EXPORT</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- TITLE & BODY TEXT -->
                        <tr>
                            <td style="text-align: center; padding-bottom: 24px;">
                                <h2 class="text-title" style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: -0.5px;">Password Reset Request</h2>
                                <p class="text-body" style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0; padding: 0 5px;">
                                    We received a request to reset your password. Use the One-Time Password (OTP) code below to proceed with resetting your account password.
                                </p>
                            </td>
                        </tr>

                        <!-- OTP DISPLAY CONTAINER -->
                        <tr>
                            <td align="center" style="padding-bottom: 28px;">
                                <table class="code-container" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #141416; border: 1px dashed #27272a; border-radius: 16px; text-align: center;">
                                    <tr>
                                        <td class="otp-code" style="padding: 22px; font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; color: #E5B842; letter-spacing: 10px; padding-left: 10px;">
                                            ${otp}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- EXPIRATION & WARNING NOTICE -->
                        <tr>
                            <td style="text-align: center; padding-bottom: 32px;">
                                <p class="text-sub" style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
                                    For security purposes, this code is valid for <strong>15 minutes</strong>. If you did not request a password reset, please secure your account immediately.
                                </p>
                            </td>
                        </tr>

                        <!-- FOOTER & BRAND VALUE PROPOSITION -->
                        <tr>
                            <td class="divider" style="border-top: 1px solid #1c1c1e; padding-top: 28px; text-align: center;">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 10px; color: #71717a; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                                    <tr>
                                        <td align="center">
                                            Premium Quality &nbsp;•&nbsp; Worldwide Export &nbsp;•&nbsp; Secure Portal
                                        </td>
                                    </tr>
                                </table>
                                
                                <div class="footer-text" style="font-size: 10px; color: #52525b; letter-spacing: 0.5px; text-transform: uppercase;">
                                    © ${new Date().getFullYear()} GEN-Z EXPORT. ALL RIGHTS RESERVED.
                                </div>
                            </td>
                        </tr>
                        
                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

module.exports = { activateEmailTemplate, resetEmailTemplate };