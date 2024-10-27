export interface Appointment {
  patientName: string;
  description: string;
  date: string;
  startTime: string;
  duration: number;
}

export interface AppointmentItemProps {
  id: number;
  time: string;
  duration: number;
  patientName: string;
  description: string;
  onCancel: (id: number) => void;
}
