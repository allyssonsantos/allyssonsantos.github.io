const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GH_PERSONAL_TOKEN,
});

const generateRepoObject = repo => ({
  name: repo.data.name,
  description: repo.data.description,
  stars: repo.data.stargazers_count,
  forks: repo.data.forks_count,
  url: repo.data.html_url,
});

const getPersonalProjects = async () => {
  const frigobar = await octokit.rest.repos.get({
    owner: 'frigobar',
    repo: 'frigobar',
  });

  const yoga = await octokit.rest.repos.get({
    owner: 'gympass',
    repo: 'yoga',
  });

  const react95 = await octokit.rest.repos.get({
    owner: 'react95',
    repo: 'react95',
  });

  const quantum = await octokit.rest.repos.get({
    owner: 'catho',
    repo: 'quantum',
  });

  return [
    generateRepoObject(frigobar),
    generateRepoObject(yoga),
    generateRepoObject(react95),
    generateRepoObject(quantum),
  ];
};

module.exports = { getPersonalProjects };
