import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { getMyFavorites } from "../services/favoriteService";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getMyFavorites();

        setFavorites(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Layout>
      <div className="favorites-page">
        <h1 className="favo-title">⭐ My Favorites</h1>

        {favorites.length === 0 ? (
          <p>No favorite images yet.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="favorite-card">
                <img
                  src={favorite.media?.mediaUrl}
                  alt="favorite"
                  className="favorite-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Favorites;
