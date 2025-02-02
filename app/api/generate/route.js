import { generateImage } from "./image";
import { formatData } from "./data";
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
