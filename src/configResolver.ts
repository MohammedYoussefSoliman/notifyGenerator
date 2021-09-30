import Is from "@flk/supportive-is";

export const configResolver = <T>(options: T, configs: T) => {
  if (Is.object(options)) {
    let updatedOptions = {
      ...configs,
      ...options,
    };
    for (let key in options) {
      if (Is.object(options[key])) {
        let updatedOption = {};

        if (!Is.empty(configs[key])) {
          updatedOption = {
            ...configs[key],
            ...options[key],
          };
        } else {
          updatedOption = {
            ...options[key],
          };
        }
        updatedOptions = {
          ...updatedOptions,
          [key]: {
            ...updatedOption,
          },
        };
      }
    }
    return updatedOptions;
  } else {
    return configs;
  }
};
