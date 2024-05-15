// Fetch function to get data from Storyblok Graphql API
export default async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch("https://gapi.storyblok.com/v1/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: Deno.env.get("STORYBLOK_API_KEY"),
        Version: "draft",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }
    return json.data;
  }