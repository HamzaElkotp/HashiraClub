import { googleCalendar } from "@/types/contest";

export function generateGoogleCalendarLink(contest: googleCalendar) {
  const start = new Date(contest.startDateTime);
  type PeriodUnit = 'halfHours' | 'days' | 'weeks';
    const units: Record<PeriodUnit, number> = {
      halfHours: 0.5,
      days: 24,
      weeks: 168,
    };
    const durationInHours = units[contest?.period?.unit as PeriodUnit] * contest?.period?.value;
  const end = new Date(start.getTime() + durationInHours * 3600 * 1000);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', contest.name);
  url.searchParams.set('dates', `${formatDate(start)}/${formatDate(end)}`);
  url.searchParams.set('details', contest.description);
  Optional: url.searchParams.set('location', contest.isOnline? 'Online' : 'Offline');

  return url.toString();
}
