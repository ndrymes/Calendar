const moment = require('moment');
const findEventsForUsers = require('../repositories/index')

async function getBlockedTimeSlots (userId) {

  const eventsForUsers = await findEventsForUsers(userId)

  const blockedTimeSlots = eventsForUsers.reduce((acc, { start: startTime, end: endTime }) => {

    let startHour = moment(startTime).startOf('hour')

    while (startHour.isBefore(moment(endTime), 'minute')) {

      const nineAmOnDay = startHour.clone().hours(9)
      const fourPmOnDay = startHour.clone().hours(16)

      if (startHour.isBetween(nineAmOnDay, fourPmOnDay, 'minutes', '()')) acc[startHour.toISOString()] = true

      startHour = startHour.add(1, 'hour')
    }

    return acc

  }, {})

  return blockedTimeSlots

}

function getFreeTimeSlots(blockedTimeSlots) {

  const freeTimeslots = []

  const startHours = [...Array(7)].map((_, day) =>moment().utc().add(day + 1, 'days').hours(9).startOf('hours').toISOString())

  startHours.forEach(startHour => {

    let hour = moment(startHour) // 9pm on said day
    let endHour = moment(hour).add(7, 'hours') // 4pm on same day
    
    while (hour.isSameOrBefore(endHour)) {

      if (!blockedTimeSlots[hour.toISOString()]) freeTimeslots.push(hour.toISOString())

      hour = hour.add(1, 'hour') // increment by one hour and break at 5pm
    }
  })

  return freeTimeslots

}

module.exports = {
  getBlockedTimeSlots,
  getFreeTimeSlots
}