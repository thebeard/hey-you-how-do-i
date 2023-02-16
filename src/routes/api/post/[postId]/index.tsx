import type { RequestHandler } from "@builder.io/qwik-city";
import { getPost } from "../../../../modules/post";

export const onGet: RequestHandler = async ({ params, json }) => {
  json(200, await getPost(params.postId));
};
