import type { ReactNode } from "react";

interface HeroProps {
  title: ReactNode;
  text: string;
  image: string;
  children?: ReactNode;
}

export default function Hero({ title, text, image, children }: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="row ai-center">
          <div className="col4">
            <div className="hero-desc">
              <h1>{title}</h1>
              <p>{text}</p>
              <div className="sapcer30" />
              {children}
            </div>
          </div>
          <div className="col6">
            <img src={image} alt="" className="img-responsive" />
          </div>
        </div>
      </div>
    </section>
  );
}
