import { AppointmentItemProps } from "../interfaces/appointment";

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  id,
  time,
  duration,
  patientName,
  description,
  onCancel,
}) => {
  return (
    <li className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="text-lg font-semibold">
          {patientName} ({duration} min)
        </p>
        <p className="text-gray-400">
          {time}
        </p>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
      <button
        onClick={() => onCancel(id)}
        className="ml-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancel Appointment
      </button>
    </li>
  );
};

export default AppointmentItem;
