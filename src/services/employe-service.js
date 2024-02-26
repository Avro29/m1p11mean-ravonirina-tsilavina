const Worktime = require("../routes/worktimes/worktime.model");
const Appointment = require("../routes/appointments/appointment.model");

const checkIfEmpWork = async (empObject, dateAppointment) => {
    const workTimes = await Worktime.find({ employe : empObject._id});
    if (workTimes.length > 0){
        for(let i=0;i<workTimes.length;i++) {
            if (workTimes[i].dateDu <= dateAppointment <= workTimes[i].dateAu) {
                return true;
            }
        }
    }
    return false;
}

const checkIfEmpInService = async (empObject, dateAppointment) => {
    const appointments = await Appointment.find({ employe : empObject._id}).populate('service').populate('offer');
    if (appointments.length > 0) {
        for(let i=0;i<appointments.length;i++) {
            const dateDu = appointments[i].dateAppointment;
            if (appointments[i].service != null) {
                const dateAu = new Date(dateDu.getTime() + appointments[i].service.duration * 60000);
                if (dateDu <= dateAppointment && dateAppointment <= dateAu) {
                    return true;
                }
            }
            if (appointments[i].offer != null) {
                const dateAu = new Date(dateDu.getTime() + appointments[i].offer.duration * 60000);
                if (dateDu <= dateAppointment && dateAppointment <= dateAu) {
                    return true;
                }
            }
        }
    }
    return false;
}

const checkIfNoNextService = async (empObject, dateAppointment, object) => {
    const date = new Date(dateAppointment.getTime() + object.duration * 60000);
    console.log(date);
    const appointments = await Appointment.find({ employe : empObject._id}).populate('service').populate('offer');
    if (appointments.length > 0) {
        for(let i=0;i<appointments.length;i++) {
            const dateDu = appointments[i].dateAppointment;
            if (appointments[i].service != null) {
                const dateAu = new Date(dateDu.getTime() + appointments[i].service.duration * 60000);
                if (dateAppointment < dateDu && dateDu <= date) {
                    return true;
                }
            }
            if (appointments[i].offer != null) {
                const dateAu = new Date(dateDu.getTime() + appointments[i].offer.duration * 60000);
                if  (dateAppointment < dateDu && dateDu <= date) {
                    return true;
                }
            }
        }
    }
    return false;
}

module.exports = {
    checkIfEmpWork,
    checkIfEmpInService,
    checkIfNoNextService,
};