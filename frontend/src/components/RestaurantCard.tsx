interface Business {
  id: string;
  name: string;
  categories: [];
  image_url: string;
}

interface CardProps {
  business: Business;
}

export default function RestaurantCard({ business }: CardProps) {
  return (
    <div key={business.id} className="card" style={{ width: 300 }}>
      <img
        className="card-img-top"
        style={{
          width: 300,
          height: 200,
          objectFit: "cover",
        }}
        src={business.image_url}
        role="img"
        aria-label={"Photo of " + business.name}
      />
      <div className="card-body">
        <h2>{business.name}</h2>
        {business.categories.map((category: any, i: number) => (
          <p className="card-text" key={`${i}-${business.id}`}>
            {category.title}
          </p>
        ))}
      </div>
    </div>
  );
}
