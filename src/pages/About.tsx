import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import { GALLERY_IMAGES } from "../data/menu";
import heroAbout from "../assets/hero-about.png";

const ABOUT_TEXT =
  "Wekidiくん Merupakan Restoran Fast Food Yang Baru Saja Buka Pada Tanggal 01/11/2022 Di Isekai. " +
  "Dengan Produk Unggulan Berupa Burger Bernama Melted LOL Burger, " +
  "Wekidiくん Hingga Saat Ini Baru Memiliki Ratusan Cabang Restoran Di Isekai Tersebar Lebih Dari 20 Negara, Salah Satunya Tempest.";

export default function About() {
  return (
    <>
      <Hero
        title={
          <>
            About <span>Wekidiくん</span>
          </>
        }
        text={ABOUT_TEXT}
        image={heroAbout}
      />

      <section className="food">
        <div className="container">
          <div className="row">
            {GALLERY_IMAGES.map((src) => (
              <FoodCard key={src} image={src} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
