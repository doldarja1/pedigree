export const parseDateString = (dateString) => {
    if (!dateString) {
      return null
    }
    const [day, month, year] = dateString.split(".").map(Number)
    return new Date(year, month - 1, day)
  }
  