import { parseISO } from "date-fns";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { dateFnsLocalizer } from "react-big-calendar";
import { Meeting, MeetingEvent } from "./types";

export const locales = {
  "en-US": enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const meetingToMeetingEvent = (meeting: Meeting): MeetingEvent => ({
  id: meeting.id,
  title: meeting.title,
  start: parseISO(meeting.from),
  end: parseISO(meeting.to),
  zoomLink: meeting.zoomLink,
});
