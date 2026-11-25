import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const LEADERSHIP_ROLES = new Set(["Captain", "Officer", "Coach"]);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEAM_FILE = "src/_data/team.json";
const ROSTER_FILE = "src/_data/roster.json";
const SCHEDULE_FILE = "src/_data/schedule.json";
const VIDEOS_FILE = "src/_data/videos.json";
const BOARD_FILE = "src/_data/board.json";
const HISTORY_FILE = "src/_data/history.json";
const SITE_FILE = "src/_data/site.json";
const PAGES_FILE = "src/_data/pages.json";
const SITE_URL_KEYS = ["home", "team", "join", "roster", "donate", "contact", "store", "instagram", "facebook", "x"];
const PAGE_ROUTE_KEYS = [
	"about",
	"board",
	"history",
	"videos",
	"newsletters",
	"schedule",
	"resources",
	"resourcesBasics",
	"practices",
	"scholarship",
	"foundationContact",
	"foundationDonate",
	"newsletterArchive",
	"videoArchive",
];
const PHOTO_WIDTHS = [640, 960, 1600];
const VIDEO_GROUPS = ["callahan", "highlights", "lowlights"];
const HISTORY_TYPES = new Set(["p", "h3", "h4", "quote", "figure"]);
const TEXTUAL_HISTORY_TYPES = new Set(["p", "h3", "h4", "quote"]);
const SAFE_ID = /^[A-Za-z][A-Za-z0-9_-]*$/;
const HTTPS_URL = /^https:\/\/[^\s]+$/;

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function describeType(value) {
	if (value === null) {
		return "null";
	}

	if (Array.isArray(value)) {
		return "array";
	}

	return typeof value;
}

function isPlainObject(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isAbsentOptional(value) {
	return value === undefined || value === null || value === "";
}

export function validateContent(projectRoot = defaultRoot) {
	const errors = [];

	function addError(file, field, message) {
		errors.push(`${file}: ${field} — ${message}`);
	}

	function readJson(relativePath) {
		const absolutePath = join(projectRoot, relativePath);
		let raw;

		try {
			raw = readFileSync(absolutePath, "utf8");
		} catch (error) {
			addError(relativePath, "(file)", `Could not read file (${error.message}).`);
			return { parsed: false };
		}

		try {
			return { parsed: true, value: JSON.parse(raw) };
		} catch (error) {
			addError(relativePath, "(file)", `Invalid JSON (${error.message}).`);
			return { parsed: false };
		}
	}

	function assertRequiredString(file, field, value) {
		if (value === undefined) {
			addError(file, field, "Missing field. Expected a nonblank string.");
			return;
		}

		if (typeof value !== "string") {
			addError(file, field, `Expected a nonblank string, received ${describeType(value)}.`);
			return;
		}

		if (value.trim() === "") {
			addError(file, field, "This field is required and cannot be blank.");
		}
	}

	function assertOptionalString(file, field, value) {
		if (isAbsentOptional(value)) {
			return;
		}

		if (typeof value !== "string") {
			addError(file, field, `Expected a string, received ${describeType(value)}.`);
		}
	}

	function assertOptionalEmail(file, field, value) {
		if (isAbsentOptional(value)) {
			return;
		}

		if (typeof value !== "string") {
			addError(file, field, `Expected a string, received ${describeType(value)}.`);
			return;
		}

		if (!EMAIL.test(value)) {
			addError(file, field, "Must be empty or a valid email address.");
		}
	}

	function assertOptionalIsoDate(file, field, value) {
		if (isAbsentOptional(value)) {
			return;
		}

		if (typeof value !== "string") {
			addError(file, field, `Expected a string, received ${describeType(value)}.`);
			return;
		}

		if (!ISO_DATE.test(value)) {
			addError(file, field, "Must be empty or a valid YYYY-MM-DD date.");
			return;
		}

		const [year, month, day] = value.split("-").map(Number);
		const date = new Date(Date.UTC(year, month - 1, day));

		if (
			date.getUTCFullYear() !== year ||
			date.getUTCMonth() !== month - 1 ||
			date.getUTCDate() !== day
		) {
			addError(file, field, `"${value}" is not a valid calendar date.`);
		}
	}

	// Pages CMS drops an empty list instead of writing []. Null stays invalid.
	function optionalArray(file, field, value) {
		if (value === undefined) {
			return [];
		}

		if (!Array.isArray(value)) {
			addError(file, field, `Expected an array, received ${describeType(value)}.`);
			return null;
		}

		return value;
	}

	function validateTeam(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertRequiredString(file, "intro", data.intro);
		assertOptionalString(file, "joinText", data.joinText);
		assertOptionalEmail(file, "recruitingEmail", data.recruitingEmail);
		assertOptionalIsoDate(file, "updatedOn", data.updatedOn);

		const practices = optionalArray(file, "practices", data.practices);
		practices?.forEach((practice, index) => {
			const prefix = `practices[${index}]`;

			if (!isPlainObject(practice)) {
				addError(file, prefix, `Expected an object, received ${describeType(practice)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.when`, practice.when);
			assertRequiredString(file, `${prefix}.where`, practice.where);
			assertOptionalString(file, `${prefix}.note`, practice.note);
		});

		const leadership = optionalArray(file, "leadership", data.leadership);
		leadership?.forEach((person, index) => {
			const prefix = `leadership[${index}]`;

			if (!isPlainObject(person)) {
				addError(file, prefix, `Expected an object, received ${describeType(person)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.name`, person.name);
			assertRequiredString(file, `${prefix}.role`, person.role);
			assertOptionalString(file, `${prefix}.title`, person.title);

			if (typeof person.role === "string" && person.role.trim() !== "" && !LEADERSHIP_ROLES.has(person.role)) {
				addError(
					file,
					`${prefix}.role`,
					`Must be one of: Captain, Officer, Coach. Received "${person.role}".`
				);
			}
		});
	}

	function validateRoster(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertOptionalString(file, "season", data.season);
		assertOptionalIsoDate(file, "updatedOn", data.updatedOn);

		const players = optionalArray(file, "players", data.players);
		players?.forEach((player, index) => {
			const prefix = `players[${index}]`;

			if (!isPlainObject(player)) {
				addError(file, prefix, `Expected an object, received ${describeType(player)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.name`, player.name);
			assertOptionalString(file, `${prefix}.year`, player.year);
			assertOptionalString(file, `${prefix}.jerseyNumber`, player.jerseyNumber);
		});
	}

	function validateSchedule(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertOptionalString(file, "season", data.season);

		const events = optionalArray(file, "events", data.events);
		events?.forEach((event, index) => {
			const prefix = `events[${index}]`;

			if (!isPlainObject(event)) {
				addError(file, prefix, `Expected an object, received ${describeType(event)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.name`, event.name);
			assertOptionalString(file, `${prefix}.date`, event.date);
			assertOptionalString(file, `${prefix}.location`, event.location);
			assertOptionalString(file, `${prefix}.note`, event.note);
		});
	}

	function validateBoard(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		if (!Array.isArray(data.members)) {
			addError(file, "members", `Expected an array, received ${describeType(data.members)}.`);
			return;
		}

		data.members.forEach((member, index) => {
			const prefix = `members[${index}]`;

			if (!isPlainObject(member)) {
				addError(file, prefix, `Expected an object, received ${describeType(member)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.name`, member.name);
			assertRequiredString(file, `${prefix}.role`, member.role);
			assertOptionalString(file, `${prefix}.classYear`, member.classYear);
		});
	}

	function isSafeHistoryLink(value) {
		if (typeof value !== "string") {
			return false;
		}

		const href = value.trim();

		if (href === "" || href.includes("\\") || href.includes("..") || href.startsWith("//")) {
			return false;
		}

		if (/^javascript:/i.test(href) || /^data:/i.test(href)) {
			return false;
		}

		if (href.startsWith("#")) {
			return /^#[A-Za-z][A-Za-z0-9_-]*$/.test(href);
		}

		let url;

		try {
			url = new URL(href, "https://imuf.local");
		} catch {
			return false;
		}

		if (url.username || url.password) {
			return false;
		}

		if (href.startsWith("/")) {
			return url.origin === "https://imuf.local" && url.pathname.startsWith("/");
		}

		return url.protocol === "https:" && url.hostname !== "";
	}

	function validateRuns(file, field, runs) {
		if (!Array.isArray(runs) || runs.length === 0) {
			addError(file, field, "Expected a non-empty array of text runs.");
			return false;
		}

		let anyText = false;

		runs.forEach((run, index) => {
			const prefix = `${field}[${index}]`;

			if (!isPlainObject(run)) {
				addError(file, prefix, `Expected an object, received ${describeType(run)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.text`, run.text);

			if (typeof run.text === "string" && run.text.trim() !== "") {
				anyText = true;
			}

			if (run.href !== undefined && !isSafeHistoryLink(run.href)) {
				addError(
					file,
					`${prefix}.href`,
					`Rejected unsafe link "${run.href}". Use an https URL, a local route, or a fragment.`
				);
			}
		});

		if (!anyText) {
			addError(file, field, "Text runs need nonblank text.");
			return false;
		}

		return true;
	}

	function validateHistory(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		if (!Array.isArray(data.chapters)) {
			addError(file, "chapters", `Expected an array, received ${describeType(data.chapters)}.`);
			return;
		}

		const seenIds = new Set();
		const imagesRoot = resolve(projectRoot, "src", "assets", "images");

		data.chapters.forEach((chapter, chapterIndex) => {
			const prefix = `chapters[${chapterIndex}]`;

			if (!isPlainObject(chapter)) {
				addError(file, prefix, `Expected an object, received ${describeType(chapter)}.`);
				return;
			}

			assertRequiredString(file, `${prefix}.id`, chapter.id);
			assertRequiredString(file, `${prefix}.title`, chapter.title);

			if (typeof chapter.id === "string" && chapter.id.trim() !== "") {
				if (!SAFE_ID.test(chapter.id)) {
					addError(file, `${prefix}.id`, `Expected a safe fragment id, received "${chapter.id}".`);
				} else if (seenIds.has(chapter.id)) {
					addError(file, `${prefix}.id`, `Duplicate chapter id "${chapter.id}".`);
				} else {
					seenIds.add(chapter.id);
				}
			}

			if (!Array.isArray(chapter.blocks)) {
				addError(file, `${prefix}.blocks`, `Expected an array, received ${describeType(chapter.blocks)}.`);
				return;
			}

			chapter.blocks.forEach((block, blockIndex) => {
				const blockField = `${prefix}.blocks[${blockIndex}]`;

				if (!isPlainObject(block)) {
					addError(file, blockField, `Expected an object, received ${describeType(block)}.`);
					return;
				}

				if (!HISTORY_TYPES.has(block.type)) {
					addError(file, `${blockField}.type`, `Expected p, h3, h4, quote, or figure. Received ${describeType(block.type) === "string" ? `"${block.type}"` : describeType(block.type)}.`);
					return;
				}

				if (TEXTUAL_HISTORY_TYPES.has(block.type)) {
					const hasRuns = block.runs !== undefined;
					const hasText = typeof block.text === "string" && block.text.trim() !== "";

					if (hasRuns) {
						validateRuns(file, `${blockField}.runs`, block.runs);
					}

					if (!hasRuns && !hasText) {
						addError(file, `${blockField}.text`, "Expected nonblank text or text runs.");
					}

					return;
				}

				if (typeof block.src !== "string" || block.src.trim() === "") {
					addError(file, `${blockField}.src`, "Expected an image path beneath src/assets/images/.");
				} else {
					let decoded = block.src;

					try {
						decoded = decodeURIComponent(block.src);
					} catch {
						addError(file, `${blockField}.src`, "Image path could not be decoded.");
						decoded = "";
					}

					if (
						decoded === "" ||
						decoded.includes("..") ||
						decoded.includes("\\") ||
						decoded.startsWith("//") ||
						/^[a-z][a-z0-9+.-]*:/i.test(decoded)
					) {
						addError(file, `${blockField}.src`, "Image paths must stay inside src/assets/images/ and cannot be external or traversal paths.");
					} else {
						let url;

						try {
							url = new URL(decoded, "https://imuf.local");
						} catch {
							url = null;
						}

						const pathname = url ? decodeURIComponent(url.pathname) : "";

						if (!url || url.origin !== "https://imuf.local" || !pathname.startsWith("/assets/images/") || pathname.includes("..")) {
							addError(file, `${blockField}.src`, "Image paths must stay inside src/assets/images/.");
						} else {
							const resolved = resolve(projectRoot, "src", pathname.slice(1));

							if (resolved !== imagesRoot && !resolved.startsWith(`${imagesRoot}${sep}`)) {
								addError(file, `${blockField}.src`, "Image path escapes src/assets/images/.");
							} else if (!existsSync(resolved) || !statSync(resolved).isFile()) {
								addError(file, `${blockField}.src`, `No image file exists at src${pathname}.`);
							}
						}
					}
				}

				if (!Number.isInteger(block.width) || block.width <= 0) {
					addError(file, `${blockField}.width`, "Expected a positive integer.");
				}

				if (!Number.isInteger(block.height) || block.height <= 0) {
					addError(file, `${blockField}.height`, "Expected a positive integer.");
				}

				assertRequiredString(file, `${blockField}.alt`, block.alt);

				if (block.caption !== undefined) {
					assertRequiredString(file, `${blockField}.caption`, block.caption);
				}

				if (block.captionRuns !== undefined) {
					validateRuns(file, `${blockField}.captionRuns`, block.captionRuns);
				}
			});
		});
	}

	function validateVideos(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		for (const group of VIDEO_GROUPS) {
			const items = data[group];

			if (!Array.isArray(items)) {
				addError(file, group, `Expected an array, received ${describeType(items)}.`);
				continue;
			}

			items.forEach((item, index) => {
				const prefix = `${group}[${index}]`;

				if (!isPlainObject(item)) {
					addError(file, prefix, `Expected an object, received ${describeType(item)}.`);
					return;
				}

				assertRequiredString(file, `${prefix}.title`, item.title);

				if (typeof item.url !== "string" || !HTTPS_URL.test(item.url)) {
					addError(file, `${prefix}.url`, "Expected an https URL.");
				}

				assertOptionalString(file, `${prefix}.note`, item.note);
				validateVideoThumbnail(file, prefix, item);
			});
		}
	}

	function validateVideoThumbnail(file, prefix, item) {
		const value = item.thumbnail;
		const field = `${prefix}.thumbnail`;

		if (item.thumbnailAlt !== undefined && item.thumbnailAlt !== null && typeof item.thumbnailAlt !== "string") {
			addError(file, `${prefix}.thumbnailAlt`, `Expected a string, received ${describeType(item.thumbnailAlt)}.`);
		} else if (isAbsentOptional(value) && typeof item.thumbnailAlt === "string" && item.thumbnailAlt.trim() !== "") {
			addError(file, `${prefix}.thumbnailAlt`, "Alt text requires a thumbnail image.");
		}

		if (isAbsentOptional(value)) {
			if (item.thumbnailWidth !== undefined || item.thumbnailHeight !== undefined) {
				addError(file, field, "Thumbnail dimensions require a thumbnail path.");
			}
			return;
		}

		if (typeof value !== "string") {
			addError(file, field, `Expected a string, received ${describeType(value)}.`);
			return;
		}

		let decoded = value;

		try {
			decoded = decodeURIComponent(value);
		} catch {
			addError(file, field, "Thumbnail path could not be decoded.");
			decoded = "";
		}

		if (
			decoded === "" ||
			decoded.includes("..") ||
			decoded.includes("\\") ||
			decoded.startsWith("//") ||
			/^[a-z][a-z0-9+.-]*:/i.test(decoded)
		) {
			addError(file, field, "Thumbnail paths must stay inside src/assets/images/videos/ and cannot be external or traversal paths.");
			return;
		}

		let url;

		try {
			url = new URL(decoded, "https://imuf.local");
		} catch {
			url = null;
		}

		const pathname = url ? decodeURIComponent(url.pathname) : "";
		const videosRoot = resolve(projectRoot, "src", "assets", "images", "videos");

		if (!url || url.origin !== "https://imuf.local" || !pathname.startsWith("/assets/images/videos/") || pathname.includes("..")) {
			addError(file, field, "Thumbnail paths must stay inside src/assets/images/videos/.");
			return;
		}

		const resolved = resolve(projectRoot, "src", pathname.slice(1));

		if (resolved !== videosRoot && !resolved.startsWith(`${videosRoot}${sep}`)) {
			addError(file, field, "Thumbnail path escapes src/assets/images/videos/.");
		} else if (resolved === videosRoot || !existsSync(resolved) || !statSync(resolved).isFile()) {
			addError(file, field, `No thumbnail file exists at src${pathname}.`);
		}

		if (!Number.isInteger(item.thumbnailWidth) || item.thumbnailWidth <= 0) {
			addError(file, `${field}Width`, "Expected a positive integer.");
		}

		if (!Number.isInteger(item.thumbnailHeight) || item.thumbnailHeight <= 0) {
			addError(file, `${field}Height`, "Expected a positive integer.");
		}
	}

	function valueAt(data, path) {
		return path.split(".").reduce((current, key) => {
			if (!isPlainObject(current)) {
				return undefined;
			}
			return current[key];
		}, data);
	}

	function validateSite(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertRequiredString(file, "name", data.name);
		assertRequiredString(file, "shortName", data.shortName);
		assertRequiredString(file, "organization", data.organization);

		if (typeof data.prototype !== "boolean") {
			addError(file, "prototype", `Expected true or false, received ${describeType(data.prototype)}.`);
		}

		if (!isPlainObject(data.urls)) {
			addError(file, "urls", `Expected an object, received ${describeType(data.urls)}.`);
		} else {
			for (const key of SITE_URL_KEYS) {
				if (typeof data.urls[key] !== "string" || !isSafeHistoryLink(data.urls[key])) {
					addError(file, `urls.${key}`, "Expected a safe https URL or local route.");
				}
			}
		}

		if (!Array.isArray(data.nav)) {
			addError(file, "nav", `Expected an array, received ${describeType(data.nav)}.`);
			return;
		}

		data.nav.forEach((item, index) => {
			const prefix = `nav[${index}]`;
			if (!isPlainObject(item)) {
				addError(file, prefix, `Expected an object, received ${describeType(item)}.`);
				return;
			}
			assertRequiredString(file, `${prefix}.id`, item.id);
			assertRequiredString(file, `${prefix}.label`, item.label);
			if (typeof item.href !== "string" || !isSafeHistoryLink(item.href)) {
				addError(file, `${prefix}.href`, "Expected a safe https URL, local route, or fragment.");
			}
		});
	}

	function validateLink(file, field, link, routes) {
		if (!isPlainObject(link)) {
			addError(file, field, `Expected an object, received ${describeType(link)}.`);
			return;
		}

		assertRequiredString(file, `${field}.label`, link.label);

		if (link.href !== undefined) {
			addError(file, `${field}.href`, "Store the address once in site.urls or pages.routes.");
		}

		const hasKey = typeof link.urlKey === "string" && link.urlKey.trim() !== "";
		const hasRoute = typeof link.route === "string" && link.route.trim() !== "";

		if (hasKey === hasRoute) {
			addError(file, field, "Set one destination, either urlKey or route.");
		}

		if (hasKey && !SITE_URL_KEYS.includes(link.urlKey)) {
			addError(file, `${field}.urlKey`, `Unknown site URL "${link.urlKey}".`);
		}

		if (hasRoute && (!isPlainObject(routes) || typeof routes[link.route] !== "string")) {
			addError(file, `${field}.route`, `Unknown page route "${link.route}".`);
		}
	}

	function validatePreparedPhoto(file, field, photo) {
		if (!isPlainObject(photo)) {
			addError(file, field, `Expected an object, received ${describeType(photo)}.`);
			return;
		}

		assertRequiredString(file, `${field}.alt`, photo.alt);

		if (typeof photo.id !== "string" || !/^[A-Za-z0-9-]+$/.test(photo.id)) {
			addError(file, `${field}.id`, "Expected the stem of a prepared 640, 960, and 1600 image set.");
			return;
		}

		for (const width of PHOTO_WIDTHS) {
			const relativePath = join("src", "assets", "images", `${photo.id}-${width}.webp`);
			const absolutePath = join(projectRoot, relativePath);
			if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
				addError(file, `${field}.id`, `Missing prepared image ${relativePath}.`);
			}
		}
	}

	function validateStringList(file, field, values) {
		if (!Array.isArray(values) || values.length === 0) {
			addError(file, field, "Expected a non-empty array of text.");
			return;
		}

		values.forEach((value, index) => {
			assertRequiredString(file, `${field}[${index}]`, value);
		});
	}

	function validatePages(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		if (!isPlainObject(data.routes)) {
			addError(file, "routes", `Expected an object, received ${describeType(data.routes)}.`);
		} else {
			for (const key of PAGE_ROUTE_KEYS) {
				if (typeof data.routes[key] !== "string" || !isSafeHistoryLink(data.routes[key])) {
					addError(file, `routes.${key}`, "Expected a safe https URL, local route, or fragment.");
				}
			}
		}

		const requiredStrings = [
			"meta.description",
			"header.homeAriaLabel",
			"header.wordmarkLine1",
			"header.wordmarkLine2",
			"header.navLabel",
			"header.donateLabel",
			"footer.nameLine1",
			"footer.nameLine2",
			"footer.promptLine1",
			"footer.promptLine2",
			"footer.signupAriaLabel",
			"footer.signupLabel",
			"footer.emailPlaceholder",
			"footer.subscribeLabel",
			"footer.homeSubscribeAriaLabel",
			"footer.signupNote",
			"footer.foundationRoute",
			"footer.navLabel",
			"footer.donateLabel",
			"footer.contactLabel",
			"footer.storeLabel",
			"footer.instagramLabel",
			"footer.facebookLabel",
			"footer.xLabel",
			"home.location",
			"home.university",
			"home.titleLine1",
			"home.titleLine2",
			"home.tagline",
			"home.recruitLead",
			"home.recruitTitle",
			"home.hubLine1",
			"home.hubLine2",
			"home.hubNavLabel",
			"home.foundationTitle",
			"home.foundationNavLabel",
			"home.foundationDonate",
			"home.archiveLine1",
			"home.archiveLine2",
			"about.eyebrow",
			"about.heading",
			"about.linksLabel",
			"contact.heading",
			"contact.foundationText",
			"contact.playHeading",
			"contact.playText",
			"donate.heading",
			"donate.text",
			"donate.note",
			"newsletters.eyebrow",
			"newsletters.heading",
			"newsletters.introduction",
			"newsletters.note",
			"history.eyebrow",
			"history.heading",
			"history.navLabel",
			"videos.eyebrow",
			"videos.heading",
			"videos.lede",
			"videos.callahanAction",
			"videos.emptyCallahan",
			"videos.emptyHighlights",
			"videos.emptyLowlights",
		];

		for (const path of requiredStrings) {
			assertRequiredString(file, path, valueAt(data, path));
		}

		if (typeof data.footer?.foundationRoute === "string" && data.footer.foundationRoute.trim() !== "" && typeof data.routes?.[data.footer.foundationRoute] !== "string") {
			addError(file, "footer.foundationRoute", "Choose a route defined in pages.routes.");
		}

		validateLink(file, "footer.archiveLink", data.footer?.archiveLink, data.routes);
		validateLink(file, "home.heroJoin", data.home?.heroJoin, data.routes);
		validateLink(file, "home.heroHub", data.home?.heroHub, data.routes);
		validateLink(file, "home.recruitJoin", data.home?.recruitJoin, data.routes);
		if (data.home?.recruitNew != null) {
			validateLink(file, "home.recruitNew", data.home.recruitNew, data.routes);
		}
		validateLink(file, "home.hubEntry", data.home?.hubEntry, data.routes);
		validateLink(file, "home.archiveAction", data.home?.archiveAction, data.routes);
		validateLink(file, "contact.foundationButton", data.contact?.foundationButton, data.routes);
		validateLink(file, "contact.playLink", data.contact?.playLink, data.routes);
		validateLink(file, "donate.button", data.donate?.button, data.routes);
		validateLink(file, "newsletters.archiveButton", data.newsletters?.archiveButton, data.routes);
		validateLink(file, "newsletters.contactLink", data.newsletters?.contactLink, data.routes);
		validateLink(file, "videos.archiveLink", data.videos?.archiveLink, data.routes);

		const linkLists = [
			["navigation.groups", data.navigation?.groups, true],
			["home.hubLinks", data.home?.hubLinks, false],
			["home.foundationLinks", data.home?.foundationLinks, false],
			["about.links", data.about?.links, false],
		];

		if (!Array.isArray(data.navigation?.groups) || data.navigation.groups.length === 0) {
			addError(file, "navigation.groups", "Expected a non-empty array.");
		} else if (!data.navigation.groups.some((group) => group && group.id === "team")) {
			addError(file, "navigation.groups", 'The team group id must stay "team".');
		}

		for (const [field, entries, grouped] of linkLists) {
			if (!Array.isArray(entries)) {
				if (field !== "navigation.groups") {
					addError(file, field, `Expected an array, received ${describeType(entries)}.`);
				}
				continue;
			}

			entries.forEach((entry, index) => {
				if (grouped) {
					const prefix = `${field}[${index}]`;
					if (!isPlainObject(entry)) {
						addError(file, prefix, `Expected an object, received ${describeType(entry)}.`);
						return;
					}
					assertRequiredString(file, `${prefix}.id`, entry.id);
					assertRequiredString(file, `${prefix}.label`, entry.label);
					if (!Array.isArray(entry.links) || entry.links.length === 0) {
						addError(file, `${prefix}.links`, "Expected a non-empty array.");
						return;
					}
					entry.links.forEach((link, linkIndex) => {
						validateLink(file, `${prefix}.links[${linkIndex}]`, link, data.routes);
					});
					return;
				}

				validateLink(file, `${field}[${index}]`, entry, data.routes);
			});
		}

		validateStringList(file, "home.foundationParagraphs", data.home?.foundationParagraphs);
		validateStringList(file, "about.introduction", data.about?.introduction);

		if (!Array.isArray(data.about?.values) || data.about.values.length === 0) {
			addError(file, "about.values", "Expected a non-empty array.");
		} else {
			data.about.values.forEach((value, index) => {
				if (!isPlainObject(value)) {
					addError(file, `about.values[${index}]`, `Expected an object, received ${describeType(value)}.`);
					return;
				}
				assertRequiredString(file, `about.values[${index}].label`, value.label);
				assertRequiredString(file, `about.values[${index}].text`, value.text);
			});
		}

		validatePreparedPhoto(file, "about.photo", data.about?.photo);
		validatePreparedPhoto(file, "donate.photo", data.donate?.photo);
	}

	const team = readJson(TEAM_FILE);
	if (team.parsed) {
		validateTeam(TEAM_FILE, team.value);
	}

	const roster = readJson(ROSTER_FILE);
	if (roster.parsed) {
		validateRoster(ROSTER_FILE, roster.value);
	}

	const schedule = readJson(SCHEDULE_FILE);
	if (schedule.parsed) {
		validateSchedule(SCHEDULE_FILE, schedule.value);
	}

	const videos = readJson(VIDEOS_FILE);
	if (videos.parsed) {
		validateVideos(VIDEOS_FILE, videos.value);
	}

	const board = readJson(BOARD_FILE);
	if (board.parsed) {
		validateBoard(BOARD_FILE, board.value);
	}

	const history = readJson(HISTORY_FILE);
	if (history.parsed) {
		validateHistory(HISTORY_FILE, history.value);
	}

	const site = readJson(SITE_FILE);
	if (site.parsed) {
		validateSite(SITE_FILE, site.value);
	}

	const pages = readJson(PAGES_FILE);
	if (pages.parsed) {
		validatePages(PAGES_FILE, pages.value);
	}

	return {
		ok: errors.length === 0,
		errors,
	};
}

function isDirectRun() {
	if (!process.argv[1]) {
		return false;
	}

	return import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
}

function runCli() {
	const { ok, errors } = validateContent(defaultRoot);

	if (!ok) {
		console.error(`Content validation failed with ${errors.length} error(s):`);
		for (const error of errors) {
			console.error(`- ${error}`);
		}
		process.exit(1);
	}

	console.log("Content validation passed.");
}

if (isDirectRun()) {
	runCli();
}
