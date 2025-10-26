function calcTotalScheduledWorkersPerShift(schedule) {
  if (!schedule || !schedule.shifts) {
    return 0;
  }

  const shiftsArray = schedule.shifts;

  let totalWorkers = 0;
  shiftsArray.forEach((shift) => {
    totalWorkers += shift.workers.length;
  });
  return totalWorkers;
}

export default calcTotalScheduledWorkersPerShift;
