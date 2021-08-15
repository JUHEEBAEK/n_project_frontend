// const requireJson = require.context("@/assets/values/language", true, /\.json$/);
import eng, { modules as enModules } from "@/assets/value/language/eng";
import kor, { modules as krModules } from "@/assets/value/language/kor";

const messages = {
  eng,
  kor
};

const modules = {
  eng: enModules,
  kor: krModules
};

const getMessages = (language, moduleName) => {
  if (moduleName) {
    return modules[language][moduleName];
  }
  return messages[language];
};

export const getMessageByModules = language => modules[language];

export default getMessages;
