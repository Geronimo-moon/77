// 光を生み出す
// 参考：https://q-az.net/javascript-kirakira-stars-effect/
const createLight = () => {
  const light = document.createElement("img");
  light.className = "light";
  light.src = "./light.png";

  for (let i = 0; i < 100; i++) {
    SetLight(light)
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
    function() {
      this.parentNode.removeChild(this);
      const light = document.createElement("img");
      light.className = "light";
      light.src = "./light.png";
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
  sasa.src = "./sasa.png";
  sasa.onload = () => {
    ctx.drawImage(sasa, 0, 0, canvas.width, canvas.height);
  };

  createLight();
});
