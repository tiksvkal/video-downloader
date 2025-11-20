// Ambil elemen HTML
const input = document.getElementById("video-url");
const btn = document.getElementById("gas");
const resultBox = document.getElementById("result");
const loadingBox = document.getElementById("loading");

// Bersihkan status
function clearStatus() {
  loadingBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  resultBox.innerHTML = "";
}

// Fungsi fetch API TikWM
async function fetchDownloadInfo(videoUrl) {
  // ===== CALL API TIKWM =====
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}&hd=1`;

  const res = await fetch(api);
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error("Gagal parsing URL");
  }

  return data.data;
}

// Render hasilnya
function renderResult(data) {
  resultBox.classList.remove("hidden");

  let html = `
    <h3 class="res-title">Hasil Parser</h3>
    <div class="res-item">
      <p>Tanpa Watermark</p>
      <a href="${data.play}" class="btn-dl" download>Download</a>
    </div>
    <div class="res-item">
      <p>Watermark (Backup)</p>
      <a href="${data.wmplay}" class="btn-dl" download>Download</a>
    </div>
  `;

  resultBox.innerHTML = html;
}

// Event tombol GAS
btn.addEventListener("click", async () => {
  clearStatus();

  let url = input.value.trim();
  if (!url) return alert("Masukin link dulu bro.");

  loadingBox.classList.remove("hidden");

  try {
    let data = await fetchDownloadInfo(url);
    renderResult(data);
  } catch (e) {
    alert("Gagal: " + e.message);
  }

  loadingBox.classList.add("hidden");
});  });

  if (!res.ok) {
    throw new Error("API error, status: " + res.status);
  }

  const json = await res.json();

  if (json.code !== 0) {
    throw new Error(json.msg || "Gagal ambil data dari TikWM");
  }

  const data = json.data || {};
  const downloads = [];

  if (data.hdplay) {
    downloads.push({
      label: "MP4 HD (tanpa watermark)",
      size: data.size || "",
      url: data.hdplay,
    });
  }

  if (data.play) {
    downloads.push({
      label: "MP4 (tanpa watermark)",
      size: data.size || "",
      url: data.play,
    });
  }

  if (data.wmplay) {
    downloads.push({
      label: "MP4 (pakai watermark)",
      size: data.size || "",
      url: data.wmplay,
    });
  }

  if (data.music && data.music.play) {
    downloads.push({
      label: "Audio (MP3)",
      size: data.music.duration ? data.music.duration + "s" : "",
      url: data.music.play,
    });
  }

  return {
    title: data.title || "Video TikTok",
    downloads,
  };
}

// ----- tampilkan hasil di UI -----
function renderResult(data) {
  resultList.innerHTML = "";

  data.downloads.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";

    const meta = document.createElement("div");
    meta.className = "result-meta";

    const main = document.createElement("span");
    main.textContent = item.label;

    const sub = document.createElement("span");
    sub.textContent = item.size || "";

    meta.appendChild(main);
    meta.appendChild(sub);

    const btn = document.createElement("button");
    btn.textContent = "Download";
    btn.addEventListener("click", () => {
      window.open(item.url, "_blank");
    });

    row.appendChild(meta);
    row.appendChild(btn);
    resultList.appendChild(row);
  });

  resultBox.classList.remove("hidden");
}

// ----- event tombol GAS -----
gasBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  clearStatus();
  clearResult();

  if (!url) {
    setStatus("error", "Masukin dulu link videonya.");
    return;
  }

  try {
    new URL(url);
  } catch {
    setStatus("error", "Format URL tidak valid.");
    return;
  }

  setStatus("info", "Lagi ngecek link & manggil server…");
  gasBtn.disabled = true;
  gasBtn.textContent = "Proses…";

  try {
    const data = await fetchDownloadInfo(url);
    if (!data || !Array.isArray(data.downloads) || data.downloads.length === 0) {
      setStatus("error", "Server tidak mengembalikan link download.");
    } else {
      setStatus("success", "Berhasil! Pilih kualitas yang kamu mau.");
      renderResult(data);
    }
  } catch (err) {
    console.error(err);
    setStatus("error", "Gagal menghubungi API / server.");
  } finally {
    gasBtn.disabled = false;
    gasBtn.textContent = "Gas";
  }
});

// ----- event tombol HAPUS -----
clearBtn.addEventListener("click", () => {
  urlInput.value = "";
  clearStatus();
  clearResult();
  urlInput.focus();
});    },
  });

  if (!res.ok) {
    throw new Error("API error, status: " + res.status);
  }

  const json = await res.json();

  // TikWM: code = 0 artinya sukses
  if (json.code !== 0) {
    throw new Error(json.msg || "Gagal ambil data dari TikWM");
  }

  const data = json.data || {};

  const downloads = [];

  if (data.hdplay) {
    downloads.push({
      label: "MP4 HD (tanpa watermark)",
      size: data.size || "",
      url: data.hdplay,
    });
  }

  if (data.play) {
    downloads.push({
      label: "MP4 (tanpa watermark)",
      size: data.size || "",
      url: data.play,
    });
  }

  if (data.wmplay) {
    downloads.push({
      label: "MP4 (pakai watermark)",
      size: data.size || "",
      url: data.wmplay,
    });
  }

  if (data.music && data.music.play) {
    downloads.push({
      label: "Audio (MP3)",
      size: data.music.duration ? data.music.duration + "s" : "",
      url: data.music.play,
    });
  }

  return {
    title: data.title || "Video TikTok",
    downloads,
  };
}

// ----- tampilkan hasil di UI -----
function renderResult(data) {
  resultList.innerHTML = "";

  data.downloads.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";

    const meta = document.createElement("div");
    meta.className = "result-meta";

    const main = document.createElement("span");
    main.textContent = item.label;

    const sub = document.createElement("span");
    sub.textContent = item.size || "";

    meta.appendChild(main);
    meta.appendChild(sub);

    const btn = document.createElement("button");
    btn.textContent = "Download";
    btn.addEventListener("click", () => {
      window.open(item.url, "_blank");
    });

    row.appendChild(meta);
    row.appendChild(btn);
    resultList.appendChild(row);
  });

  resultBox.classList.remove("hidden");
}

// ----- event tombol GAS -----
gasBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  clearStatus();
  clearResult();

  if (!url) {
    setStatus("error", "Masukin dulu link videonya.");
    return;
  }

  // cek format URL
  try {
    new URL(url);
  } catch {
    setStatus("error", "Format URL tidak valid.");
    return;
  }

  setStatus("info", "Lagi ngecek link & manggil server…");
  gasBtn.disabled = true;
  gasBtn.textContent = "Proses…";

  try {
    const data = await fetchDownloadInfo(url);
    if (!data || !Array.isArray(data.downloads) || data.downloads.length === 0) {
      setStatus("error", "Server tidak mengembalikan link download.");
    } else {
      setStatus("success", "Berhasil! Pilih kualitas yang kamu mau.");
      renderResult(data);
    }
  } catch (err) {
    console.error(err);
    setStatus("error", "Gagal menghubungi API / server.");
  } finally {
    gasBtn.disabled = false;
    gasBtn.textContent = "Gas";
  }
});

// ----- event tombol HAPUS -----
clearBtn.addEventListener("click", () => {
  urlInput.value = "";
  clearStatus();
  clearResult();
  urlInput.focus();
});    throw new Error("API error, status: " + res.status);
  }

  const json = await res.json();

  if (json.code !== 0) {
    throw new Error(json.msg || "Gagal ambil data dari TikWM");
  }

  const data = json.data || {};

  const downloads = [];

  if (data.hdplay) {
    downloads.push({
      label: "MP4 HD (tanpa watermark)",
      size: data.size || "",
      url: data.hdplay,
    });
  }

  if (data.play) {
    downloads.push({
      label: "MP4 (tanpa watermark)",
      size: data.size || "",
      url: data.play,
    });
  }

  if (data.wmplay) {
    downloads.push({
      label: "MP4 (pakai watermark)",
      size: data.size || "",
      url: data.wmplay,
    });
  }

  if (data.music && data.music.play) {
    downloads.push({
      label: "Audio (MP3)",
      size: data.music.duration ? data.music.duration + "s" : "",
      url: data.music.play,
    });
  }

  return {
    title: data.title || "Video TikTok",
    downloads,
  };
}
      {
        label: "MP4 720p (tanpa watermark)",
        size: "3.1 MB",
        url: "https://example.com/video-720.mp4"
      },
      {
        label: "MP4 360p",
        size: "1.2 MB",
        url: "https://example.com/video-360.mp4"
      }
    ]
  };
}

function renderResult(data) {
  resultList.innerHTML = "";
  data.downloads.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";

    const meta = document.createElement("div");
    meta.className = "result-meta";

    const main = document.createElement("span");
    main.textContent = item.label;

    const sub = document.createElement("span");
    sub.textContent = item.size || "";

    meta.appendChild(main);
    meta.appendChild(sub);

    const btn = document.createElement("button");
    btn.textContent = "Download";
    btn.addEventListener("click", () => {
      window.open(item.url, "_blank");
    });

    row.appendChild(meta);
    row.appendChild(btn);
    resultList.appendChild(row);
  });

  resultBox.classList.remove("hidden");
}

gasBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  clearStatus();
  clearResult();

  if (!url) {
    setStatus("error", "Masukin dulu link videonya.");
    return;
  }

  try {
    new URL(url);
  } catch {
    setStatus("error", "Format URL tidak valid.");
    return;
  }

  setStatus("info", "Lagi ngecek link & manggil server…");
  gasBtn.disabled = true;
  gasBtn.textContent = "Proses…";

  try {
    const data = await fetchDownloadInfo(url);
    if (!data || !Array.isArray(data.downloads) || data.downloads.length === 0) {
      setStatus("error", "Server tidak mengembalikan link download.");
    } else {
      setStatus("success", "Berhasil! Pilih kualitas yang kamu mau.");
      renderResult(data);
    }
  } catch (err) {
    console.error(err);
    setStatus("error", "Gagal menghubungi server / API.");
  } finally {
    gasBtn.disabled = false;
    gasBtn.textContent = "Gas";
  }
});

clearBtn.addEventListener("click", () => {
  urlInput.value = "";
  clearStatus();
  clearResult();
  urlInput.focus();
});
