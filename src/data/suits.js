import img1 from "../assets/img.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import img11 from "../assets/img11.jpeg";
import mark1 from "../assets/mark1.jpeg";

const suitImages = [
  mark1,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

const defaultParts = [
  { name: "NANO CHEST", image: img1 },
  { name: "SHIELD MORPH", image: img2 },
  { name: "ENERGY BLADES", image: img3 },
  { name: "NANO HELMET", image: img4 },
];

export const SUITS = suitImages.map((image, index) => ({
  id: `mk50-${index + 1}`,
  name: `MARK L${index + 1}`,
  sub: "NANO TECH SUIT",
  year: "2018",
  color: "#00e5ff",
  glow: "rgba(0,229,255,.7)",
  image: image,
  parts: defaultParts,
}));
