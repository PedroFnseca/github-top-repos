import { createCanvas } from "canvas";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { username, top, order, sort } = Object.fromEntries(searchParams);

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

    const imageBuffer = generateImage(repos);

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

function generateImage(repos) {
  const width = 800;
  const height = repos.length * 60 + 50;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  let yOffset = 30;
  repos.forEach((repo) => {
    const name = repo.name;
    const stars = repo.stargazers_count;
    const description = repo.description || "No description provided";

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(15, yOffset - 10, width - 30, 50);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`${name}`, 30, yOffset);

    ctx.font = "14px Arial";
    ctx.fillText(`⭐ ${stars} - ${description}`, 30, yOffset + 20);

    yOffset += 60;
  });

  return canvas.toBuffer("image/png");
}
