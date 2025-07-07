console.log("🌍 Инициализация запроса на /api/hero");

fetch("/api/hero")
  .then((res) => {
    console.log("📡 Ответ сервера получен:", res);
    return res.json();
  })
  .then((hero) => {
    console.log("📦 Получен hero-объект:", hero);
    
    // Проверяем, что это hero с id = 1
    if (hero.id === "1") {
      console.log(`🖼️ Отрисовываем hero: ${hero.title}`);
      
      const heroContainer = document.getElementById("hero"); // предполагаем, что у вас есть элемент с id="hero"
      heroContainer.style.backgroundImage = `url('${hero.backgroundImage}')`;
      heroContainer.innerHTML = `
        <div id="hero-content">
          <h1>${hero.title}</h1>
          <p>${hero.description}</p>
        </div>
      `;
      
      console.log("✅ Hero отрисован");
    } else {
      console.log("ℹ️ Hero с id=1 не найден");
    }
  })
  .catch((err) => {
    console.error("❌ Ошибка при загрузке hero:", err);
  });


console.log("🌍 Инициализация запроса на /api/posts");

fetch("/api/posts")
  .then((res) => {
    console.log("📡 Ответ сервера получен:", res);
    return res.json();
  })
  .then((posts) => {
    console.log("📦 Получено постов:", posts.length);
    const container = document.getElementById("posts");
    posts.forEach((post, index) => {
      console.log(`🖼️ Добавляется пост #${index + 1}: ${post.title}`);

      const block = document.createElement("div");
      block.className = "post";
      block.innerHTML = `
            <img src="${post.coverImage}" alt="${post.title}">
            <div class="text-overlay">
            <div class="title">${post.title}</div>
            <div class="albumname">${post.albumname}</div>
            </div>
          `;
      block.addEventListener("click", () => {
        window.location.href = `/album.html?id=${album.id}`;
      });

      container.appendChild(block);
    });

    console.log("✅ Все посты отрисованы");
  })
  .catch((err) => {
    console.error("❌ Ошибка при загрузке постов:", err);
  });
