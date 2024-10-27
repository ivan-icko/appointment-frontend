import { Appointment } from "../interfaces/appointment";
import { httpService } from "./httpService";

export const deleteAppointment: (id: number) => Promise<Appointment> = async (id: number) => {
  return await httpService.delete(`/appointments/${id}`);
};

export const getAppointments: (date: string) => Promise<Appointment[]> = async (date: string) => {
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
