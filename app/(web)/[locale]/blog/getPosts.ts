import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getPosts = async (locale: string, page: number = 1) => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find<"posts">({
    collection: "posts",
    locale: locale as "de" | "en",
    limit: 5,
    page,
  });

  return posts.docs;
};
