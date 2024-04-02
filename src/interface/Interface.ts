export type ICharacter = {
  id: number;
  name: string;
  image: string;
};
type TOrigin = {
  name: string;
};

export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: TOrigin;
};
export type CharacterArray = Character[][];
export interface ICharacterNameResults {
  characters: ICharacter[];
}
export interface ICharacterFilter {
  filter: Character[];
}

export interface Ifilter {
  status?: string;
  gender?: string;
  species?: string;
  all?: boolean;
}
