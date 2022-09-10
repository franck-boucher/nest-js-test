import { useCallback, useEffect, useState } from "react";
import { Calendar, SlotInfo } from "react-big-calendar";

import { Meeting, MeetingEvent } from "./types";
import { localizer, meetingToMeetingEvent } from "./utils";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { Title } from "@mantine/core";
import EventCreationModal from "./components/EventCreationModal";

function App() {
  const [meetings, setMeetings] = useState<MeetingEvent[]>([]);
  const [meetingToCreate, setMeetingToCreate] = useState<SlotInfo>();

  const fetchMeetings = useCallback(() => {
    fetch("/api/meetings")
      .then((res) => res.json())
      .then((data: Meeting[]) => setMeetings(data.map(meetingToMeetingEvent)));
  }, []);

  useEffect(fetchMeetings, [fetchMeetings]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setMeetingToCreate(slotInfo);
  }, []);

  return (
    <div className="App">
      <Title order={1} pb="xl">
        Book a Zoom call with me 😁
      </Title>

      <Calendar
        localizer={localizer}
        events={meetings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
      />

      <EventCreationModal
        {...{ fetchMeetings, setMeetingToCreate, meetingToCreate }}
      />
    </div>
  );
}

export default App;
