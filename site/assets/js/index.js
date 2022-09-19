document.addEventListener('DOMContentLoaded',()=>{
  const navLinks = document.querySelectorAll("header a");
  navLinks.forEach((e) => {
  e.addEventListener("click", (e) => {
    navLinks.forEach(navLink=>{
      if(e.currentTarget === navLink ){
        const url = navLink.getAttribute("href");
        navLink.classList.add('active');
      }else{
        navLink.classList.remove('active');
      }
    })


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
