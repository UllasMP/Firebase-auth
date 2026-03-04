export function injectStarkFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("stark-fonts")) return;

  const link = document.createElement("link");
  link.id = "stark-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap";
  document.head.appendChild(link);
}
