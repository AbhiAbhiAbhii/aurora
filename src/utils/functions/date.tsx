export const getCurrentDate = () => {
     
    const date = new Date()
    const day = date.getDate()
    const monthName = date.toLocaleString('default', { month: 'long' })
    const monthNumber = date.getMonth() + 1
    const year = date.getFullYear()

    let hours= date.getHours()
    const minutes = date.getMinutes()
    let amPm

    if(hours === 0) {
    hours = 12
    amPm = "AM"
    } else if(hours === 12) {
    amPm = "PM"
    } else {
    amPm = hours >=12 ? 'PM':'AM'
    hours = hours % 12
    }

    // Ensure hours are not 0 for midnight or 12 for noon
    const formattedHours = hours === 0 ? 12 : hours

    const dateString = `${day}/${monthNumber}/${year}`
    const timeString = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`

    return { dateString, timeString }
}

