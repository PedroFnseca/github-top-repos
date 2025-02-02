import { createCanvas } from "canvas";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { username, top, order, sort, theme } = Object.fromEntries(searchParams);

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = formatData(response.data, { top, order, sort });

    const imageBuffer = generateImage(repos, { theme });

    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch repositories or generate image",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function formatData(repos, { top, order, sort }) {
  const topRepos = top || 5;
  const sortType = sort || "stargazers_count";
  const sortOrder = order || "desc";

  const sortedRepos = repos.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortType] - b[sortType];
    } else {
      return b[sortType] - a[sortType];
    }
  });

  return sortedRepos.slice(0, topRepos).map((repo) => {
    return {
      name: repo.name,
      stargazers_count: repo.stargazers_count,
      description: repo.description.substring(0, 100) || "",
    };
  });
}

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
