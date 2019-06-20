export default function(code) {
  code = code.replace(/class (\w+)/g,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style="color: #fbff00;">class</span> <span style='color: #7cff00;'>${p1} </span>`
  })
  code = code.replace('class',  '<span style="color: #fbff00;">class</span>')

  var re = new RegExp(/(\w+) \(\)/, 'g');
  code = code.replace(re,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style='color: #ff8400;'>${p1} </span>()`
  })

  return code
}
