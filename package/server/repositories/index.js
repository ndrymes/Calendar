const db = require('db');

const findEventsForUsers = async (userId) => {

  const eventsForUser = await db.calendar.findEventsForUser(userId)
  return eventsForUser

}

module.exports = findEventsForUsers