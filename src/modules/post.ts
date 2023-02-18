import type { IPost } from "../models/post.interface";
import type { IPostSummary } from "../models/post-summary.interface";

/**
 * Get a single post
 * @param postId Id of the post to get
 * @todo Should be able to improve performance here
 * @returns An asynchronous post
 */
export function getPost(postId: string): Promise<IPost> {
  return getPosts().then(
    (posts) => posts.find(({ id }) => postId === id) as IPost
  );
}

/**
 * Get the entire collection of post summaries
 * @returns An asynchronous list of post summaries
 */
export function getPostSummaries(): Promise<IPostSummary[]> {
  return getPosts().then((posts) =>
    posts.map(
      ({ datePublished, id, title, tags }) =>
        ({
          datePublished,
          id,
          tags,
          title,
        } as IPostSummary)
    )
  );
}

/**
 * Get the entire collection of posts
 * @returns An asynchronous list of posts
 */
export function getPosts(): Promise<IPost[]> {
  return import(`./how-do-i-data.${import.meta.env.MODE}`).then((a) =>
    a.getPostData()
  );
}
