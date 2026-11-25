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

	function validateTeam(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertRequiredString(file, "intro", data.intro);
		assertOptionalString(file, "joinText", data.joinText);
		assertOptionalEmail(file, "recruitingEmail", data.recruitingEmail);
		assertOptionalIsoDate(file, "updatedOn", data.updatedOn);

		if (!Array.isArray(data.practices)) {
			addError(file, "practices", `Expected an array, received ${describeType(data.practices)}.`);
		} else {
			data.practices.forEach((practice, index) => {
				const prefix = `practices[${index}]`;

				if (!isPlainObject(practice)) {
					addError(file, prefix, `Expected an object, received ${describeType(practice)}.`);
					return;
				}

				assertRequiredString(file, `${prefix}.when`, practice.when);
				assertRequiredString(file, `${prefix}.where`, practice.where);
				assertOptionalString(file, `${prefix}.note`, practice.note);
			});
		}

		if (!Array.isArray(data.leadership)) {
			addError(file, "leadership", `Expected an array, received ${describeType(data.leadership)}.`);
		} else {
			data.leadership.forEach((person, index) => {
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
	}

	function validateRoster(file, data) {
		if (!isPlainObject(data)) {
			addError(file, "(root)", `Expected a JSON object, received ${describeType(data)}.`);
			return;
		}

		assertOptionalString(file, "season", data.season);
		assertOptionalIsoDate(file, "updatedOn", data.updatedOn);

		if (!Array.isArray(data.players)) {
			addError(file, "players", `Expected an array, received ${describeType(data.players)}.`);
			return;
		}

		data.players.forEach((player, index) => {
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

		if (!Array.isArray(data.events)) {
			addError(file, "events", `Expected an array, received ${describeType(data.events)}.`);
			return;
		}

		data.events.forEach((event, index) => {
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
