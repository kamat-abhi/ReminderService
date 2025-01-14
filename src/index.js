const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');
const jobs = require('./utils/job');
const apiRoutes = require('./routes/index');


const setUpAndStartServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () =>{
        console.log(`Server started at PORT: ${PORT}`);
        jobs();

      //  sendBasicEmail(
       //     'abhishekkamat147@admin.com',
       //     'contact.this.developer@gmail.com',
       //     'this is testing email',
      //      'hey, how are you, I hpoe you like the support'
       // );
    });
}

setUpAndStartServer();