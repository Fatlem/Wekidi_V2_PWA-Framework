import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import { GALLERY_IMAGES } from "../data/menu";
import heroHome from "../assets/hero-home.png";

export default function Home() {
  return (
    <>
      <Hero
        title={
          <>
            Tempat Makan Yang Paling Enak Itu <span>Cuma Ada Disini</span>
          </>
        }
        text="Mau Makan Yang Udah Pasti Enak Dan Terjangkau? Cuma Ada Di Wekidiくん Tempatnya."
        image={heroHome}
      >
        <Link to="/menu" className="btn">
          Lihat Menu
        </Link>
      </Hero>

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
