import HTTPHeaderLink from "./link.ts";
Deno.bench({
	name: "From String 1",
	fn: () => {
		new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	}
});
Deno.bench({
	name: "From Entries 1",
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
