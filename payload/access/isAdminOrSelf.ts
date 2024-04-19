import { Access } from "payload/types";

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (user && user?.roles?.includes("admin")) return true;

  return Boolean(user?.id === id);
};
