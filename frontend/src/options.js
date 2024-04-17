export const datePickerOptions = {
  dateFormat: "Y-m-d H:i", // Format of the selected date
  // Minimum selectable date
  maxDate: new Date().fp_incr(30), // Maximum selectable date (30 days from today)
  disableMobile: true, // Disable mobile-friendly features
  enableTime: true, // Enable time selection
  defaultDate: new Date(),
  time_24hr: true,
};

export const characterUrlFinder = (characterId, size) => {
  if (size === 128) return `https://images.evetech.net/characters/${characterId}/portrait?tenant=tranquility&size=128`;
  if (size === 256) return `https://images.evetech.net/characters/${characterId}/portrait?tenant=tranquility&size=256`;
  if (size === 512) return `https://images.evetech.net/characters/${characterId}/portrait?tenant=tranquility&size=512`;
  if (size === 64) return `https://images.evetech.net/characters/${characterId}/portrait?tenant=tranquility&size=64`;
};
