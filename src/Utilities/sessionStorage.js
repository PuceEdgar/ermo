export function createCaseInfo(id) {
  let caseTransactions = {
    STR: [],
    AIFT: [],
  };
  sessionStorage.setItem(id, JSON.stringify(caseTransactions));
}

export function getCaseInfo(id) {
  return JSON.parse(sessionStorage.getItem(id));
}

export function caseInfoExists(id) {
  let caseInfo = getCaseInfo(id);
  return caseInfo && caseInfo !== undefined ? true : false;
}
