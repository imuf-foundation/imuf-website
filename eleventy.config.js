import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const validatorPath = join(projectRoot, "scripts", "validate-content.mjs");

export default function (eleventyConfig) {
	eleventyConfig.setNunjucksEnvironmentOptions({
		autoescape: true,
	});

	eleventyConfig.addPassthroughCopy("src/assets/css");
	eleventyConfig.addPassthroughCopy("src/assets/fonts");
	eleventyConfig.addPassthroughCopy("src/assets/js");
	eleventyConfig.addPassthroughCopy("src/assets/images");
	eleventyConfig.addPassthroughCopy("src/robots.txt");

	eleventyConfig.on("eleventy.before", () => {
		const result = spawnSync(process.execPath, [validatorPath], {
			cwd: projectRoot,
			encoding: "utf8",
		});

		if (result.stdout) {
			process.stdout.write(result.stdout);
		}

		if (result.stderr) {
			process.stderr.write(result.stderr);
		}

		if (result.error) {
			throw result.error;
		}

		if (result.status !== 0) {
			throw new Error(
				`Content validation failed (exit ${result.status}). Previous generated pages were left in place.`
			);
		}
	});

	return {
		dir: {
			input: "src",
			includes: "_includes",
			data: "_data",
			output: "_site",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["njk", "md", "html"],
	};
}
