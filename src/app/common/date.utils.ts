import { DurationConstants } from './duration.constants';

export class DateUtils {
  static calculateDayDiff(start: Date, end: Date): number {
    const differenceMs = Math.abs(end.getTime() - start.getTime());
    return Math.round(differenceMs / DurationConstants.MILLIS_IN_DAY);
  }
}
