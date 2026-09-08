---
name: human-register
description: >-
  Write visitor-facing copy that sounds like a person who runs a small practice,
  not like a brand deck or an AI summary. Spoken sentences with joining words
  (about, and then, of them); no telegram stubs. Punctuation tells, rhythm,
  first-person budget, reject/prefer anchors, aloud test, revision loop.
  Use for UI copy, JSON content, MDX, metadata, and any visitor-facing strings.
  Pair with draper for the idea. Triggers: copywriting, tone, voice, human register,
  rewrite copy, AI-sounding, brochure, telegram, joining words, microcopy, SEO blurb,
  About, Studio, Book.
---

## Trace

Before anything else when this skill applies, run its `scripts/trace.sh`. It prints a `[skill-trace]` line so the run's terminal log shows the skill fired.

<!-- skill-trace-block -->

# Human register

Agents are bad at sounding human. This skill exists to make that failure expensive.

**Job:** generate or rewrite visitor-facing copy so it reads like speech from a calm person who runs a small practice. Not a brand toolkit. Not an AI summary. Not a manifesto.

**Pair with** [draper](../draper/SKILL.md) for the idea. Draper is _what_ the copy serves. Human register is _how it sounds_. If they conflict, fix the idea first, then the voice.

## Agent contract

1. Read **draper** before inventing a new pitch, offer frame, or brand extension. This skill does not replace positioning.
2. Draft in [spoken sentences](#generate-spoken-sentences-not-telegram) first. Keep joining words. Do not start from slogan triads, telegram stubs, or a “tightened” list you plan to warm up later.
3. Run the [revision loop](#revision-loop-mandatory) on every block you write or heavily edit.
4. Fail closed on [hard rejects](#hard-rejects). Clever is not a defense.
5. Before stop, complete the [shipping checklist](#shipping-checklist).

## What “human” means here

A person talking. Glad to explain. Specific when it matters. Willing to leave a beat unfinished if the next sentence carries it. Uneven rhythm on purpose.

It is **not**:

- Brand-deck posture (“Independent practice in Vienna since…”)
- Consulting doctrine (`X over Y`, ethos-poster titles)
- LinkedIn first-person spam
- Fake warmth props (Tuesday, coats, “when the photographer leaves”)
- Telegram stubs that sound annoyed
- Perfectly parallel three-beat lines that only machines love

**Temperature:** warm + plain. Effectiveness over polish. Sound like you’d say it to a friend who asked a real question.

The speaking sample in [`DRAPER.md`](../../../DRAPER.md) (“How to say the idea”) is the floor. The Book full-project lines in [`COPY.md`](../../../COPY.md) are the generate-from sample. Copywriting pressure is allowed. Hyper-terse AI speak is not. If a line could be a poster, a telegram, or a slogan triad, rewrite until it is a sentence someone would actually say.

## Generate spoken sentences, not telegram

When you write a new block, answer the way a person would if a friend asked. Keep the small words that make it speech. Do not “tighten” by deleting them.

**Keep:** *about*, *and then*, *of them*, *a* / *the*, openings like *This is*, *It's about*, *You'll get*.

**Do not:** strip those to sound punchy. That is the hyper-terse move. It is a defect even when every remaining word is true.

Copywriting pressure cuts sludge (brochure nouns, slogan triads, banned phrases). It does not cut glue (*about*, *and then*, *of them*, articles). If this skill conflicts with a generic “be direct / cut words” editor, this skill wins.

### How to generate

1. Say the answer out loud first, as if a friend asked what this is, how long it takes, or how payment works.
2. Write that spoken sentence. Leave *about*, *and then*, *of them*, and the articles in.
3. Then apply copywriting pressure: kill sludge, not glue.
4. Compare the draft to the Book sample below. If yours is closer to the telegram, put the joining words back.
5. Read it out loud again. Ship only if it still sounds glad and plain.

### Generate-from sample (Book, live)

> This is a redesign of how a home or a room operates. It's about how a family or guests move through it, and then about the layout, materials, sourcing, and styling.

> I take on a few residences a year. Most of them take one to three months, in person in Vienna, and remotely abroad.

> You'll get a quote after the first conversation. A deposit starts the project, and then billing goes in stages until the last invoice.

Why it works: a subject in the first sentence, *about* naming the work, *and then* for sequence, *of them* pointing back, *You'll get* talking to one person.

### Telegram that was rejected (same facts, glue gone)

> A redesign of how a home or room operates. How a family or guests move through it, then layout, materials, sourcing, and styling.

> A few residences a year. Most take one to three months, in person in Vienna, and remotely abroad.

> A quote comes after the first conversation. A deposit starts the project, then billing in stages until the last invoice.

The second set is what models produce when they “tighten.” Restore the small words until it sounds like speech again. Do not generate new blocks in that clipped form.

## Hard punctuation and grammar tells

These are common AI fingerprints in product copy. Treat them as defects unless a rare exception is obviously right.

| Tell                                    | Rule                                                                                    |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| Em dash (`—`)                           | **Forbidden** in product copy. Prefer a period, comma, or shorter rewrite.              |
| En dash (`–`) as rhetorical separator   | Avoid in sentences for the same reason.                                                 |
| Colon as drama (`Today:`, `The point:`) | Go easy. Prefer a new sentence or a comma when the colon is only a pause.               |
| Corporate “we”                          | Solo studio voice. Avoid “we” for Petrina / the practice unless plural is clearly true. |
| Brochure nouns stacked as openers       | Lead with a verb or a plain observation, not a résumé header.                           |
| Joining words stripped (*about*, *and then*, *of them*, articles) | **Forbidden** as a “tighten” move. Glue is not sludge. Restore from the [Book sample](#generate-from-sample-book-live). |

## First-person budget

First person is allowed, sparingly. One “I” in a short block can make it personal.

**Hard rule:** on a page or section, fewer than half the sentences may start with “I.”

Human voice varies subject and rhythm. A page where every sentence starts with “I” sounds like a LinkedIn bio, not a person talking.

## Hard rejects

### Brochure / AI

> Independent practice in Vienna since 2021. Formed by architectural training and years inside design studios. Today: a few homes and hospitality spaces a year, in Vienna and remote.

Why it fails: noun-stack opener, passive origin myth (“Formed by…”), colon beat (“Today:”).

### First-person spam

> I care more about how a room works than how it photographs. I design for how you actually use the room. I keep the list short so I can go deep.

Why it fails: every line opens with “I.”

### Slogan / manifesto slop

> Guest flow, daily habits, and what still works when the photographer leaves. The list stays short so the work can go deep. Same bar whether you live there or guests do.

> Use over spectacle.

Why it fails: consulting-speak, clever oppositions (`X over Y`, `X rather than Y`), ethos-poster titles. Brand toolkit / AI doctrine, not speech. Prefer observation (“If it only looks good in photos…”) over a principle name doing the work.

### Fake-concrete slop

> A room should still feel right on a Tuesday, not only in the photos. Where the coats go… If that isn't right, the rest is decoration.

Why it fails: AI faking warmth with Tuesday / coats / photographer. Still essay voice. Specificity without a real referent is a tell.

### Clipped / cold (joining words stripped)

> A redesign of how a home or room operates. How a family or guests move through it, then layout, materials, sourcing, and styling.

> A few residences a year. Most take one to three months, in person in Vienna, and remotely abroad.

> Layout, materials, sourcing, and styling. Most take one to three months. Only a few each year. Vienna, and remote.

Why it fails: telegram voice. Accurate, but withholding. The writer deleted *about*, *and then*, *of them*, *This is*, *You'll get*. Reads like the writer is annoyed, not clear. Cutting slogans must not strip warmth or glue. Restore from the [generate-from sample](#generate-from-sample-book-live).

### Hyper-terse AI speak

> Your rooms decide. I change that. Few projects a year. Vienna, and remote.

> Stop decorating around a life you didn’t choose. Shape the room.

Why it fails: the words might be right and the person is gone. This is the voice that appears when a model “uplifts” copy by deleting articles, *about*, *and then*, *of them*, warmth, and the second sentence. Prefer the long, simple paragraph in [`DRAPER.md`](../../../DRAPER.md) and the Book generate-from sample in [`COPY.md`](../../../COPY.md). Full spoken sentences. Glad to explain. Then apply copywriting pressure without clipping the humanity out.

### Banned sludge phrases

Do not use these (and close cousins) in visitor-facing copy:

`Formed by` · `Built on` · `Rooted in` · `Dedicated to` · `Today:` · `go deep` · `same bar` · `Tuesday` (as fake warmth) · `coats` (as fake prop) · `photographer leaves` · `considered rather than styled` · `use over spectacle` · `It's not X, it's Y` as a lead trick · habit-coaching (“build better habits”)

## Prefer anchors

### Origin / about temperature

> I started this practice in Vienna in 2021, after years studying interior design and working in architecture studios. A few homes and hospitality spaces a year, in Vienna, abroad, and remotely.

Why it works: one “I,” full sentences, calm. Training as background, not a service claim. Geography is Vienna, abroad, and remote (not Vienna-only with remote as an afterthought).

### Studio lead temperature

> People usually ask for nicer rooms. But what they are really looking for are rooms to shape how they want to live.

> I help people setup spaces to shape how they want live, and how they want their guests to feel.

Why it works: insight, then a plain value proposition. No clever oppositions. Effectiveness over polish. Keep *people* here and on Home. *Families* is a census swap (and sounds like kids); the recognition word is *guests*. See [`COPY.md`](../../../COPY.md).

### Spoken offer temperature (Book)

The three Full project / Note / How payment works lines in [`COPY.md`](../../../COPY.md) are the generate-from sample. Prefer that temperature whenever you write an offer, capacity, or payment block.

### Balance

Avoid brochure posture, “I” spam, slogan triads, fake props, _and_ curt stub lines. Warm + plain beats clever _and_ beats clipped. Generate from the Book spoken-sentence sample. Glue (*about*, *and then*, *of them*) stays.

## Craft moves that fight the model

Agents default to symmetry, thesis statements, and safe abstractions. Push the other way.

### 1. Say the observation. Do not name the principle.

Bad: “Use over spectacle.”
Better: “If it only looks good in photos, it isn’t finished.”

Doctrine titles announce a brand kit. Observations sound like someone noticing.

### 2. Break the triad

Models love three parallel nouns. Humans often stop at two, or make the third a full spoken sentence with joining words still in.

Bad: “Guest flow, daily habits, and lasting materials.”
Still telegram: “How guests move through the room. What still works after the first season.”
Better: “It's about how a family or guests move through it, and then about the layout, materials, sourcing, and styling.”

### 3. Uneven sentence music

Follow a long sentence with a short one. Or the reverse. Perfect paragraph rhythm is a tell.

### 4. One real fact beats a catalog

Prefer one concrete claim you can stand behind over a tour of categories. Then say it as speech, not as two clipped facts.

Bad: “Layout, materials, sourcing, styling, and ongoing support.”
Still telegram: “Most take one to three months. Only a few each year.”
Better: “I take on a few residences a year. Most of them take one to three months, in person in Vienna, and remotely abroad.”

### 5. Specificity must be earned

Fake props are worse than mild abstraction. If you don’t know the coat hook exists, don’t invent it. Use a fact from the brief, the project, or the practice’s real constraints.

### 6. Vary the subject

Alternate: the room, the guest, the client, the work, “I,” nothing (imperative), a plain “people.” Do not march “I / I / I.”

### 7. Glad, not punitive

Human register can be direct without sounding bored or superior. If a cut line sounds like the writer is annoyed to be asked, rewrite until it sounds willing.

### 8. Credentials as background

Training and past roles may appear in Biography / About. On commercial pages (Studio, Book, Home SEO), do not sell “architecture” or “interior design” as licensed services. Sell the human verb. See draper move 2.

## Page-level habits

| Surface        | Register note                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Home hero      | One wound + one answer. No feature stack. Echo pair preferred (see draper).                        |
| Studio         | Insight then value prop. Practical “fix” language is fine here.                                    |
| Book / CTAs    | Book and Studio name the doors: “Book an intro” and “Book a consult”. Soft invites stay “See if it's a fit”. Price/time may sit under the button. Offer, capacity, and payment blocks use the spoken-sentence sample: keep *about*, *and then*, *of them*. |
| Work / project | Open on the stake for the people in the building. Facts after. No résumé verb stacks.              |
| About          | Prove the person. One “I” early is fine. Not a holding-company shelf.                              |
| Microcopy      | Short can still be warm. Prefer “See if it's a fit” energy over “Submit.”                      |

## Revision loop (mandatory)

Run this on every visitor-facing block you write or heavily edit. Do not skip because the first draft “feels fine.” First drafts from models usually fail this loop.

1. **Idea check** — Does this serve draper’s one door, or only decorate a portfolio?
2. **Aloud test** — Read it out loud. If you wince, rewrite. If you wouldn’t say it to a friend, rewrite.
3. **Tell sweep** — Kill em dashes, drama colons, banned phrases, `X over Y` leads, fake props.
4. **I-ratio** — Count sentence openings. If half or more start with “I,” rebalance subjects.
5. **Warmth vs clip** — If it reads like a telegram or like hyper-terse AI speak, add the missing human sentence. If it reads like a brochure, cut nouns and name the wound. The [`DRAPER.md`](../../../DRAPER.md) speaking sample is the floor. The Book lines in [`COPY.md`](../../../COPY.md) are the generate-from sample.
6. **Joining words** — Did you delete *about*, *and then*, *of them*, or an article to sound punchy? Put them back. Glue is not sludge.
7. **Second aloud** — After edits, read again. Ship only if it still sounds glad and plain.

## Shipping checklist

- [ ] Can you hear someone say it out loud without wincing?
- [ ] Does it sound glad to explain, not bored or punitive?
- [ ] On a page or section, do fewer than half the sentences start with “I”?
- [ ] Would you say this to a friend, or only put it on a website?
- [ ] Full spoken sentences, closer to the Book generate-from sample than to a noun list?
- [ ] Joining words still there (*about*, *and then*, *of them*, articles) where a person would say them?
- [ ] No em dashes; no drama colons; no banned sludge phrases?
- [ ] No clever oppositions doing the work of an observation?
- [ ] No fake Tuesday / coats / photographer warmth?
- [ ] Credentials treated as background, not a licensed-service pitch on commercial pages?
- [ ] Idea still matches [draper](../draper/SKILL.md) after the voice pass?

## Self-review before stop

If any checklist item fails, fix it in this pass. Do not leave “tone polish” as a follow-up. Copy that passes lint and fails the aloud test is not done.
