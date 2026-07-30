# Hackathon scene slate

## Status

The user re-locked the exact 10-round session on July 31, 2026 after reviewing
the first generated roster. This slate supersedes the earlier Pompeii, D-Day,
Apollo launch, Bornholmer Strasse, Chernobyl, and Chilean-miners candidates.

An approved event does not automatically accept its panorama. Every replacement
now has a local `2:1` asset, complete metadata, flat material review, and a
passing wrapped opening-view smoke test. Exhaustive seam-and-pole review remains
submission QA.

## Required session

| Order | Stable ID | Event | Year | Canonical location | Primary visual anchors | Production status |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | `fall-of-constantinople` | Fall of Constantinople | 1453 | Theodosian Land Walls, Constantinople | double walls and ditch, breach, Ottoman bombards, opposing forces | replacement candidate; runtime opening passed |
| 2 | `boston-tea-party` | Boston Tea Party | 1773 | Griffin's Wharf, Boston, USA | merchant deck, opened tea chests, wharf, controlled night action | playable prototype; submission asset decision remains |
| 3 | `declaration-of-independence` | Adoption of the Declaration of Independence | 1776 | Pennsylvania State House, Philadelphia, USA | Assembly Room, colony tables, Windsor chairs, approved manuscript | replacement candidate; runtime opening passed |
| 4 | `storming-of-the-bastille` | Storming of the Bastille | 1789 | Bastille fortress site, Paris, France | fortress towers, drawbridge, armed crowd, smoke without graphic injury | retained candidate; previous desktop smoke passed |
| 5 | `wright-brothers-first-flight` | Wright brothers' first flight | 1903 | Kill Devil Hills, USA | Flyer, launch rail, dunes, prone pilot and ground assistant | playable prototype; anatomy review remains |
| 6 | `titanic-sinking` | Sinking of RMS Titanic | 1912 | North Atlantic wreck area | bow-down liner, iceberg, lifeboats, period deck fittings | retained corrected candidate; previous desktop smoke passed |
| 7 | `pearl-harbor-attack` | Attack on Pearl Harbor | 1941 | Battleship Row, Pearl Harbor, USA | Ford Island, battleships, carrier aircraft, torpedo wakes, smoke | corrected replacement; runtime opening passed |
| 8 | `first-ascent-of-mount-everest` | First ascent of Mount Everest | 1953 | Mount Everest summit | two roped climbers, 1953 oxygen equipment, narrow summit | retained calibrated candidate; previous desktop smoke passed |
| 9 | `vostok-1-first-human-spaceflight` | Vostok 1: first human spaceflight | 1961 | Baikonur Cosmodrome Site No. 1, Kazakhstan | Vostok launcher, tapered boosters, gantries, open steppe | replacement candidate; runtime opening passed |
| 10 | `apollo-11-moon-landing` | Apollo 11 Moon landing | 1969 | Tranquility Base, Moon | `Eagle`, two astronauts, ladder, flag, surface equipment | replacement candidate; off-world runtime path passed |

The runtime order is chronological. It ends with the two spaceflight milestones
but keeps their location tasks distinct: Vostok 1 uses the Earth map at
Baikonur, while Apollo 11 uses one explicit off-world `Moon` choice and reveals
Tranquility Base after submission.

## Superseded candidates

The following uncommitted candidates were explicitly rejected during roster
review and must not remain registered or described as active backups:

- eruption of Mount Vesuvius at Pompeii;
- D-Day Normandy landings;
- Apollo 11 launch at Kennedy Space Center;
- opening of the Berlin Wall at Bornholmer Strasse;
- Chernobyl disaster;
- rescue of the 33 Chilean miners.

Their generated PNG, scene module, and dossier triples are removed only after
the five accepted replacements exist and pass static integrity checks.

## Selection and replacement rules

- Every Earth round has one canonical point on the existing world map.
- The lunar round uses selenographic coordinates only in scene metadata; it
  never projects them onto the Earth basemap or reports a fictional kilometre
  distance.
- No round requires readable text or an exact face as its primary clue.
- Each accepted image needs at least three independent visual clues.
- Important people, vehicles, and architecture stay away from the horizontal
  wrap seam and spherical poles.
- A candidate receives at most one focused correction after material review.
- No backup event is currently approved. If a required replacement still fails
  after one correction, return to the user to select another event instead of
  silently promoting an old candidate or extending generation tooling.
