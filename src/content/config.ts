import { defineCollection, z } from 'astro:content';

/**
 * MOmery content collections
 * ---------------------------------------------------------------
 * Every growing part of the archive is modeled as a content collection:
 * a folder of Markdown files, not a hardcoded page. To add a person,
 * a story, a song, or a gallery image, a future editor (human or AI)
 * adds one new .md file to the matching folder in src/content/ —
 * no page templates or layouts need to change.
 *
 * Phase 2 collections (timeline, vietnam-slides, family-archive) are
 * pre-declared below so they can be populated later without touching
 * this file again.
 */

const people = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    photo: z.string().optional(), // path under /public/images/people/
    favoriteMemory: z.string().optional(),
    song: z.string().optional(), // links to a songs collection slug, optional
    order: z.number().default(99),
  }),
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(), // free-text era, e.g. "May, every year"
    people: z.array(z.string()).default([]),
    relatedSongs: z.array(z.string()).default([]),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const songs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    mood: z.enum([
      'The Journey', 'Morning', 'Camp Life', 'Campfire',
      'Processing', 'Reflection', 'Legacy', 'Inside Jokes',
    ]),
    scene: z.string().optional(),
    notes: z.string().optional(),
    finalCutCandidate: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(), // path under /public/images/gallery/
    category: z.enum([
      'The Road North', 'May Camp Prep', 'November Hunting', 'Campfire',
      'Meals & Kitchen', 'Boats & Lake', 'Wildlife', 'Family & Friends',
      'Then & Now', 'MoMo & Home MOments', 'Drone Footage',
    ]),
    year: z.string().optional(),
    peopleShown: z.array(z.string()).default([]),
    location: z.string().optional(),
    story: z.string().optional(),
  }),
});

// --- Phase 2 collections, declared early so the schema never has to move ---

const timelineEvents = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(), // ISO date or year, e.g. "1998" or "1998-05-12"
    category: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const vietnamSlides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    year: z.string().optional(),
    location: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const familyArchive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    restricted: z.boolean().default(true), // gated behind Phase 2 private login
  }),
});

export const collections = {
  people,
  stories,
  songs,
  gallery,
  'timeline-events': timelineEvents,
  'vietnam-slides': vietnamSlides,
  'family-archive': familyArchive,
};
