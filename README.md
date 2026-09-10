<div align="center">🌐 Chalant

A spy-satellite simulator in your browser — then you realize the sources are public and the data is real.

Photorealistic 3D globe. Live aircraft, ships, satellites, earthquakes, traffic, and public cameras. Hands-free voice control powered by a realtime AI agent.

No place left behind.

"Orbital HUD, a tracked live globe, FLIR terrain — then OPEN SOURCED" (docs/media/hero-open-source-reveal.gif)

▶️ From the project by slimeygang — built for exploring real-world public data through an interactive 3D globe.

""#1 on GitHub Trending" (https://img.shields.io/badge/%231_GitHub_Trending-thank_you!-F0A63C?style=flat-square&logo=github)" (https://PLACEHOLDER_GITHUB_LINK)

⚡ No keys, no signup, no config file. One click through "Pinokio" (https://PLACEHOLDER_PINOKIO_LINK) — or "npm install && npm run dev" — and the globe is live: real aircraft, real satellites, real cameras. Keys are power-ups you paste into the app later. "→ Quick Start" (#-quick-start)

</div>---

<div align="center">"Quick Start" (#-quick-start) · "First Five Minutes" (#-the-first-five-minutes) · "Talk to It" (#-talk-to-it) · "What's Live" (#-whats-on-the-globe) · "Under the Hood" (#-under-the-hood) · "Keys & Costs" (#-api-keys)

</div>---

🌍 Why This Exists

You asked, so it's happening. Chalant is open source. Track the world live. Talk to it. Break it. Extend it.

Most open-source intelligence is a pile of browser tabs. The signals are abundant, but the interface is the bottleneck. Chalant turns those signals into a place: the world is already broadcasting — flight transponders, ship beacons, orbital elements, seismographs, public cameras — and this makes it visible on a photorealistic 3D Earth in real time. No classified clearance required; it's public signal all the way down, and the interface runs in your browser, under your control.

«Half the magic is that it looks like a forbidden cockpit. The other half is that every line of code is inspectable.»

Most feeds are live; explicitly labeled traffic, camera-pose, and launch
experiences may be simulated, estimated, or reconstructed.

And it's honest about money: the best free and nearly-free APIs give you the real experience out of the box — then it's yours to extend with bigger, more expensive data sources whenever you're ready.

---

🎛️ What This Thing Does

- 🛩️ Cockpit view: Ride inside a tracked flight — the camera holds the terrain under you all the way down.
- 📡 Contacts: A 250 km roster of everything near your target — step through live aircraft and drop into any cockpit.
- 🎯 Click-to-track anything: Camera locks on, draws a fading trail, surfaces full metadata — and a tracked fire or vessel hands you off to the nearest live camera in one click.
- 🖊️ Voice whiteboard: Speak annotations onto the world — real boundary polygons, marks, and routes.
- 🛫 3D hangar: Real per-class aircraft models — 787, ATR-72, Citation, Bell 206, MQ-9 — and a tracked contact swaps from glyph to 3D model as you close in.
- 🎨 Reskin reality: GLSL sensor looks over the normal globe — CRT, NVG, FLIR/thermal, Noir, Snow.
- 🟩 Detection overlay: Screen-space bounding boxes and IDs on everything in view.
- 🎖️ Military HUD: Tactical heads-up display with intelligence-style telemetry.
- 🌐 Global Context: Stage the full situational picture with one switch — and get your exact view back when you leave.
- 🎥 Scene director: Capture cinematic camera tours for clips and demos.
- 🔗 Share Links: Camera, style, layers, and even one tracked target serialize into a URL — a live target is a handoff, not a bookmark.
- 🏠 Reset Globe: One control — or one sentence — back to the full Earth.

---

⚡ Quick Start

Nothing to sign up for to get started. Both paths below land you in
the same place: a live satellite globe — keyless Esri World Imagery with keyless
terrain, and OSM stepping in automatically if Esri is ever unreachable — with
aircraft, military traffic, satellites, earthquakes, public cameras, radio and
launches already moving on it. No account, no key, no file to edit.

Optional signups, optimal experience. The keyless globe gets you running;
a couple of two-minute signups make it spectacular. Want the photorealistic-3D
cities? A free Cesium ion token covers them for eligible personal,
non-commercial use — no Google account needed; current ion terms and quotas
apply. Prefer them straight from Google, plus in-app place search? A
Google Maps key is the billing-enabled, metered route.

Path 1 — One click, no terminal

1. Install "Pinokio" (https://PLACEHOLDER_PINOKIO_LINK).
2. In Discover → Download from URL, paste
   "https://PLACEHOLDER_REPOSITORY_URL".
3. Click Install, then Start.

That is the whole thing. The launcher verifies Pinokio's runtime, installs the
locked dependencies, finds a free local port, and opens the app.

Path 2 — Terminal / coding agent

Requires Node.js 24.14.x or 26.x. Node 25 is usable but EOL; the setup doctor
warns instead of blocking it.

npm install
npm run doctor
npm run dev

Open "http://localhost:4173".

A first-run card offers to stage a mission for you — Live Contacts,
Space Missions, Environmental — or leaves you to explore manually.

Then power it up — in the app, not in a file

Keys are upgrades, not prerequisites. When you want one, click the POWER UP
chip in the bottom-right corner: Provider Settings lists every supported key,
what it switches on, and where to get it. Paste, hit SAVE KEYS, and the app
restarts itself with the new capability on.

- Where keys land: Pinokio → the app's ignored "pinokio/ENVIRONMENT"; a
  terminal clone → the repo-root ".env".
- Keys you already have stay yours: values from your shell or the macOS
  Keychain show as configured externally and are read-only to the panel.
- What to get first: the free "Cesium ion" (https://PLACEHOLDER_CESIUM_LINK)
  token for photorealistic 3D and world terrain; a Google Maps key for the
  billing-enabled, metered route + place search; OpenAI when you want to talk
  to the world.

«[!WARNING]
Do not enter credentials in Pinokio's native configuration panel if your
launcher version does not safely persist nested application settings. Use
Provider Settings inside the app instead.»

The server binds to localhost on both paths, and Provider Settings answers
requests only from your machine. Browser-side keys must be restricted at their
providers.

---

🕐 The First Five Minutes

No account, no signup. The first-run card will offer to stage a mission for you — or run this gauntlet yourself.

1. Light up the sky. Take the Live Contacts mission (or turn on Flights yourself) — thousands of live aircraft, gliding on real telemetry, detection mesh already reading the scene. Click one: the camera locks on, a trail draws behind it, and its live telemetry card comes up.
2. Take the controls. Hit COCKPIT on your tracked plane and ride it down, switching sensors mid-flight: NVG into Ironbow FLIR.

"Riding with a live aircraft in cockpit view while switching sensor modes" (docs/media/06-cockpit-ar.gif)

3. Drop into a busy airport. Search one and descend to the taxiways with 3D aircraft on — grounded contacts, taxi trails, the whole apron working in real time.

"Moving from a full airport overhead down to close taxiway inspection with 3D flight models" (docs/media/start-here/airport-ground-traffic-google-3d.gif)

4. Look through a public camera. Turn on CCTV over Austin, London, or California. The feeds aren't webcam embeds — they project into the 3D city. Cycle coverage to VIEWSHED and every camera draws its estimated coverage volume.

"Diving into an Austin intersection with a live public camera projected into the 3D scene" (docs/media/03-austin-cctv.gif)

5. Track something in orbit. Turn on Satellites and click the ISS — you ride along at orbital distance, orbit ring and all.

"Tracking the ISS along its orbital path" (docs/media/14-iss-over-ukraine.gif)

6. Switch the optics. Tap "1"–"7" — CRT, NVG, FLIR — and the whole live planet re-renders through a different sensor.

"Cycling a dense live globe through CRT, FLIR, and NVG" (docs/media/01-style-sweep.gif)

7. Talk to it (needs an OpenAI key): "Take me to LAX and select the nearest airborne aircraft."
8. Come home. Hit Reset Globe — or just say "zoom out to a globe view."

Keyboard: "1"–"7" visual styles · "H" HUD · "D" detection · "C" cockpit · "Esc" out.

---

🛩️ The Cockpit

Real-time cockpit mode, built from live flight data: the camera rides your contact with real terrain holding underneath, all the way down — sensor styles come along for the ride, and Contacts keeps the 250 km roster one click away.

"Jumping between live aircraft and falling straight into a cockpit view" (docs/media/12-switch-aircraft-cockpit.gif)

The cockpit carries its own briefing strip: nearby live signals, regional headlines, and real local weather — with an opt-in WX mode that renders volumetric clouds from actual observations around your aircraft.

"A live military contact ridden through Normal, NVG, and Ironbow FLIR" (docs/media/start-here/military-cockpit-dense-google-3d.gif)

---

🎙️ Talk to It

«Voice needs an OpenAI key. Without one the entire app still runs — the mic button just reports voice is unavailable. The same key drives the AI HUD summary: a terse, five-word intelligence-style readout of the current view that regenerates as you move.»

Click CHALANT MIC, grant the microphone, and just talk.

- 🧠 It knows what it's looking at. The agent pulls live scene context before answering — including coordinates, street names, active layers, and view scale.
- 🎯 Entity Q&A. Click any plane, ship, or datacenter and ask "what's this?"
- 👁️ Visual grounding. At street level, it reads a viewport screenshot to identify legible signage and building names, and is instructed never to hallucinate labels.
- 🎬 Cinematic framing. "Show me the planes overhead" pulls the camera back, angles it, and frames the live traffic like a director.
- 🔒 Honest and secure. The agent only confirms actions that succeeded. Your "OPENAI_API_KEY" never touches the browser; the client only gets a short-lived session token.

Twenty-eight tools, four jobs — the commands below come straight from the product's voice test suite and tool playbook:

🎥 Direct it — drone-operator camera verbs:

«🗣️ "Take me to Tokyo." · "Orbit around this area slowly." · "Draw the walking route from the Capitol to Zilker Park." → "Fly the route we just drew." · "Zoom out to a globe view."»

🖊️ Annotate it — a whiteboard over the real world:

«🗣️ "Outline the state of Texas." · "Annotate the Texas State Capitol and its grounds." · "How far is the Eiffel Tower from the Louvre?" — a connector arrow appears and it speaks the distance. Everything persists until you say "clear the map."»

"Zilker Park and Lady Bird Lake drawing onto the 3D city" (docs/media/01-voice-annotate-zilker.gif)

"A spoken distance measurement spanning an airport" (docs/media/04-airport-distance.gif)

🔎 Interrogate it — analyst queries against the live layers:

«🗣️ "How many flights are over Texas right now?" · "Which ships are headed to Oakland?" · "What is the biggest fire near Los Angeles?" · "Is anything flying above forty thousand feet?" · "When does the ISS pass over next?"»

🎛️ Operate it — the whole console, hands-free:

«🗣️ "Switch to night vision and turn on the flights layer." · "Turn on the camera viewsheds." · "Play a news radio station near Austin." · "Track that plane." → "Enter Cockpit."»

Rapid-fire tier:

«🗣️ "Show me global infrastructure." · "Set detection density to fifty percent." · "Next contact — helicopters only." · "Show me space missions." · "Switch to OSM." · "Sharpen the image a touch." · "Switch to the tactical layout." · "What's turned on right now?"»

"The globe populated with the world's radio stations" (docs/media/15-global-radio-layer.gif)

---

🛰️ What's on the Globe

Thirteen live layers. Eleven of them need nothing at all — no key, no account, no signup, starting with the satellite basemap you land on.

Layer| What you get| Source| Auth
🗺️ Map Stack| Esri satellite imagery, Google Photorealistic 3D, OSM, plus additional ion-hosted stacks| Esri / Google / Ion / OSM| 🟢 Esri satellite + OSM · 🟡 ion-hosted Google 3D + world terrain · 🔴 direct Google + place search
✈️ Live Flights| 11,000+ live aircraft + route history| OpenSky + adsb.lol| 🟢
🎖️ Military Flights| ADS-B military traffic in amber| adsb.lol| 🟢
🚢 Live Vessels| Thousands of ships worldwide| AISStream| 🟡
🛰️ Satellites| 838-object catalog with a live legend| CelesTrak| 🟢
🌍 Earthquakes| Global seismic activity, last 24h| USGS| 🟢
🚗 Traffic| Live congestion driving per-vehicle flow at street level| TomTom + OSM| 🟢 / 🟡
📹 CCTV Mesh| ~800 public cameras projected into the 3D space| City APIs| 🟢
📻 Radio| Geolocated world radio with an analog tuner| Radio Browser / broadcasters| 🟢
🚲 Bikeshare| Live station availability| GBFS| 🟢
🔥 Active Fires| Live NASA FIRMS detections, trailing 24h| NASA FIRMS| 🟡
🚀 Space Missions| Rolling 30-day launches with payload and stage detail| Launch Library 2| 🟢 / 🟡
🎖️ Mapped Installations| Viewport-bounded military-site context from community mapping| OpenStreetMap| 🟢

The basemap ladder:

You have| The globe you get
🟢 Nothing| Esri World Imagery satellite basemap + keyless terrain, in 2D
🟡 A free Cesium ion token| Google Photorealistic 3D cities and world terrain
🔴 A Google Maps key| Direct Google Photorealistic 3D + place search

---

🎖️ Field Missions

Mission| How
🚁 Ask the planet| "Why are all these military helicopters flying in circles?" Select a military track and inspect its recent trace history.
✈️ Final approach| Click-track an airliner lining up for a runway, hop into the cockpit, and ride it down.
🌃 Night watch| Fly to a city, switch to NVG, and let the detection mesh and HUD read the scene.
🚢 Port call| Vessels on over a major port. Click a tanker for its tactical card and wake trail, then inspect nearby CCTV.
📻 Tokyo FM| Orbit a major city with the Radio layer on, then use the analog tuner.
🔥 Fire line| FIRMS over a region. Click a detection and inspect its intensity and nearby public cameras.
🚶 Ask for a walking route 🎙️| Tell the world where you want to go and watch a real street-following route trace itself through the 3D city.
📏 Measure two locations 🎙️| "How far is location A from location B?" — an arrow spans the map and the distance appears in the caption.
🚀 Launch replay| Open Space Missions, pick a launch from the last 30 days, and inspect its reconstructed ascent.
🪦 Walk the boneyard| Fly from regional context down into dense rows of retired aircraft.
🏗️ Orbit a major dam| Sweep the dam and its terrain at a glance, then inspect additional mapped dams.

---

🔧 Under the Hood

Some of the engineering that makes it feel real rather than like a tech demo:

- World-stable icons. Aircraft and ships point along their true real-world heading at every camera angle.
- Smooth motion from choppy data. Live feeds arrive every 15–30s; the globe renders one interval behind real time and interpolates between known fixes.
- Honest satellites. SGP4 propagation with orbit rings that stay locked to their satellites.
- Sits on the real ground. Entity heights run through a real vertical datum and rendered terrain.
- Spends your quota like it's its own. Paid feeds run behind cached, budget-governed proxies.
- Secure by design. Every API that touches a private key is brokered through a hardened server-side proxy.
- No framework. Vanilla JavaScript, CesiumJS, and Vite — plus Google Photorealistic 3D Tiles and the OpenAI Realtime API for voice.

src/
├── main.js # Bootstrap: Google 3D tiles, layer registration
├── ui.js # Runtime UI — panels, HUD, styles, control facade
├── hud.js # Intelligence HUD + AI scene summary
├── keySetup.js # POWER UP panel — in-app provider keys
├── mapStackController.js # Basemap switching — Google 3D / Esri / OSM / ion stacks
├── iconOrientation.js # Screen-projected world-space headings + horizon cull
├── voice/ # OpenAI Realtime session + voice tools
├── data/ # One module per layer + orchestration + context store
│ └── local_data/ # Bundled datasets (per-folder provenance)
└── scenes/ # Cinematic scene director

See ""docs/CURRENT-STATE.md"" (docs/CURRENT-STATE.md) for the authoritative runtime reference.

---

🔑 API Keys

The legend: 🟢 no signup · 🟡 free key · 🔴 metered.

Most of the globe is 🟢: flights, military traffic, satellites, earthquakes,
CCTV, radio, bikeshare, space missions, mapped installations, and bundled
datasets run with zero keys.

What you need for the good experience

| Key| Why| Get it
🟡| Cesium ion| 🗺️ Google Photorealistic 3D, world terrain, and additional imagery stacks| "Provider page" (https://PLACEHOLDER_CESIUM_LINK)
🔴| Google Maps| Direct Google Photorealistic 3D + place search| "Provider page" (https://PLACEHOLDER_GOOGLE_MAPS_LINK)
🔴| OpenAI| 🎙️ Voice experience + AI HUD summary| "Provider page" (https://PLACEHOLDER_OPENAI_LINK)
🟡| AISStream| 🚢 Live global ships| "Provider page" (https://PLACEHOLDER_AISSTREAM_LINK)
🟡| NASA FIRMS| 🔥 Live active fires| "Provider page" (https://PLACEHOLDER_FIRMS_LINK)
🟡| TomTom| 🚦 Real traffic| "Provider page" (https://PLACEHOLDER_TOMTOM_LINK)

Cherry on top

| Key| Why| Get it
🟡| OpenSky| ✈️ More flight-polling credits| "Provider page" (https://PLACEHOLDER_OPENSKY_LINK)
🟡| Launch Library 2| 🚀 Higher space-missions request allowance| "Provider page" (https://PLACEHOLDER_LAUNCH_LIBRARY_LINK)

All of them are worth getting. None of them are required to start.

💸 What it actually costs

| Cost reality
🟢 Most layers| $0, no signup.
🟡 Free-key tier| $0 with a signup, subject to provider quotas.
🗺️ Google 3D tiles| Free through eligible usage or metered through a direct Google key, depending on configuration.
🔴 OpenAI voice| Metered usage. Configure appropriate application and provider-side limits.

🔒 Sharing an instance

By default nobody else can reach your server — it binds to localhost.

To share on your LAN, opt in explicitly:

npm run dev -- --host 0.0.0.0 --port 4173

A LAN-visible server can expose access to configured API providers, so use
appropriate authentication, throttling, and provider-side usage limits.

---

📋 Responsible & Open

Chalant runs on public data, clear sources, and local-first execution.
No secrets, no private datasets, no mystery scraping — anything involving a
private key is brokered server-side.

The line. This project models events, assets, infrastructure, and systems
— aircraft, vessels, satellites, fires, cameras, cities. It does not build
features for named-person search, face recognition, or tracking individuals.

Come build it. Chalant is a canvas: add a city pack, a data source, a style,
or a voice tool.

Status: An evolving open-source client for exploration and learning — a fast,
hackable foundation, not a hardened production service. Released under the
"MIT License" (https://PLACEHOLDER_LICENSE_LINK). Bundled and live datasets
carry their own terms — see
"DATA_SOURCES.md" (https://PLACEHOLDER_DATA_SOURCES_LINK). Security model:
"SECURITY.md" (https://PLACEHOLDER_SECURITY_LINK). Want to contribute?
"CONTRIBUTING.md" (https://PLACEHOLDER_CONTRIBUTING_LINK).

---

🧭 What's Next

First — thank you to everyone helping build Chalant and experimenting with
open-source geospatial intelligence.

This project is intended to remain a shared sandbox for making sense of the
world. The baseline stays open, and the goal is to make it easy to break things,
experiment, and bolt on layers that haven't been thought of yet.

The present is the cheap part. The moment you try to go back in time — tiling,
serving, and scrubbing what happened and what changed at real resolution —
the data gets expensive and the compute gets brutal. That's an open challenge
for future contributors.

---

<div align="center">🌐 Chalant. No place left behind.

Created by slimeygang.

</div>
