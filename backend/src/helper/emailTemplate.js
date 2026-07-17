const emailTemplate = (name, token, clientURL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>GEN-Z EXPORT | Security Portal Activation</title>
        <style>
            /* ================= ULTRA PREMIUM LAYOUT OVERRIDES ================= */
            @media screen and (max-width: 600px) {
                .email-wrapper { padding: 15px 5px !important; }
                .content-card { border-radius: 20px !important; }
                .inner-padding { padding: 30px 20px !important; }
                .btn-action { display: block !important; text-align: center !important; padding: 16px 20px !important; }
            }

            /* Custom Premium Interactive Glow Effect */
            .btn-action:hover {
                background-color: #ffffff !important;
                color: #0a0a0a !important;
                box-shadow: 0 0 30px rgba(197, 160, 89, 0.6) !important;
                transform: translateY(-2px) !important;
            }

            /* ================= DYNAMIC SYSTEM DEVICE THEME SWITCHER ================= */
            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }
            
            @media (prefers-color-scheme: light) {
                .body-bg { background-color: #f8fafc !important; }
                .content-card { background-color: #ffffff !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 20px 40px rgba(0,0,0,0.03) !important; }
                .brand-title { color: #0f172a !important; }
                .text-main { color: #475569 !important; }
                .text-sub { color: #94a3b8 !important; }
                .warning-box { border-top: 1px solid #edf2f7 !important; color: #94a3b8 !important; }
                .footer-bg { background-color: #f1f5f9 !important; color: #64748b !important; border-top: 1px solid #e2e8f0 !important; }
                .logo-bg { color: #ffffff !important; background-color: #0f172a !important; }
            }
        </style>
    </head>
    <body class="body-bg" style="background-color: #050505; margin: 0; padding: 0; font-family: '-apple-system', BlinkMacSystemFont, 'SF Pro Display', Roboto, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; width: 100% !important;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-wrapper" style="padding: 60px 0; width: 100%;">
            <tr>
                <td align="center">
                    
                    <!-- Main Blueprint Premium Grid Frame Container -->
                    <table border="0" cellpadding="0" cellspacing="0" class="content-card" width="100%" style="max-width: 520px; background-color: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 32px; overflow: hidden; border-collapse: separate; box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);">
                        
                        <td class="inner-padding" style="padding: 50px 45px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                
                                <!-- ================= BRAND IDENTITY INTEGRATED LOGO ================= -->
                                <tr>
                                    <td align="center" style="padding-bottom: 40px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <!-- Box Dynamic Badge Rotation Accent -->
                                                <td class="logo-bg" align="center" bgcolor="#C5A059" style="background-color: #C5A059; padding: 10px 14px; border-radius: 12px; font-weight: 900; color: #050505; font-size: 16px; letter-spacing: -0.5px; box-shadow: 0 4px 15px rgba(197, 160, 89, 0.25);">
                                                    GZ
                                                </td>
                                                
                                                <!-- Text Components Profile Layout -->
                                                <td style="padding-left: 12px; text-align: left;">
                                                    <span class="brand-title" style="font-size: 15px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; display: block; line-height: 1;">GEN-Z</span>
                                                    <span style="font-size: 8px; font-weight: 700; color: #C5A059; letter-spacing: 0.25em; display: block; margin-top: 4px; text-transform: uppercase; opacity: 0.9;">Export</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- ================= CORE HEADER & TYPOGRAPHY ================= -->
                                <tr>
                                    <td style="text-align: center; padding-bottom: 30px;">
                                        <h1 class="brand-title" style="color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.025em; margin: 0 0 12px 0;">
                                            Welcome, <span style="color: #C5A059;">${name}</span>!
                                        </h1>
                                        <p class="text-main" style="font-size: 14px; color: #8e8e93; line-height: 1.6; font-weight: 500; margin: 0;">
                                            Your production terminal secure pipeline link configuration is established. Authenticate your entry clearance token below to link into the system mesh grid.
                                        </p>
                                    </td>
                                </tr>

                                <!-- ================= PREMIUM HUB INTERACTIVE ACTION BUTTON ================= -->
                                <tr>
                                    <td align="center" style="padding-bottom: 35px;">
                                        <div>
                                            <!--[if mso]>
                                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${clientURL}/auth/verification/${token}" style="height:52px;v-text-anchor:middle;width:260px;" arcsize="24%" stroke="f" fillcolor="#C5A059">
                                                <w:anchorlock />
                                                <center style="color:#0a0a0a;font-family:sans-serif;font-size:12px;font-weight:900;letter-spacing:1px;">ACTIVATE ACCOUNT TERMINAL</center>
                                            </v:roundrect>
                                            <![endif]-->
                                            <a class="btn-action" href="${clientURL}/auth/verification/${token}"
                                               style="background-color: #C5A059; color: #050505; padding: 16px 36px; text-decoration: none; border-radius: 12px; font-weight: 900; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block; box-shadow: 0 10px 25px rgba(197, 160, 89, 0.2); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
                                                Activate Account Terminal
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <!-- ================= SECURITY INTEGRITY SIGNATURE BOUNDARY ================= -->
                                <tr>
                                    <td style="text-align: center;">
                                        <p class="warning-box" style="font-size: 11px; color: #444446; font-weight: 500; line-height: 1.6; margin: 0; padding-top: 30px; border-top: 1px solid #1c1c1e;">
                                            Disregard this transmission request pattern safely if you did not request authentication mapping. Token safety parameter sequences enforce automated expiration shortly.
                                        </p>
                                    </td>
                                </tr>
                                
                            </table>
                        </td>

                        <!-- ================= COMPACT INFRASTRUCTURE RUNTIME FOOTER ================= -->
                        <tr>
                            <td class="footer-bg" bgcolor="#0a0a0a" style="background-color: #0a0a0a; padding: 24px 40px; text-align: center;">
                                <p style="font-size: 9px; color: #3a3a3c; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: 2px;">
                                    © ${new Date().getFullYear()} GEN-Z EXPORT MESH LAYER. ALL RIGHTS RESERVED.
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

module.exports = { emailTemplate };