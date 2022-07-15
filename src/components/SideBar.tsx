import { useEffect, useState } from 'react';

import '../styles/sidebar.scss';
import { api } from '../services/api';
import { Button } from './Button';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export function SideBar({ selectedGenreId, handleClickButton }: ContentProps) {
  // Criar um componente SideBar que recebe um array de objetos com as informações de cada gênero.
  // Cada gênero deve ter um botão que, ao ser clicado, altera o valor do estado selectedGenreId para o id do gênero.
  // O componente SideBar deve ser renderizado no lado esquerdo da tela.

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    api.get<GenreResponseProps[]>('/genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  );

}