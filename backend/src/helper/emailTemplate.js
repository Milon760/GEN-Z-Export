
const emailTemplate = (name, token, clientURL) => {
    return `
        <div style = "background-color: #0a0a0a; margin: 0; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" >
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #171717; border: 1px solid #262626; border-radius: 24px; overflow: hidden; border-collapse: separate;">

                <!-- ================= HEADER BRAND LOGO AREA ================= -->
                <tr>
                    <td align="center" style="padding: 40px 20px 20px 20px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" bgcolor="#C5A059" style="background-color: #C5A059; padding: 12px 16px; border-radius: 12px; font-weight: 900; color: #0a0a0a; font-size: 16px; letter-spacing: -0.5px;">
                                    GZ
                                </td>
                                <td style="padding-left: 12px; text-align: left;">
                                    <span style="font-size: 13px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; display: block; line-height: 1;">GEN-Z</span>
                                    <span style="font-size: 9px; font-weight: 500; color: #C5A059; letter-spacing: 0.5px; display: block; margin-top: 3px;">EXPORT HUB</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- ================= CONTENT CORE BOX ================= -->
                <tr>
                    <td style="padding: 20px 40px; text-align: center;">
                        <h2 style="color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; margin: 0 0 12px 0;">
                            স্বাগতম, <span style="color: #C5A059;">${name}</span>!
                        </h2>
                        <p style="font-size: 14px; color: #a3a3a3; line-height: 1.6; font-weight: 500; margin: 0 0 30px 0;">
                            আপনার অ্যাকাউন্টটি সক্রিয় করার জন্য এবং আমাদের প্রিমিয়াম ড্রপ ক্রু মেম্বার প্যানেলে যুক্ত হতে নিচের ভেরিফিকেশন অ্যাকশন বাটনটি ব্যবহার করুন।
                        </p>
                    </td>
                </tr>

                <!-- ================= REGISTRATION ACTION BUTTON ================= -->
                <tr>
                    <td align="center" style="padding: 0 40px 30px 40px;">
                        <div>
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${clientURL}/activate/${token}" style="height:50px;v-text-anchor:middle;width:220px;" arcsize="24%" stroke="f" fillcolor="#C5A059">
                                <w:anchorlock />
                                <center style="color:#0a0a0a;font-family:sans-serif;font-size:12px;font-weight:bold;">ACTIVATE ACCOUNT</center>
                            </v:roundrect>
                            <![endif]-->
                            <a href="${clientURL}/auth/verification/${token}"
                                style="background-color: #C5A059; color: #0a0a0a; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 900; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 20px rgba(197, 160, 89, 0.2); transition: all 0.3s ease-in-out;">
                                Activate Account Terminal
                            </a>
                        </div>
                    </td>
                </tr>

                <!-- ================= RECOVERY SECURITY WARNING ================= -->
                <tr>
                    <td style="padding: 0 40px 35px 40px; text-align: center;">
                        <p style="font-size: 11px; color: #525252; font-weight: 600; line-height: 1.5; margin: 0; padding: 20px 0 0 0; border-top: 1px solid #262626;">
                            যদি আপনি এই আইডেন্টিটি রিকোয়েস্ট না করে থাকেন, তবে নির্দ্বিধায় এই ইমেইলটি উপেক্ষা করুন। নিরাপত্তা মেকানিজম অনুযায়ী এই লিংকটি সাময়িক সময়ের জন্য সক্রিয় থাকবে।
                        </p>
                    </td>
                </tr>

                <!-- ================= SYSTEM METADATA FOOTER ================= -->
                <tr>
                    <td bgcolor="#121212" style="background-color: #121212; padding: 24px 40px; text-align: center; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;">
                        <p style="font-size: 9px; color: #404040; font-weight: 700; tracking-widest; text-transform: uppercase; margin: 0;">
                            © ${new Date().getFullYear()} GEN-Z EXPORT CORE MESH LAYER. ALL RIGHTS RESERVED.
                        </p>
                    </td>
                </tr>

            </table>
        </div>
    `;
};


module.exports = { emailTemplate };