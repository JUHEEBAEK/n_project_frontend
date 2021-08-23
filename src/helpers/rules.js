const userIdRules = isChecked => [
  v => !!v || "id는 필수 입력값입니다.",
  v => (v && v.length <= 50) || "id는 50자 미만으로 작성해주세요.",
  dupulicateIdCheck(isChecked)
];

const dupulicateIdCheck = v => !v || "중복된 ID입니다. 다른 ID를 입력해주세요.";

const pwdRules = () => [v => !!v || "password is required"];

const identifyPwdRules = isInCorrectPw => [v => !!v || "Identify password is required", checkCorrectPw(isInCorrectPw)];

const checkCorrectPw = v => !v || "Password Incorrect";

const emptyCheckRules = () => [v => !!v || "empty is not allowed"];

const nameRules = () => [
  v => !!v || "name is required",
  v => (v && v.length <= 35) || "Name must be less than 25 characters"
];

export { userIdRules, pwdRules, identifyPwdRules, emptyCheckRules, nameRules };
