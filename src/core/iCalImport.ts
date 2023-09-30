import { WorldLine, ReferenceFrame, ManifoldEvent, SpaceTime } from '../types';

import { ICAL } from 'ical.js';

export const importICal = (worldLine: WorldLine, iCalString: string): void => {
  const iCalCalendar = ICAL.parse(iCalString);

  const vcalendar = new ICAL.Component(iCalCalendar);
  const vevents = vcalendar.getAllSubcomponents('vevent');

  // find all categories
  const categories = vevents.map(vevent => {
    const categories = vevent.getAllProperties('categories');
    return categories.map(category => category.getFirstValue());
  });

  // convert all events to manifold events
  const manifoldEvents = vevents.map(vevent => {
    const summary = vevent.getFirstPropertyValue('summary');
    const description = vevent.getFirstPropertyValue('description');
    const location = vevent.getFirstPropertyValue('location');
    const start = vevent.getFirstPropertyValue('dtstart');
    const end = vevent.getFirstPropertyValue('dtend');
    const categories = vevent.getAllProperties('categories');
    const category = categories.map(category => category.getFirstValue());

    return {
      id: ICAL.uuid(),
      name: summary,
      description,
      location,
      start,
      end,
      category,
    };
  });



  worldLine.referenceFrames.push(referenceFrame);
  worldLine.iCalCalendar = iCalCalendar;
}