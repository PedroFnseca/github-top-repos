import { createCanvas } from "canvas";

function getTheme(theme) {
  const validThemes = ["dark", "light"];

  if (!validThemes.includes(theme)) {
    return getTheme("light");
  }

  const themes = {
    dark: {
      background: "#2f363d",
      color: "#120625",
      textColor: "#120625",
      borderColor: "#444c56",
    },
    light: {
      background: "#f6f8fa",
      color: "#24292f",
      textColor: "#24292f",
      borderColor: "#d0d7de"
    },
  };

  return themes[theme] || themes.light;
}

function generateImage(repos, { theme }) {
  const cardSpacing = 120;
  const cardHeight = 100;

  const width = 800;
  const height = (repos.length * cardSpacing) + (cardHeight / 2);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const { background, color, textColor, borderColor } = getTheme(theme);

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  let yOffset = 30;
  repos.forEach((repo) => {
    const name = repo.name;
    const stars = repo.stargazers_count;
    const description = repo.description || "No description provided";

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = borderColor; 
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, yOffset);
    ctx.lineTo(width - 15, yOffset);
    ctx.lineTo(width - 15, yOffset + cardHeight);
    ctx.lineTo(15, yOffset + cardHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = "bold 20px Arial";
    ctx.fillText(name, 30, yOffset + 30);

    ctx.fillStyle = color;
    ctx.font = "14px Arial";
    ctx.fillText(`⭐ ${stars} - ${description}`, 30, yOffset + 60);

    yOffset += cardSpacing;
  });

  return canvas.toBuffer("image/png");
}

export { generateImage };