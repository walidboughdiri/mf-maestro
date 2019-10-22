export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function validates(args, contracts, context) {
  if (Array.isArray(contracts)) {
    contracts.forEach((contract, index) =>
      validate(args[index], index, contract, context)
    );
  } else {
    validate(args, 0, contracts, context);
  }
  return args;
}

export function validate(paramValue, arg_index, src_contract, src_context) {
  const handledTypes = ["boolean", "function", "object", "string"];
  const optional = src_contract.endsWith("=");
  const contract = src_contract.replace("=", "");
  const contracts = contract.split("|");
  const classes = contracts.filter(
    contract => !handledTypes.includes(contract)
  );
  const context = `${src_context}()` || "";
  const paramType = paramToType(paramValue);
  let isValid = false;
  if (typeof paramValue === "undefined" || paramValue === null) {
    if (optional) return;
    throwException(context, arg_index, paramValue, contracts, "ENOTOPTIONAL");
  }
  if (contracts.includes("string") && paramType === "string") {
    isValid = true;
  }
  if (contracts.includes("function") && paramType === "function") {
    isValid = true;
  }
  if (
    paramType === "object" &&
    (contracts.includes("object") ||
      classes.find(klass => {
        return paramValue.constructor.name === klass;
      }))
  ) {
    isValid = true;
  }
  if (paramType === "object" && contract.startsWith("Object.")) {
    isValid = true;
  }
  if (contracts.includes("boolean") && paramType === "boolean") {
    isValid = true;
  }

  if (!isValid)
    throwException(
      context,
      arg_index,
      paramValue,
      contracts,
      "VALIDATIONERROR"
    );
}

function isClass(func) {
  return (
    typeof func === "function" &&
    /^class\s/.test(Function.prototype.toString.call(func))
  );
}

function paramToType(paramValue) {
  if (toString.call(paramValue) === "[object String]") return "string";
  if (toString.call(paramValue) === "[object Function]") return "function";

  if (isClass(paramValue)) return "class";
  if (toString.call(paramValue) === "[object Object]") return "object";
  if (
    paramValue === true ||
    paramValue === false ||
    toString.call(paramValue) === "[object Boolean]"
  )
    return "boolean";
}

function throwException(context, index, value, contracts, code) {
  const typesMsg =
    contracts.length < 2
      ? `"${contracts[0]}"`
      : `one of ["${contracts.join('", "')}]`;
  throw newException(
    code,
    `ValidationError ${context} : param#${index} type must be ${typesMsg}`
  );
}

function newException(code, msg) {
  const err = new Error(msg);
  err.code = code;
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate);
  return err;
}
