"use strict";

// Only run on pages that actually have the table
const tableBody = document.getElementById("tableBody");
if (!tableBody) {
  // No table here -> do nothing
} else {
  // 40 fictional records (10 original + 30 extra)
  const DATA = [
    { id: 1, country: "Deutschland", company: "NordEnergie GmbH", co2: 19.2, year: 2024 },
    { id: 2, country: "Deutschland", company: "RheinSteel AG", co2: 28.4, year: 2024 },
    { id: 3, country: "USA", company: "Sunforge Chemicals", co2: 33.1, year: 2024 },
    { id: 4, country: "USA", company: "BlueRiver Logistics", co2: 41.7, year: 2024 },
    { id: 5, country: "China", company: "Pearl Grid Corp.", co2: 58.8, year: 2024 },
    { id: 6, country: "China", company: "Jade Manufacturing", co2: 61.2, year: 2024 },
    { id: 7, country: "Indien", company: "Lotus Power Co.", co2: 47.3, year: 2024 },
    { id: 8, country: "Indien", company: "Kiran Cement Works", co2: 52.9, year: 2024 },
    { id: 9, country: "Schweiz", company: "AlpenTech Components", co2: 3.4, year: 2024 },
    { id: 10, country: "Brasilien", company: "VerdeAgro Export", co2: 12.6, year: 2024 },
    { id: 11, country: "Frankreich", company: "Seine Petro SA", co2: 21.8, year: 2024 },
    { id: 12, country: "Frankreich", company: "Lyon Metals", co2: 17.5, year: 2024 },
    { id: 13, country: "Italien", company: "Roma Cementi", co2: 24.1, year: 2024 },
    { id: 14, country: "Italien", company: "Milano Transporti", co2: 13.9, year: 2024 },
    { id: 15, country: "Spanien", company: "Iberia Power", co2: 26.0, year: 2024 },
    { id: 16, country: "Spanien", company: "Valencia Shipping", co2: 18.7, year: 2024 },
    { id: 17, country: "Portugal", company: "Lisboa Refining", co2: 11.4, year: 2024 },
    { id: 18, country: "Niederlande", company: "Delta Chemicals", co2: 29.6, year: 2024 },
    { id: 19, country: "Belgien", company: "Brux Steelworks", co2: 15.2, year: 2024 },
    { id: 20, country: "Oesterreich", company: "AlpenZement AT", co2: 9.8, year: 2024 },
    { id: 21, country: "Polen", company: "Vistula Energy", co2: 34.9, year: 2024 },
    { id: 22, country: "Tschechien", company: "Bohemia Glass", co2: 8.7, year: 2024 },
    { id: 23, country: "Ungarn", company: "Danube Manufacturing", co2: 12.1, year: 2024 },
    { id: 24, country: "Rumaenien", company: "Carpathia Cement", co2: 20.4, year: 2024 },
    { id: 25, country: "Schweden", company: "Nordic Timber", co2: 6.1, year: 2024 },
    { id: 26, country: "Norwegen", company: "Fjord Logistics", co2: 5.4, year: 2024 },
    { id: 27, country: "Daenemark", company: "Copenhagen Grid", co2: 7.9, year: 2024 },
    { id: 28, country: "Finnland", company: "Aurora Paper", co2: 10.3, year: 2024 },
    { id: 29, country: "Irland", company: "Celtic Data Centers", co2: 14.6, year: 2024 },
    { id: 30, country: "Vereinigtes Koenigreich", company: "Thames Utilities", co2: 23.7, year: 2024 },
    { id: 31, country: "Kanada", company: "Maple Mining Ltd.", co2: 27.9, year: 2024 },
    { id: 32, country: "Mexiko", company: "Aztec Refinery", co2: 31.5, year: 2024 },
    { id: 33, country: "Japan", company: "Sakura Electronics", co2: 16.8, year: 2024 },
    { id: 34, country: "Suedkorea", company: "Han River Steel", co2: 22.6, year: 2024 },
    { id: 35, country: "Australien", company: "Outback LNG", co2: 35.4, year: 2024 },
    { id: 36, country: "Suedafrika", company: "Cape Power", co2: 25.2, year: 2024 },
    { id: 37, country: "Indonesien", company: "Java Cement", co2: 39.8, year: 2024 },
    { id: 38, country: "Saudi-Arabien", company: "Desert Petrochem", co2: 49.1, year: 2024 },
    { id: 39, country: "Vereinigte Arabische Emirate", company: "Gulf Shipping", co2: 19.9, year: 2024 },
    { id: 40, country: "Nigeria", company: "Lagos Refining", co2: 28.9, year: 2024 },
  ];

  // sanitize input; the main safety is textContent rendering
  function safeInput(value) {
    return String(value || "")
      .replace(/[^\p{L}\p{N}\s\-.,&()]/gu, "")
      .slice(0, 60)
      .trim();
  }


  let pageSize = 10;
  let currentPage = 1; // 1-based

  // Sorting state 
  let sortKey = "co2";
  let sortDir = "desc"; // "asc" | "desc"

  const els = {
    countryInput: document.getElementById("countryInput"),
    companyInput: document.getElementById("companyInput"),
    resetBtn: document.getElementById("resetBtn"),
    tableBody: document.getElementById("tableBody"),
    emptyState: document.getElementById("emptyState"),
    countBadge: document.getElementById("countBadge"),
    sortInfo: document.getElementById("sortInfo"),

    pageSizeSelect: document.getElementById("pageSizeSelect"),
    pageInfo: document.getElementById("pageInfo"),
    prevPageBtn: document.getElementById("prevPageBtn"),
    nextPageBtn: document.getElementById("nextPageBtn"),
  };

  function sortLabelGerman(key) {
    const map = {
      country: "Land",
      company: "Unternehmen",
      co2: "CO2",
      year: "Jahr",
    };
    return map[key] || key;
  }

  function dirLabelGerman(dir) {
    return dir === "asc" ? "aufsteigend" : "absteigend";
  }

  function getFilteredRows() {
    const countryQ = safeInput(els.countryInput.value).toLowerCase();
    const companyQ = safeInput(els.companyInput.value).toLowerCase();

    return DATA.filter((r) => {
      const matchesCountry = !countryQ || r.country.toLowerCase().includes(countryQ);
      const matchesCompany = !companyQ || r.company.toLowerCase().includes(companyQ);
      return matchesCountry && matchesCompany;
    });
  }

  function sortRows(rows) {
    const m = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (typeof av === "number" && typeof bv === "number") return (av - bv) * m;
      return String(av).localeCompare(String(bv), "de", { sensitivity: "base" }) * m;
    });
  }

  function paginateRows(rows) {
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    // Clamp page
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageRows = rows.slice(start, end);

    return { pageRows, totalPages, total };
  }

  function renderTable(rows, total, totalPages) {
    els.tableBody.textContent = "";

    // Count badge = total hits after filtering (not just current page)
    els.countBadge.textContent = String(total);

    // Sort info in German
    els.sortInfo.textContent = `${sortLabelGerman(sortKey)} ${dirLabelGerman(sortDir)}`;

    // Pagination UI
    els.pageInfo.textContent = `${currentPage} / ${totalPages}`;
    els.prevPageBtn.disabled = currentPage <= 1;
    els.nextPageBtn.disabled = currentPage >= totalPages;

    if (total === 0) {
      els.emptyState.classList.remove("d-none");
      return;
    }
    els.emptyState.classList.add("d-none");

    for (const r of rows) {
      const tr = document.createElement("tr");

      const tdCountry = document.createElement("td");
      tdCountry.textContent = r.country;

      const tdCompany = document.createElement("td");
      tdCompany.textContent = r.company;

      const tdCo2 = document.createElement("td");
      tdCo2.className = "text-end";
      tdCo2.textContent = r.co2.toFixed(1);

      const tdYear = document.createElement("td");
      tdYear.textContent = String(r.year);

      tr.append(tdCountry, tdCompany, tdCo2, tdYear);
      els.tableBody.appendChild(tr);
    }
  }

  function update() {
    const filtered = getFilteredRows();
    const sorted = sortRows(filtered);

    const { pageRows, totalPages, total } = paginateRows(sorted);
    renderTable(pageRows, total, totalPages);
  }

  function onSortClick(key) {
    if (sortKey === key) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      // Default sort direction: CO2 descending, others ascending
      sortDir = key === "co2" ? "desc" : "asc";
    }
    currentPage = 1; // Sorting should reset to first page
    update();
  }

  // Events: filters
  els.countryInput.addEventListener("input", () => {
    currentPage = 1;
    update();
  });

  els.companyInput.addEventListener("input", () => {
    currentPage = 1;
    update();
  });

  els.resetBtn.addEventListener("click", () => {
    els.countryInput.value = "";
    els.companyInput.value = "";
    currentPage = 1;
    update();
  });

  // Events: sort buttons
  document.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => onSortClick(btn.dataset.sort));
  });

  // Events: page size
  if (els.pageSizeSelect) {
    els.pageSizeSelect.value = String(pageSize);
    els.pageSizeSelect.addEventListener("change", () => {
      const v = parseInt(els.pageSizeSelect.value, 10);
      pageSize = Number.isFinite(v) && v > 0 ? v : 10;
      currentPage = 1;
      update();
    });
  }

  // Events: pagination buttons
  els.prevPageBtn.addEventListener("click", () => {
    currentPage -= 1;
    update();
  });

  els.nextPageBtn.addEventListener("click", () => {
    currentPage += 1;
    update();
  });

  // Initial render
  update();
}