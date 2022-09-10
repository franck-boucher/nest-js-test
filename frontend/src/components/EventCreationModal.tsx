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
import { format } from "date-fns";
import { useState } from "react";
import { SlotInfo } from "react-big-calendar";

interface EventCreationModalProps {
  meetingToCreate?: SlotInfo;
  setMeetingToCreate: (meetingToCreate?: SlotInfo) => void;
  fetchMeetings: () => void;
}
export default function EventCreationModal({
  meetingToCreate,
  fetchMeetings,
  setMeetingToCreate,
}: EventCreationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
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
  );
}
