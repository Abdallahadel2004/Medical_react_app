    import axiosInstance from '../api/axios';

    export default axiosInstance;

    export const authAPI = {
        login: (email, password) =>
            axiosInstance.post('/auth/login/', { email, password }),
        register: (userData) => axiosInstance.post('/register/', userData),
        verifyOTP: (email, otp) =>
            axiosInstance.post('/auth/verify-otp/', { email, otp }),
    };

    export const doctorAPI = {
        getApprovedDoctors: () => axiosInstance.get('/doctors/'),
        getAvailableSlots: (doctorId) =>
            axiosInstance.get('/slots/available/', {
                params: doctorId ? { doctor_id: doctorId } : {},
            }),
        getMySlots: () => axiosInstance.get('/slots/'),
        addSlot: (slotData) => axiosInstance.post('/slots/', slotData),
        deleteSlot: (slotId) => axiosInstance.delete(`/slots/${slotId}/`),
    };

    export const appointmentAPI = {
        getMyAppointments: () => axiosInstance.get('/appointments/'),
        getUpcoming: () => axiosInstance.get('/appointments/upcoming/'),
        getPast: () => axiosInstance.get('/appointments/past/'),
        book: (data) => axiosInstance.post('/appointments/book/', data),
        getById: (id) => axiosInstance.get(`/appointments/${id}/`),
        
        approveAppointment: (id, doctorNotes = '') =>
            axiosInstance.post(`/appointments/${id}/approve/`, { doctor_notes: doctorNotes }),
        
        rejectAppointment: (id, doctorNotes = '') =>
            axiosInstance.post(`/appointments/${id}/reject/`, { doctor_notes: doctorNotes }),
        
        cancelAppointment: (id, reason = '') =>
            axiosInstance.post(`/appointments/${id}/cancel/`, { reason }),
        
        completeAppointment: (id, data) =>
            axiosInstance.post(`/appointments/${id}/complete/`, data),
    };

    export const specialtyAPI = {
        getSpecialties: () => axiosInstance.get('/specialties/'),
    };

    export const profileAPI = {
        getDoctorProfile: () => axiosInstance.get('/doctor-profiles/me/'),
        saveDoctorProfile: (data) => axiosInstance.patch('/doctor-profiles/me/', data),
        getPatientProfile: () => axiosInstance.get('/patient-profiles/me/'),
        savePatientProfile: (data) => axiosInstance.patch('/patient-profiles/me/', data),
    };

export const userAPI = {
    getCurrent: () => axiosInstance.get('/users/me/'),
    update: (id, data) => axiosInstance.patch(`/users/${id}/`, data),
};