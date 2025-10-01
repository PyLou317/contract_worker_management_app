function millisecondsToTotalHours(milliseconds) {
    const MS_PER_HOUR = 3600000; 
    return (milliseconds / MS_PER_HOUR).toFixed(2);
}

export default millisecondsToTotalHours;