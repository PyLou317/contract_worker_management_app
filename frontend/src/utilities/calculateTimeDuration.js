function calculateTimeDuration(startStr, endStr) {
    // 1. Define a dummy date. This is crucial for comparing times without date-related errors.
    const DUMMY_DATE = '1970-01-01';
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    
    // 2. Create Date objects using the ISO 8601 format (YYYY-MM-DDT**HH:MM:SS**).
    // The input strings '22:29:00' work directly with the dummy date.
    const startTime = new Date(`${DUMMY_DATE}T${startStr}`).getTime();
    const endTime = new Date(`${DUMMY_DATE}T${endStr}`).getTime();
    
    // 3. Calculate the difference in milliseconds.
    let diffMs = endTime - startTime;
    
    // 4. Handle cross-day shifts (e.g., 22:00:00 to 06:00:00).
    // If the difference is negative, add 24 hours (in ms).
    if (diffMs < 0) {
        diffMs += MS_PER_DAY;
    }
    
    return diffMs;
}

export default calculateTimeDuration;