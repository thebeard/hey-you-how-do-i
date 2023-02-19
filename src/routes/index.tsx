import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city"; // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { getPostSummaries } from "../modules/post";
import Main from "../components/main/main";
import UsernamePrompt from "../components/username-prompt/username-prompt";

export const loadPostSummaries = loader$(async () => await getPostSummaries());
export const loadUsername = loader$(
  ({ cookie }) => cookie.get("username")?.value
);

export default component$(() => {
  const user = loadUsername.use(),
    { value: posts } = loadPostSummaries.use();

  return (
    <>
      <Main posts={posts} user={user.value ?? "You"}></Main>
      {!user.value && (
        <UsernamePrompt
          onUsernameUpdate$={(username) => {
            user.value = username;
            window.document.title = `Hey, ${username}`;
          }}
        ></UsernamePrompt>
      )}
    </>
  );
});

export const head: DocumentHead = ({ getData }) => {
  const user = getData(loadUsername) ?? "You";
  return {
    title: `Hey, ${user}`,
    meta: [
      {
        name: "description",
        content: `Hey, ${user}, how do I solve the most common development problems in Javascript or Typescript? Well, you come right here!`,
      },
    ],
  };
};
