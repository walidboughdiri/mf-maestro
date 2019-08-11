export const resources = {
  en: {
    translation: {
      "an error occured while loading the component":
        "an error occured while loading the component",
      home: "homet",
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
};

export function mergeDeep(source, target) {
  const isObject = obj => obj && typeof obj === "object";

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}
