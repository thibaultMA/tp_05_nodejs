let [btnContent, btnPseudo, btnSubmit] = document.querySelectorAll("input");
let zoneText = document.querySelector("#content_message");
const socket = io();
btnContent.focus();

//reçoi des tableau de data et affiche
socket.on("first_content", (content_message) => {
  majcontent(content_message);
});
//recoie nouveau message
socket.on("maj_content", (message) => {
  majcontent([message]);
});
//appuie sur Entré
btnContent.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    btnSubmit.click();
  }
});

btnSubmit.addEventListener("click", () => {
  let data = {
    pseudo: btnPseudo.value,
    content: btnContent.value,
  };
  //crée un nouveau message et l'envoie au server
  socket.emit("new_content", data);
  btnContent.value = "";
  btnContent.focus();
});

function majcontent(content_message) {
  // boucle et crée la structure html des messages
  for (const messages of content_message) {
    let { pseudo, content } = messages;
    let div = document.createElement("div");
    div.innerHTML = pseudo + " : " + content;
    zoneText.appendChild(div);
  }
}
