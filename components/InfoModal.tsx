import React, { useCallback, useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModel from '@/hooks/useInfoModel';
import useMovie from '@/hooks/useMovie';

interface InfoModelProps {
  visible: boolean;
  onClose: any;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose }) => {
  const [isVisible, setVisible] = useState(!!visible);

  const { movieId } = useInfoModel();

  const { data = {} } = useMovie(movieId!);

  useEffect(() => {
    setVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-90 transition duration-300">
      <div className="relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md">
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } relative flex-auto transform bg-zinc-900 drop-shadow-md duration-300 `}
        >
          <div className="relative h-96">
            <video
              className="h-full w-full object-cover brightness-[60%]"
              src={data?.videoUrl}
              poster={data?.thumbmailUrl}
              autoPlay
              muted
              loop
            ></video>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-70"
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {data?.title}
              </p>
              <div className="flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-lg font-semibold text-green-400">New</p>
            <p className="text-lg text-white">{data?.durations}</p>
            <p className="text-lg text-white">{data?.genre}</p>
            <p className="text-lg text-white">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
