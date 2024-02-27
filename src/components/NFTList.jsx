import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { map } from 'lodash';
import {
  useTokens,
} from '@reservoir0x/reservoir-kit-ui';
import { AutoSizer, List } from 'react-virtualized';
import NFTCard from './NFTCard';

const ITEM_SIZE = 370;
const ITEM_WIDTH = 260;
const LOAD_MORE_THRESHOLD = 200;
const DEFAULT_LIMIT = 20;
const generateMockItems = (count) => {
  return Array.from({ length: count }).map(() => ({
    img: '',
    title: 'Loading...',
    price: 0,
  }));
};


const NFTList = () => {
  const { data: tokens, fetchNextPage, isFetchingPage } = useTokens({
    collection: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
    limit: DEFAULT_LIMIT,
  });

  const [nfts, setNfts] = useState([]);

  const listRef = useRef();

  useEffect(() => {
    if (tokens.length === 0) return;
    const formattedTokens = map(tokens, ({ token }) => {
      return {
        img: token.image,
        title: token.name,
        rarityRank: token.rarityRank,
      };
    });
    setNfts(formattedTokens);
  }, [tokens]);

  useEffect(() => {
    if (isFetchingPage) {
      const newMockItems = generateMockItems(DEFAULT_LIMIT);
      setNfts((prevNfts) => [...prevNfts, ...newMockItems]);
    }
  }, [isFetchingPage]);

  const onScroll = useCallback(
    ({ clientHeight, scrollTop, scrollHeight }) => {
      if (scrollTop + clientHeight >= scrollHeight - LOAD_MORE_THRESHOLD) {
        fetchNextPage();
      }
    },
    [fetchNextPage]
  );

  return (
    <AutoSizer>
      {({ height, width }) => {
        const itemsPerRow = Math.floor(width / ITEM_WIDTH);
        const rowCount = Math.ceil(nfts.length / itemsPerRow);

        return (
          <List
            ref={(ref) => {
              ref && (listRef.current = ref);
            }}
            className="List"
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={ITEM_SIZE}
            onScroll={onScroll}
            rowRenderer={({ index, key, style }) => {
              const items = [];
              const fromIndex = index * itemsPerRow;
              const toIndex = Math.min(fromIndex + itemsPerRow, nfts.length);

              for (let i = fromIndex; i < toIndex; i++) {
                const nft = nfts[i];
                items.push(
                  <div className="box-border px-3 w-full" key={i}>
                    <NFTCard
                      imageUrl={nft.img}
                      title={nft.title}
                      rarityRank={nft.rarityRank}
                    />
                  </div>
                );
              }

              return (
                <div
                  className="grid place-items-center"
                  key={key}
                  style={{
                    ...style,
                    gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`,
                  }}
                >
                  {items}
                </div>
              );
            }}
          />
        );
      }}
    </AutoSizer>
  );
}

export default NFTList;
