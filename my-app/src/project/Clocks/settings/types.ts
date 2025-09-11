import { ThemeConfig } from 'antd';

export interface IClockElement {
  keyClock: string;
  settings: ClockSettings;
  onUpdateSettings: (newSettings: Partial<ClockSettings>) => void;
}

export type Timezone =
  | 'local'
  | 'kaliningrad'
  | 'moscow'
  | 'samara'
  | 'ekb'
  | 'omsk'
  | 'novosibirsk'
  | 'krasnoyarsk'
  | 'irkutsk'
  | 'yakutsk'
  | 'vladivostok'
  | 'magadan'
  | 'kamchatka'
  | 'newYork'
  | 'tokyo'
  | 'beijing';

  export type ClockDisplayMode = 'classic' | 'dayNight' | 'digital' | 'AmPm';

export interface ClockSettings {
  timezone: Timezone;
  displayMode: ClockDisplayMode;
  keyClock: string;
}
