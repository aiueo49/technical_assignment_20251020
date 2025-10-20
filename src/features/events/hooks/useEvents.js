import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { SEED } from "../constants";
import { uid } from "../lib/uid";

export function useEvents() {
  const [events, setEvents] = useLocalStorage("events:v1", []);
  const [firstBoot, setFirstBoot] = useLocalStorage("events:firstboot", true);

  const seedIfNeeded = useCallback(() => {
    if (firstBoot && events.length === 0) {
      setEvents(SEED);
      setFirstBoot(false);
    }
  }, [firstBoot, events.length, setEvents, setFirstBoot]);

  const toggleLike = (id) => setEvents((evs) => evs.map((e) => (e.id === id ? { ...e, liked: !e.liked } : e)));

  const rsvp = (id) => setEvents((evs) => evs.map((e) => (e.id === id && e.attendees < e.capacity ? { ...e, attendees: e.attendees + 1 } : e)));

  const createEvent = (payload) => setEvents((evs) => [
    { id: uid(), title: payload.title, date: new Date(payload.date).toISOString(), location: payload.location, categories: payload.categories, description: payload.description, capacity: payload.capacity, attendees: 0, liked: false },
    ...evs,
  ]);

  const resetAll = () => {
    localStorage.removeItem("events:v1");
    localStorage.removeItem("events:firstboot");
    window.location.reload();
  };

  return { events, seedIfNeeded, toggleLike, rsvp, createEvent, resetAll };
}
