import React, { useEffect, useState } from "react";

import AppointmentItem from "./AppointmentItem";
import { deleteAppointment, getAppointments } from "../services/api";

interface Appointment {
  id: number;
  time: string;
  duration: number;
  patientName: string;
  description: string;
}

interface AppointmentListProps {
  selectedDate: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ selectedDate }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments(selectedDate);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const handleCancel = async (id: number) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Appointments for {selectedDate}</h2>
      <ul className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-400">No appointments scheduled.</p>
        ) : (
          appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              duration={appointment.duration}
              patientName={appointment.patientName}
              description={appointment.description}
              onCancel={handleCancel}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
