import ClockInOutBtn from '../Buttons/ClockInOutBtn';

export default function ClockInMenu() {
  return (
    <div className="flex grid-cols-2 gap-12 items-center justify-center min-h-screen bg-gray-900">
      <ClockInOutBtn label="Clock In" />
      <ClockInOutBtn label="Clock Out" />
    </div>
  );
}
