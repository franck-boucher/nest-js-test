import { useCallback, useEffect, useState } from "react";
import { Calendar, SlotInfo } from "react-big-calendar";

import { Meeting, MeetingEvent } from "./types";
import { localizer, meetingToMeetingEvent } from "./utils";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import {
  Dialog,
  Title,
  Text,
  Group,
  TextInput,
  Button,
  Modal,
  Stack,
} from "@mantine/core";
import { format } from "date-fns/esm";

function App() {
  const [meetings, setMeetings] = useState<MeetingEvent[]>([]);
  const [meetingToCreate, setMeetingToCreate] = useState<SlotInfo>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMeetings = useCallback(() => {
    fetch("/api/meetings")
      .then((res) => res.json())
      .then((data: Meeting[]) => setMeetings(data.map(meetingToMeetingEvent)));
  }, []);

  useEffect(fetchMeetings, [fetchMeetings]);

  const newMeeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (meetingToCreate && title) {
      setIsSubmitting(true);

      fetch("/api/meetings", {
        method: "POST",
        body: JSON.stringify({
          title,
          from: meetingToCreate.start,
          to: meetingToCreate.end,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          fetchMeetings();
          setMeetingToCreate(undefined);
          setIsSubmitting(false);
        })
        .catch((error) => console.error(error));
    }
  };

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

      <Modal
        opened={!!meetingToCreate}
        withCloseButton={false}
        onClose={() => setMeetingToCreate(undefined)}
        size="lg"
        radius="md"
      >
        <Group align="flex-end">
          <Title order={2}>Please state the purpose of your meeting</Title>
          {meetingToCreate && (
            <div>
              <Text>
                <span style={{ fontWeight: "bold" }}>From:</span>{" "}
                {format(meetingToCreate.start, "PPPPp")}
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>To:</span>{" "}
                {format(meetingToCreate.end, "PPPPp")}
              </Text>
            </div>
          )}
          <form onSubmit={newMeeting} style={{ width: "100%" }}>
            <Stack>
              <TextInput
                name="title"
                placeholder="I just want to say hi"
                style={{ flex: 1 }}
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create"}
              </Button>
            </Stack>
          </form>
        </Group>
      </Modal>
    </div>
  );
}

export default App;
