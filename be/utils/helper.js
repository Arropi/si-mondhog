export function getTimeWeeksAgo() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thisNightDay = new Date();
  return { oneWeekAgo, thisNightDay };
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
