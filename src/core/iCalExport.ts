import { WorldLine, ReferenceFrame, ManifoldEvent, SpaceTime } from '../types';

import icalendar, {
  ICalAlarm,
  ICalAlarmType,
  ICalAttendee,
  ICalAttendeeRole,
  ICalAttendeeStatus,
  ICalAttendeeType,
  ICalEventStatus,
  ICalEventBusyStatus,
  ICalCalendar,
  ICalCategory,
  ICalLocation
} from 'ical-generator';


export const exportWorldLineToiCal = (worldLine: WorldLine): string => {
  /*
  This WorldLine represents the users entire calendar. 
  
  We should return a single VCalendar string that contains all of the users events.
  Each WorldLine contains multiple ReferenceFrames, and each ReferenceFrame contains multiple ManifoldEvents.

  Each ReferenceFrame maps to a category in the VCalendar.
  Each ManifoldEvent maps to a event in the VCalendar (with the appropriate category).
  */

  // Configure the calendar
  const config = {
    domain: 'manifold',
    name: 'Manifold',
    timezone: 'America/New_York',
    prodId: {
      company: 'Manifold',
      product: 'Manifold',
      language: 'EN'
    }
  }

  // Initialize the calendar
  const cal = icalendar(config);

  // Add each event to the calendar
  for (const wlEvent of worldLine.events) {
    convertManifoldEventToiCalEvent(cal, wlEvent);
  }

  return cal.toString();
};

export const exportReferenceFrameToiCal = (referenceFrame: ReferenceFrame): string => {
  // Your logic here
  return '';
};

const convertManifoldEventToiCalEvent = (
  cal: ICalCalendar,
  event: ManifoldEvent): void => {
  cal.createEvent({
    id: event.id,
    start: event.start.t.toString(),
    end: event.end.t.toString(),
    summary: event.name,
    description: event.description,
    categories: collectReferenceFrameNames(event.referenceFrames),
    location: generateLocation(event.start)
    //url: event.url,
    //status: convertManifoldEventStatusToiCalEventStatus(event.status),
    //busyStatus: convertManifoldEventBusyStatusToiCalEventBusyStatus(event./busyStatus),
    //alarms: event.alarms.map(convertManifoldAlarmToiCalAlarm),
    //attendees: event.attendees.map(convertManifoldAttendeeToiCalAttendee)
  });
}

const collectReferenceFrameNames = (referenceFrames: ReferenceFrame[]): ICalCategory[] => {
  const categories: ICalCategory[] = [];
  for (const referenceFrame of referenceFrames) {
    categories.push(new ICalCategory({ name: referenceFrame.name }));
  }

  return categories;
}

const generateLocation = (spaceTime: SpaceTime): ICalLocation => {
  return {
    title: spaceTime.name,
    geo: {
      lat: spaceTime.x,
      lon: spaceTime.y
    }
  }
}