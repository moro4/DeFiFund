export const daysLeft = (deadline) => {
   const difference = new Date(deadline).getTime() - Date.now();
   const remainingDays = difference / (1000 * 3600 * 24);

   return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
   const percentage = Math.round(raisedAmount / goal * 100);

   return percentage;
};

export const checkIfImage = (url, callback) => {
   const img = new Image();
   img.src = url;

   if (img.complete) callback(true);

   img.onload = () => callback(true);
   img.onerror = () => callback(false);
};

export function isFormComplete(form) {
   // A little precaution check to ensure form completeness in case
   // there is no client-side validation for some reason

   const isValid = Object.entries(form)
      .filter(item => item[1] === '')
      .length === 0;

   return isValid;
}