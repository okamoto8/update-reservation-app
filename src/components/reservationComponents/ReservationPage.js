import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Form from "./Form";
import axios from "axios";

function ReservationPage() {
  const { resourceId } = useParams();
  const [events, setEvents] = useState([]);
  const [resourceName, setResourceName] = useState();

  useEffect(() => {
    if (resourceId) {
      fetchReservations();
      fetchResourceName();
    }
  }, [resourceId]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/reservations/${resourceId}`
      );
      const formattedEvents = response.data.map((reservation) => ({
        id: reservation.userId,
        title: reservation.userName,
        start: reservation.startTime,
        end: reservation.endTime,
        resourceId: reservation.resourceId,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchResourceName = async () => {
    try {
      const resourceIdInt = parseInt(resourceId, 10);
      console.log("id", resourceId);
      console.log(typeof resourceIdInt);
      const response = await axios.get(
        `http://127.0.0.1:8000/resources/${resourceIdInt}`
      );
      setResourceName(response.data.resourceName);
    } catch (error) {
      console.error("Error fetching resource name:", error);
    }
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const onEventDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className="app">
      <Calendar
        resourceId={resourceId}
        resourceName={resourceName}
        events={events}
        onEventDelete={onEventDelete}
      />
      <Form resourceId={resourceId} addEvent={addEvent} />
    </div>
  );
}

export default ReservationPage;
