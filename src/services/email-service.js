 const transporter = require('../config/emailConfig');
 const TicketRepository = require('../repository/ticket-repository');
 const repo = new TicketRepository();

const sendBasicEmail = async (data) => {
    try {
        const response = await transporter.sendMail({
            from: data.mailFrom,
            to: data.mailTo,
            subject: data.mailSubject,
            text: data.mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({ status: "PENDING"});
        return response;  
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
         const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (tickedId, data) => {
    try {
        const response = await repo.update(tickedId, data);
       return response;
   } catch (error) {
       console.log(error);
   }
}

const subscribeEvents = async ( payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;  
        default:
            console.log('NO VALID EVENT RESPONSE ');
            break;      
    }

}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}