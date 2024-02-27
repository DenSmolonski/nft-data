import { isEmpty } from 'lodash';
import React from 'react';
import 'react-virtualized/styles.css';

const NFTCard = ({ imageUrl, title, rarityRank }) => {
  return (
    <div className="pulse w-auto bg-darker shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300">
      {isEmpty(imageUrl) ? (
        <div className="h-64 w-full border-box bg-slate-900 animate-pulse"></div>
      ) : (
        <img className="h-64 w-full object-cover" src={imageUrl} alt={title} />
      )}
      <div className="p-4">
        <h3 className="text-white text-xl mb-2 truncate">{title}</h3>
        <p className="text-white font-medium">Rarity rank: {rarityRank}</p>
      </div>
    </div>
  );
};

export default NFTCard;
