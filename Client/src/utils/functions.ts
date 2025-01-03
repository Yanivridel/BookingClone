
// Capitalize each first letter in the str
export const cw = (str: string) => str.replace(/\b\w/g, char => char.toUpperCase());
// Capitalize first letter only
export const cf = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
