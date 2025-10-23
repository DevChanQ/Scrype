const highlight = "#408bbd";

const replacer = (code: string): string => {
  code = code.replace(/class (\w+)/g, (match, p1) => {
    return `<span style="color: ${highlight};">class</span> <span style='color: ${highlight};'>${p1}</span>`;
  });
  code = code.replace("class ", '<span style="color: #ffe538;">class</span>');

  const re = new RegExp(/(\w+) \(\)/, "g");
  code = code.replace(re, (match, p1) => {
    return `<span style='color: ${highlight};'>${p1} </span>()`;
  });

  code = code.replace("let ", '<span style="color: #ffe538;">let </span>');

  return code;
};

export default replacer;
