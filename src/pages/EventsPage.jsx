import EventsList from "../components/EventsList.jsx";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";


function EventsPage() {
    const {events} = useLoaderData();
    /*if(data.isError) {
        return <p>{data.message}</p>
    }*/
    /*const events = data.events;

    return (
        <>
            <EventsList events={events}/>
        </>
    );*/
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => (
                    <EventsList events={loadedEvents}/>
                )}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

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

export async function loader() {
    return {
        events: loadEvents(),
    };
}
