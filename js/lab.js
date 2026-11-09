
/* =========================================
   ADHIT.DEV — HACK LAB ENGINE
   Interactive learning environment
========================================= */

(function () {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =====================================
     TOAST NOTIFICATION
  ===================================== */

  const toastElement = $("#toast");
  let toastTimer;

  function toast(message) {
    if (!toastElement) return;

    toastElement.textContent = message;
    toastElement.classList.add("on");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toastElement.classList.remove("on");
    }, 2500);
  }

  /* =====================================
     MOBILE NAVIGATION
  ===================================== */

  const menuButton = $("#menuBtn");
  const mobileNav = $("#mnav");

  function closeMenu() {
    if (!menuButton || !mobileNav) return;

    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const opened = mobileNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(opened)
      );

      menuButton.textContent = opened ? "Close" : "Menu";
    });

    $$("a", mobileNav).forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* =====================================
     SCROLL REVEAL
  ===================================== */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window && true) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in");

        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => {
      item.classList.add("is-in");
    });
  }

  /* =====================================
     BACK TO TOP
  ===================================== */

  const topButton = $("#topBtn");

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  /* =====================================
     MISSION DATABASE
  ===================================== */

  const missions = [
    {
      id: "http",
      category: "WEB BASICS",
      difficulty: "EASY",
      xp: 50,
      title: "HTTP Detective",
      story: "Browser dan server sedang berkomunikasi. Kamu diminta menemukan kode status yang menunjukkan request berhasil.",
      body: "Pelajari HTTP response status. Kode sukses yang paling umum digunakan adalah 200.",
      answer: "FLAG{HTTP_200}",
      hints: [
        "Kode status sukses berada di rentang 2xx.",
        "Jawabannya terdiri dari HTTP dan angka 200."
      ]
    },

    {
      id: "linux",
      category: "LINUX",
      difficulty: "EASY",
      xp: 50,
      title: "Where Am I?",
      story: "Kamu baru masuk ke lingkungan Linux. Sebelum melakukan apa pun, kamu harus tahu sedang berada di direktori mana.",
      body: "Perintah Linux untuk menampilkan current working directory adalah pwd.",
      answer: "FLAG{PWD}",
      hints: [
        "Namanya terdiri dari tiga huruf.",
        "Singkatan dari Print Working Directory."
      ]
    },

    {
      id: "crypto",
      category: "CRYPTOGRAPHY",
      difficulty: "EASY",
      xp: 75,
      title: "Hash Hunter",
      story: "Seorang developer ingin memastikan integritas sebuah file. Dia membutuhkan algoritma hash yang populer.",
      body: "SHA-256 menghasilkan hash dengan panjang 256 bit.",
      answer: "FLAG{SHA256}",
      hints: [
        "Namanya diawali dengan SHA.",
        "Angka di belakangnya adalah 256."
      ]
    },

    {
      id: "dns",
      category: "NETWORK",
      difficulty: "EASY",
      xp: 75,
      title: "Domain Detective",
      story: "Manusia lebih mudah mengingat nama website daripada alamat IP. Ada sistem yang membantu menerjemahkannya.",
      body: "Sistem tersebut bernama Domain Name System.",
      answer: "FLAG{DNS}",
      hints: [
        "Terdiri dari tiga huruf.",
        "Kepanjangannya Domain Name System."
      ]
    },

    {
      id: "security",
      category: "SECURITY",
      difficulty: "EASY",
      xp: 100,
      title: "Permission First",
      story: "Kamu ingin menguji keamanan sebuah website. Apa hal pertama yang harus dimiliki sebelum melakukan pengujian?",
      body: "Pengujian keamanan harus dilakukan dengan izin dari pemilik sistem.",
      answer: "FLAG{PERMISSION}",
      hints: [
        "Pastikan ada persetujuan dari pemilik sistem.",
        "Jawabannya berkaitan dengan authorization."
      ]
    },

    {
      id: "password",
      category: "SECURITY",
      difficulty: "MEDIUM",
      xp: 100,
      title: "Password Guardian",
      story: "Sebuah aplikasi menyimpan password penggunanya. Developer ingin menghindari penyimpanan password dalam bentuk teks biasa.",
      body: "Password sebaiknya disimpan menggunakan password hashing yang dirancang khusus, seperti Argon2id.",
      answer: "FLAG{ARGON2ID}",
      hints: [
        "Namanya diawali dengan Argon.",
        "Algoritma ini dirancang untuk password hashing."
      ]
    },

    {
      id: "owasp",
      category: "WEB SECURITY",
      difficulty: "MEDIUM",
      xp: 125,
      title: "OWASP Explorer",
      story: "Kamu sedang mempelajari panduan keamanan aplikasi web yang banyak digunakan oleh developer.",
      body: "Organisasi yang menerbitkan OWASP Top 10 dikenal dengan singkatan OWASP.",
      answer: "FLAG{OWASP}",
      hints: [
        "Organisasi ini berfokus pada keamanan aplikasi.",
        "Namanya terdiri dari lima huruf."
      ]
    },

    {
      id: "https",
      category: "NETWORK",
      difficulty: "MEDIUM",
      xp: 125,
      title: "Secure Connection",
      story: "Kamu melihat dua protokol komunikasi web. Salah satunya menggunakan TLS untuk mengamankan koneksi.",
      body: "Protokol web yang menggunakan TLS adalah HTTPS.",
      answer: "FLAG{HTTPS}",
      hints: [
        "Ada huruf S tambahan dari HTTP.",
        "Protokol ini menggunakan TLS."
      ]
    },

    {
      id: "xss",
      category: "WEB SECURITY",
      difficulty: "MEDIUM",
      xp: 150,
      title: "Web Security Basics",
      story: "Kamu sedang mempelajari jenis kerentanan pada aplikasi web yang melibatkan injeksi script ke halaman.",
      body: "Kerentanan tersebut dikenal dengan nama Cross-Site Scripting.",
      answer: "FLAG{XSS}",
      hints: [
        "Singkatannya terdiri dari tiga huruf.",
        "Nama lengkapnya Cross-Site Scripting."
      ]
    },

    {
      id: "ctf",
      category: "CTF",
      difficulty: "HARD",
      xp: 200,
      title: "Final Challenge",
      story: "Selamat datang di tantangan terakhir. Kamu telah mempelajari Linux, jaringan, dan keamanan web.",
      body: "CTF merupakan singkatan dari Capture The Flag. Itulah format kompetisi keamanan siber yang menggunakan flag sebagai bukti penyelesaian tantangan.",
      answer: "FLAG{CAPTURE_THE_FLAG}",
      hints: [
        "Ada tiga kata dalam nama lengkapnya.",
        "Kata pertama adalah Capture."
      ]
    }
  ];

  /* =====================================
     PROGRESS STORAGE
  ===================================== */

  const STORAGE_KEY = "adhitHackLabProgress";

  function loadProgress() {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (!Array.isArray(data)) return [];

      return data.filter(id =>
        missions.some(mission => mission.id === id)
      );
    } catch (error) {
      return [];
    }
  }

  let solved = loadProgress();
  let activeMission = null;
  let hintIndex = 0;

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(solved)
      );
    } catch (error) {
      toast("Browser tidak mengizinkan penyimpanan progres.");
    }
  }

  /* =====================================
     XP & RANK
  ===================================== */

  function getXP() {
    return missions.reduce((total, mission) => {
      return total + (
        solved.includes(mission.id) ? mission.xp : 0
      );
    }, 0);
  }

  function getMaxXP() {
    return missions.reduce(
      (total, mission) => total + mission.xp,
      0
    );
  }

  function getRank(xp) {
    if (xp >= 1000) return "Root Master";
    if (xp >= 700) return "Cyber Expert";
    if (xp >= 400) return "Security Hunter";
    if (xp >= 200) return "Cyber Scout";
    if (xp >= 100) return "Script Explorer";

    return "Curious Rookie";
  }

  function updateHUD() {
    const xp = getXP();
    const maxXP = getMaxXP();

    const xpNow = $("#xpNow");
    const xpMax = $("#xpMax");
    const solvedN = $("#solvedN");
    const totalN = $("#totalN");
    const rankName = $("#rankName");
    const xpFill = $("#xpFill");
    const xpBar = $("#xpBar");
    const nextRank = $("#nextRank");

    if (xpNow) xpNow.textContent = xp;
    if (xpMax) xpMax.textContent = maxXP;

    if (solvedN) solvedN.textContent = solved.length;
    if (totalN) totalN.textContent = missions.length;

    if (rankName) {
      rankName.textContent = getRank(xp);
    }

    const percentage = maxXP
      ? (xp / maxXP) * 100
      : 0;

    if (xpFill) {
      xpFill.style.width = percentage + "%";
    }

    if (xpBar) {
      xpBar.setAttribute(
        "aria-valuenow",
        String(Math.round(percentage))
      );
    }

    if (nextRank) {
      nextRank.textContent =
        solved.length === missions.length
          ? "🏆 Semua misi berhasil diselesaikan!"
          : "Terus belajar dan kumpulkan XP ✦";
    }
  }

  /* =====================================
     RENDER MISSIONS
  ===================================== */

  const missionGrid = $("#mgrid");

  function renderMissions() {
    if (!missionGrid) return;

    missionGrid.innerHTML = "";

    missions.forEach((mission, index) => {
      const completed = solved.includes(mission.id);

      const card = document.createElement("article");

      card.className =
        "mission-card reveal" +
        (completed ? " solved" : "");

      card.style.setProperty(
        "--rot",
        index % 2 === 0 ? "-1deg" : "1deg"
      );

      card.innerHTML = `
        <span class="tag">${mission.category}</span>

        <h3>${mission.title}</h3>

        <p>${mission.story}</p>

        <div>
          <span class="dpill">${mission.difficulty}</span>
          <span class="xp-tag">+${mission.xp} XP</span>
        </div>

        <button
          type="button"
          class="btn sm ${completed ? "dark" : "coral"}"
        >
          ${completed ? "✓ Completed" : "Open Mission ↗"}
        </button>
      `;

      card.querySelector("button").addEventListener(
        "click",
        () => openMission(mission)
      );

      missionGrid.appendChild(card);

      if (true) {
        requestAnimationFrame(() => {
          card.classList.add("is-in");
        });
      } else {
        card.classList.add("is-in");
      }
    });

    updateHUD();
  }

  /* =====================================
     MISSION DIALOG
  ===================================== */

  const dialog = $("#mDlg");

  function openMission(mission) {
    if (!dialog) return;

    activeMission = mission;
    hintIndex = 0;

    $("#mCat").textContent = mission.category;
    $("#mDiff").textContent = mission.difficulty;
    $("#mXp").textContent = "+" + mission.xp + " XP";

    $("#mTitle").textContent = mission.title;
    $("#mStory").textContent = mission.story;
    $("#mBody").textContent = mission.body;

    $("#mHints").innerHTML = "";

    $("#mHintBtn").textContent = "Tampilkan Hint";

    $("#mFlagIn").value = "";

    const done = $("#mDone");

    done.hidden = !solved.includes(mission.id);

    if (!done.hidden) {
      done.textContent = "Misi ini sudah kamu selesaikan!";
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  $("#mClose")?.addEventListener("click", () => {
    dialog.close();
  });

  dialog?.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  /* =====================================
     MISSION HINT
  ===================================== */

  $("#mHintBtn")?.addEventListener("click", () => {
    if (!activeMission) return;

    if (hintIndex >= activeMission.hints.length) {
      toast("Semua hint sudah dibuka.");
      return;
    }

    const item = document.createElement("li");

    item.textContent =
      activeMission.hints[hintIndex];

    $("#mHints").appendChild(item);

    hintIndex++;

    if (hintIndex >= activeMission.hints.length) {
      $("#mHintBtn").textContent = "Semua Hint Terbuka";
    }
  });

  /* =====================================
     FLAG VALIDATION
  ===================================== */

  function checkFlag(value, selectedMission = null) {
    const answer = value.trim().toUpperCase();

    if (!answer) {
      toast("Masukkan flag terlebih dahulu.");
      return;
    }

    const target = selectedMission
      ? [selectedMission]
      : missions;

    const mission = target.find(item =>
      item.answer === answer
    );

    if (!mission) {
      toast("Flag belum benar. Coba lagi!");
      return;
    }

    if (solved.includes(mission.id)) {
      toast("Misi ini sudah pernah diselesaikan.");
      return;
    }

    solved.push(mission.id);

    saveProgress();
    renderMissions();

    toast("🎉 Correct! +" + mission.xp + " XP");

    if (activeMission?.id === mission.id) {
      $("#mDone").hidden = false;

      $("#mDone").textContent =
        "Mission completed! +" +
        mission.xp +
        " XP berhasil ditambahkan.";
    }
  }

  $("#mFlagForm")?.addEventListener("submit", event => {
    event.preventDefault();

    if (!activeMission) return;

    checkFlag(
      $("#mFlagIn").value,
      activeMission
    );
  });

  $("#flagForm")?.addEventListener("submit", event => {
    event.preventDefault();

    checkFlag($("#flagIn").value);
    $("#flagIn").value = "";
  });

  /* =====================================
     RESET PROGRESS
  ===================================== */

  $("#resetBtn")?.addEventListener("click", () => {
    const confirmation = confirm(
      "Yakin ingin menghapus semua progres Hack Lab?"
    );

    if (!confirmation) return;

    solved = [];

    saveProgress();
    renderMissions();

    toast("Progres berhasil direset.");
  });

  /* =====================================
     TERMINAL SIMULATION
  ===================================== */

  const terminalOutput = $("#termOut");

  const terminalInput = $("#termIn");

  let currentPath = "~";

  function terminalPrint(message) {
    if (!terminalOutput) return;

    const line = document.createElement("div");

    line.textContent = message;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
      terminalOutput.scrollHeight;
  }

  function terminalRun(command) {
    const input = command.trim();

    if (!input) return;

    const args = input.split(/\s+/);
    const cmd = args[0].toLowerCase();

    terminalPrint(
      "hacker@hacklab:" + currentPath + "$ " + input
    );

    switch (cmd) {

      case "help":
        terminalPrint("Available commands:");
        terminalPrint("help       - Show available commands");
        terminalPrint("whoami     - Show current user");
        terminalPrint("pwd        - Show current directory");
        terminalPrint("ls -a      - List simulated files");
        terminalPrint("cd lab     - Enter simulated folder");
        terminalPrint("cat readme.txt - Read a simulated file");
        terminalPrint("neofetch   - Show system information");
        terminalPrint("nmap demo.local - Fictional training output");
        terminalPrint("clear      - Clear terminal");
        break;

      case "whoami":
        terminalPrint("hacker");
        break;

      case "pwd":
        terminalPrint(
          "/home/hacker" +
          (currentPath === "~" ? "" : "/lab")
        );
        break;

      case "ls":
        if (args.includes("-a")) {
          terminalPrint(
            ".  ..  .welcome  readme.txt  challenges  notes"
          );
        } else {
          terminalPrint(
            "readme.txt  challenges  notes"
          );
        }
        break;

      case "cd":
        if (args[1] === "lab") {
          currentPath = "~/lab";
        } else if (
          args[1] === ".." ||
          !args[1]
        ) {
          currentPath = "~";
        } else {
          terminalPrint(
            "Folder tidak tersedia di simulasi."
          );
        }

        $("#psPath").textContent = currentPath;
        break;

      case "cat":
        if (args[1] === "readme.txt") {
          terminalPrint(
            "Welcome to Adhit Hack Lab!"
          );

          terminalPrint(
            "Learn cybersecurity fundamentals."
          );

          terminalPrint(
            "Always practice with permission."
          );
        } else {
          terminalPrint(
            "File tidak ditemukan."
          );
        }
        break;

      case "neofetch":
        terminalPrint(" ");
        terminalPrint("  .--.   ADHIT LAB OS");
        terminalPrint(" |o_o |  Learner Edition");
        terminalPrint(" |:_/ |  Browser Sandbox");
        terminalPrint(" //   \\  Ethical Learning");
        terminalPrint(" ");
        break;

      case "nmap":
        if (args[1] !== "demo.local") {
          terminalPrint(
            "Training only: gunakan nmap demo.local."
          );
          break;
        }

        terminalPrint(
          "Starting fictional training scan..."
        );

        terminalPrint(
          "Host: demo.local"
        );

        terminalPrint(
          "80/tcp   open   http (simulated)"
        );

        terminalPrint(
          "443/tcp  open   https (simulated)"
        );

        terminalPrint(
          "Training simulation complete."
        );
        break;

      case "clear":
        terminalOutput.innerHTML = "";
        break;

      default:
        terminalPrint(
          "Command not found: " +
          cmd +
          ". Ketik help untuk bantuan."
        );
    }
  }

  $("#termForm")?.addEventListener("submit", event => {
    event.preventDefault();

    terminalRun(terminalInput.value);

    terminalInput.value = "";
    terminalInput.focus();
  });

  $$("[data-cmd]").forEach(button => {
    button.addEventListener("click", () => {
      terminalRun(
        button.getAttribute("data-cmd")
      );
    });
  });

  if (terminalOutput) {
    terminalPrint(
      "Welcome to Adhit Hack Lab Terminal!"
    );

    terminalPrint(
      "This is a browser-only simulation."
    );

    terminalPrint(
      "Type 'help' to get started."
    );
  }

  /* =====================================
     GLOSSARY
  ===================================== */

  const glossary = [
    ["HTTP", "Protokol komunikasi antara browser dan server."],
    ["HTTPS", "HTTP yang diamankan menggunakan TLS."],
    ["DNS", "Sistem penerjemah nama domain ke alamat IP."],
    ["IP Address", "Alamat identitas perangkat dalam jaringan."],
    ["Firewall", "Sistem pengatur lalu lintas jaringan berdasarkan aturan."],
    ["Hashing", "Proses menghasilkan representasi hash dari data."],
    ["Encryption", "Proses melindungi data menggunakan kriptografi."],
    ["CTF", "Capture The Flag, format kompetisi keamanan siber."],
    ["Phishing", "Teknik penipuan untuk memancing informasi sensitif."],
    ["XSS", "Cross-Site Scripting, kerentanan injeksi script pada aplikasi web."],
    ["SQL", "Structured Query Language untuk mengelola database."],
    ["OWASP", "Organisasi yang menyediakan sumber daya keamanan aplikasi."]
  ];

  const glossaryContainer = $("#gl");

  if (glossaryContainer) {
    glossary.forEach(([term, description]) => {
      const card = document.createElement("button");

      card.type = "button";
      card.className = "gl-card reveal";

      const title = document.createElement("strong");
      title.textContent = term;

      const detail = document.createElement("span");
      detail.textContent = description;

      card.append(title, detail);

      card.addEventListener("click", () => {
        card.classList.toggle("active");
        toast(term + ": " + description);
      });

      glossaryContainer.appendChild(card);

      card.classList.add("is-in");
    });
  }

  /* =====================================
     MASCOT INTERACTION
  ===================================== */

  const mascot = $("#bit");
  const bubble = $("#bubble");

  const mascotMessages = [
    "Hai! Jangan lupa belajar hari ini! ✨",
    "Semangat! Satu misi lagi!",
    "Ingat, ethical hacking harus punya izin!",
    "Kamu pasti bisa menyelesaikan tantangan ini!",
    "Keep learning, keep exploring! 🚀"
  ];

  if (mascot && bubble) {
    mascot.style.cursor = "pointer";

    mascot.addEventListener("click", () => {
      const random =
        Math.floor(Math.random() * mascotMessages.length);

      bubble.textContent = mascotMessages[random];
    });
  }

  /* =====================================
     INITIALIZATION
  ===================================== */

  renderMissions();
  updateHUD();

  console.log(
    "%c ADHIT HACK LAB ",
    "background:#FFD93D;color:#111;padding:8px;font-weight:bold;"
  );

  console.log(
    "Welcome, learner. Practice ethically!"
  );

})();
