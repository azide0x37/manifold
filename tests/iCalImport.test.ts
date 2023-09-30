// tests/iCalExport.test.ts
import { exportWorldLineToiCal } from '../src/core/iCalExport';
import { WorldLine, ManifoldEvent, ReferenceFrame, SpaceTime } from '../src/types';
import { Temporal } from '@js-temporal/polyfill';

// Create test ReferenceFrames
let referenceFrame1: ReferenceFrame = {
  id: 'Home',
  ownerId: 'test-user',
  name: 'Test Reference Frame 1',
  description: 'A test reference frame',
  events: [],
};

let referenceFrame2: ReferenceFrame = {
  id: 'Work',
  ownerId: 'test-user',
  name: 'Test Reference Frame 2',
  description: 'A test reference frame',
  events: [],
};

// Create test SpaceTimes
let spaceTime1: SpaceTime = {
  name: 'Test Location',
  x: 0,
  y: 0,
  z: -1,
  t: Temporal.Instant.from('2021-01-01T00:00:00Z')
};

let spaceTime2: SpaceTime = {
  name: 'NYC',
  x: 0,
  y: 0,
  z: -1,
  t: Temporal.Instant.from('2021-01-01T01:00:00Z')
};

// Create a WorldLine with a single event
let worldLine: WorldLine = {
  userId: 'test-user',
  referenceFrames: [],
  events: [
    {
      id: 'test-event',
      name: 'Test Event',
      start: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T00:00:00Z')
      },
      end: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T01:00:00Z')
      },
      description: 'A test event',
      referenceFrames: []
    }
  ],
  currentSpaceTime: {
    name: 'Test Location',
    x: 0,
    y: 0,
    z: -1,
    t: Temporal.Instant.from('2021-01-01T00:00:00Z')
  }
};

// Create a WorldLine with multiple events
let worldLineWithMultipleEvents: WorldLine = {
  userId: 'test-user',
  referenceFrames: [],
  events: [
    {
      id: 'test-event-1',
      name: 'Test Event 1',
      start: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T00:00:00Z')
      },
      end: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T01:00:00Z')
      },
      description: 'A test event',
      referenceFrames: []
    },
    {
      id: 'test-event-2',
      name: 'Test Event 2',
      start: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T02:00:00Z')
      },
      end: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T03:00:00Z')
      },
      description: 'A test event',
      referenceFrames: []
    }
  ],
  currentSpaceTime: {
    name: 'Test Location',
    x: 0,
    y: 0,
    z: -1,
    t: Temporal.Instant.from('2021-01-01T00:00:00Z')
  }
};

// Create a WorldLine with multiple events and multiple reference frames
let worldLineWithMultipleEventsAndReferenceFrames: WorldLine = {
  userId: 'test-user',
  referenceFrames: [
    referenceFrame1,
    referenceFrame2
  ],
  events: [
    {
      id: 'test-event-1',
      name: 'Test Event 1',
      start: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T00:00:00Z')
      },
      end: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T01:00:00Z')
      },
      description: 'A test event',
      referenceFrames: []
    },
    {
      id: 'test-event-2',
      name: 'Test Event 2',
      start: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T02:00:00Z')
      },
      end: {
        name: 'Test Location',
        x: 0,
        y: 0,
        z: -1,
        t: Temporal.Instant.from('2021-01-01T03:00:00Z')
      },
      description: 'A test event',
      referenceFrames: []
    }
  ],
  currentSpaceTime: {
    name: 'Test Location',
    x: 0,
    y: 0,
    z: -1,
    t: Temporal.Instant.from('2021-01-01T00:00:00Z')
  }
};

describe('iCal Export', () => {
  it('should generate a valid iCal string for a given WorldLine', () => {

    const iCalString = exportWorldLineToiCal(worldLine);

    expect(iCalString).toContain('BEGIN:VCALENDAR');
    expect(iCalString).toContain('END:VCALENDAR');
    expect(iCalString).toContain('BEGIN:VEVENT');
    expect(iCalString).toContain('END:VEVENT');
    expect(iCalString).toContain('SUMMARY:Test Event');
    // ... further assertions to verify categories, location, etc.
  });

  it('should generate the correct number of iCal events for a given WorldLine', () => {

    const iCalString = exportWorldLineToiCal(worldLineWithMultipleEvents);

    const eventCount = (iCalString.match(/BEGIN:VEVENT/g) || []).length;

    expect(eventCount).toEqual(2);
  });

  it('should generate the correct number of iCal events for a given WorldLine with multiple reference frames', () => {

    const iCalString = exportWorldLineToiCal(worldLineWithMultipleEventsAndReferenceFrames);

    const eventCount = (iCalString.match(/BEGIN:VEVENT/g) || []).length;

    expect(eventCount).toEqual(2);
  });

  it('should generate the correct number of iCal categories for a given WorldLine with multiple reference frames', () => {

    const worldLineCopy = JSON.parse(JSON.stringify(worldLineWithMultipleEventsAndReferenceFrames));

    worldLineCopy.events[0].referenceFrames.push(referenceFrame1);
    worldLineCopy.events[0].referenceFrames.push(referenceFrame2);

    const iCalString = exportWorldLineToiCal(worldLineCopy);

    // e.g. CATEGORIES:Test Reference Frame 1,Test Reference Frame 2
    // Match CATEGORIES: and then count the number of commas
    const categoryCount = (iCalString.match(/CATEGORIES:/g) || [])
      .map((match) => match.match(/,/g))

    expect(categoryCount.length).toEqual(1); // 1 comma = 2 categories
  });

  it('should generate the correct number of iCal categories for an event with 100 categories', () => {

    const worldLineCopy = JSON.parse(JSON.stringify(worldLineWithMultipleEventsAndReferenceFrames));

    worldLineCopy.events[0].referenceFrames.push(referenceFrame1);
    worldLineCopy.events[0].referenceFrames.push(referenceFrame2);

    // Add 98 more reference frames to the event
    for (let i = 0; i < 98; i++) {
      worldLineCopy.events[0].referenceFrames.push({
        id: `test-reference-frame-${i}`,
        ownerId: 'test-user',
        name: `Test Reference Frame ${i}`,
        description: 'A test reference frame',
        events: []
      });
    }

    const iCalString = exportWorldLineToiCal(worldLineCopy);

    // e.g. CATEGORIES:Test Reference Frame 1,Test Reference Frame 2
    // Match CATEGORIES: and then count the number of commas
    let categoryCount = (iCalString.match(/CATEGORIES:/g) || [])
    let commaCount = (iCalString.match(/,/g) || [])

    expect(commaCount.length).toEqual(99); // 99 commas = 100 categories
  });

  it('should generate the correct number of iCal locations for a given WorldLine with multiple reference frames', () => {

    const worldLineCopy = JSON.parse(JSON.stringify(worldLineWithMultipleEventsAndReferenceFrames));

    worldLineCopy.events[0].start = spaceTime1;
    worldLineCopy.events[0].end = spaceTime1;
    worldLineCopy.events[1].start = spaceTime2;
    worldLineCopy.events[1].end = spaceTime2;

    const iCalString = exportWorldLineToiCal(worldLineCopy);

    const locationCount = (iCalString.match(/LOCATION/g) || []).length;

    expect(locationCount).toEqual(2);
  });

  it('should generate events with the correct categories for a given WorldLine with multiple reference frames', () => {

    const worldLineCopy = JSON.parse(JSON.stringify(worldLineWithMultipleEventsAndReferenceFrames));
    worldLineCopy.events[0].referenceFrames.push(referenceFrame1);
    worldLineCopy.events[1].referenceFrames.push(referenceFrame2);

    const iCalString = exportWorldLineToiCal(worldLineCopy);

    expect(iCalString).toContain('CATEGORIES:Test Reference Frame 1');
    expect(iCalString).toContain('CATEGORIES:Test Reference Frame 2');
  });

  it('should generate events with the correct locations for a given WorldLine with multiple reference frames', () => {

    const worldLineCopy = JSON.parse(JSON.stringify(worldLineWithMultipleEventsAndReferenceFrames));
    worldLineCopy.events[0].start = spaceTime1;
    worldLineCopy.events[0].end = spaceTime1;
    worldLineCopy.events[1].start = spaceTime2;
    worldLineCopy.events[1].end = spaceTime2;


    const iCalString = exportWorldLineToiCal(worldLineCopy);

    expect(iCalString).toContain('LOCATION:Test Location');
    expect(iCalString).toContain('LOCATION:NYC');
  });

});
