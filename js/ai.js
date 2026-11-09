/* Adhi-AI: chat curhat + DJ. Key 9router ada di server (api/chat.js), bukan di sini. */
(function () {
  var AI_ENDPOINT = "/api/chat";

  // === EDIT DI SINI: playlist per mood ===
  // id  = ID video/live YouTube (yang bisa di-embed). Kalau kosong, tombol cari di YouTube yang muncul.
  // Cara ambil ID: link youtube.com/watch?v=XXXXXXXX -> XXXXXXXX
  var MUSIC = {
    lofi:     { label: "Lofi chill",     id: "jfKfPfyJRdk", q: "lofi hip hop chill beats" },
    semangat: { label: "Semangat",       id: "", q: "lagu semangat pagi playlist" },
    galau:    { label: "Galau / sendu",  id: "", q: "lagu galau indonesia playlist" },
    santai:   { label: "Santai",         id: "", q: "acoustic santai playlist" },
    fokus:    { label: "Fokus belajar",  id: "", q: "focus music coding study" }
  };

  var history = [];
  var busy = false;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }

  var fab = el("button", "ai-fab"); fab.type = "button"; fab.setAttribute("aria-label", "Ngobrol sama Adhi-AI");
  fab.innerHTML = "💬 <span>Ngobrol sama AI</span>";
  var panel = el("section", "ai-panel"); panel.setAttribute("aria-label", "Adhi-AI chat");
  panel.innerHTML =
    '<div class="ai-hd"><div class="grow">Adhi-AI 🎧<small>Teman curhat & DJ dadakan</small></div><button type="button" class="ai-x">Tutup</button></div>' +
    '<div class="ai-body" aria-live="polite"></div>' +
    '<div class="ai-chips"></div>' +
    '<form class="ai-form"><input type="text" maxlength="500" placeholder="Ketik di sini..." aria-label="Pesan"><button type="submit">Kirim</button></form>' +
    '<div class="ai-note">AI bukan psikolog. Kalau lagi berat banget, hubungi orang terdekat atau tenaga profesional.</div>';
  document.body.appendChild(fab); document.body.appendChild(panel);

  var body = panel.querySelector(".ai-body"), form = panel.querySelector("form"),
      input = panel.querySelector("input"), sendBtn = form.querySelector("button"),
      chips = panel.querySelector(".ai-chips");

  function scroll() { body.scrollTop = body.scrollHeight; }
  function say(text, who) { var m = el("div", "ai-msg " + who, text); body.appendChild(m); scroll(); return m; }

  function playMusic(mood) {
    var m = MUSIC[mood]; if (!m) return;
    var box = el("div", "ai-music"); box.appendChild(el("b", "", "🎵 " + m.label));
    if (m.id) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(m.id) + "?rel=0";
      f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.loading = "lazy"; f.title = m.label;
      box.appendChild(f);
    } else {
      var a = el("a", "", "Buka di YouTube ↗"); a.target = "_blank"; a.rel = "noopener noreferrer";
      a.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(m.q); box.appendChild(a);
    }
    body.appendChild(box); scroll();
  }

  async function send(text) {
    text = (text || "").trim(); if (!text || busy) return;
    busy = true; sendBtn.disabled = true; chips.style.display = "none";
    say(text, "me"); history.push({ role: "user", content: text });
    var typing = el("div", "ai-msg bot ai-typing"); typing.innerHTML = "<span></span><span></span><span></span>"; body.appendChild(typing); scroll();
    try {
      var r = await fetch(AI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
      var d = await r.json();
      typing.remove();
      var reply = d.reply || "Hmm, ada yang error. Coba lagi ya.";
      say(reply, "bot"); history.push({ role: "assistant", content: reply });
      if (d.mood) playMusic(d.mood);
    } catch (e) {
      typing.remove(); say("Koneksi ke AI gagal. Coba lagi bentar ya 🙏", "bot");
    }
    busy = false; sendBtn.disabled = false; input.focus();
  }

  [["Gw lagi capek banget 😮‍💨"], ["Setelin musik lofi dong"], ["Lagi semangat nih, ada lagu?"]].forEach(function (c) {
    var b = el("button", "", c[0]); b.type = "button"; b.addEventListener("click", function () { send(c[0]); }); chips.appendChild(b);
  });

  function open() { panel.classList.add("on"); fab.style.display = "none"; input.focus();
    if (!body.children.length) say("Halo! Gw Adhi-AI 👋 Lu bisa curhat apa aja ke gw, atau minta gw setelin musik sesuai mood lu. Lagi gimana hari ini?", "bot"); }
  function close() { panel.classList.remove("on"); fab.style.display = ""; }
  fab.addEventListener("click", open);
  panel.querySelector(".ai-x").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; send(v); });
})();
