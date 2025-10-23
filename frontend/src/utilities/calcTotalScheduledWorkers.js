function calcTotalScheduledWorkersPerShift(schedule) {
  if (!schedule || !schedule.shifts) {
    return 0;
  }

  const shiftsArray = schedule.shifts;
  console.log('Schedule:', schedule);
  console.log('shifts:', shiftsArray);

  let totalWorkers = 0;
  shiftsArray.forEach((shift) => {
    totalWorkers += shift.workers.length;
  });
  return totalWorkers;
}

export default calcTotalScheduledWorkersPerShift;
