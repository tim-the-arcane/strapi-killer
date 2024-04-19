import { Access, FieldAccess } from "payload/types";

interface User {
  roles: string[];
}

export const isAdmin: Access | FieldAccess = ({
  req: { user },
}: {
  req: { user: User };
}) => {
  if (user && user?.roles?.includes("admin")) return true;

  return false;
};
