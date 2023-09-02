import { HTTPHeaderLink } from "./link.ts";
Deno.bench("From String 1", () => {
	new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
});
Deno.bench("From Entries 1", () => {
	new HTTPHeaderLink([
		["https://one.example.com", { rel: "preconnect" }],
		["https://two.example.com", { rel: "preconnect" }],
		["https://three.example.com", { rel: "preconnect" }]
	]);
});
