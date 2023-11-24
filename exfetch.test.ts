import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { ExFetch } from "./exfetch.ts";
Deno.test("Mono 1", {
	permissions: {
		net: ["jsonplaceholder.typicode.com"]
	}
}, async () => {
	const response = await new ExFetch().fetch("https://jsonplaceholder.typicode.com/posts");
	assert(response.ok === true && response.status === 200);
	await response.body?.cancel();
});
Deno.test("Paginate URL 1", {
	permissions: {
		net: ["api.github.com"]
	}
}, async () => {
	const responses = await new ExFetch().fetchPaginate("https://api.github.com/repos/microsoft/vscode/labels?per_page=100");
	assertEquals(responses.map((response: Response) => {
		return response.ok;
	}).includes(false), false);
	for (const response of responses) {
		await response.body?.cancel();
	}
});
