const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = (timestamp) => ((Date.now() - timestamp) / 1000)

const getUnitDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

const getTimeAgo = (timestamp, locale = 'es') => {
  const rtf = new Intl.RelativeTimeFormat(locale)
  const secondsElapsed = getSecondsDiff(timestamp)

  const { value, unit } = getUnitDate(secondsElapsed)
  return rtf.format(value, unit)
}

export function useTimeAgo({ timestamp }) {
  if (!timestamp) return { timeago: null, dateTime: null }

  const locale = 'es'
  const timeago = getTimeAgo(timestamp, locale)

  // Esto es por temas de accesibilidad en el tag <time> se le pasa el atributo datetime
  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'long', day: 'numeric'
  }).format(date)

  return {
    timeago,
    dateTime: formattedDate
  }
}
