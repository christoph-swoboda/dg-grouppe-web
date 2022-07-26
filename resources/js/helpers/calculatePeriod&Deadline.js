export const getPeriod = (value, year) => {
    if (value <= 4) {
        return (`1 of ${year}`)
    } else if (value > 4 && value < 9) {
        return (`2 of ${year}`)
    } else {
        return (`3 of ${year}`)
    }
}

export const getDeadline = (value, year) => {
    if (value <= 4) {
        return (`30/4/${year}`)
    } else if (value > 4 && value < 9) {

        return (`31/8/${year}`)
    } else {
        return (`31/12/${year}`)
    }
}
