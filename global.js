console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

let pages = [
    // { url: "index.html", title: "Home" },
    // { url: "projects/index.html", title: "Projects" },
    // { url: "projects/project-1.html", title: "Project1" },
    // { url: "projects/project-2.html", title: "Project2" },
    // { url: "cv/index.html", title: "CV" },
    // { url: "contact/index.html", title: "Contact" },
];

const ARE_WE_HOME = document.documentElement.classList.contains("home");

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    // Adjust URL if not on the home page and the URL does not start with "http"
    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

    let a = document.createElement("a");
    a.href = url;
    a.textContent = p.title;
    

    // Highlight the current page link
    a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank";
    }

    nav.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
        Theme:
        <select id="theme-selector">
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
`);

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const selectElement = document.getElementById('theme-selector');
selectElement.value = prefersDarkScheme ? "dark" : "light";

// Retrieve theme preference from localStorage
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme ? 'dark' : 'light');

// Apply the saved theme
applyTheme(savedTheme);

// Listen for theme change events
selectElement.addEventListener('change', function(event) {
    const theme = event.target.value;
    applyTheme(theme);
    localStorage.setItem('theme', theme); // Save theme preference
});

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme); 
    const root = document.documentElement;
    const themeValues = getThemeValues(theme);
    Object.keys(themeValues).forEach(key => {
        root.style.setProperty(`--${key}`, themeValues[key]);
    });
}

// Function to get theme values
function getThemeValues(theme) {
    const themes = {
        "light": {
            "--background-color": "#ffffff",
            "--text-color": "#000000",
            "--accent-color": "#4100e6",
            "--border-color": "#e0e0e0",
            "--link-color": "#0000EE",
            "--hover-background-color": "#f5f5f5",
            "--button-background-color": "#000000",
            "--button-text-color": "#ffffff",
            "--button-hover-background-color": "#333333",
            "--proj-background": "linear-gradient(135deg, #e0e6d9 10%, #422e6e 100%)"
        },
        "dark": {
            "--background-color": "#121212",
            "--text-color": "#ffffff",
            "--accent-color": "#e0e6d9",
            "--border-color": "#333333",
            "--link-color": "#9DACFF",
            "--hover-background-color": "#2a2a2a",
            "--button-background-color": "#ffffff",
            "--button-text-color": "#000000",
            "--button-hover-background-color": "#555555",
            "--proj-background": "linear-gradient(135deg, #3c08b6 10%, #e0e6d9 100%)"
        }
    };
    return themes[theme] || themes["light"]; 
}
