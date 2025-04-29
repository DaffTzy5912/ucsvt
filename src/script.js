async function searchTiktok() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Silakan masukkan kata kunci pencarian!");

  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    const container = document.getElementById("videoContainer");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>Tidak ada video ditemukan.</p>";
      return;
    }

    data.forEach((video) => {
      const div = document.createElement("div");
      div.className = "video-item";
      div.innerHTML = `
        <video controls>
          <source src="${video.video}" type="video/mp4">
          Browser tidak mendukung video.
        </video>
        <div class="video-info">
          <strong>@${video.author}</strong><br/>
          ${video.desc || "Tanpa deskripsi"}
        </div>
      `;
      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mencari video.");
  }
}
