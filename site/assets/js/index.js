document.addEventListener('DOMContentLoaded',()=>{
  const frame = document.getElementById("frame");
document.querySelectorAll("header a").forEach((e) => {
  e.addEventListener("click", (e) => {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    frame.setAttribute("src", url);
  });
});
})


function getFormValuesFormatted(formElement){
  const data = $(formElement).serializeArray();
  let output = `<span>[</span><br/>`;
  data.forEach((input,i)=>{
      output += `<p style="margin-left:25px;">${input.name} : ${input.value} ${i < data.length-1 ?'<span>,</span>':''}</p>`;
  });
  output += '<span>]</span>';
  return output;
}
