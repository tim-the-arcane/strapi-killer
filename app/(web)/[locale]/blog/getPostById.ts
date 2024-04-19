import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getPostById = async (id: number, locale: "de" | "en") => {
  const payload = await getPayload({ config: configPromise });

  try {
    return await payload.findByID<"posts">({
      collection: "posts",
      id,
      locale,
    });
  } catch (error) {
    return null;
  }
};
