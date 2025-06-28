export const JWT_SECRET =
  "82ef17045bcfacc32ce88e89c48e1ea477dc73755ebec522aef7807873babae8409efd9bd3a7d4e0877d864ce76e5bb9585581f250ae8d215df968efe9ea9f332bd6eae170bf81062968ed933ca9e368f88e29b854b4aafd234f9166a74f9441b20b2c370ba5635ace04a0127fec4aefad5b0df7d8e80aa377baff05439d108a812aac4e87b795ef18b89ae97494319814e5825ca2771888eddb61550f3a39aa2832a09810ae83ad44ff4f8d50eab3578be48b210abeef2ab4ad84e1b4503d57e9e76dd7a002edd3d29e3a15b08e683721048ae49d5a371d314f880b59ea35cfecd1f238198c354547e21b4a64d99e6be28503aa1a4b2e3c3df6049fe9d3b91f";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/sign-in",
  REGISTER: "/auth/sign-up",
  DASHBOARD: "/dashboard",
  CREATE_GUEST: "/dashboard/create",
};

export const R_TOKEN = "r_token_neo";

export const SignUpDefaultValues = {
  email: "",
  password: "",
  name: "",
};

export const SignInDefaultValues = {
  email: "",
  password: "",
};

export const AddNewComplaintDefaultValues = {
  location: "",
  description: "",
  photo: "",
  status: false,
};
