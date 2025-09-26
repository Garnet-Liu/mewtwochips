import { EVENT_CONFIG } from "./event-config";
import { EventContainer } from "./event-container";

export function RecurringEvents() {
  return (
    <fieldset className="border-border grid grid-cols-2 gap-2 border p-4 sm:grid-cols-3">
      <legend className="px-2 text-sm">Recurring In-Game Events</legend>

      {(Object.keys(EVENT_CONFIG) as Array<keyof typeof EVENT_CONFIG>).map((key) => {
        return <EventContainer key={key} defaultValue={EVENT_CONFIG[key].event()} eventFun={key} />;
      })}
    </fieldset>
  );
}
