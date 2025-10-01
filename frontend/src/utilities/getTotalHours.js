import calculateTimeDuration from '@/utilities/calculateTimeDuration';
import millisecondsToTotalHours from '@/utilities/millToHour';

const getTotalHours = (schedule) => {
    const shifts = schedule.shift || schedule.shifts;
    if (!Array.isArray(shifts) || shifts.length === 0) {
      return 0;
    }
    let totalMilliseconds = 0;
    shifts.forEach((shift) => {
      const startTime = shift.start_time;
      const endTime = shift.end_time;
      if (startTime && endTime) {
        const durationMs = calculateTimeDuration(startTime, endTime);
        totalMilliseconds += durationMs;
      }
    });
    return millisecondsToTotalHours(totalMilliseconds);
};
  
export default getTotalHours;