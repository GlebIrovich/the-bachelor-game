import { SkillType } from './games';

export enum CharacterType {
  THIEF = 'thief',
  WIZARD = 'wizard',
  PALADIN = 'paladin',
  BARBARIAN = 'barbarian',
  BARD = 'bard',
  GUNSLINGER = 'gunslinger',
  MONK = 'monk',
}

export const characterTitleMap = {
  [CharacterType.PALADIN]: 'Рыцарь',
  [CharacterType.THIEF]: 'Вор',
  [CharacterType.WIZARD]: 'Маг',
  [CharacterType.BARBARIAN]: 'Варвар',
  [CharacterType.BARD]: 'Бард',
  [CharacterType.GUNSLINGER]: 'Стрелок',
  [CharacterType.MONK]: 'Монах',
};

export const characterList = [
  CharacterType.PALADIN,
  CharacterType.THIEF,
  CharacterType.WIZARD,
  CharacterType.BARBARIAN,
  CharacterType.BARD,
  CharacterType.GUNSLINGER,
  CharacterType.MONK,
];

export const characterDescriptionMap = {
  [CharacterType.PALADIN]: `
    Рыцарь ставит свою честь превыше всего. Он идет на все ради подвигов и славы. На рыцаря возложена священная миссия.
    Он охраняет грааль, доверенный ему самим папой. Чьим, правда, не уточняется.
    Облаченный в тяжелую броню, рыцарь не может передвигаться без своей пони-лошадки.
    Игрок с классом РЫЦАРЬ должен передвигаться только на лошадке.`,
  [CharacterType.THIEF]: `
    Во всем полагается на удачу. Не может сам выбрать напиток, все решают кубики.
    Вор не может отказать себе в удовольствии взять вещь, которая плохо лежит.
    В конце игры Вор получает по 1 очку за каждый уникальный украденный из баров подстаканник для пива.`,
  [CharacterType.WIZARD]: `
    Ученики магических школ научились контролировать потоки энергии, окружающие наш мир.
    Черпая знания из древних свитков, маги стали непрезойденными мастерами заклинаний, лекарями и опасными противниками.`,
  [CharacterType.BARBARIAN]: `
    Рыцарь ставит свою честь превыше всего. Он идет на все ради подвигов и славы. На рыцаря возложена священная миссия.
    Он охраняет грааль, доверенный ему самим папой. Чьим, правда, не уточняется.
    Облаченный в тяжелую броню, рыцарь не может передвигаться без своей пони-лошадки.
    Игрок с классом РЫЦАРЬ должен передвигаться только на лошадке.`,
  [CharacterType.BARD]: `
    Во всем полагается на удачу. Не может сам выбрать напиток, все решают кубики.
    Вор не может отказать себе в удовольствии взять вещь, которая плохо лежит.
    В конце игры Вор получает по 1 очку за каждый уникальный украденный из баров подстаканник для пива.`,
  [CharacterType.MONK]: `
    Ученики магических школ научились контролировать потоки энергии, окружающие наш мир.
    Черпая знания из древних свитков, маги стали непрезойденными мастерами заклинаний, лекарями и опасными противниками.`,
  [CharacterType.GUNSLINGER]: `
    Ученики магических школ научились контролировать потоки энергии, окружающие наш мир.
    Черпая знания из древних свитков, маги стали непрезойденными мастерами заклинаний, лекарями и опасными противниками.`,
};

export const skillTypeMap = {
  [SkillType.ARTEFACT]: 'Артефакт',
  [SkillType.ATTACK]: 'Атака',
  [SkillType.DEFENCE]: 'Защита',
};

export const skillDescriptionMap = {
  [CharacterType.PALADIN]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.THIEF]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.WIZARD]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.BARBARIAN]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.BARD]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.GUNSLINGER]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
  [CharacterType.MONK]: {
    [SkillType.ARTEFACT]: 'Способность Артефакта',
    [SkillType.ATTACK]: 'Атакующая способность',
    [SkillType.DEFENCE]: 'Защитная способность',
  },
};
