/* ==========================================================================
   EduPro — script.js
   Plain, modern (ES6+) JavaScript. No frameworks or libraries.

   This file is organised into clearly commented sections:
     1. Navigation (hamburger menu, active link highlight, fade-in sections)
     2. GPA Calculator (SGPA + CGPA)
     3. Resume Canvas (live preview + PDF download)
     4. Book Log (Fiction Books, Research Papers, Search Books)
     5. Small shared helpers (toast messages, unique IDs, localStorage)
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. SHARED HELPERS
   -------------------------------------------------------------------------- */

// Creates a short, "good enough" unique id for list items (books, courses...).
// A real backend would normally generate these — here we just need something
// unique within the browser session.
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Shows a small toast message at the bottom of the screen for a couple of
// seconds. Used to confirm actions like "Book saved!" without an alert().
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// Tiny wrappers around localStorage so our data survives a page refresh.
// NOTE: This is a frontend-only stand-in for a real backend/database.
// In a full-stack version, saveData()/loadData() would instead send
// requests to a server (e.g. via fetch()) that stores data in a database.
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadData(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}


/* ==========================================================================
   1. NAVIGATION
   ========================================================================== */

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

// Toggle the mobile menu open/closed when the hamburger icon is tapped.
hamburgerBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu automatically after a link is tapped.
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerBtn.classList.remove('open');
  });
});

// Highlight the nav link for whichever section is currently in view, and
// fade sections in as they scroll into the viewport. Both use a single
// IntersectionObserver for efficiency.
const sections = document.querySelectorAll('.section');
const navLinkMap = {}; // section id -> nav link element
document.querySelectorAll('.nav-link').forEach((link) => {
  navLinkMap[link.dataset.section] = link;
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Fade the section in once it's visible.
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
      // Update the active nav link when a section crosses the middle of the screen.
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        Object.values(navLinkMap).forEach((l) => l.classList.remove('active-link'));
        const activeLink = navLinkMap[entry.target.id];
        if (activeLink) activeLink.classList.add('active-link');
      }
    });
  },
  { threshold: [0.3] }
);
sections.forEach((section) => sectionObserver.observe(section));


/* ==========================================================================
   1b. TAB SWITCHING (shared logic for GPA Calci and Book Log)
   Any group of buttons with class "tab-btn" toggles the .tab-panel with a
   matching id of "<data-tab>-panel", as long as they share the same parent
   "tabs" container's section.
   ========================================================================== */

document.querySelectorAll('.tabs').forEach((tabGroup) => {
  const buttons = tabGroup.querySelectorAll('.tab-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Deactivate every button/panel in this tab group's section.
      const sectionEl = tabGroup.closest('.section');
      buttons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      sectionEl.querySelectorAll(':scope > .container > .tab-panel').forEach((panel) => {
        panel.classList.remove('active');
      });

      // Activate the clicked button and its matching panel.
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`${btn.dataset.tab}-panel`);
      if (panel) panel.classList.add('active');
    });
  });
});


/* ==========================================================================
   2. GPA CALCULATOR
   ========================================================================== */

// Grade -> grade point mapping (10-point scale). Feel free to adjust this
// to match your own university's grading system.
const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'Fail': 0
};

/* ---------- SGPA Calculator ---------- */

const sgpaTableBody = document.getElementById('sgpaTableBody');
const addCourseBtn = document.getElementById('addCourseBtn');
const calculateSgpaBtn = document.getElementById('calculateSgpaBtn');
const sgpaResult = document.getElementById('sgpaResult');

// Builds the <option> list for a grade <select>.
function buildGradeOptions() {
  return Object.keys(GRADE_POINTS)
    .map((grade) => `<option value="${grade}">${grade}</option>`)
    .join('');
}

// Adds one new, empty course row to the SGPA table.
function addCourseRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" class="course-name" placeholder="e.g. Data Structures" /></td>
    <td><input type="number" class="course-credits" min="0" step="0.5" placeholder="4" /></td>
    <td>
      <select class="course-grade">${buildGradeOptions()}</select>
    </td>
    <td><button type="button" class="row-delete-btn" title="Delete course">✕</button></td>
  `;
  // Deleting a row: remove it from the table, then re-hide the result
  // card since the previous calculation is now out of date.
  row.querySelector('.row-delete-btn').addEventListener('click', () => {
    row.remove();
    sgpaResult.hidden = true;
  });
  sgpaTableBody.appendChild(row);
}

addCourseBtn.addEventListener('click', addCourseRow);

// Reads every course row, calculates SGPA = Σ(credits × gradePoint) / Σ(credits)
calculateSgpaBtn.addEventListener('click', () => {
  const rows = sgpaTableBody.querySelectorAll('tr');
  let totalCredits = 0;
  let weightedSum = 0;

  rows.forEach((row) => {
    const credits = parseFloat(row.querySelector('.course-credits').value) || 0;
    const grade = row.querySelector('.course-grade').value;
    const gradePoint = GRADE_POINTS[grade] ?? 0;
    totalCredits += credits;
    weightedSum += credits * gradePoint;
  });

  const sgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  document.getElementById('sgpaValue').textContent = sgpa.toFixed(2);
  document.getElementById('sgpaTotalCredits').textContent = totalCredits;
  sgpaResult.hidden = false;
});

// Start the SGPA table with three empty rows so it doesn't look bare.
addCourseRow();
addCourseRow();
addCourseRow();


/* ---------- CGPA Calculator ---------- */

const cgpaTableBody = document.getElementById('cgpaTableBody');
const addSemesterBtn = document.getElementById('addSemesterBtn');
const calculateCgpaBtn = document.getElementById('calculateCgpaBtn');
const cgpaResult = document.getElementById('cgpaResult');

function addSemesterRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" class="semester-name" placeholder="e.g. Semester 3" /></td>
    <td><input type="number" class="semester-sgpa" min="0" max="10" step="0.01" placeholder="8.50" /></td>
    <td><input type="number" class="semester-credits" min="0" step="0.5" placeholder="24" /></td>
    <td><button type="button" class="row-delete-btn" title="Delete semester">✕</button></td>
  `;
  row.querySelector('.row-delete-btn').addEventListener('click', () => {
    row.remove();
    cgpaResult.hidden = true;
  });
  cgpaTableBody.appendChild(row);
}

addSemesterBtn.addEventListener('click', addSemesterRow);

// CGPA = Σ(semesterGPA × semesterCredits) / Σ(semesterCredits)
calculateCgpaBtn.addEventListener('click', () => {
  const rows = cgpaTableBody.querySelectorAll('tr');
  let totalCredits = 0;
  let weightedSum = 0;

  rows.forEach((row) => {
    const sgpa = parseFloat(row.querySelector('.semester-sgpa').value) || 0;
    const credits = parseFloat(row.querySelector('.semester-credits').value) || 0;
    totalCredits += credits;
    weightedSum += sgpa * credits;
  });

  const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  document.getElementById('cgpaValue').textContent = cgpa.toFixed(2);
  document.getElementById('cgpaTotalCredits').textContent = totalCredits;
  cgpaResult.hidden = false;
});

// Start the CGPA table with two empty rows.
addSemesterRow();
addSemesterRow();


/* ==========================================================================
   3. RESUME CANVAS
   ========================================================================== */

const resumeForm = document.getElementById('resumeForm');
const resumePreview = document.getElementById('resumePreview');
const resumeThemeSelect = document.getElementById('resumeTheme');
const resumeLayoutSelect = document.getElementById('resumeLayout');
const resumeFontSelect = document.getElementById('resumeFont');
const downloadResumeBtn = document.getElementById('downloadResumeBtn');

// Turns a multi-line textarea value into an array of non-empty lines.
function linesToArray(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

// Reads every form field and re-renders the live preview on the right.
// Called on every keystroke (via the 'input' event) so the preview always
// stays in sync with the form — this is the "live" part of Resume Canvas.
function renderResumePreview() {
  const name = document.getElementById('rName').value || 'Your Name';
  const email = document.getElementById('rEmail').value;
  const phone = document.getElementById('rPhone').value;
  const linkedin = document.getElementById('rLinkedin').value;
  const github = document.getElementById('rGithub').value;
  const skills = document.getElementById('rSkills').value.split(',').map((s) => s.trim()).filter(Boolean);
  const education = linesToArray(document.getElementById('rEducation').value);
  const projects = linesToArray(document.getElementById('rProjects').value);
  const experience = linesToArray(document.getElementById('rExperience').value);

  // Build the contact line, skipping any fields the user left blank.
  const contactParts = [email, phone, linkedin, github].filter(Boolean);

  const skillTags = skills.map((s) => `<span class="rp-skill-tag">${s}</span>`).join('');
  const educationHtml = education.map((e) => `<p class="rp-item">${e}</p>`).join('') || '<p class="rp-item">—</p>';
  const projectsHtml = projects.map((p) => `<p class="rp-item">${p}</p>`).join('') || '<p class="rp-item">—</p>';
  const experienceHtml = experience.map((x) => `<p class="rp-item">${x}</p>`).join('') || '<p class="rp-item">—</p>';

  // The "sidebar" holds contact + skills, the "main" column holds the rest.
  // In the "classic" layout both simply stack full-width (see CSS).
  resumePreview.innerHTML = `
    <div class="rp-sidebar">
      <div class="rp-name">${name}</div>
      <p class="rp-contact">${contactParts.join(' · ') || 'your.email@example.com'}</p>
      <div class="rp-section-title">Skills</div>
      <div>${skillTags || '<p class="rp-item">—</p>'}</div>
    </div>
    <div class="rp-main">
      <div class="rp-section-title">Education</div>
      ${educationHtml}
      <div class="rp-section-title">Projects</div>
      ${projectsHtml}
      <div class="rp-section-title">Experience</div>
      ${experienceHtml}
    </div>
  `;
}

// Re-render the preview whenever any form field changes.
resumeForm.addEventListener('input', renderResumePreview);

// Applies the chosen colour theme and layout as CSS classes, and the
// chosen font directly via inline style (simplest option for a single
// dynamic value like a font-family string).
function applyResumeStyle() {
  resumePreview.className = 'resume-preview'; // reset classes
  resumePreview.classList.add(`theme-${resumeThemeSelect.value}`);
  resumePreview.classList.add(`layout-${resumeLayoutSelect.value}`);
  resumePreview.style.fontFamily = resumeFontSelect.value;
}
[resumeThemeSelect, resumeLayoutSelect, resumeFontSelect].forEach((el) => {
  el.addEventListener('change', applyResumeStyle);
});

// "Download as PDF" — implemented using ONLY the browser's built-in print
// dialog (window.print()), with a print stylesheet (see style.css's
// @media print block) that hides everything except #resumePreview.
// The user picks "Save as PDF" as the destination in that dialog.
// A library like jsPDF or html2pdf.js would give pixel-perfect control
// over the exported PDF, but isn't required to meet this feature.
downloadResumeBtn.addEventListener('click', () => {
  window.print();
});

// Initial render + style so the preview isn't empty on page load.
renderResumePreview();
applyResumeStyle();


/* ==========================================================================
   4. BOOK LOG
   ========================================================================== */

/* ---------- 4a. Fiction Books ---------- */

// Load any previously-saved books from localStorage, or start with an
// empty array. Each book looks like:
// { id, title, author, description, favChar, review, rating, cover, favourite }
let books = loadData('edupro_books', []);

const bookForm = document.getElementById('bookForm');
const bookFormTitle = document.getElementById('bookFormTitle');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBookBtn = document.getElementById('cancelBookBtn');
const bookGrid = document.getElementById('bookGrid');
const bookEmptyState = document.getElementById('bookEmptyState');
const bookSearchInput = document.getElementById('bookSearchInput');
const bookFilterSelect = document.getElementById('bookFilterSelect');

// Show the empty "Add a New Book" form.
addBookBtn.addEventListener('click', () => {
  bookForm.reset();
  document.getElementById('bookId').value = '';
  bookFormTitle.textContent = 'Add a New Book';
  bookForm.hidden = false;
  bookForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

cancelBookBtn.addEventListener('click', () => {
  bookForm.hidden = true;
});

// Tries to fetch a real cover image from the free Open Library Covers API
// using the book title + author. Falls back to null if nothing is found,
// in which case the caller should use an uploaded image or a placeholder.
async function fetchCoverFromOpenLibrary(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author}`);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
    const data = await response.json();
    const firstResult = data.docs && data.docs[0];
    if (firstResult && firstResult.cover_i) {
      return `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-M.jpg`;
    }
    return null;
  } catch (error) {
    // If the user is offline, or the API is unreachable, we simply fall
    // back to no cover — the book card will show a placeholder instead.
    console.warn('Could not fetch cover from Open Library:', error);
    return null;
  }
}

// Reads a <input type="file"> image and returns it as a base64 data URL,
// so it can be stored directly in localStorage alongside the book data.
function readImageAsDataUrl(fileInput) {
  return new Promise((resolve) => {
    const file = fileInput.files[0];
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

bookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('bookId').value || createId();
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();

  // Prefer an uploaded cover image; otherwise try the free API; otherwise
  // fall back to the book's existing cover (when editing) or none at all.
  const uploadedCover = await readImageAsDataUrl(document.getElementById('bookCoverUpload'));
  const existingBook = books.find((b) => b.id === id);
  let cover = uploadedCover || (existingBook ? existingBook.cover : null);
  if (!cover) {
    cover = await fetchCoverFromOpenLibrary(title, author);
  }

  const bookData = {
    id,
    title,
    author,
    description: document.getElementById('bookDescription').value.trim(),
    favChar: document.getElementById('bookFavChar').value.trim(),
    rating: Number(document.getElementById('bookRating').value),
    review: document.getElementById('bookReview').value.trim(),
    cover,
    favourite: existingBook ? existingBook.favourite : false
  };

  const existingIndex = books.findIndex((b) => b.id === id);
  if (existingIndex >= 0) {
    books[existingIndex] = bookData; // editing an existing book
  } else {
    books.push(bookData); // adding a brand-new book
  }

  saveData('edupro_books', books);
  bookForm.reset();
  bookForm.hidden = true;
  renderBooks();
  showToast(existingIndex >= 0 ? 'Book updated!' : 'Book added to your shelf!');
});

// Builds the star string for a given rating, e.g. rating 4 -> "★★★★☆"
function starString(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Renders the book grid, applying the current search text and filter.
function renderBooks() {
  const searchTerm = bookSearchInput.value.trim().toLowerCase();
  const filterValue = bookFilterSelect.value;

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);

    let matchesFilter = true;
    if (filterValue === 'favourite') matchesFilter = book.favourite;
    else if (filterValue !== 'all') matchesFilter = book.rating >= Number(filterValue);

    return matchesSearch && matchesFilter;
  });

  bookEmptyState.hidden = filtered.length !== 0;
  bookGrid.innerHTML = filtered.map((book) => `
    <article class="book-card">
      ${book.cover
        ? `<img class="book-card__cover" src="${book.cover}" alt="Cover of ${book.title}" />`
        : `<div class="book-card__cover-placeholder">📖</div>`
      }
      <div class="book-card__body">
        <h3 class="book-card__title">${book.title}</h3>
        <p class="book-card__author">by ${book.author}</p>
        <p class="book-card__rating">${starString(book.rating)}</p>
        ${book.description ? `<p class="book-card__desc">${book.description}</p>` : ''}
        ${book.favChar ? `<p class="book-card__meta"><strong>Favourite character:</strong> ${book.favChar}</p>` : ''}
        ${book.review ? `<p class="book-card__meta"><strong>My review:</strong> ${book.review}</p>` : ''}
        <div class="book-card__actions">
          <button class="icon-btn icon-btn--fav ${book.favourite ? 'is-favourite' : ''}" data-action="favourite" data-id="${book.id}">
            ${book.favourite ? '★ Favourited' : '☆ Favourite'}
          </button>
          <button class="icon-btn" data-action="edit" data-id="${book.id}">Edit</button>
          <button class="icon-btn" data-action="delete" data-id="${book.id}">Delete</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Event delegation: one listener on the grid handles clicks on any card's
// buttons, instead of attaching a separate listener per card.
bookGrid.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;
  const book = books.find((b) => b.id === id);
  if (!book) return;

  if (action === 'favourite') {
    book.favourite = !book.favourite;
    saveData('edupro_books', books);
    renderBooks();
  } else if (action === 'delete') {
    books = books.filter((b) => b.id !== id);
    saveData('edupro_books', books);
    renderBooks();
    showToast('Book removed.');
  } else if (action === 'edit') {
    bookFormTitle.textContent = 'Edit Book';
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookFavChar').value = book.favChar;
    document.getElementById('bookRating').value = book.rating;
    document.getElementById('bookReview').value = book.review;
    bookForm.hidden = false;
    bookForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

bookSearchInput.addEventListener('input', renderBooks);
bookFilterSelect.addEventListener('change', renderBooks);

renderBooks();


/* ---------- 4b. Research Papers ---------- */

// Each paper looks like: { id, title, topic, summary, link }
let papers = loadData('edupro_papers', []);

const paperForm = document.getElementById('paperForm');
const addPaperBtn = document.getElementById('addPaperBtn');
const cancelPaperBtn = document.getElementById('cancelPaperBtn');
const paperGrid = document.getElementById('paperGrid');
const paperEmptyState = document.getElementById('paperEmptyState');

addPaperBtn.addEventListener('click', () => {
  paperForm.reset();
  document.getElementById('paperId').value = '';
  paperForm.hidden = false;
  paperForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

cancelPaperBtn.addEventListener('click', () => {
  paperForm.hidden = true;
});

paperForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const id = document.getElementById('paperId').value || createId();
  const paperData = {
    id,
    title: document.getElementById('paperTitle').value.trim(),
    topic: document.getElementById('paperTopic').value.trim(),
    summary: document.getElementById('paperSummary').value.trim(),
    link: document.getElementById('paperLink').value.trim()
  };

  const existingIndex = papers.findIndex((p) => p.id === id);
  if (existingIndex >= 0) {
    papers[existingIndex] = paperData;
  } else {
    papers.push(paperData);
  }

  saveData('edupro_papers', papers);
  paperForm.reset();
  paperForm.hidden = true;
  renderPapers();
  showToast(existingIndex >= 0 ? 'Paper updated!' : 'Paper logged!');
});

function renderPapers() {
  paperEmptyState.hidden = papers.length !== 0;
  paperGrid.innerHTML = papers.map((paper) => `
    <article class="paper-card">
      <span class="paper-card__topic">${paper.topic}</span>
      <h3 class="paper-card__title">${paper.title}</h3>
      <p class="paper-card__summary">${paper.summary}</p>
      <div class="paper-card__actions">
        ${paper.link ? `<a class="icon-btn" href="${paper.link}" target="_blank" rel="noopener noreferrer">🔗 Open Link</a>` : ''}
        <button class="icon-btn" data-action="edit" data-id="${paper.id}">Edit</button>
        <button class="icon-btn" data-action="delete" data-id="${paper.id}">Delete</button>
      </div>
    </article>
  `).join('');
}

paperGrid.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;
  const paper = papers.find((p) => p.id === id);
  if (!paper) return;

  if (action === 'delete') {
    papers = papers.filter((p) => p.id !== id);
    saveData('edupro_papers', papers);
    renderPapers();
    showToast('Paper removed.');
  } else if (action === 'edit') {
    document.getElementById('paperId').value = paper.id;
    document.getElementById('paperTitle').value = paper.title;
    document.getElementById('paperTopic').value = paper.topic;
    document.getElementById('paperSummary').value = paper.summary;
    document.getElementById('paperLink').value = paper.link;
    paperForm.hidden = false;
    paperForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

renderPapers();


/* ---------- 4c. Search Books (Discover) ---------- */

const discoverSearchInput = document.getElementById('discoverSearchInput');
const discoverSearchBtn = document.getElementById('discoverSearchBtn');
const discoverGrid = document.getElementById('discoverGrid');
const discoverEmptyState = document.getElementById('discoverEmptyState');

// Searches the free Open Library Search API for books matching a title.
// No API key is required. If you wanted to switch providers later (e.g.
// Google Books API, which does require a key), you would only need to
// change the fetch URL below and how the response fields are read —
// the rest of the app (rendering, "Add to My Books") stays the same.
async function searchOnlineBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=9`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Search request failed');
  const data = await response.json();
  return data.docs || [];
}

async function runDiscoverSearch() {
  const query = discoverSearchInput.value.trim();
  if (!query) return;

  discoverGrid.innerHTML = '';
  discoverEmptyState.hidden = false;
  discoverEmptyState.textContent = 'Searching…';

  try {
    const results = await searchOnlineBooks(query);

    if (results.length === 0) {
      discoverEmptyState.textContent = 'No books found. Try a different title.';
      return;
    }

    discoverEmptyState.hidden = true;
    discoverGrid.innerHTML = results.map((result, index) => {
      const cover = result.cover_i
        ? `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`
        : null;
      const author = (result.author_name && result.author_name[0]) || 'Unknown author';
      const year = result.first_publish_year || '—';

      // We store the raw title/author/cover on the card itself (as data
      // attributes) so the "Add to My Books" button can read them back
      // without needing a separate lookup array.
      return `
        <article class="book-card">
          ${cover
            ? `<img class="book-card__cover" src="${cover}" alt="Cover of ${result.title}" />`
            : `<div class="book-card__cover-placeholder">📖</div>`
          }
          <div class="book-card__body">
            <h3 class="book-card__title">${result.title}</h3>
            <p class="book-card__author">by ${author} · ${year}</p>
            <div class="book-card__actions">
              <button
                class="icon-btn"
                data-action="add-discovered"
                data-title="${result.title.replace(/"/g, '&quot;')}"
                data-author="${author.replace(/"/g, '&quot;')}"
                data-cover="${cover || ''}">
                + Add to My Books
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  } catch (error) {
    console.warn('Book search failed:', error);
    discoverEmptyState.hidden = false;
    discoverEmptyState.textContent =
      'Could not reach the Open Library API right now. Please check your connection and try again.';
  }
}

discoverSearchBtn.addEventListener('click', runDiscoverSearch);
discoverSearchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') runDiscoverSearch();
});

// Lets the user save a search result directly into their Fiction Books shelf.
discoverGrid.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action="add-discovered"]');
  if (!btn) return;

  const newBook = {
    id: createId(),
    title: btn.dataset.title,
    author: btn.dataset.author,
    description: '',
    favChar: '',
    rating: 5,
    review: '',
    cover: btn.dataset.cover || null,
    favourite: false
  };
  books.push(newBook);
  saveData('edupro_books', books);
  renderBooks();
  showToast(`"${newBook.title}" added to your Fiction Books!`);
});
