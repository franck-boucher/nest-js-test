import { useCallback, useEffect, useState } from "react";
import { Calendar, SlotInfo } from "react-big-calendar";

import { Meeting, MeetingEvent } from "./types";
import { localizer, meetingToMeetingEvent } from "./utils";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

function App() {
  const [meetings, setMeetings] = useState<MeetingEvent[]>([]);

  useEffect(() => {
    console.log("FETCHING MEETINGS");
    fetch("/api/meetings")
      .then((res) => res.json())
      .then((data: Meeting[]) => setMeetings(data.map(meetingToMeetingEvent)));
  }, []);

  console.log("meetings", meetings);

  const newMeeting = () => {
    const title = "Meeting 2";
    const from = "2021-09-01T10:00:00.000Z";
    const to = "2021-09-01T11:00:00.000Z";

    fetch("/api/meetings", {
      method: "POST",
      body: JSON.stringify({ title, from, to }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSelectSlot = useCallback(({ start, end }: SlotInfo) => {
    console.log({ start, end });
  }, []);

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={meetings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
}

export default App;
