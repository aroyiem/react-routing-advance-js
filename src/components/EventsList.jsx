import classes from './EventsList.module.css';
import {Link} from "react-router-dom";

export default function EventsList({events}) {
    return (
        <div className={classes.events}>
            <h1>All Events</h1>
            <ul className={classes.list}>
                {events.map((event) => (
                    <li key={event.id} className={classes.item}>
                        <Link to={`/events/${event.id}`}>{event.title}
                            <img src={event.image} alt={event.title}/>
                            <div className={classes.content}>
                                <h2>{event.title}</h2>
                                <time>{event.date}</time>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
