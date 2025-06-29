import { addHours } from 'date-fns';
import type { Period, TimePickerType } from '@/types/time';

// Validate input range
export const isValidHours = (value: number) => value >= 0 && value <= 24;

// Calculate expiry date from duration
export const calculateExpiryDate = (hours: number) => {
  if (!isValidHours(hours)) {
    return new Date();
  }

  return addHours(new Date(), hours);
};

// Regex validators
export const isValidHour = (value: string) => /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
export const isValid12Hour = (value: string) => /^(0[1-9]|1[0-2])$/.test(value);
export const isValidMinuteOrSecond = (value: string) => /^[0-5][0-9]$/.test(value);

// General number validator with optional looping
export const getValidNumber = (
  value: string,
  { max, min = 0, loop = false }: { max: number; min?: number; loop?: boolean }
) => {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, '0');
  }

  return '00';
};

// Specific value validators
export const getValidHour = (value: string) =>
  isValidHour(value) ? value : getValidNumber(value, { max: 23 });
export const getValid12Hour = (value: string) =>
  isValid12Hour(value) ? value : getValidNumber(value, { min: 1, max: 12 });
export const getValidMinuteOrSecond = (value: string) =>
  isValidMinuteOrSecond(value) ? value : getValidNumber(value, { max: 59 });

// Arrow step increment handlers
export const getValidArrowNumber = (
  value: string,
  { min, max, step }: { min: number; max: number; step: number }
) => {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return '00';
};

export const getValidArrowHour = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 0, max: 23, step });
export const getValidArrow12Hour = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 1, max: 12, step });
export const getValidArrowMinuteOrSecond = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 0, max: 59, step });

// Date mutators
export const setMinutes = (date: Date, value: string) => {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

export const setSeconds = (date: Date, value: string) => {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
};

export const setHours = (date: Date, value: string) => {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
};

export const set12Hours = (date: Date, value: string, period: Period) => {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
};

export const setDateByType = (date: Date, value: string, type: TimePickerType, period?: Period) => {
  switch (type) {
    case 'minutes':
      return setMinutes(date, value);
    case 'seconds':
      return setSeconds(date, value);
    case 'hours':
      return setHours(date, value);
    case '12hours':
      return period ? set12Hours(date, value, period) : date;
    default:
      return date;
  }
};

export const getDateByType = (date: Date, type: TimePickerType) => {
  switch (type) {
    case 'minutes':
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case 'seconds':
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case 'hours':
      return getValidHour(String(date.getHours()));
    case '12hours': {
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    }
    default:
      return '00';
  }
};

export const getArrowByType = (value: string, step: number, type: TimePickerType) => {
  switch (type) {
    case 'minutes':
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step);
    case 'hours':
      return getValidArrowHour(value, step);
    case '12hours':
      return getValidArrow12Hour(value, step);
    default:
      return '00';
  }
};

// 12-hour to 24-hour conversion
export const convert12HourTo24Hour = (hour: number, period: Period) => {
  if (period === 'PM') return hour <= 11 ? hour + 12 : hour;
  if (period === 'AM') return hour === 12 ? 0 : hour;
  return hour;
};

// Display formatting
export const display12HourValue = (hours: number) => {
  if (hours === 0 || hours === 12) return '12';
  const mod = hours % 12;
  return mod < 10 ? `0${mod}` : `${mod}`;
};
