function formatData(repos, { top, order, sort }) {
  const topRepos = getTop(top);
  const sortType = getSort(sort);
  const sortOrder = getOrder(order);

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

function getTop(top) {
  const validTops = [3, 5, 10];

  if (!validTops.includes(top)) {
    return 5;
  }

  return top;
}

function getSort(sort) {
  const validSorts = ["stars", "name", "updated", "created"];

  if (sort === "stars") {
    return "stargazers_count";
  }

  if (!validSorts.includes(sort)) {
    return "stargazers_count";
  }

  return sort;
}

function getOrder (order) {
  const validOrders = ["asc", "desc"];

  if (!validOrders.includes(order)) {
    return "desc";
  }

  return order;
}

export { formatData };