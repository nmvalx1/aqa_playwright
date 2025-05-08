import { IRegisterForm } from "./interface.registration_negative_cases";
import { MESSAGES_ON_REGISTRATION } from "./enum.registration_negative_cases";
import { CREDENTIALS } from "./enum.registration_negative_cases";

const dataForRegistration: IRegisterForm[] = [
  {
    testCaseName: "Registration with < MIN length username and password",
    Username: CREDENTIALS.username_min,
    Password: CREDENTIALS.password_min,
    Message: MESSAGES_ON_REGISTRATION.valid_data,
  },
  {
    testCaseName: "Registration with > MAX length username",
    Username: CREDENTIALS.username_max,
    Password: CREDENTIALS.password_valid1,
    Message: MESSAGES_ON_REGISTRATION.username_max_length,
  },
  {
    testCaseName: "Registration with > MAX length password",
    Username: CREDENTIALS.username_valid1,
    Password: CREDENTIALS.password_max,
    Message: MESSAGES_ON_REGISTRATION.pass_max_length,
  },
  {
    testCaseName: "Required field password",
    Username: CREDENTIALS.username_valid2,
    Password: "",
    Message: MESSAGES_ON_REGISTRATION.pass_required,
  },
  {
    testCaseName: "Required field username",
    Username: "",
    Password: CREDENTIALS.password_valid2,
    Message: MESSAGES_ON_REGISTRATION.username_required,
  },
];


export { dataForRegistration };
