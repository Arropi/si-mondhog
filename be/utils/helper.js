export function getTimeWeeksAgo() {
  const now = new Date()
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6)
  oneWeekAgo.setHours(0, 0, 0, 0);
  const thisNightDay = new Date(now)
  thisNightDay.setHours(23, 59, 59, 999)
  return { oneWeekAgo, thisNightDay };
}

export function getDayDate(date) {
  const highBound = new Date(date);
  highBound.setHours(23, 59, 59, 999)
  const lowBound = new Date(date)
  lowBound.setHours(0, 0, 0, 0)
  return { lowBound, highBound };
}

export function grouppingType(type) {
  const tz = "Asia/Jakarta";

  switch (type) {
    case "1h":
      return {
        year: { $year: { date: "$timestamp", timezone: tz } },
        month: { $month: { date: "$timestamp", timezone: tz } },
        day: { $dayOfMonth: { date: "$timestamp", timezone: tz } },
        hour: { $hour: { date: "$timestamp", timezone: tz } },
      };

    case "12h":
      return {
        year: { $year: { date: "$timestamp", timezone: tz } },
        month: { $month: { date: "$timestamp", timezone: tz } },
        day: { $dayOfMonth: { date: "$timestamp", timezone: tz } },
        hour: {
          $multiply: [
            {
              $floor: {
                $divide: [
                  { $hour: { date: "$timestamp", timezone: tz } },
                  12,
                ],
              },
            },
            12,
          ],
        },
      };

    case "1d":
      return {
        year: { $year: { date: "$timestamp", timezone: tz } },
        month: { $month: { date: "$timestamp", timezone: tz } },
        day: { $dayOfMonth: { date: "$timestamp", timezone: tz } },
        hour: { $literal: 0 },
      };

    default:
      return {
        year: { $year: { date: "$timestamp", timezone: tz } },
        month: { $month: { date: "$timestamp", timezone: tz } },
        day: { $dayOfMonth: { date: "$timestamp", timezone: tz } },
        hour: { $hour: { date: "$timestamp", timezone: tz } },
      };
  }
}

export function helperFormattedTimestamp() {
  return {
    formattedTimestamp: {
      $dateToString: {
        format: "%d/%m/%Y, %H:%M:%S",
        date: "$timestamp",
        timezone: "Asia/Jakarta",
      },
    },
  };
}

export function helperStatusMachine() {
  return {
    status: {
      $switch: {
        branches: [
          {
            case: { $ifNull: ["$activationToken", false] },
            then: "Pending",
          },
          {
            case: {
              $and: [
                { $ne: ["$lastSeen", null] },
                {
                  $lt: [
                    { $subtract: [new Date(), "$lastSeen"] },
                    5 * 60 * 1000,
                  ],
                },
              ],
            },
            then: "Online",
          },
        ],
        default: "Offline",
      },
    },
  };
}
