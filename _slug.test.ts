import { assert } from "STD/assert/assert";
import { slug } from "./_slug.ts";
Deno.test("Main", { permissions: "none" }, () => {
	assert(slug.startsWith("Deno/"));
});
