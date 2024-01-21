import { createContext, useCallback, useEffect, useState } from 'react';
import { DeckListProps, HeroProps, getDecklist, getHero } from '../api/api';

export interface AppContextProps {
  readonly deckListError: string;
  readonly deckList: DeckListProps | null;
  readonly heroes: HeroProps[];
  readonly decklistId: number | null;
  readonly deckListLoading: boolean;
  readonly setDecklistId: (id: number) => void;
  readonly modalHero: HeroProps | null;
  readonly setModalHero: (hero: HeroProps | null) => void;
}

export const AppContext = createContext<AppContextProps>({
  deckListError: '',
  deckList: null,
  heroes: [],
  decklistId: null,
  deckListLoading: false,
  setDecklistId: () => {},
  modalHero: null,
  setModalHero: () => {},
});

export const AppProvider = ({
  children,
}: {
  readonly children?: React.ReactNode;
}) => {
  const [decklistId, setDecklistId] = useState<number | null>(null);
  const [deckList, setDeckList] = useState<DeckListProps | null>(null);
  const [deckListError, setDeckListError] = useState<string>('');
  const [deckListLoading, setDeckListLoading] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<HeroProps[]>([]);
  const [modalHero, setModalHero] = useState<HeroProps | null>(null);

  const fetchDeckList = useCallback(async () => {
    if (decklistId) {
      setDeckListLoading(true);

      try {
        const deckListData = await getDecklist(decklistId);
        setDeckList(deckListData || null);
        setDeckListError('');
        if (deckListData && deckListData.heroes) {
          const heroIds = Object.keys(deckListData.heroes);
          const heroesData = await Promise.all(
            heroIds.map((id) => getHero(id))
          );
          setHeroes(
            heroesData.sort((a: HeroProps, b: HeroProps) => {
              if (b.name < a.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          );
        }
      } catch (e) {
        setDeckListError(`Can't load deck list with ID ${decklistId}`);
      } finally {
        setDeckListLoading(false);
      }
    } else {
      setDeckList(null);
    }
  }, [decklistId]);

  useEffect(() => {
    fetchDeckList();
  }, [decklistId, fetchDeckList]);

  return (
    <AppContext.Provider
      value={{
        decklistId,
        setDecklistId,
        deckList,
        heroes,
        deckListLoading,
        deckListError,
        modalHero,
        setModalHero,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
