const ALLOWED = /^\/bot\d+:[A-Za-z0-9_-]+\/sendMessage$/;

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/") {
    return new Response("ok");
  }

  if (req.method !== "POST" || !ALLOWED.test(url.pathname)) {
    return new Response("not found", { status: 404 });
  }

  const res = await fetch(`https://api.telegram.org${url.pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
});
