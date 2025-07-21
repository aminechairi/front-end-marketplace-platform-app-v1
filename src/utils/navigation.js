let navigate;

export const setNavigate = (navFn) => {
  navigate = navFn;
};

export const navigateTo = (path) => {
  if (navigate) navigate(path);
};
