"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  function redirectToImage(event) {
    event.preventDefault();
    const username = event.target.username.value;
    window.location.href = `/api/generate?username=${username}`;
  }

  return (
    <div className="container">
      <h1 className="title">Visualize Your Top Repositories</h1>
      <p className="description">
        Enter your GitHub username and generate an image showcasing your top
        repositories!
      </p>
      <form onSubmit={redirectToImage} className="form">
        <input
          type="text"
          id="username"
          name="username"
          required
          className="input"
          placeholder="Enter your GitHub username"
        />
        <button type="submit" className="button">
          Generate Image 🚀
        </button>
      </form>
      <p className="info">
        Share your image with friends and showcase your impact on GitHub!
      </p>
    </div>
  );
}
