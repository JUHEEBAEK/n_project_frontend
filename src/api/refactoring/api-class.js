import axios from "axios";
// import { constants } from 'onthemark-common'

// import config from 'config'
import * as modules from "./modules";
import getMessages from "@/helpers/message";

// const { server } = constants
// const ServerMessage = server.default

const defaultHandleSuccess = result => {
  return result;
};

const defaultHandleError = result => {
  return result;
};

/* axios */
const defaultHandleRequest = config => {
  return config;
};

function isTimeoutError(error) {
  const { config, message } = error;
  if (message === `timeout of ${config.timeout}ms exceeded`) {
    return true;
  }
  return false;
}

class ApiClient {
  constructor(
    configModules,
    {
      handleSuccess = defaultHandleSuccess,
      handleError = defaultHandleError,
      handleRequest = defaultHandleRequest,
      language
    }
  ) {
    console.log("???");
    this.languageDictionary = getMessages(language);
    this.instances = {};
    Object.keys(configModules).forEach(module => {
      const instance = axios.create(configModules[module]);
      this.instances[module] = instance;

      if (module !== "background") {
        instance.interceptors.request.use(handleRequest);
      }
      instance.interceptors.response.use(
        this.handleSuccess(module, handleSuccess),
        this.handleError(module, handleError)
      );

      /* method binding */
      this[module] = {};
      Object.keys(modules[module]).forEach(method => {
        this[module][method] = modules[module][method].bind(instance);
      });
    });
  }

  handleSuccess(module, callback) {
    return response => {
      const result = {
        success: true,
        response
      };
      if (callback && typeof callback === "function") {
        return callback(result);
      }
      return Promise.resolve(result);
    };
  }

  handleError(module, callback) {
    return error => {
      let result = {
        success: false,
        error: {
          message: "Fail to request"
        },
        module,
        config: error.config
      };
      if (error.response) {
        const { data, status } = error.response;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
        result = {
          ...result,
          success: false,
          error: {
            message: (data && data.errorMsg) || "Fail to request",
            status
          }
        };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        if (isTimeoutError(error)) {
          result = {
            ...result,
            success: false,
            error: {
              message: "Request timeout"
            }
          };
        } else {
          result = {
            ...result,
            success: false,
            error
          };
        }
      }
      if (result.error && result.error.status === 401) {
        this.callDispath("signOut");
      }
      if (callback && typeof callback === "function") {
        return callback(result);
      }
      return Promise.resolve(result);
    };
  }

  updateLanguage(language) {
    this.languageDictionary = getMessages(language);
  }

  updateToken(Authorization) {
    if (Authorization) {
      Object.keys(this.instances).forEach(module => {
        if (module !== "auth" || module !== "background") {
          this.instances[module].defaults.headers.common[
            "Authorization"
          ] = Authorization;
        }
      });
    } else {
      Object.keys(this.instances).forEach(module => {
        if (module !== "auth" || module !== "background") {
          delete this.instances[module].defaults.headers.common[
            "Authorization"
          ];
        }
      });
    }
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  callDispath(action, payload) {
    this.dispatch(action, payload);
  }
}

export default ApiClient;