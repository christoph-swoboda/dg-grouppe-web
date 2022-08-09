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
        return (`4/30/${year}`)
    } else if (value > 4 && value < 9) {

        return (`8/31/${year}`)
    } else {
        return (`12/31/${year}`)
    }
}
