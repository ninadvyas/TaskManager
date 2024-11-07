const months = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "October", "Nov", "Dec"
  ];

  export function getDate(date: Date) {
    const d = new Date(date)
    return `${d.getDate()} ${months[d.getMonth()]}`
  }