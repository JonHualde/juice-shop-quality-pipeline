import type { APIRequestContext } from "@playwright/test";
import type {
  RegistrationOptions,
  SecurityQuestion,
  SecurityQuestionsResponse,
  TestUser,
} from "../types";

const getRequiredValue = (
  value: string | undefined,
  variableName: string,
): string => {
  if (!value) {
    throw new Error(`${variableName} is required`);
  }

  return value;
};

export const getSecurityQuestion = async (
  request: APIRequestContext,
  question = process.env.SECURITY_QUESTION,
): Promise<SecurityQuestion> => {
  const questionToFind = getRequiredValue(question, "SECURITY_QUESTION");
  const response = await request.get("/api/SecurityQuestions");

  if (!response.ok()) {
    throw new Error(`Unable to load security questions: ${response.status()}`);
  }

  const { data: questions } =
    (await response.json()) as SecurityQuestionsResponse;

  const securityQuestion = questions.find(
    ({ question: availableQuestion }) => availableQuestion === questionToFind,
  );

  if (!securityQuestion) {
    throw new Error(`Security question not found: ${questionToFind}`);
  }

  return securityQuestion;
};

export const registerNewUser = async (
  request: APIRequestContext,
  user: TestUser,
  options: RegistrationOptions = {},
): Promise<void> => {
  const securityQuestion = await getSecurityQuestion(
    request,
    options.securityQuestion,
  );

  const securityAnswer = getRequiredValue(
    options.securityAnswer ?? process.env.SECURITY_QUESTION_ANSWER,
    "SECURITY_QUESTION_ANSWER",
  );

  const registrationResponse = await request.post("/api/Users", {
    data: {
      email: user.email,
      password: user.password,
      passwordRepeat: user.password,
      securityQuestion,
      securityAnswer,
    },
  });

  if (registrationResponse.status() !== 201) {
    throw new Error(
      `Unable to register test user: ${registrationResponse.status()} ${await registrationResponse.text()}`,
    );
  }
};
