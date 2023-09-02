import { HTTPHeaderRetryAfter } from "./retry_after.ts";
Deno.bench("From String 1", () => {
	new HTTPHeaderRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT");
});
Deno.bench("From String 2", () => {
	new HTTPHeaderRetryAfter("120");
});
