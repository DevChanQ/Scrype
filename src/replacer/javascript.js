export default function(code) {
  code = code.replace(/class (\w+)/g,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style="color: #F6EC5F;">class</span> <span style='color: #487AB9;'>${p1}</span>`
  })
  code = code.replace('class ',  '<span style="color: #F6EC5F;">class</span>')

  var re = new RegExp(/(\w+) \(\)/, 'g');
  code = code.replace(re,  function replacer(match, p1, p2, p3, offset, string) {
    return `<span style='color: #DD4F40;'>${p1} </span>()`
  })

  code = code.replace('let ',  '<span style="color: #F6EC5F;">let </span>')

  return code
}
