export default function(code) {
  code = code.replace(/class (\w+)/g,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style="color: #ffe538;">class</span> <span style='color: #ca7eff;'>${p1}</span>`
  })
  code = code.replace('class ',  '<span style="color: #ffe538;">class</span>')

  var re = new RegExp(/(\w+) \(\)/, 'g');
  code = code.replace(re,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style='color: #ca7eff;'>${p1} </span>()`
  })

  code = code.replace('let ',  '<span style="color: #ffe538;">let </span>')

  return code
}
