import React, { useState } from "react";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const refreshAppointments = () => {
    // Logic to refresh the list, could be done by re-rendering AppointmentList.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">
        Doctor's Appointment Scheduler
      </h1>

      <div className="mb-6">
        <label className="mr-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
        />
      </div>

      {/* Appointment List for the selected date */}
      <AppointmentList selectedDate={selectedDate} />

      {/* Form to schedule new appointments */}
      <div className="mt-8 w-full max-w-md">
        <AppointmentForm
          selectedDate={selectedDate}
          onAppointmentCreated={refreshAppointments}
        />
      </div>
    </div>
  );
};

export default App;
