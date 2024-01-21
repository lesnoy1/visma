import fetchJsonp from 'fetch-jsonp';
const basePath = import.meta.env.VITE_APP_API_PATH || '';

export interface DeckListProps {
  readonly date_creation: string;
  readonly date_update: string;
  readonly description_md: string;
  readonly freeze_comments: string;
  readonly heroes: Record<string, number>;
  readonly id: number;
  readonly is_published: boolean;
  readonly last_pack: string;
  readonly name: string;
  readonly nb_comments: number;
  readonly nb_favorites: number;
  readonly nb_votes: number;
  readonly slots: Record<string, number>;
  readonly starting_threat: number;
  readonly user_id: number;
  readonly version: string;
}

export interface HeroProps {
  readonly attack: number;
  readonly code: string;
  readonly deck_limit: number;
  readonly defense: number;
  readonly flavor: string;
  readonly has_errata: boolean;
  readonly health: number;
  readonly illustrator: string;
  readonly imagesrc: string;
  readonly is_unique: string;
  readonly name: string;
  readonly octgnid: string;
  readonly pack_code: string;
  readonly pack_name: string;
  readonly position: number;
  readonly quantity: number;
  readonly sphere_code: string;
  readonly sphere_name: string;
  readonly text: string;
  readonly threat: number;
  readonly traits: string;
  readonly type_code: string;
  readonly type_name: string;
  readonly url: string;
  readonly willpower: string;
}

export const getDecklist = async (decklistId: number) => {
  const response = await fetchJsonp(
    `${basePath}/decklist/${decklistId}?jsonp=parseSets`,
    {
      jsonpCallback: 'jsonp',
    }
  );

  return await response.json();
};

export const getHero = async (heroId: string): Promise<HeroProps> => {
  const res = await fetch(`${basePath}/card/${heroId}`);
  return res.json();
};
