import React, { useState } from "react";
import { httpService } from "../services/httpService";

interface AppointmentFormProps {
  selectedDate: string;
  onAppointmentCreated: () => void;
}

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour < 10 ? `0${hour}` : hour.toString();
    times.push(`${hourString}:00`);
    times.push(`${hourString}:30`);
  }
  return times;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  onAppointmentCreated,
}) => {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [patientName, setPatientName] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment = {
      patientName,
      description,
      date: selectedDate,
      startTime,
      duration,
    };

    try {
      await httpService.post("/appointments", newAppointment);
      onAppointmentCreated();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setNotification("Failed to schedule the appointment. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      {notification && (
        <div
          className={`${
            notification.includes("successfully")
              ? "bg-green-500"
              : "bg-red-500"
          } text-white p-2 mb-4 rounded`}
        >
          {notification}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1">Start Time:</label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          required
        >
          <option value="" disabled>
            Select a time
          </option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          step="30"
          min="30"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Schedule Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
