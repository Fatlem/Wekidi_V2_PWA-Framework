interface FoodCardProps {
  image: string;
  title?: string;
  description?: string;
  /** Harga dalam ribuan rupiah */
  price?: number;
}

export default function FoodCard({ image, title, description, price }: FoodCardProps) {
  return (
    <div className="col3">
      <div className="food-card">
        <div className="fc-image">
          <img src={image} alt={title ?? ""} className="img-responsive" loading="lazy" />
        </div>
        {(title || description) && (
          <div className="fc-desc">
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
          </div>
        )}
        {price !== undefined && (
          <div className="fc-price">
            <div className="price-tag">Start From</div>
            <div className="price-num">
              Rp {price} <sup>Ribu</sup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
