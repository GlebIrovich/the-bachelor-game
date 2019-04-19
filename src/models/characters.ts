export enum CharacterType {
  THIEF = 'thief',
  WIZARD = 'wizard',
  PALADIN = 'paladin',
}

export const characterTitleMap = {
  [CharacterType.PALADIN]: 'Паладин',
  [CharacterType.THIEF]: 'Вор',
  [CharacterType.WIZARD]: 'Маг',
}

export const characterList = [
  CharacterType.PALADIN,
  CharacterType.THIEF,
  CharacterType.WIZARD,
]