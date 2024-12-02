import EventItem from "../components/EventItem.jsx";
import {Await, redirect, useRouteLoaderData} from "react-router-dom";
import EventsList from "../components/EventsList.jsx";
import {Suspense} from "react";

export default function EventDetailPage() {

    const {event, events} = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                {loadedEvent => (
                        <EventItem event={loadedEvent}/>
                    )}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => (
                        <EventsList events={loadedEvents}/>
                    )}
                </Await>
            </Suspense>

            {/*<EventItem event={data.event}/>
            <EventsList events={} />*/}
        </>
    );
}

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not fetch details for selected event.'}), {
            status: 500
        });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //return { isError: true, message: 'Could not fetch events.' }
        //throw { message: 'Could not fetch events.' };
        throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
            status: 500
        });
    } else {
        const resData = await response.json();
        //const res = new Response();
        return resData.events;
        //return response;
    }
}


export async function loader({request, params}) {
    const id = params.eventId;
    return {
        event: await loadEvent(id),
        events: loadEvents()
    }
}

export async function action({params, request}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method
    });
    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not delete event.'}), {
            status: 500
        });
    }
    return redirect('/events');
}
