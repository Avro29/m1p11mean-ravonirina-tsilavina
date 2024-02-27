const FinishA = require("../routes/finishappointments/finishappointment.model");

const getAppointmentFini = async (userId) => {
    var appointmentList = []
    var appointmentListFinal = []
    const results = await FinishA.find().populate('appointmentId');
    if (results.length > 0) {
        for(let i=0;i<results.length;i++) {
            appointmentList.push(results[i].appointmentId)
        }
    }
    if (appointmentList.length > 0) {
        for(let i=0;i<appointmentList.length;i++) {
            if (appointmentList[i].employe == userId) {
                appointmentListFinal.push(appointmentList[i])
            }
        }
    }
    return appointmentListFinal;
}

const getAppointmentFiniByDate = async (listAppoint) => {
    var list = []
    date_1 = new Date().setHours(3,0,0,0);
    date_2 = new Date().setHours(26,59,59,59);
    date_1 = new Date(date_1);
    date_2 = new Date(date_2);
    for(let i=0;i<listAppoint.length;i++) {
        if (date_1 <= listAppoint[i].dateAppointment && listAppoint[i].dateAppointment <= date_2) {
            list.push(listAppoint[i])
        }
    }
    return list;
}

module.exports = {
    getAppointmentFini,
    getAppointmentFiniByDate,
};