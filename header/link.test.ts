import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.200.0/assert/assert_throws.ts";
import HTTPHeaderLink from "./link.ts";
Deno.test("Equal 1", () => {
	const instance = new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com");
});
Deno.test("Equal 2", () => {
	const instance = new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com/苗条");
});
Deno.test("Equal 3", () => {
	const instance = new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.getByRel("preconnect")[0][0], "https://one.example.com");
	assertEquals(instance.getByRel("preconnect")[1][0], "https://two.example.com");
	assertEquals(instance.getByRel("preconnect")[2][0], "https://three.example.com");
});
Deno.test("Equal 4", () => {
	const instance = new HTTPHeaderLink(``);
	assertEquals(instance.hasParameter("rel", "preconnect"), false);
	assertEquals(instance.hasParameter("rel", "connect"), false);
	assertEquals(instance.hasParameter("rel", "postconnect"), false);
	assertEquals(instance.entries().length, 0);
});
Deno.test("Equal 5", () => {
	const instance = new HTTPHeaderLink([
		["https://one.example.com", {
			rel: "preconnect"
		}]
	]);
	assertEquals(instance.hasParameter("rel", "preconnect"), true);
	assertEquals(instance.entries().length, 1);
	assertEquals(instance.toString(), `<https://one.example.com>; rel="preconnect"`);
});
Deno.test("Throw 1", () => {
	assertThrows(() => {
		new HTTPHeaderLink(`https://bad.example; rel="preconnect"`);
	});
});
Deno.test("Throw 2", () => {
	assertThrows(() => {
		new HTTPHeaderLink(64n);
	});
});
