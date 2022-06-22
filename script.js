const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const reader = new FileReader();
const img = new Image();
const textOS = document.querySelector(".text__input");

let myFont = new FontFace("Segoe UI", "url(./font/Segoe.ttf)");

const uploadImage = (e) => {
  reader.onload = () => {
    textOS.addEventListener("input", () => {
      img.onload = () => {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        myFont.load().then(function (f) {
          document.fonts.add(f);
          console.log(textOS.value);
          // text 1
          ctx.font = "300 95px Segoe UI";
          ctx.fillStyle = "rgba(255,255,255,0.6)";

          ctx.fillText(`Activate ${textOS.value}`, img.width / 1.45 + 30, img.height - 380);
          // text 2
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = "200 70px Segoe UI";
          ctx.fillText(`Go to Settings to Activate ${textOS.value}.`, img.width / 1.45 + 30, img.height - 280);
        });
      };
      img.src = reader.result;
    });
  };
  reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);

function download() {
  const image = canvas.toDataURL({
    format: "jpg",
    quality: 0.8,
  });
  var link = document.createElement("a");
  link.download = "watermark-os.jpg";
  link.href = image;
  link.click();
}

document.querySelector("button").addEventListener("click", download);
