export const host="http://10.10.34.236:5000";


export const AdminloginRoute = `${host}/admin/login`
export const DoctorloginRoute= `${host}/doctor/login`
export const DeologinRoute = `${host}/deo/login`
export const FdologinRoute = `${host}/fdo/login`
export const PatientloginRoute = `${host}/patient/login`

export const PatientRegisterROute =`${host}/patient/register`

export const AdminupdateRoute = `${host}/admin/update`
export const DoctorupdateRoute= `${host}/doctor/update`
export const DeoupdateRoute = `${host}/deo/update`
export const FdoupdateRoute = `${host}/fdo/update`
export const PatientupdateRoute = `${host}/patient/update`


export const GetDoctorsRoute=`${host}/doctor`
export const GetDeoRoute=`${host}/deo`
export const GetFdoRoute=`${host}/fdo`
export const GetAppointmentsRoute=`${host}/appointment`



export const DeoAddOperatorRoute=`${host}/deo/register`
export const FdoAddOperatorRoute=`${host}/fdo/register`
export const DoctorAddOperatorRoute=`${host}/doctor/register`


export const DeleteDoctorRoute=`${host}/doctor/delete`
export const DeleteFdoRoute=`${host}/fdo/delete`
export const DeleteDeoRoute=`${host}/deo/delete`

export const GetSlotsbyDoctor = `${host}/appointment/slots`

export const BookAppointment = `${host}/appointment/create`

export const GetTestsRoute=`${host}/test`
export const GetTreatmentsRoute=`${host}/treatment`
export const CreateTestsRoute=`${host}/test/create`
export const CreateTreatmentsRoute=`${host}/treatment/create`
export const UpdateTestsRoute=`${host}/test/update`
export const UpdateTreatmentsRoute=`${host}/treatment/update`

export const DeleteTestsRoute=`${host}/test/delete`
export const DeleteTreatmentsRoute=`${host}/treatment/delete`



export const DeleteAppointmentRoute=`${host}/appointment/delete`


export const AvailableRoomRoute=`${host}/room/available`
export const DischargeRoomRoute=`${host}/room/discharge`
export const AdmitRoomRoute=`${host}/room/admit`
export const FilledRoomRoute =`${host}/room/filled`



export const GetPrevAppointments =`${host}/doctor/prevappoints`
export const GetUpcAppointments =`${host}/doctor/upcoappoints`
export const UpdateAppointments=`${host}/appointment/update`







