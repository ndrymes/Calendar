const { getBlockedTimeSlots, getFreeTimeSlots } = require('../services')

const timeController = async (req, res) => {

  const { hostUserId } = req.query;
  if (!hostUserId) return res.status(400).json({ status: 400, message: 'Please provide the host userId'})

  const blockedTimeSlots = await getBlockedTimeSlots(hostUserId)
  const freeTimeSlots = getFreeTimeSlots(blockedTimeSlots)

  res.json({
    name: 'Eng Test User',
    timeslotLengthMin: 60,
    timeslots: freeTimeSlots
  })

}

module.exports = timeController