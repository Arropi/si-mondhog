export function getTimeWeeksAgo() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  oneWeekAgo.setHours(0, 0, 0, 0);
  const thisNightDay = new Date();
  return { oneWeekAgo, thisNightDay };
}

export function getDayDate(date) {
  const highBound = new Date(date);
  highBound.setHours(23, 59, 59, 999)
  const lowBound = new Date(highBound - 24 * 60 * 60 * 1000);
  return { lowBound, highBound };
}

export function grouppingType(type) {
  switch (type) {
    case "1h":
      return {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: { $hour: "$timestamp" },
      };
    case "12h":
      return {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: {
          $multiply: [
            {
              $floor: {
                $divide: [
                  {
                    $add: [{ $hour: "$timestamp" }, 7],
                  },
                  12,
                ],
              },
            },
            5,
          ],
        },
      };
    case "1d":
      return {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: { $literal: 17 },
      };
    default:
      return {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: { $hour: "$timestamp" },
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
