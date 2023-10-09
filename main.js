const size = 300 / 4;

const init = () => {
  const container = document.getElementById("container");

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const div = document.createElement("div");
      container.appendChild(div);
      div.style.position = "absolute";
      div.style.left = `${size * x}px`;
      div.style.top = `${size * y}px`;
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.backgroundColor = `#fa8`;
      div.style.border = `${size / 30}px ridge #864`;
      div.style.boxSizing = `border-box`;
    }
  }
};

window.onload = () => {
  init();
};
