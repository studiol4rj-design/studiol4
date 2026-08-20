Deno.serve(() => {
  return new Response(
    JSON.stringify({
      ok: true,
      service: "studio-l4-heartbeat",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
});
