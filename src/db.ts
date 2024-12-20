import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

// export const PrismaClient2 = {
//   sum: {
//     create: () => {},
//   },
// };
