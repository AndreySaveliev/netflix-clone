import React, { useMemo, useCallback } from 'react';

import axios from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteByttonProps {
  movieId: String;
}

const FavoriteButton: React.FC<FavoriteByttonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      //  i dont know why but data: {movieId} does no add body to req. I decided to use params instead
      response = await axios.delete('/api/favorite/', { params: { movieId }, data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }
    const updatedFavorites = response?.data?.faveoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavorites
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="group/item transitioin flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white hover:border-neutral-300 lg:h-10 lg:w-10"
    >
      <Icon />
    </div>
  );
};

export default FavoriteButton;
