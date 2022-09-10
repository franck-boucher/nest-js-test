import { Event } from "react-big-calendar";

export interface Meeting {
  id: number;
  title: string;
  from: string;
  to: string;
  zoomLink: string;
}

export interface MeetingInput extends Omit<Meeting, "id" | "zoomLink"> {}

export interface MeetingEvent extends Event, Pick<Meeting, "id" | "zoomLink"> {}
