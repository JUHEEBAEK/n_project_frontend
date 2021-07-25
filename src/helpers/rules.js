const userNameRules = () => [
  v => !!v || "userName is required",
  v => (v && v.length <= 50) || "userName must be less than 50 characters"
];

const pwdRules = () => [value => !!value || "Identify password is required"];

const emptyCheckRules = () => [v => !!v || "empty is not allowed"];

const nameRules = () => [
  v => !!v || "name is required",
  v => (v && v.length <= 35) || "Name must be less than 25 characters"
];

export { userNameRules, pwdRules, emptyCheckRules, nameRules };
