const nodemailer = require("nodemailer");
const connection = require('./connection');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  
});


function getDoctorPrevAppointmentsByWeek(did) {
    return new Promise((resolve, reject) => {
        const uid = did;

        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneWeekAgoDateTime = oneWeekAgo.toISOString().slice(0, 19).replace('T', ' ');

        const query = `
            SELECT 
    test.id AS test_id,
    treatment.id AS treatment_id,
    treatment.details AS treatment_details,
    test.details AS test_details,
    appointment_date,
      appointment_time,
      appointment_details,
      remarks,
      d.name AS dname,
      p.name AS pname,
      d.qualification,
      d.experience,
      d.department,a.aid ,pid,did 
FROM doctor d
INNER JOIN appointment a ON a.did = d.id
INNER JOIN patient p ON a.pid = p.id
LEFT OUTER JOIN test ON test.aid = a.aid
LEFT OUTER JOIN treatment ON treatment.aid = a.aid
WHERE d.id = ?
  AND a.appointment_date BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
        `;

        connection.query(query, [uid, oneWeekAgoDateTime, currentDateTime], (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return reject(err);
            }

            resolve(result);
        });
    });
}
async function get_mails() {
    return new Promise((resolve, reject) => {

        const query = `
            SELECT email,id from doctor;
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return reject(err);
            }

            resolve(result);
        });
    });
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    let emails = [];
    try {

        emails = await get_mails();
    }
    catch (err) {
        console.log(err);

    }

    for (const doc of  emails) {
        
        let appointments = [];
        try {
            const doctorId = doc.id;  // Example doctor ID
            appointments = await getDoctorPrevAppointmentsByWeek(doctorId);


        } catch (err) {
            console.error("Error getting appointments:", err);
        }

        if (appointments.length > 0) {
            const info = await transporter.sendMail({
                from: 'from admin sumanth" <appalasaisumanth@gmail.com>', // sender address
                to: doc.email,
                subject: "weekly appointments", // Subject line
                text: "Hello doctor", // plain text body
                attachments: [
                    {
                        filename: "appointments.json",
                        content: JSON.stringify(appointments, null, 2), // formatted JSON
                        contentType: "application/json",
                    },
                ],
            });

            //console.log("Message sent: %s", info.messageId);
        }
        else {
            const info = await transporter.sendMail({
                from: 'from admin sumanth" <appalasaisumanth@gmail.com>', // sender address
                to: doc.email,
                subject: "weekly appointments", // Subject line
                text: "no appointments this week doctor", // plain text body
            });

            console.log("Message sent: %s", info.messageId);
           
        }
    }

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = main;
