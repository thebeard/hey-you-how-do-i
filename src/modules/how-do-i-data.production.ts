import type { IPost } from "../models/post.interface";

export function getPostData(): Promise<IPost[]> {
  return Promise.resolve([
    {
      content: "abc",
      datePublished: 1676694688687,
      id: "abc",
      title: "Abc",
    },
  ]);
}
