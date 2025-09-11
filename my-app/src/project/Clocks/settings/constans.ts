import { Timezone } from './types';

export const fullTimezones: Record<Timezone, { label: string; offset: number }> = {
  local: { label: 'Местное время', offset: -new Date().getTimezoneOffset() / 60 },
  kaliningrad: { label: 'Калининград', offset: 2 },
  moscow: { label: 'Москва', offset: 3 },
  samara: { label: 'Самара', offset: 4 },
  ekb: { label: 'Екатеринбург', offset: 5 },
  omsk: { label: 'Омск', offset: 6 },
  novosibirsk: { label: 'Новосибирск', offset: 7 },
  krasnoyarsk: { label: 'Красноярск', offset: 7 },
  irkutsk: { label: 'Иркутск', offset: 8 },
  yakutsk: { label: 'Якутск', offset: 9 },
  vladivostok: { label: 'Владивосток', offset: 10 },
  magadan: { label: 'Магадан', offset: 11 },
  kamchatka: { label: 'Камчатка', offset: 12 },
  newYork: { label: 'Нью-Йорк', offset: -4 },
  tokyo: { label: 'Токио', offset: 9 },
  beijing: { label: 'Пекин', offset: 8 },
};
