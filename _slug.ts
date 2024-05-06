import process from "node:process";
export const slug: string = ((): string => {
	//@ts-ignore `Bun` may exists.
	if (typeof Bun !== "undefined") {
		return `Bun/${process.versions.bun}-${process.platform}-${process.arch}`;
	}
	if (navigator?.userAgent === "Cloudflare-Workers") {
		return `CloudflareWorkers/*`;
	}
	if (typeof Deno !== "undefined") {
		const { arch, env, os } = Deno.build;
		return `Deno/${Deno.version.deno}-${os}-${arch}${(typeof env === "undefined") ? "" : `-${env}`}`;
	}
	return `NodeJS/${process.versions.node}-${process.platform}-${process.arch}`;
})();
