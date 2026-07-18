export type TestUser = {
  email: string;
  password: string;
};

export type TestUserInput = Partial<TestUser>;

export type SecurityQuestionsResponse = {
  data: SecurityQuestion[];
};

export type SecurityQuestion = {
  id: number;
  question: string;
};

export type RegistrationOptions = {
  securityQuestion?: string;
  securityAnswer?: string;
};
