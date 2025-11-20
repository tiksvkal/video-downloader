const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const path = require("path");
const url = require("url");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function generateFileName(originalName, contentType) {
  let ext = "";
  if (originalName && originalName.includes(".")) {
    ext = "." + originalName.split(".").pop().split("?")[0].split("#")[0];
  } else if (contentType) {
    if (contentType.includes("mp4")) ext = ".mp4";
    else if (contentType.includes("webm")) ext = ".webm";
    else if (contentType.includes("ogg")) ext = ".ogg";
    else if (contentType.includes("mkv")) ext = ".mkv";
    else ext = ".bin";
  } else {
    ext = ".bin";
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `video-${stamp}${ext}`;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/download", async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    if (!videoUrl) return res.status(400).send("videoUrl is required");

    let parsed;
    try {
      parsed = new url.URL(videoUrl);
    } catch {
      return res.status(400).send("URL tidak valid.");
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).send("Protocol URL tidak didukung.");
    }

    const response = await fetch(videoUrl);
    if (!response.ok) {
      return res.status(400).send("Gagal mengakses URL.");
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const filename = generateFileName(parsed.pathname.split("/").pop(), contentType);

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", contentType);

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
