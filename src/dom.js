export function addEventListeners() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const sidebarButtons = document.querySelectorAll(".sidebar-button");

    menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });

    sidebarButtons.forEach(btn => 
        btn.addEventListener("click", () => {
            if (!btn.classList.contains("selected")) {
                const selectedBtn = document.querySelector(".sidebar-button.selected");
                selectedBtn.classList.remove("selected");
                btn.classList.add("selected");
            }
    }));
};