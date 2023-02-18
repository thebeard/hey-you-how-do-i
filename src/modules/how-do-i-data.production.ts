import * as fs from "fs";
import * as path from "path";

import type { IPost } from "../models/post.interface";

const getPostElements: (rows: string[]) => [string, string[]] = (
  rows: string[]
) => {
  let tags: string[] = [],
    sliceIndex = 0;

  if (rows.at(0)?.startsWith("// #")) {
    tags = (rows.at(0) ?? "")
      .substring(3)
      .split(",")
      .map((tag) => tag.trim());

    if (rows.at(1)?.trim() === "") {
      // There was a row of tags and an empty row thereafter
      // So the remaining content starts on row 3
      sliceIndex = 2;
    } else {
      // There was a row of tags, but not an empty row thereafter
      // So the remaining content starts on row 2
      sliceIndex = 1;
    }
  }

  const content = rows.slice(sliceIndex).join("\n");
  return [content, tags];
};

const mapFileToPost: (_: string) => IPost = (fileName: string) => {
  const filePath = path.join(`./data/${fileName}`),
    datePublished = fs.statSync(filePath).mtime.getTime(),
    parsedPath = path.parse(fileName),
    rows = fs.readFileSync(filePath, { encoding: "utf-8" })?.split("\n"),
    title = parsedPath.name.replace(/-/g, " "),
    [content, tags] = getPostElements(rows);

  return {
    content,
    datePublished,
    id: btoa(parsedPath.name),
    tags,
    title,
  };
};

export function getPostData(): Promise<IPost[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join("./data"), (error, files = []) => {
      if (error) {
        reject(error);
      }

      resolve(
        files
          .filter(
            (filename) =>
              !filename.startsWith(".") && !filename.includes("object")
          )
          .map(mapFileToPost)
      );
    });
  });
}
