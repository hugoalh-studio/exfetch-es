import { assertEquals } from "https://deno.land/std@0.198.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.198.0/assert/assert_throws.ts";
import HTTPHeaderLink from "./link.ts";
Deno.test({
	name: "P-1",
	fn: () => {
		let instance = new HTTPHeaderLink(`<https://example.com>; rel="preconnect"`);
		assertEquals(instance.hasParameter("rel", "preconnect"), true);
		assertEquals(instance.hasParameter("rel", "connect"), false);
		assertEquals(instance.hasParameter("rel", "postconnect"), false);
		assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com");
	}
});
Deno.test({
	name: "P-2",
	fn: () => {
		let instance = new HTTPHeaderLink(`<https://example.com/%E8%8B%97%E6%9D%A1>; rel="preconnect"`);
		assertEquals(instance.hasParameter("rel", "preconnect"), true);
		assertEquals(instance.hasParameter("rel", "connect"), false);
		assertEquals(instance.hasParameter("rel", "postconnect"), false);
		assertEquals(instance.getByRel("preconnect")[0][0], "https://example.com/苗条");
	}
});
Deno.test({
	name: "P-3",
	fn: () => {
		let instance = new HTTPHeaderLink(`<https://one.example.com>; rel="preconnect", <https://two.example.com>; rel="preconnect", <https://three.example.com>; rel="preconnect"`);
		assertEquals(instance.hasParameter("rel", "preconnect"), true);
		assertEquals(instance.hasParameter("rel", "connect"), false);
		assertEquals(instance.hasParameter("rel", "postconnect"), false);
		assertEquals(instance.getByRel("preconnect")[0][0], "https://one.example.com");
		assertEquals(instance.getByRel("preconnect")[1][0], "https://two.example.com");
		assertEquals(instance.getByRel("preconnect")[2][0], "https://three.example.com");
	}
});
Deno.test({
	name: "P-4",
	fn: () => {
		let instance = new HTTPHeaderLink(``);
		assertEquals(instance.hasParameter("rel", "preconnect"), false);
		assertEquals(instance.hasParameter("rel", "connect"), false);
		assertEquals(instance.hasParameter("rel", "postconnect"), false);
		assertEquals(instance.entries().length, 0);
	}
});
Deno.test({
	name: "F-1",
	fn: () => {
		assertThrows(() => {
			new HTTPHeaderLink(`https://bad.example; rel="preconnect"`);
		});
	}
});
Deno.test({
	name: "F-2",
	fn: () => {
		assertThrows(() => {
			new HTTPHeaderLink(64n);
		});
	}
});
