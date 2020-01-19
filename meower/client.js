console.log("Hello");

const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const API_URL = "http://localhost:5000/mews";
const mewsElement = document.querySelector(".mews");

loadingElement.style.display = "";

listAllMews();

form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const mew = {
    name,
    content
  };

  console.log(mew);
  form.style.display = "none";
  loadingElement.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(mew),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(createdMew => {
      form.reset();
      setTimeout(() => {
        form.style.display = "";
      }, 30 * 1000);
      loadingElement.style.display = "none";
      listAllMews();
    })
    .catch(res => {
      console.log("rejected");
    });
});

function listAllMews() {
  mewsElement.innerHTML = "";
  fetch(API_URL)
    .then(res => res.json())
    .then(mews => {
      mews.reverse();
      mews.forEach(mew => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = mew.name;

        const content = document.createElement("p");
        content.textContent = mew.content;

        const date = document.createElement("small");
        date.textContent = new Date(mew.created);

        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(date);

        mewsElement.appendChild(div);
      });

      loadingElement.style.display = "none";
    });
}
