// 光を生み出す
// 参考：https://q-az.net/javascript-kirakira-stars-effect/
const createLight = () => {
  const light = document.createElement("img");
  light.className = "light";
  light.src = "/img/light.png";

  for (let i = 0; i < 100; i++) {
    SetLight(light);
  }
};

const SetLight = (original) => {
  let clone = original.cloneNode(true);

  clone.style.left = 100 * Math.random() + "%";
  clone.style.animationDelay = 8 * Math.random() + "s";
  clone.width = 20;
  clone.height = clone.width;
  document.body.appendChild(clone);

  clone.addEventListener(
    "animationend",
    function () {
      this.parentNode.removeChild(this);
      const light = document.createElement("img");
      light.className = "light";
      light.src = "/img/light.png";
      SetLight(light);
    },
    false
  );
};

window.addEventListener("load", () => {
  // canvasとコンテキストの取得
  const canvas = document.getElementById("sasa");
  const ctx = canvas.getContext("2d");

  // 大きさを画面幅の小さい方に合わせ初期化
  canvas.width =
    window.innerWidth < window.innerHeight
      ? window.innerWidth / 1.3
      : window.innerHeight / 1.5;
  canvas.height = canvas.width;

  // 笹の取得・絵画
  const sasa = new Image();
  sasa.src = "/img/sasa.png";

  let grids = [];

  sasa.onload = () => {
    ctx.drawImage(sasa, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 142, 198, 0.85)";
    for (i = 0; i < 10; i++) {
      const grid = [
        canvas.width / 5 + 7 * Math.floor((Math.random() * canvas.width) / 10),
        canvas.width / 5 + 7 * Math.floor((Math.random() * canvas.width) / 10),
      ];
      ctx.fillRect(grid[0], grid[1], 15, 30);
      grids.push(grid);
    }
  };

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    for (let i = 0; i < 10; i++) {
      if (
        grids[i][0] <= point.x &&
        grids[i][0] + 15 >= point.x &&
        grids[i][1] <= point.y &&
        grids[i][1] + 30 >= point.y
      ) {
        // alert("OK");
        const request = new XMLHttpRequest();
        request.open("POST", "/get", true);
        request.onload = function () {
          let data = this.response;
          alert(data);
        };
        request.send();
      }
    }
  });

  createLight();

  // 入力フォームの生成
  const divWrite = document.getElementById("write");

  divWrite.addEventListener("click", () => {
    if (divWrite.lastElementChild) return;
    const form = document.createElement("form");
    form.action = "/send";
    form.method = "POST";
    form.name = "wish";

    const textarea = document.createElement("textarea");
    textarea.className = "paper";
    textarea.placeholder = "ここに入力";
    textarea.id = "wishtext";
    form.appendChild(textarea);

    divWrite.appendChild(form);

    const submit = document.createElement("div");
    submit.className = "submit";
    submit.textContent = "送信";
    submit.addEventListener("click", () => {
      document.wish.submit();
    });
    divWrite.appendChild(submit);
  });
});
