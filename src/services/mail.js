// const config_mail = require('./../static/Mail_config')
const User = require('../routes/users/user.model')
const Service = require('../routes/services/service.model')
const RoleUser = require('../constants/UserRole');
const nodemailer = require('nodemailer');
// const moment = require('moment-timezone');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ravonirinaf290303@gmail.com',
        pass: 'jyzuffggbxxnoxxr'
    }
});

const Mail_new_offre = async (offre) => {
    const list_client = await User.find({role: RoleUser.ROLE_USER_CLIENT}).exec();
    const service = await Service.findOne({_id : offre.serviceId});
    mail = ''
    for(let i=0;i<list_client.length;i++){
        if (i < list_client.length - 1) {
            mail += list_client[i].email + ','
        }
        if (i == list_client.length - 1) {
            mail += list_client[i].email 
        }
    }

    const data = {
        from: 'Elegence Era',
        to: mail,
        subject: 'Nouvel offre spécial',
        html: `
            <p> Bonjour ! </p>
            </br>
            <p>Nous vous informons pour cet nouvel offre spécial : </p>
            <p>- Service concerné : ${service.name}</p>
            <p>- Offre : Réduction de ${offre.percentageReduction}%</p>
            </br>
            <p>Cordialement,</p>
            <p>L'équipe</p>
        `
    };
    await transporter.sendMail(data, function (error, info) {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
            } else {
            console.log('E-mail envoyé : ' + info.response);
            res.send('E-mail envoyé avec succès');
            }
    });
};

module.exports = {
    Mail_new_offre,
  };