import { transporter } from "../config/node-mailer.js"
import path from 'path'

export async function sendEmail(email, code, os) {
    try {
        let filePath
        switch (os) {
            case "Windows":
                filePath = path.join(__dirname, "../dist/agent-windows.exe")
                break
            case "Linux":
                filePath = path.join(__dirname, "../dist/agent-linux")
                break
            case "macOS":
                filePath = path.join(__dirname, "../dist/agent-macos")
                break
            default:
                filePath = null
        }
        const info = await transporter.sendMail({
            from: "\"Symon Dtedi\" <symondtedi@gmail.com>",
            to: email,
            subject: "Sending An Agent and Verification Code",
            html: `<p>
            Here is your verification code: <b>${code}</b>, Don't share it with anyone.
            <br> Reminder to run the agent, use the command: filename --activation CODE use your CLI.
            </p>`,
            attachments: [{
                filename: "agent",
                path: filePath
            }]
        })   
        console.log("Email sent: " + info.response);
    } catch (error) {
        throw error
    }
}