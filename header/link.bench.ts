import HTTPHeaderLink from "./link.ts";
Deno.bench({
	name: "From String",
	fn: () => {
		new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	}
});
Deno.bench({
	name: "From Entries",
	fn: () => {
		new HTTPHeaderLink([
			["https://one.example.com", {
				rel: "preconnect"
			}],
			["https://two.example.com", {
				rel: "preconnect"
			}],
			["https://three.example.com", {
				rel: "preconnect"
			}]
		]);
	}
});
