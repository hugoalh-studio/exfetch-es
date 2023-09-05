import { HTTPHeaderRetryAfter } from "./retry_after.ts";
Deno.bench("From String 1", { permissions: "none" }, () => {
	new HTTPHeaderRetryAfter("Wed, 21 Oct 2015 07:28:00 GMT");
});
Deno.bench("From String 2", { permissions: "none" }, () => {
	new HTTPHeaderRetryAfter("120");
});
