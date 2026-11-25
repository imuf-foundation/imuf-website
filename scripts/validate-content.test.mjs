import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { validateContent } from "./validate-content.mjs";

const EMPTY_TEAM = {
	intro: "Information for current and prospective Indiana men's ultimate players.",
	joinText: "",
	recruitingEmail: "",
	updatedOn: "",
	practices: [],
	leadership: [],
};

const EMPTY_ROSTER = {
	season: "",
	updatedOn: "",
	players: [],
};

const POPULATED_TEAM = {
	intro: "Fixture team introduction.",
	joinText: "Contact the captains to join.",
	recruitingEmail: "captains@example.com",
	updatedOn: "2026-11-02",
	practices: [
		{
			when: "Tuesday 6pm",
			where: "Fixture field",
			note: "Bring a white shirt",
		},
	],
	leadership: [
		{
			name: "Fixture Captain",
			role: "Captain",
			title: "Team President",
		},
	],
};

const POPULATED_ROSTER = {
	season: "Fixture season",
	updatedOn: "2026-11-02",
	players: [
		{
			name: "Fixture Player",
			year: "Jr",
			jerseyNumber: "7",
		},
	],
};

const EMPTY_SCHEDULE = {
	season: "",
	events: [],
};

const EMPTY_VIDEOS = {
	callahan: [],
	highlights: [],
	lowlights: [],
};

const EMPTY_BOARD = {
	members: [],
};

const EMPTY_HISTORY = {
	chapters: [],
};

const FIXTURE_SITE = {
	name: "Indiana Men's Ultimate",
	shortName: "IMUF",
	organization: "Indiana Men's Ultimate Foundation",
	prototype: true,
	urls: {
		home: "/",
		team: "/team/",
		join: "/team/#join-the-team",
		roster: "/team/roster/",
		donate: "/donate-now/",
		contact: "/contact-us/",
		store: "https://example.com/store",
		instagram: "https://example.com/instagram",
		facebook: "https://example.com/facebook",
		x: "https://example.com/x",
	},
	nav: [],
};

function fixtureLink(label, destination) {
	return { label, ...destination };
}

const FIXTURE_PAGES = {
	meta: { description: "Fixture description." },
	routes: {
		about: "/about-imuf/",
		board: "/imuf-board/",
		history: "/history/",
		videos: "/videos/",
		newsletters: "/newsletters/",
		schedule: "/team/schedule/",
		resources: "/team/player-resources/",
		resourcesBasics: "/team/player-resources/#basics",
		practices: "/team/#practices",
		scholarship: "/scholarships/mike-moore/",
		foundationContact: "https://example.com/contact",
		foundationDonate: "https://example.com/donate",
		newsletterArchive: "https://example.com/newsletters",
		videoArchive: "https://example.com/videos",
	},
	header: {
		homeAriaLabel: "Home",
		wordmarkLine1: "INDIANA",
		wordmarkLine2: "ULTIMATE",
		navLabel: "Main",
		donateLabel: "Donate",
	},
	navigation: {
		groups: [
			{
				id: "team",
				label: "Team",
				links: [fixtureLink("Team Hub", { urlKey: "team" })],
			},
		],
	},
	footer: {
		nameLine1: "INDIANA",
		nameLine2: "ULTIMATE",
		promptLine1: "Keep up",
		promptLine2: "with the team.",
		signupAriaLabel: "Newsletter signup",
		signupLabel: "Subscribe",
		emailPlaceholder: "Email",
		subscribeLabel: "Subscribe",
		homeSubscribeAriaLabel: "Subscribe later",
		signupNote: "Signup is not available yet.",
		archiveLink: fixtureLink("Newsletters", { route: "newsletters" }),
		foundationRoute: "about",
		navLabel: "Footer",
		donateLabel: "Donate",
		contactLabel: "Contact",
		storeLabel: "Store",
		instagramLabel: "Instagram",
		facebookLabel: "Facebook",
		xLabel: "X",
	},
	home: {
		location: "BLOOMINGTON, IN",
		university: "INDIANA UNIVERSITY",
		titleLine1: "INDIANA",
		titleLine2: "ULTIMATE",
		tagline: "Fixture tagline.",
		heroJoin: fixtureLink("Join", { urlKey: "join" }),
		heroHub: fixtureLink("Hub", { urlKey: "team" }),
		recruitLead: "Play for",
		recruitTitle: "Indiana.",
		recruitJoin: fixtureLink("Join", { urlKey: "join" }),
		recruitNew: fixtureLink("New", { route: "resourcesBasics" }),
		hubLine1: "Your team.",
		hubLine2: "All here.",
		hubEntry: fixtureLink("Hub", { urlKey: "team" }),
		hubNavLabel: "Team resources",
		hubLinks: [fixtureLink("Schedule", { route: "schedule" })],
		foundationTitle: "More than a season.",
		foundationParagraphs: ["Fixture support copy."],
		foundationNavLabel: "Foundation",
		foundationLinks: [fixtureLink("About", { route: "about" })],
		foundationDonate: "Support",
		archiveLine1: "Leave it",
		archiveLine2: "on the field.",
		archiveAction: fixtureLink("Videos", { route: "videos" }),
	},
	about: {
		eyebrow: "THE FOUNDATION",
		heading: "About IMUF.",
		introduction: ["Fixture introduction."],
		photo: { id: "fixture-photo", alt: "Fixture photograph" },
		values: [{ label: "Trust.", text: "Fixture value." }],
		linksLabel: "Related",
		links: [fixtureLink("Contact", { urlKey: "contact" })],
	},
	contact: {
		heading: "Contact IMUF.",
		foundationText: "Fixture contact.",
		foundationButton: fixtureLink("Contact", { route: "foundationContact" }),
		playHeading: "Looking to play?",
		playText: "Fixture play.",
		playLink: fixtureLink("Join", { urlKey: "join" }),
	},
	donate: {
		heading: "Support.",
		text: "Fixture donation.",
		button: fixtureLink("Donate", { route: "foundationDonate" }),
		note: "This page does not collect payments.",
		photo: { id: "fixture-photo", alt: "Fixture photograph" },
	},
	newsletters: {
		eyebrow: "ALUMNI & HISTORY",
		heading: "Newsletters.",
		introduction: "Fixture newsletter.",
		archiveButton: fixtureLink("Archive", { route: "newsletterArchive" }),
		note: "Signup is not available on this page yet.",
		contactLink: fixtureLink("Contact", { urlKey: "contact" }),
	},
	history: {
		eyebrow: "ALUMNI & HISTORY",
		heading: "Team history.",
		navLabel: "History chapters",
	},
	videos: {
		eyebrow: "ALUMNI & HISTORY / THE ARCHIVE",
		heading: "Video archive.",
		lede: "Fixture films.",
		callahanAction: "Watch the fixture",
		archiveLink: fixtureLink("Archive", { route: "videoArchive" }),
		emptyCallahan: "None yet.",
		emptyHighlights: "None yet.",
		emptyLowlights: "None yet.",
	},
};

function withFixture(teamValue, rosterValue, { rawTeam = false, rawRoster = false, scheduleValue = EMPTY_SCHEDULE, videosValue = EMPTY_VIDEOS, boardValue = EMPTY_BOARD, historyValue = EMPTY_HISTORY, historyImage = null, videoImage = null, siteValue = FIXTURE_SITE, pagesValue = FIXTURE_PAGES, omitPages = false, rawPages = false } = {}) {
	const dir = mkdtempSync(join(tmpdir(), "imuf-validate-"));

	try {
		mkdirSync(join(dir, "src", "_data"), { recursive: true });
		writeFileSync(join(dir, "src", "_data", "team.json"), stringify(teamValue, rawTeam));
		writeFileSync(join(dir, "src", "_data", "roster.json"), stringify(rosterValue, rawRoster));
		writeFileSync(join(dir, "src", "_data", "schedule.json"), stringify(scheduleValue, false));
		writeFileSync(join(dir, "src", "_data", "videos.json"), stringify(videosValue, false));
		writeFileSync(join(dir, "src", "_data", "board.json"), stringify(boardValue, false));
		writeFileSync(join(dir, "src", "_data", "history.json"), stringify(historyValue, false));
		writeFileSync(join(dir, "src", "_data", "site.json"), stringify(siteValue, false));
		if (!omitPages) {
			writeFileSync(join(dir, "src", "_data", "pages.json"), stringify(pagesValue, rawPages));
		}

		for (const width of [640, 960, 1600]) {
			const imagePath = join(dir, "src", "assets", "images", `fixture-photo-${width}.webp`);
			mkdirSync(dirname(imagePath), { recursive: true });
			writeFileSync(imagePath, "fixture");
		}

		if (historyImage) {
			const imagePath = join(dir, "src", "assets", "images", historyImage);
			mkdirSync(dirname(imagePath), { recursive: true });
			writeFileSync(imagePath, "fixture");
		}

		if (videoImage) {
			const imagePath = join(dir, "src", "assets", "images", "videos", videoImage);
			mkdirSync(dirname(imagePath), { recursive: true });
			writeFileSync(imagePath, "fixture");
		}

		return validateContent(dir);
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

function stringify(value, raw) {
	return raw ? value : `${JSON.stringify(value, null, 2)}\n`;
}

function assertFails(result, substring) {
	assert.equal(result.ok, false, `expected failure, errors were: ${result.errors.join(" | ")}`);
	assert.match(result.errors.join("\n"), substring);
}

describe("empty production-shaped data", () => {
	it("passes for the existing empty team and roster objects", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER);
		assert.equal(result.ok, true, result.errors.join("\n"));
		assert.deepEqual(result.errors, []);
	});
});

describe("invalid JSON roots", () => {
	const invalidRoots = [null, false, 0, "", []];

	for (const root of invalidRoots) {
		const label = JSON.stringify(root);

		it(`rejects team.json root ${label}`, () => {
			assertFails(withFixture(root, EMPTY_ROSTER), /src\/_data\/team\.json: \(root\)/);
		});

		it(`rejects roster.json root ${label}`, () => {
			assertFails(withFixture(EMPTY_TEAM, root), /src\/_data\/roster\.json: \(root\)/);
		});
	}

	it("rejects malformed team.json", () => {
		assertFails(
			withFixture("{", EMPTY_ROSTER, { rawTeam: true }),
			/src\/_data\/team\.json: \(file\).*Invalid JSON/
		);
	});

	it("rejects malformed roster.json", () => {
		assertFails(
			withFixture(EMPTY_TEAM, "{", { rawRoster: true }),
			/src\/_data\/roster\.json: \(file\).*Invalid JSON/
		);
	});
});

describe("required fields", () => {
	it("fails when team.intro is missing", () => {
		const team = { practices: [], leadership: [] };
		assertFails(withFixture(team, EMPTY_ROSTER), /src\/_data\/team\.json: intro/);
	});

	it("fails when team.intro is blank", () => {
		assertFails(withFixture({ ...EMPTY_TEAM, intro: "  " }, EMPTY_ROSTER), /src\/_data\/team\.json: intro/);
	});

	it("fails when a practice is missing when/where", () => {
		const team = { ...EMPTY_TEAM, practices: [{ note: "only a note" }] };
		const result = withFixture(team, EMPTY_ROSTER);
		assertFails(result, /practices\[0\]\.when/);
		assertFails(result, /practices\[0\]\.where/);
	});

	it("fails when a leadership entry is missing name/role", () => {
		const team = { ...EMPTY_TEAM, leadership: [{}] };
		const result = withFixture(team, EMPTY_ROSTER);
		assertFails(result, /leadership\[0\]\.name/);
		assertFails(result, /leadership\[0\]\.role/);
	});

	it("fails when a player is missing name", () => {
		assertFails(
			withFixture(EMPTY_TEAM, { ...EMPTY_ROSTER, players: [{ year: "Jr" }] }),
			/players\[0\]\.name/
		);
	});
});

describe("Pages CMS omitted optional fields", () => {
	const hostedTeamJson = readFileSync(
		join(dirname(fileURLToPath(import.meta.url)), "..", "src", "_data", "team.json"),
		"utf8"
	);
	const hostedTeamDocument = `{
  "intro": "Information for current and prospective Indiana men's ultimate players."
}`;

	it("passes the exact restored team.json, with no trailing newline", () => {
		assert.equal(hostedTeamJson, hostedTeamDocument);
		assert.equal(hostedTeamJson.endsWith("\n"), false);
		assert.deepEqual(JSON.parse(hostedTeamJson), {
			intro: "Information for current and prospective Indiana men's ultimate players.",
		});
		const result = withFixture(hostedTeamJson, EMPTY_ROSTER, { rawTeam: true });
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("passes when optional strings and arrays are omitted", () => {
		const result = withFixture(
			{ intro: EMPTY_TEAM.intro },
			{},
			{ scheduleValue: {} }
		);
		assert.equal(result.ok, true, result.errors.join("\n"));
		assert.deepEqual(result.errors, []);
	});

	it("fails when present optional fields have the wrong type", () => {
		const result = withFixture(
			{
				intro: EMPTY_TEAM.intro,
				joinText: 12,
				recruitingEmail: false,
				updatedOn: 20261124,
				practices: null,
				leadership: "Captain",
			},
			{ players: {} },
			{ scheduleValue: { season: "", events: null } }
		);
		assertFails(result, /src\/_data\/team\.json: joinText — Expected a string, received number/);
		assertFails(result, /src\/_data\/team\.json: recruitingEmail — Expected a string, received boolean/);
		assertFails(result, /src\/_data\/team\.json: updatedOn — Expected a string, received number/);
		assertFails(result, /src\/_data\/team\.json: practices — Expected an array, received null/);
		assertFails(result, /src\/_data\/team\.json: leadership — Expected an array, received string/);
		assertFails(result, /src\/_data\/roster\.json: players — Expected an array, received object/);
		assertFails(result, /src\/_data\/schedule\.json: events — Expected an array, received null/);
	});

	it("still rejects invalid records inside present arrays", () => {
		const result = withFixture(
			{
				intro: EMPTY_TEAM.intro,
				practices: [{ note: "only a note" }, "nope"],
				leadership: [{ name: "Fixture Skipper", role: "Skipper" }],
			},
			{ players: [{ year: "Jr" }] },
			{ scheduleValue: { events: [{ location: "Field" }] } }
		);
		assertFails(result, /practices\[0\]\.when/);
		assertFails(result, /practices\[0\]\.where/);
		assertFails(result, /practices\[1\]/);
		assertFails(result, /leadership\[0\]\.role/);
		assertFails(result, /players\[0\]\.name/);
		assertFails(result, /events\[0\]\.name/);
	});

	it("still rejects a missing or blank team introduction", () => {
		assertFails(withFixture({}, {}), /src\/_data\/team\.json: intro — Missing field/);
		assertFails(
			withFixture({ intro: "  " }, {}),
			/src\/_data\/team\.json: intro — This field is required and cannot be blank/
		);
	});
});

describe("optional fields", () => {
	it("passes when optional fields are omitted", () => {
		const team = {
			intro: EMPTY_TEAM.intro,
			practices: [{ when: "Tuesday", where: "Field" }],
			leadership: [{ name: "Fixture Officer", role: "Officer" }],
		};
		const roster = {
			players: [{ name: "Fixture Player" }],
		};
		const result = withFixture(team, roster);
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("passes when optional fields are null or empty strings", () => {
		const team = {
			intro: EMPTY_TEAM.intro,
			joinText: null,
			recruitingEmail: "",
			updatedOn: null,
			practices: [{ when: "Tuesday", where: "Field", note: "" }],
			leadership: [{ name: "Fixture Coach", role: "Coach", title: null }],
		};
		const roster = {
			season: null,
			updatedOn: "",
			players: [{ name: "Fixture Player", year: null, jerseyNumber: "" }],
		};
		const result = withFixture(team, roster);
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("fails when optional fields have incorrect types", () => {
		const team = {
			...EMPTY_TEAM,
			joinText: 12,
			recruitingEmail: true,
			updatedOn: ["2026-11-02"],
			practices: [{ when: "Tuesday", where: "Field", note: false }],
			leadership: [{ name: "Fixture Captain", role: "Captain", title: { office: "President" } }],
		};
		const roster = {
			season: 2026,
			updatedOn: { date: "2026-11-02" },
			players: [{ name: "Fixture Player", year: 2, jerseyNumber: 7 }],
		};
		const result = withFixture(team, roster);
		assertFails(result, /joinText/);
		assertFails(result, /recruitingEmail/);
		assertFails(result, /team\.json: updatedOn/);
		assertFails(result, /practices\[0\]\.note/);
		assertFails(result, /leadership\[0\]\.title/);
		assertFails(result, /season/);
		assertFails(result, /roster\.json: updatedOn/);
		assertFails(result, /players\[0\]\.year/);
		assertFails(result, /players\[0\]\.jerseyNumber/);
	});
});

describe("format and role checks", () => {
	it("fails for an invalid recruiting email", () => {
		assertFails(
			withFixture({ ...EMPTY_TEAM, recruitingEmail: "not-an-email" }, EMPTY_ROSTER),
			/recruitingEmail/
		);
	});

	it("fails for an invalid updatedOn date", () => {
		assertFails(
			withFixture({ ...EMPTY_TEAM, updatedOn: "2026-02-30" }, EMPTY_ROSTER),
			/updatedOn/
		);
	});

	it("fails for an invalid leadership role", () => {
		assertFails(
			withFixture(
				{
					...EMPTY_TEAM,
					leadership: [{ name: "Fixture Manager", role: "Manager" }],
				},
				EMPTY_ROSTER
			),
			/leadership\[0\]\.role/
		);
	});
});

describe("valid populated records", () => {
	it("passes for complete team and roster entries", () => {
		const result = withFixture(POPULATED_TEAM, POPULATED_ROSTER);
		assert.equal(result.ok, true, result.errors.join("\n"));
		assert.deepEqual(result.errors, []);
	});

	it("passes for a complete schedule event and video", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
			scheduleValue: {
				season: "Fixture season",
				events: [{ name: "Fixture tournament", date: "April", location: "Fixture field", note: "Saturday" }],
			},
			videosValue: {
				...EMPTY_VIDEOS,
				callahan: [{ title: "Fixture film", url: "https://example.com/film", note: "Public" }],
			},
		});
		assert.equal(result.ok, true, result.errors.join("\n"));
	});
});

describe("schedule and videos", () => {
	it("rejects a schedule event without a name", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				scheduleValue: { season: "", events: [{ location: "Field" }] },
			}),
			/events\[0\]\.name/
		);
	});

	it("rejects a video URL that is not https", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				videosValue: { ...EMPTY_VIDEOS, highlights: [{ title: "Fixture", url: "http://example.com/film" }] },
			}),
			/highlights\[0\]\.url/
		);
	});

	it("passes jersey 0, omitted optional fields, escaped text, several events, and one video in each category", () => {
		const result = withFixture(
			EMPTY_TEAM,
			{
				players: [{ name: "Fixture <Player> & Co.", jerseyNumber: "0" }],
			},
			{
				scheduleValue: {
					season: "",
					events: [
						{ name: "Fixture one <open>" },
						{ name: "Fixture two", date: "Saturday", location: "Field A & B", note: "" },
					],
				},
				videosValue: {
					callahan: [{ title: "Fixture Callahan", url: "https://example.com/callahan" }],
					highlights: [{ title: "Fixture Highlights", url: "https://example.com/highlights" }],
					lowlights: [{ title: "Fixture Lowlights", url: "https://example.com/lowlights" }],
				},
			}
		);
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("rejects a missing thumbnail file", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				videosValue: {
					...EMPTY_VIDEOS,
					highlights: [{
						title: "Fixture",
						url: "https://example.com/highlights",
						thumbnail: "/assets/images/videos/missing.jpg",
						thumbnailWidth: 960,
						thumbnailHeight: 540,
					}],
				},
			}),
			/No thumbnail file exists/
		);
	});

	it("rejects unsafe thumbnail paths", () => {
		const cases = [
			"/assets/images/videos/../../secret.jpg",
			"https://i.ytimg.com/vi/example/hqdefault.jpg",
			"javascript:alert(1)",
			"//example.com/thumb.jpg",
		];
		for (const thumbnail of cases) {
			const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				videosValue: {
					...EMPTY_VIDEOS,
					highlights: [{
						title: "Fixture",
						url: "https://example.com/highlights",
						thumbnail,
						thumbnailWidth: 320,
						thumbnailHeight: 180,
					}],
				},
			});
			assert.equal(result.ok, false, thumbnail);
			assert.match(result.errors.join("\n"), /Thumbnail paths must stay inside src\/assets\/images\/videos\//);
		}
	});

	it("passes a local video thumbnail and still allows a record without one", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
			videoImage: "fixture.jpg",
			videosValue: {
				callahan: [{ title: "Fixture Callahan", url: "https://example.com/callahan" }],
				highlights: [{
					title: "Fixture Highlights",
					url: "https://example.com/highlights",
					note: "Public",
					thumbnail: "/assets/images/videos/fixture.jpg",
					thumbnailWidth: 960,
					thumbnailHeight: 540,
				}],
				lowlights: [],
			},
		});
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("rejects a board member without a name", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				boardValue: { members: [{ role: "PRESIDENT" }] },
			}),
			/members\[0\]\.name/
		);
	});
});

describe("history", () => {
	it("rejects a malformed history root", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, { historyValue: [] }),
			/src\/_data\/history\.json: \(root\)/
		);
	});

	it("rejects duplicate chapter ids", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				historyValue: {
					chapters: [
						{ id: "chapter-1", title: "First", blocks: [{ type: "p", text: "One." }] },
						{ id: "chapter-1", title: "Second", blocks: [{ type: "p", text: "Two." }] },
					],
				},
			}),
			/Duplicate chapter id "chapter-1"/
		);
	});

	it("rejects a figure whose image file is missing", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				historyValue: {
					chapters: [
						{
							id: "chapter-1",
							title: "Fixture chapter",
							blocks: [
								{
									type: "figure",
									src: "/assets/images/history/missing.jpg",
									width: 800,
									height: 600,
									alt: "Missing photograph",
								},
							],
						},
					],
				},
			}),
			/No image file exists/
		);
	});

	it("rejects javascript, data, and protocol-relative links", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
			historyValue: {
				chapters: [
					{
						id: "chapter-1",
						title: "Fixture chapter",
						blocks: [
							{ type: "p", runs: [{ text: "Script", href: "javascript:alert(1)" }] },
							{ type: "p", runs: [{ text: "Data", href: "data:text/html,hi" }] },
							{ type: "p", runs: [{ text: "Protocol", href: "//example.com/film" }] },
						],
					},
				],
			},
		});
		assert.equal(result.ok, false);
		const errors = result.errors.join("\n");
		assert.match(errors, /javascript:alert\(1\)/);
		assert.match(errors, /data:text\/html,hi/);
		assert.match(errors, /\/\/example\.com\/film/);
	});

	it("passes a migrated-shaped chapter with a local image and safe links", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
			historyImage: "history/fixture.jpg",
			historyValue: {
				chapters: [
					{
						id: "chapter-1",
						title: "Part 1: Fixture origin",
						blocks: [
							{ type: "p", text: "A paragraph with an uncertain date, likely Spring of `87." },
							{ type: "h3", text: "Back to the fixture" },
							{ type: "h4", text: "The first throw" },
							{ type: "quote", text: "A quoted line." },
							{
								type: "p",
								runs: [
									{ text: "See " },
									{ text: "the hall", href: "https://example.com/hall" },
									{ text: " or " },
									{ text: "chapter one", href: "/history/#chapter-1" },
								],
							},
							{
								type: "figure",
								src: "/assets/images/history/fixture.jpg",
								width: 800,
								height: 600,
								alt: "Fixture players on a field",
								captionRuns: [
									{ text: "Fixture field, " },
									{ text: "local note", href: "#chapter-1" },
								],
							},
						],
					},
				],
			},
		});
		assert.equal(result.ok, true, result.errors.join("\n"));
	});
});

describe("launch page content", () => {
	it("passes the fixture page content and prepared photographs", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER);
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("rejects a missing pages file", () => {
		assertFails(withFixture(EMPTY_TEAM, EMPTY_ROSTER, { omitPages: true }), /src\/_data\/pages\.json: \(file\)/);
	});

	it("rejects blank required launch copy", () => {
		const pages = structuredClone(FIXTURE_PAGES);
		pages.about.heading = " ";
		pages.contact.foundationText = "";
		pages.donate.text = "";
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, { pagesValue: pages });
		assertFails(result, /about\.heading/);
		assertFails(result, /contact\.foundationText/);
		assertFails(result, /donate\.text/);
	});

	it("rejects unsafe page destinations and duplicated link addresses", () => {
		const pages = structuredClone(FIXTURE_PAGES);
		pages.routes.foundationDonate = "javascript:alert(1)";
		pages.routes.newsletterArchive = "//example.com/list";
		pages.home.heroJoin = { label: "Join", href: "/team/", urlKey: "join" };
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, { pagesValue: pages });
		assert.equal(result.ok, false);
		const errors = result.errors.join("\n");
		assert.match(errors, /routes\.foundationDonate/);
		assert.match(errors, /routes\.newsletterArchive/);
		assert.match(errors, /home\.heroJoin\.href/);
	});

	it("rejects a prepared photograph that is not in the repository", () => {
		const pages = structuredClone(FIXTURE_PAGES);
		pages.about.photo = { id: "../secret", alt: "Fixture" };
		pages.donate.photo = { id: "missing-photo", alt: "Fixture" };
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, { pagesValue: pages });
		assertFails(result, /about\.photo\.id/);
		assertFails(result, /donate\.photo\.id/);
	});

	it("rejects a non-string thumbnail alt and alt text without an image", () => {
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				videoImage: "fixture.jpg",
				videosValue: {
					...EMPTY_VIDEOS,
					highlights: [{
						title: "Fixture",
						url: "https://example.com/highlights",
						thumbnail: "/assets/images/videos/fixture.jpg",
						thumbnailWidth: 960,
						thumbnailHeight: 540,
						thumbnailAlt: 12,
					}],
				},
			}),
			/thumbnailAlt/
		);
		assertFails(
			withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
				videosValue: {
					...EMPTY_VIDEOS,
					highlights: [{
						title: "Fixture",
						url: "https://example.com/highlights",
						thumbnailAlt: "IMUF CMS LOCAL TEST",
					}],
				},
			}),
			/Alt text requires a thumbnail image/
		);
	});

	it("passes editable thumbnail alt text for an existing image", () => {
		const result = withFixture(EMPTY_TEAM, EMPTY_ROSTER, {
			videoImage: "fixture.jpg",
			videosValue: {
				...EMPTY_VIDEOS,
				highlights: [{
					title: "Fixture",
					url: "https://example.com/highlights",
					thumbnail: "/assets/images/videos/fixture.jpg",
					thumbnailWidth: 960,
					thumbnailHeight: 540,
					thumbnailAlt: "IMUF CMS LOCAL TEST",
				}],
			},
		});
		assert.equal(result.ok, true, result.errors.join("\n"));
	});

	it("rejects an unsafe site URL", () => {
		const site = structuredClone(FIXTURE_SITE);
		site.urls.store = "javascript:alert(1)";
		assertFails(withFixture(EMPTY_TEAM, EMPTY_ROSTER, { siteValue: site }), /urls\.store/);
	});
});
