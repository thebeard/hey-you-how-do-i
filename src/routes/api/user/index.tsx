import type { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async ({ request, cookie, text }) => {
  const { username = null } = await request.json();
  cookie.set("username", username, {
    httpOnly: false,
    maxAge: 2147483647,
    path: "/",
  });
  text(200, "");
};
