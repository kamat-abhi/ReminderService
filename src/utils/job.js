const cron = require('node-cron');

const emailService = require('../services/email-service');
const transporter = require('../config/emailConfig');

const setUpJobs = () => {
    cron.schedule(' */1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            transporter.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "SUCCESS"});
                }
            })
        });
       // const htmlAlertMessage = `
        //        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        //            <h2 style="color: #d9534f;">
        //                <img src="https://example.com/alert-icon.png" alt="Alert Icon" style="width: 30px; vertical-align: middle;" />
        //                Alert: Immediate Attention Required
        //            </h2>
        //            <p>Hello,</p>
        //            <p>This is a system alert. Please check the following details:</p>
        //            <ul style="list-style-type: circle; margin-left: 20px;">
        //                <li><strong>Issue:</strong> System CPU usage exceeded 90%</li>
        //                <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        //                <li><strong>Action Required:</strong> Investigate and resolve the issue immediately.</li>
        //            </ul>
        //            <p style="margin-top: 20px;">Thank you,<br>Your Monitoring System</p>
        //        </div>
        //    `;
     /*   sendBasicEmail(
                'abhishekkamat147@admin.com',
                 'pk78568900@gmail.com',
                 '🚨 System Alert: Immediate Attention Required', 
                 'hey, how are you, I hpoe you like the support'
             ); */
        console.log(response);
    });
}

module.exports = setUpJobs;