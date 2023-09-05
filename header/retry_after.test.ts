import { assert } from "https://deno.land/std@0.201.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.201.0/assert/assert_throws.ts";
import { HTTPHeaderRetryAfter } from "./retry_after.ts";
Deno.test("From String Good 1", { permissions: "none" }, () => {
	const instance = new HTTPHeaderRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT");
	assertEquals(instance.getDate().valueOf(), 1445412480000);
	assertEquals(instance.getRemainTimeMilliseconds(), 0);
	assertEquals(instance.getRemainTimeSeconds(), 0);
});
Deno.test("From String Good 2", { permissions: "none" }, () => {
	const instance = new HTTPHeaderRetryAfter("120");
	const remainTimeMilliseconds = instance.getRemainTimeMilliseconds();
	const remainTimeSeconds = instance.getRemainTimeSeconds();
	assert(remainTimeMilliseconds > 0 && remainTimeMilliseconds <= 120000);
	assert(remainTimeSeconds > 0 && remainTimeSeconds <= 120);
});
Deno.test("From String Bad 1", { permissions: "none" }, () => {
	assertThrows(() => {
		new HTTPHeaderRetryAfter("2011-10-05T14:48:00.000Z");
	});
});
