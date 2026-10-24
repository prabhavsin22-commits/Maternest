import { Appointment } from '../types';

export function exportAppointmentsToIcs(appointments: Appointment[]) {
  if (appointments.length === 0) return;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MaternaNest//Prenatal Appointment Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  appointments.forEach(apt => {
    const startDate = new Date(apt.dateTime);
    if (isNaN(startDate.getTime())) return;

    // Default duration 45 mins
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

    const formatIcsDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const notesSummary = [
      apt.notes ? `Notes: ${apt.notes}` : '',
      apt.questions && apt.questions.length > 0
        ? `Questions for Doctor:\\n- ${apt.questions.join('\\n- ')}`
        : ''
    ]
      .filter(Boolean)
      .join('\\n\\n');

    lines.push(
      'BEGIN:VEVENT',
      `UID:${apt.id}@maternanest.com`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:${escapeIcs(apt.title)} (${escapeIcs(apt.doctor)})`,
      `DESCRIPTION:${escapeIcs(notesSummary)}`,
      `LOCATION:${escapeIcs(apt.location)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');

  const icsContent = lines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MaternaNest_Prenatal_Appointments_${new Date().toISOString().split('T')[0]}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeIcs(str: string): string {
  if (!str) return '';
  return str.replace(/[,;]/g, '\\$&').replace(/\n/g, '\\n');
}
