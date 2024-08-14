import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import { Readable } from "stream";

// Create a readable stream
const links = [
  { url: "/", priority: 1.0 },
  { url: "/product", priority: 0.8 },
  { url: "/sign-in",  priority: 0.8 },
  { url: "/order",  priority: 0.6 },
  { url: "/sign-up",  priority: 0.6 },
];

const stream = new SitemapStream({
  hostname: "https://etsubprinting.onrender.com",
});

streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => {
    fs.writeFileSync("./public/sitemap.xml", data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
