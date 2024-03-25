export const slug: string = await (async (): Promise<string> => {
	//@ts-ignore `Bun` may exists, but do not polyfill to prevent pollution.
	if (typeof Bun !== "undefined") {
		const process = await import("node:process");
		return `Bun/${process.versions.bun}-${process.platform}-${process.arch}`;
	}
	if (typeof Deno !== "undefined") {
		const { arch, env, os } = Deno.build;
		return `Deno/${Deno.version.deno}-${os}-${arch}${(typeof env === "undefined") ? "" : `-${env}`}`;
	}
	//@ts-ignore `process` (for NodeJS) may exists, but do not polyfill to prevent pollution.
	if (typeof process !== "undefined") {
		//@ts-ignore `process` (for NodeJS) is exists, but do not polyfill to prevent pollution.
		//deno-lint-ignore no-undef
		return `NodeJS/${process.versions.node}-${process.platform}-${process.arch}`;
	}
	if (navigator?.userAgent === "Cloudflare-Workers") {
		return `CloudflareWorkers/*`;
	}
	throw new Error(`Unable to generate slug!`);
})();
