const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const EmailServices = require('./services/email-service');
const jobs = require('./utils/job');
const apiRoutes = require('./routes/index');
const { subscribMessage, createChannel} = require('./utils/messageQueue');


const setUpAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    //const channel = await createChannel();

    app.use('/api', apiRoutes);

    const channel = await createChannel();
    subscribMessage(channel, EmailServices.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () =>{
        console.log(`Server started at PORT: ${PORT}`);
        //jobs();

      //  sendBasicEmail(
       //     'abhishekkamat147@admin.com',
       //     'contact.this.developer@gmail.com',
       //     'this is testing email',
      //      'hey, how are you, I hpoe you like the support'
       // );
    });
}

setUpAndStartServer();