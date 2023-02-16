import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

import { getPost, getPostSummaries } from "../../../modules/post";
import Main from "../../../components/main/main";

export const loadPostSummaries = loader$(async () => await getPostSummaries());
export const loadPost = loader$(async ({ params }) => {
  return await getPost(params?.postId);
});
export const loadUsername = loader$(
  ({ cookie }) => cookie.get("username")?.value
);

/**
 * @todo Still have to produce- or redirect to
 *       404 if post is not found
 */
export default component$(() => {
  const { value: user } = loadUsername.use(),
    { value: posts } = loadPostSummaries.use(),
    { value: post } = loadPost.use();

  return (
    <Main mode="back" posts={posts} post={post} user={user ?? "You"}></Main>
  );
});

export const head: DocumentHead = ({ getData }) => {
  const user = getData(loadUsername) ?? "You",
    post = getData(loadPost);

  return {
    title: `Hey, ${user}`,
    meta: [
      {
        name: "description",
        content: `Hey, ${user}, how do I ${post.title}?`,
      },
    ],
  };
};
