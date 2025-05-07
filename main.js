const url = require("url");

const http = require("http");
const queryString = require("querystring");
const fs = require("fs/promises");
const { readFileAndParse } = require("./utils");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (parsedUrl.pathname === "/posts" && req.method === "GET") {
    try {
      const fileContent = await fs.readFile("products.json", "utf-8");
      const products = JSON.parse(fileContent);

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(products));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(5000, () => {
  console.log(`Your server is running on http://localhost:5000`);
});
