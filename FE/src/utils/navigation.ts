export function goBackOrRedirect(defaultPath = '/') {
  if (window.history.length > 1) {
    window.history.go(-1);
  } else {
    window.location.href = defaultPath;
  }
}
