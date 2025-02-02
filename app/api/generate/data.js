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

export { formatData };