import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModel from '@/components/InfoModal';
import useInfoModel from '@/hooks/useInfoModel';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        premanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModel();

  return (
    <>
      <InfoModel visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div>
        <MovieList title="Trending Now" data={movies} />
      </div>
      <div>
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
