const highlight = "#408bbd";

const replacer = (code: string): string => {
  // class replacer
  code = code.replace(/class (\w+)/g, (match, p1) => {
    return `<span style="color: ${highlight};">class</span> <span style='color: ${highlight};'>${p1}</span>`;
  });
  code = code.replace("class ", '<span style="color: #ffe538;">class</span>');

  // function replacer
  const re = new RegExp(/(\w+)(\s*)\(\)/, "g");
  code = code.replace(re, (match, p1, p2) => {
    return `<span style='color: ${highlight};'>${p1}${p2}</span>()`;
  });

  // let replacer
  code = code.replace("let ", '<span style="color: #ffe538;">let </span>');

  return code;
};

export default replacer;
