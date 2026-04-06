export interface Env {
  ASSETS: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const assetRequest = new Request(new URL("/index.html", url), request);
      return env.ASSETS.fetch(assetRequest);
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    return new Response("Not found.", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }
};
