import { randomUUID } from "node:crypto";
import type { TestUser, TestUserInput } from "../types";

export const buildTestUser = ({
  email,
  password,
}: TestUserInput = {}): TestUser => {
  const userEmail = email ?? `qa.blueprint.${randomUUID()}@example.com`;
  const userPassword = password ?? "TestPassword123@";

  return {
    email: userEmail,
    password: userPassword,
  };
};
