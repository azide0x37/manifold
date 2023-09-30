import { Temporal } from '@js-temporal/polyfill';
import { importICal } from '../src/core/iCalImport';
import { WorldLine, ReferenceFrame, ManifoldEvent, SpaceTime } from '../src/types';
import { ICAL } from 'ical.js';
import { ICalCalendar } from 'ical-generator';

describe('iCal Import Tests', () => {
  let worldLine: WorldLine;

  beforeEach(() => {
    worldLine = {
      userId: 'user123',
      referenceFrames: [],
      events: [],
      currentSpaceTime: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T00:00:00Z'),
      },
      // Additional fields as required
    };

    // create a generator for mock iCal data
    const calendar = new ICalCalendar();
    const event = calendar.createEvent({
      id: '123',
      start: '2021-01-01T00:00:00Z',
      end: '2021-01-01T01:00:00Z',
      summary: 'Test Event',
      location: 'Test Location',
      categories: [
        { name: 'Test Reference Frame 1' },
        { name: 'Test Reference Frame 2' },
        { name: 'Test Reference Frame 3' },
      ],
    });
    const iCalString = calendar.toString();
  });

  test('should handle an empty iCal string', () => {
    const preImport = worldLine;
    importICal(worldLine, '');
    expect(worldLine).toEqual(preImport);
  });

  test('should transform iCal to ManifoldEvents and ReferenceFrames', () => {
    const iCalString = `
    BEGIN: VCALENDAR
    VERSION: 2.0
    PRODID: -//Manifold//iCal Import//EN
    BEGIN: VEVENT
    UID: 123
    SUMMARY: Test Event
    DTSTART: 2021-01-01T00:00:00Z
    DTEND: 2021-01-01T01:00:00Z
    CATEGORIES: Test Reference Frame 1, Test Reference Frame 2, Test Reference Frame 3
    END: VEVENT
    END: VCALENDAR  
    `;
    importICal(worldLine, iCalString);

    // Assertions to check if ManifoldEvents are formed as expected.
    expect(worldLine.events).toHaveLength(1);
    expect(worldLine.events[0])
    expect(worldLine.events[0]?.name).toBe('Test Event');

    // Assertions to check if ReferenceFrames are formed as expected.
    expect(worldLine.referenceFrames).toHaveLength(3);
    expect(worldLine.referenceFrames[0]?.name).toBe('Test Reference Frame 1');
    expect(worldLine.referenceFrames[1]?.name).toBe('Test Reference Frame 2');
    expect(worldLine.referenceFrames[2]?.name).toBe('Test Reference Frame 3');
  });

  test('should modify the worldLine object as expected', () => {
    const iCalString = `
    BEGIN: VCALENDAR
    VERSION: 2.0
    PRODID: -//Manifold//iCal Import//EN
    BEGIN: VEVENT
    UID: 123
    SUMMARY: Test Event
    DTSTART: 2021-01-01T00:00:00Z
    DTEND: 2021-01-01T01:00:00Z
    CATEGORIES: Test Reference Frame 1, Test Reference Frame 2, Test Reference Frame 3
    END: VEVENT
    END: VCALENDAR
    `;

    importICal(worldLine, iCalString);

    // Assertions to verify worldLine modification.
    expect(worldLine.iCalCalendar).toEqual(
      expect.objectContaining({
        name: 'VCALENDAR',
        type: 'VCALENDAR',
        jCal: expect.any(Array),
        components: expect.any(Array),
      })
    );
    expect(worldLine.events).toHaveLength(1);
    expect(worldLine.currentSpaceTime).toEqual({
      name: 'Test Location',
      x: 0,
      y: 0,
      z: -1,
      t: Temporal.Instant.from('2021-01-01T00:00:00Z'),
    });
  });
});
