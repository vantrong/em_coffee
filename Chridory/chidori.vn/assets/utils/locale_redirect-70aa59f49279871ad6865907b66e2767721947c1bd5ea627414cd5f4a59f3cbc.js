const hasLocale = path => {
  const localePattern = /^\/(en|vi)/;
  return localePattern.test(path);
};

const localeRedirect = () => {
  const userSystemLang = navigator.language || navigator.userLanguage;
  const isUserSystemLangVi = userSystemLang.toLowerCase().startsWith('vi');
  const currentPath = window.location.pathname;

  // Default is vi, redirect to en if user suystem lang is not vi
  if (!hasLocale(currentPath) && !isUserSystemLangVi) {
    window.location.pathname = '/en' + currentPath;
  }
};

export default localeRedirect;
