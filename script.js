const cardId = document.getElementById("cardId");
const drawingSection = document.getElementById("drawing-section");
const sort = document.getElementById("sort");

const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const menuContainer = document.getElementById("menu-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick="handleLoadWithId('${category.category_id}')" class="rounded-sm px-3 md:px-4 mr-3 bg-[#25252533]  text-sm md:text-lg font-normal md:font-medium text-[#252525]">${category.category}</button>`;
    menuContainer.appendChild(div);
  });
};

const handleLoadWithId = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  drawingSection.innerHTML = "";
  cardId.innerHTML = "";

  if (data.message == "no data found!!!") {
    drawingSection.innerHTML = `
    <img class="w-3/12 mx-auto" src="img/Icon.png" alt="">
    <h2 class="text-center text-lg md:text-3xl font-bold">Oops!! Sorry, There is no <br> content here<h2/>
    `;
  }

  data.data.forEach((dataTube) => {
    const { thumbnail, authors, title, others } = dataTube;

    const div = document.createElement("div");
    div.className = `shadow-2xl w-full rounded-xl`;
    div.innerHTML = `
    <figure><img class="w-full h-40 object-cover" src="${thumbnail}" alt="Shoes" /></figure>
        <div class=" flex gap-2 mt-2 pl-2">   
          <div >
          <img class="w-8 h-8 rounded-full" src="${
            authors[0].profile_picture
          }" alt="">
          </div>
          <div>
            <ol>
            <li class="text-[#171717] text-base font-bold">${title}</li>
            <li class= "flex text-[#171717B3] font-normal text-sm my-1"  >${
              authors[0].profile_name
            } ${
      authors[0].verified
        ? '<img class="ml-1 " src="img/fi_10629607.png" alt="Verified">'
        : " "
    }</li>
            <li class =" text-[#171717B3] font-normal text-sm mb-2 "><span>${
              others["views"]
            } </span><span>views</span></li>
            <ol>
        </div>
    `;
    cardId.appendChild(div);
  });
};
handleLoadWithId(1000);
handleCategory();
