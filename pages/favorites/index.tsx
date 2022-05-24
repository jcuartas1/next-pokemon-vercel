import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui/NoFavorites"
import { useState, useEffect } from 'react';
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";


const FavoritesPages = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemos() );


  }, [])
  

  return (
    //@ts-ignore
    <Layout title="Pokemons - Favoritos">

      {
        favoritePokemons.length === 0
        ? (<NoFavorites/>)
        : <FavoritePokemons pokemons={favoritePokemons}/>
      }
    </Layout>
  )
}

export default FavoritesPages
