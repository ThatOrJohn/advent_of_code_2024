async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;
  let module;

  try {
    module = await import(`.${path}.ts`);
  } catch (_error) {
    return new Response("Not found", { status: 404 });
  }

  if (module[method]) {
    return module[method](req);
  }

  return new Response("Method not implemented", { status: 501 });
}

Deno.serve(handler);
