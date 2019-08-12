export const DEFAULT_COLOR = "#0693E3";
export const COLORS = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF"
];

export const debounceFn = (fn, ms = 1000) => {
  let timer = null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, ms, ...args);
  };
};

export const throttleFn = (fn, ms = 500) => {
  let flag = true;

  return (...args) => {
    if (flag) {
      fn(...args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, ms);
    }
  };
};
