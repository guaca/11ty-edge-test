import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

  import getStoryblok from "./storyblok.cjs"
  
  const articles = (await getStoryblok(`
  {
    ArticleItems {
      items {
        full_slug
        content {
          Body
          PublicationDate
          Title
          Author {
            name
            fullSlug
          }
          Category {
            name
            fullSlug
          }
          SEO
        }
      }
    }
  }
  `))?.ArticleItems.items;
  
  const authors = (await getStoryblok(`
  {
    AuthorItems {
      items {
        full_slug
        content {
          Name
          Bio
          Avatar {
            filename
          }
          SEO
        }
      }
    }
  }
  `))?.AuthorItems.items;
  
  const categories = (await getStoryblok(`
  {
    CategoryItems {
      items {
        full_slug
        content {
          Category
          SEO
        }
      }
    }
  }
  `))?.CategoryItems.items;
  
  const home = (await getStoryblok(`
  {
    PageItem(id: "484006717") {
      content {
        Heading
        Subtitle
        Highlights {
          fullSlug
          name
          content
        }
        SEO
      }
    }
  } 
  `))?.PageItem;

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("articles", articles);
      eleventyConfig.addGlobalData("authors", authors);
      eleventyConfig.addGlobalData("categories", categories);
      eleventyConfig.addGlobalData("home", home);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
