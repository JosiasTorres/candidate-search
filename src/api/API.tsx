const API_URL = "https://api.github.com/users";
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000) + 1; // Rango más realista
    const response = await fetch(`${API_URL}?since=${start}`, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error ${response.status}: ${errorData.message}`);
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error en searchGithub:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`${API_URL}/${username}`, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error ${response.status}: ${errorData.message}`);
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error en searchGithubUser (${username}):`, err);
    return null;
  }
};

export { searchGithub, searchGithubUser };
