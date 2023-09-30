import { Temporal } from '@js-temporal/polyfill';
import { WorldLine, ReferenceFrame, ManifoldEvent, SpaceTime } from '../types';
import ICAL from 'ical.js';

interface ICalEventProperties {
  getFirstPropertyValue(key: string): string | null;
  getAllProperties(key: string): ICalEventCategory[];
}

interface ICalEventCategory {
  getFirstValue(): string;
}

interface ManifoldEventFromICal {
  id: string;
  name: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  category: string[];
}

export const importICal = (worldLine: WorldLine, iCalString: string): void => {
  if (!iCalString || iCalString.includes('BEGIN:VCALENDAR') === false) {
    iCalString = `BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//Manifold//iCal Import//EN
      ${iCalString}
      END:VCALENDAR`;
  }

  try {
    var iCalCalendar = null

    try {
      iCalCalendar = new ICAL.Component(ICAL.parse(iCalString));
    } catch (e: any) {
      //        message: 'invalid ical body. component began but did not end',
      if (e.message === 'invalid ical body. component began but did not end') {
        iCalString += 'END:VCALENDAR';
        iCalCalendar = new ICAL.Component(ICAL.parse(iCalString));

      }
    }



    const vcalendar = new ICAL.Component(iCalCalendar);
    const vevents = vcalendar.getAllSubcomponents('vevent') as unknown as ICalEventProperties[];

    const categories: string[] = vevents.map((vevent: ICalEventProperties) => {
      const categories = vevent.getAllProperties('categories') as unknown as ICalEventCategory[];
      return categories.map(category => category.getFirstValue());
    }
    ).flat();

    const manifoldEvents: ManifoldEventFromICal[] = vevents.map((vevent: ICalEventProperties) => ({
      id: ICAL.uuid(),
      name: vevent.getFirstPropertyValue('summary') || '',
      description: vevent.getFirstPropertyValue('description'),
      location: vevent.getFirstPropertyValue('location'),
      start: vevent.getFirstPropertyValue('dtstart') || '',
      end: vevent.getFirstPropertyValue('dtend') || '',
      category: vevent.getAllProperties('categories').map(category => category.getFirstValue()),
    }) as ManifoldEventFromICal);

    const referenceFrames: ReferenceFrame[] = categories.map((category: string) => {
      return {
        id: ICAL.uuid(),
        ownerId: '',
        name: category,
        description: '',
        color: '#000000',
        events: [],
      };
    }
    );


    worldLine.referenceFrames.push(...referenceFrames);

    manifoldEvents.forEach(manifoldEvent => {
      const start = ICAL.Time.fromDateTimeString(manifoldEvent.start);
      const end = ICAL.Time.fromDateTimeString(manifoldEvent.end);

      const spaceTime: SpaceTime = {
        name: manifoldEvent.location || '',
        x: 0,
        y: 0,
        z: 0,
        t: ICAL.Time.fromDateTimeString(manifoldEvent.start).toInstant(),
      };

      const manifoldEventToAdd: ManifoldEvent = {
        id: manifoldEvent.id,
        name: manifoldEvent.name,
        description: manifoldEvent.description,
        start: spaceTime,
        end: {
          ...spaceTime,
          t: ICAL.Time.fromDateTimeString(manifoldEvent.end).toInstant(),
        },
        referenceFrames: referenceFrames.filter(rf => manifoldEvent.category.includes(rf.name)),
      };

      worldLine.events.push(manifoldEventToAdd);
    });

    if (worldLine.events.length > 0 && worldLine.events[0]?.start) {
      worldLine.currentSpaceTime = worldLine.events[0]?.start;
    } else {
      worldLine.currentSpaceTime = {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T00:00:00Z'),
      };
    }

    worldLine.iCalCalendar = iCalCalendar;
  } catch (e) {
    //console.error(e);
    return;
  }
  return;
};