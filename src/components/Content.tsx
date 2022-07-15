import { useEffect, useState } from 'react';

import '../styles/content.scss';
import { api } from '../services/api';
import { MovieCard } from '../components/MovieCard';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}



export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
  // Criar um componente Content que recebe um array de objetos com as informações de cada filme.
  // Cada filme deve ser renderizado com o componente MovieCard.
  // O componente Content deve ser renderizado no lado direito da tela.
  // O componente Content deve ser renderizado apenas quando o estado selectedGenreId for diferente de 0.
  // O componente Content deve ser renderizado apenas quando o estado selectedGenre for diferente de {}.
  // O componente Content deve ser renderizado apenas quando o estado selectedGenre for diferente de null.
  // O componente Content deve ser renderizado apenas quando o estado selectedGenre for diferente de undefined.
  // O componente Content deve ser renderizado apenas quando o estado selectedGenre for diferente de ''.
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`/movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);


  return (
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
    </div>
  );

}