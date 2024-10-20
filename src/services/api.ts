import { httpService } from "./httpService";

export const deleteAppointment = async (id: number) => {
  return await httpService.delete(`/appointments/${id}`);
};

export const getAppointments = async (date: string) => {
  return await httpService.get(`/appointments`, { date });
};

interface AppointmentData {
  date: string;
  time: string;
  duration: number;
  patientName: string;
  description: string;
}

export const createAppointment = async (data: AppointmentData) => {
  return await httpService.post(`/appointments`, data);
};
