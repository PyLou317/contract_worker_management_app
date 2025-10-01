function getDaysArray(dates) {
    const datesArray = [];

    let currentDate = new Date(dates.start_date + 'T00:00:00Z');
    const endDate = new Date(dates.end_date + 'T00:00:00Z');

    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().slice(0, 10);
        datesArray.push(dateString);

        currentDate.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000));
    }

    return datesArray;
}

export default getDaysArray;