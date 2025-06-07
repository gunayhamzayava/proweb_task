// hamburger menu
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".close");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
  hamburger.style.display = "none";
  closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  menu.classList.remove("active");
  hamburger.style.display = "block";
  closeIcon.style.display = "none";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    menu.classList.remove("active");
    hamburger.style.display = "none";
    closeIcon.style.display = "none";
  } else {
    hamburger.style.display = "block";
    closeIcon.style.display = "none";
  }
});

// employee card

let employees = [];
const defaultCompany = "Istanbul";

// json-server --watch db/db.json --port 3000 - emrini calisdirin zehmet olmasa terminalda, ona uygun yazmisam kodu 🙏🏻

fetch("http://localhost:3000/employees")
  .then((res) => res.json())
  .then((data) => {
    showCard(defaultCompany, data);
    logoClick(data);
  })
  .catch((err) => console.error("Xeta bas verdi", err));

function showCard(company, employees) {
  const container = document.querySelector(".employee-card");
  container.innerHTML = "";
  const filtered = employees.filter((emp) => emp.company === company);
  if (filtered.length == 0) return;

  const emp = filtered[0];

  container.innerHTML = `
    <div class="card">
        <p>QR Gate ilə iş proseslərimizdə böyük bir dəyişiklik gördük. Artıq işçilərin giriş-çıxış vaxtlarını dəqiq və asanlıqla izləyə bilirik. Bu, həm vaxtı səmərəli idarə etməyə, həm də məsuliyyət bölgüsünü optimallaşdırmağa kömək edir. </p>
        <h3>${emp.name}</h3>
        <p>${emp.position}</p>
    </div>
  `;
}

function logoClick(employees) {
  const logos = document.querySelectorAll(".logos img");

  logos.forEach((logo) => {
    logo.addEventListener("click", () => {
      const company = logo.getAttribute("data-company");
      showCard(company, employees);
    });
  });
}
