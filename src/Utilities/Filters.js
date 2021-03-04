export function getFilterValue() {
  if (sessionStorage.getItem("filterby") === null) {
    return sessionStorage.getItem("loggeduser");
  } else {
    return sessionStorage.getItem("filterby");
  }
}

export function getFilterPeriod() {
  if (sessionStorage.getItem("filterperiod") === null) {
    return 90;
  } else {
    return sessionStorage.getItem("filterperiod");
  }
}

export function setFilterValue(value) {
  sessionStorage.setItem("filterby", value);
}

export function setFilterPeriod(value) {
  sessionStorage.setItem("filterperiod", value);
}
