//onkeydown when enter willblur to input field and invoke function onBlur
export const saveContentAfterPressEnter = (event) => {
    if (event.key === "Enter") {
    event.preventDefault();
    event.target.blur();
  }
}
//  select text in inputfield and focus this 
export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
}