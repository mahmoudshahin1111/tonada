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

