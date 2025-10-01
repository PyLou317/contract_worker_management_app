const getTotalWorkers = (schedule) => {
    // Access the shifts property
    const shifts = schedule.shifts; 
    
    if (!Array.isArray(shifts) || shifts.length === 0) {
        return 0;
    }

    let totalWorkers = 0;

    shifts.forEach((shift) => {
        // ASSUMPTION: The property for workers needed is 'workers_needed'
        const workersNeeded = shift.workers_needed; 

        // Ensure the value is a number before adding it
        if (typeof workersNeeded === 'number' && !isNaN(workersNeeded)) {
            totalWorkers += workersNeeded;
        }
    });

    return totalWorkers;
};

export default getTotalWorkers;