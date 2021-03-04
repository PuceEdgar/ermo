export function CheckValue(item) {
  let result = {
    name: item[0],
    valid: true,
    message: "",
  };
  switch (item[0]) {
    // case "iban":
    //   result.valid = item[1].length === 10
    //   result.message = item[1].length === 10 ? "" : "short iban"
    //   break
    case "amount_local":
      result.valid = item[1] !== "999";
      result.message = item[1] !== "999" ? "" : "Check amount";
      break;
    case "swift":
      result.valid = item[1] !== "Saknas";
      result.message = item[1] !== "Saknas" ? "" : "Unknown swift code";
      break;
    default:
      result.valid = true;
  }

  return result;
}

export function ValidateData(keyValuePair) {
  let unvalid = [];

  keyValuePair.map((entry, i) => {
    return Object.entries(entry).map((kvp, i) => {
      const value = Object.values(kvp[1]);
      let kid = kvp[0];

      const filtered = Object.values(value).filter((val, i) => {
        return typeof val[1] !== "object";
      });

      const v = filtered.map((item, i) => {
        const valid = CheckValue(item);
        return valid;
      });

      Object.values(v).map((val, i) => {
        if (!Object.values(val)[1]) {
          unvalid.push([kid].toString());
        }
      });
    });
  });

  return unvalid;
}
