import type { IPost } from "./post.interface";

export interface IPostSummary extends Exclude<IPost, "content"> {}
