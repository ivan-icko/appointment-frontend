export interface Appointment {
  id?: number;
  patientName: string;
  description: string;
  date: string;
  startTime: string;
  duration: number;
}

export interface AppointmentItemProps {
  id: number | undefined;
  time: string;
  duration: number;
  patientName: string;
  description: string;
  onCancel: (id: number) => void;
}
