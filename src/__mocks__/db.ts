import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep } from "vitest-mock-extended";

export const db = mockDeep<PrismaClient>();
