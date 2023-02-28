import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: import.meta.env.VITE_REACT_SANITY_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-10-20",
  token: import.meta.env.VITE_REACT_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
