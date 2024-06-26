const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener("keyup", function (event) {
  // Check if the entered key is Enter and the input value is not empty or whitespace
  if (event.key === "Enter" && this.value.trim() !== "") {
    addToDo(this.value);
    this.value = "";
  }
});

const addToDo = (item) => {
  // Check if the item is not empty
  if (item.trim() !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
         ${item}
        <i class="fas fa-times"></i>
    `;

    listItem.addEventListener("click", function () {
      this.classList.toggle("done");
    });

    listItem.querySelector("i").addEventListener("click", function () {
      listItem.remove();
    });

    toDoBox.appendChild(listItem);
  }
};
