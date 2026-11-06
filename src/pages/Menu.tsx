import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import { MENU_ITEMS } from "../data/menu";
import heroMenu from "../assets/hero-menu.png";

export default function Menu() {
  return (
    <>
      <Hero
        title={
          <>
            Menu <span>Wekidiくん</span>
          </>
        }
        text="Mau Makan Yang Udah Pasti Enak Dan Terjangkau? Cuma Ada Di Wekidiくん Tempatnya."
        image={heroMenu}
      />

      <section className="food">
        <div className="container">
          <div className="row">
            {MENU_ITEMS.map((item) => (
              <FoodCard
                key={item.title}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
