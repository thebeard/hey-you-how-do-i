import { component$, useClientEffect$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";

import { getPostSummaries } from "../modules/post";
import Main from "../components/main/main";
import UsernamePrompt from "../components/username-prompt/username-prompt";

export const loadPostSummaries = loader$(async () => await getPostSummaries());
export const loadUsername = loader$(
  ({ cookie }) => cookie.get("username")?.value
);

export default component$(() => {
  // We load this eagerly as a user will never use the site without
  // the syntax highlighter, requiring multiple chunks to download
  useClientEffect$(
    () => {
      SyntaxHighlighter.registerLanguage("typescript", ts);
    },
    { eagerness: "idle" }
  );

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
