export const datePickerOptions = {
  dateFormat: "Y-m-d H:i", // Format of the selected date
  // Minimum selectable date
  maxDate: new Date().fp_incr(30), // Maximum selectable date (30 days from today)
  disableMobile: true, // Disable mobile-friendly features
  enableTime: true, // Enable time selection
  defaultDate: new Date(),
  time_24hr: true,
};
