import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "cqahg3xw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export { urlFor, client };

// steps
// 1. sanity deploy
// 2. Done! new site is automatically added to allowed whitelist.
