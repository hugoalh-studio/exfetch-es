import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { Brotli, Deflate, Gzip, LZ4, Zlib } from "./mod.ts";
const sampleContext = `Et laoreet et amet invidunt aliquyam dolores duo nibh gubergren labore minim voluptua et feugiat labore. Erat sed et lorem stet ipsum et sit stet. Duo diam takimata. Clita diam dolor commodo ea placerat clita option ipsum sanctus takimata quis. Erat ea sit et adipiscing qui accusam sanctus diam accusam diam est tempor et sadipscing takimata takimata et. Et ullamcorper et at. Amet gubergren elitr veniam lorem aliquam gubergren sadipscing in ea.

Clita accumsan ut facilisis dolore dolores sed ipsum. Vel illum molestie justo facilisi consectetuer sed et. Eleifend in nulla iusto et tincidunt in diam laoreet et kasd. Magna eos ut. Iriure eleifend diam consequat duo diam ea iusto eos molestie duis sanctus. In tempor sit kasd ipsum et kasd ea eos exerci. Elit sea in. Gubergren erat amet no magna commodo clita magna quod sit eros. Elitr ut lorem consequat sed erat ut labore et et hendrerit. Eos justo at diam elitr qui amet gubergren eirmod rebum stet tempor accusam labore tempor consetetur.

Amet no facer et et erat tincidunt clita amet clita et nulla molestie sit erat et vel magna vero. Diam nonumy consequat ut sed nihil eos eum diam euismod. Elitr eos diam augue sed euismod sit et sit et magna tempor esse labore accumsan ullamcorper eum sea. Volutpat sea et nonumy et aliquyam tempor vero sed placerat accusam sed ut hendrerit. Aliquyam ipsum eros at. Sanctus dolor sed kasd dolore no lorem sed consetetur odio tempor ipsum in. Est dolor accusam labore clita ut. Aliquip possim eum sanctus eirmod sit kasd consetetur elitr est lorem justo diam.

Erat no consequat diam invidunt lorem aliquyam takimata aliquip sed sea magna ipsum amet sea et stet. Voluptua amet amet lorem est. Delenit elitr ut invidunt amet tempor erat exerci.

Vel stet amet placerat nonumy diam diam. Elitr rebum congue et no euismod consequat dolor invidunt. Amet eos diam magna ipsum vel nibh vero ea sadipscing eros. Stet vel no labore amet sit lorem sed. Invidunt kasd et takimata sed eirmod sed lorem vero. Ea sit eu voluptua iriure delenit nobis te ipsum ea duis in sit.`;
Deno.test("Brotli", () => {
	assertEquals(Brotli.decodeToString(Brotli.encode(sampleContext)), sampleContext);
});
Deno.test("Deflate", () => {
	assertEquals(Deflate.decodeToString(Deflate.encode(sampleContext)), sampleContext);
});
Deno.test("Gzip", () => {
	assertEquals(Gzip.decodeToString(Gzip.encode(sampleContext)), sampleContext);
});
Deno.test("LZ4", () => {
	assertEquals(LZ4.decodeToString(LZ4.encode(sampleContext)), sampleContext);
});
Deno.test("Zlib", () => {
	assertEquals(Zlib.decodeToString(Zlib.encode(sampleContext)), sampleContext);
});
