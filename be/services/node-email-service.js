import { transporter } from "../config/node-mailer.js"
import { buildAgentDownloadUrl } from "./agent-service.js"

export async function sendEmail(email, code, os) {
    try {
        const downloadUrl = buildAgentDownloadUrl(os)
        const info = await transporter.sendMail({
            from: "\"Symon Dtedi\" <symondtedi@gmail.com>",
            to: email,
            subject: "Sending An Agent and Verification Code",
            html: `<p>
            Here is your verification code: <b>${code}</b>, Don't share it with anyone.
            <br>
            Download your agent securely here: <a href="${downloadUrl}">${downloadUrl}</a>
            <br><br>
            How to run:
            <br>- Windows: run the file as <b>Run as Administrator</b>.
            <br>- Activation command: <code>filename --activation CODE</code>
            <br><br>
            To stop or uninstall the agent, run:
            <br><code>filename --uninstall</code>
            </p>`
        })   
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error(error)
        throw error
    }
}