import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./main.css?inline";
import Post from "../post/post";
import PostSummary from "../post-summary/post-summary";
import type { IPost } from "../../models/post.interface";
import type { IPostSummary } from "../../models/post-summary.interface";

interface MainProps {
  mode?: "back" | "close";
  post?: IPost;
  posts: IPostSummary[];
  user: string;
}

export default component$(
  ({ mode = "close", post, posts, user }: MainProps) => {
    useStylesScoped$(styles);

    function isLoaded(post?: IPost | null | undefined): post is IPost {
      return !!post?.id;
    }

    const empty = { content: "", datePublished: 0, id: "", title: "" },
      reactivePost = useSignal(post ?? { ...empty }),
      onPostSelect$ = $(async (id?: string) => {
        if (id) {
          history.pushState({}, "", `/post/${id}`);
          reactivePost.value = await (await fetch(`/api/post/${id}`)).json();
        } else {
          document.querySelector("#post-container")?.classList.add("closing");
          document.querySelector("#post-wrapper")?.classList.add("closing");
          setTimeout(() => {
            history.pushState({}, "", "/");
            reactivePost.value = { ...empty };
          }, 200);
        }
      });

    return (
      <>
        <h1>
          <span>Hey,</span> <span>{user}</span>
        </h1>
        <div id="posts-container">
          {posts?.length ? (
            posts?.map((post) => (
              <PostSummary
                key={post.id}
                onPostSelect$={onPostSelect$}
                post={post}
              ></PostSummary>
            ))
          ) : (
            <p>No posts available!</p>
          )}
        </div>
        {isLoaded(reactivePost.value) ? (
          <Post
            mode={mode}
            onExit$={onPostSelect$}
            post={reactivePost.value}
          ></Post>
        ) : (
          ""
        )}
      </>
    );
  }
);
