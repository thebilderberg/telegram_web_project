import { useEffect, useRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import { GlobalOutlined, SettingOutlined } from '@ant-design/icons';

import { fullTimezones } from './settings/constans';
import { ClockDisplayMode, Timezone } from './settings/types';

import "./Clocks.scss";

export const Clocks = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🔹 Локальное состояние
  const [timezone, setTimezone] = useState<Timezone>('moscow');
  const [displayMode, setDisplayMode] = useState<ClockDisplayMode>('classic');
  const [isDark, setIsDark] = useState(false);

  const strokeColor = isDark ? '#c2c2c2' : '#000';

  const canvasClass = classNames('clockElement__canvas', {
    clockElement__canvas_dark: isDark,
  });

  // 🔹 Меню выбора режима отображения
  const displayModeMenu: MenuProps['items'] = [
    { key: 'classic', label: 'Классические' },
    { key: 'dayNight', label: 'С день/ночь' },
    { key: 'digital', label: 'Цифровые' },
    { key: 'AmPm', label: 'С am/pm' },
  ];

  const timezoneMenu: MenuProps['items'] = Object.entries(fullTimezones).map(
    ([key, { label }]) => ({ key, label })
  );

  const selectDisplayMode: MenuProps['onClick'] = ({ key }) => {
    setDisplayMode(key as ClockDisplayMode);
  };

  const selectTimezone: MenuProps['onClick'] = ({ key }) => {
    setTimezone(key as Timezone);
  };

  // 🔹 Отрисовка часов
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = canvas.width / 2;
    let animationFrameId: number;

    const drawClock = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const tzOffset = fullTimezones[timezone].offset;
      const localTime = new Date(utc + 3600000 * tzOffset);

      const ms = localTime.getMilliseconds();
      const seconds = localTime.getSeconds() + ms / 1000;
      const minutes = localTime.getMinutes() + seconds / 60;
      const hours = localTime.getHours() + minutes / 60;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(radius, radius);

      // Фон
      ctx.fillStyle = isDark ? '#000' : '#fcfcfd';
      ctx.beginPath();
      ctx.arc(0, 0, radius - 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = strokeColor;
      ctx.stroke();

      if (displayMode === 'digital') {
        drawDigitalTime(ctx, localTime, radius, strokeColor);
      } else {
        // Часовые деления
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        for (let i = 0; i < 12; i++) {
          const angle = (i * 30 * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (radius - 5), Math.sin(angle) * (radius - 5));
          ctx.lineTo(Math.cos(angle) * (radius - 13), Math.sin(angle) * (radius - 13));
          ctx.stroke();
        }

        // Минутные деления
        ctx.lineWidth = 1;
        for (let i = 0; i < 60; i++) {
          const angle = (i * 6 * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (radius - 6), Math.sin(angle) * (radius - 6));
          ctx.lineTo(Math.cos(angle) * (radius - 10), Math.sin(angle) * (radius - 10));
          ctx.stroke();
        }

        // Цифры
        ctx.font = '12px Arial';
        ctx.fillStyle = strokeColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          ctx.fillText(i.toString(), Math.cos(angle) * (radius - 22), Math.sin(angle) * (radius - 22));
        }

        // Иконки
        if (displayMode === 'dayNight') {
          drawDayNightIcon(ctx, hours, radius - 10);
        }
        if (displayMode === 'AmPm') {
          drawAmPmIcon(ctx, hours, radius - 10);
        }

        // Стрелки
        drawHand(ctx, ((hours % 12) * 30 * Math.PI) / 180, radius * 0.4, 4, strokeColor);
        drawHand(ctx, (minutes * 6 * Math.PI) / 180, radius * 0.65, 2.5, strokeColor);
        drawHand(ctx, (seconds * 6 * Math.PI) / 180, radius * 0.7, 1.6, 'red');
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(drawClock);
    };

    drawClock();
    return () => cancelAnimationFrame(animationFrameId);
  }, [timezone, displayMode, isDark, strokeColor]);

  return (
    <div className="clockElement">
      <Dropdown menu={{ items: displayModeMenu, onClick: selectDisplayMode }} trigger={['click']}>
        <SettingOutlined className="clockElement__menuIcon" />
      </Dropdown>
      <canvas className={canvasClass} ref={canvasRef} width={125} height={125} />
      <Dropdown
        menu={{ items: timezoneMenu, onClick: selectTimezone }}
        trigger={['click']}
        rootClassName="clockElement__timezoneDropdown"
      >
        <GlobalOutlined className="clockElement__menuIcon" />
      </Dropdown>
      <div className="clockElement__label">{fullTimezones[timezone].label}</div>
    </div>
  );
};

// 🔹 Хелперы
const drawHand = (
  ctx: CanvasRenderingContext2D,
  angle: number,
  length: number,
  width: number,
  color = 'black'
) => {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.lineTo(length * Math.cos(angle - Math.PI / 2), length * Math.sin(angle - Math.PI / 2));
  ctx.stroke();
};

const drawDayNightIcon = (ctx: CanvasRenderingContext2D, hour: number, radius: number) => {
  const isDay = hour >= 6 && hour < 18;
  ctx.fillStyle = '#0f6b96';
  ctx.beginPath();
  ctx.arc(0, radius * 0.3, 14, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(isDay ? '☀️' : '🌙', 0, radius * 0.32);
};

const drawAmPmIcon = (ctx: CanvasRenderingContext2D, hour: number, radius: number) => {
  const isAm = hour >= 0 && hour < 13;
  ctx.fillStyle = '#0f6b96';
  ctx.beginPath();
  ctx.arc(0, radius * 0.3, 14, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.font = '13px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(isAm ? 'AM' : 'PM', 0, radius * 0.32);
};

const drawDigitalTime = (
  ctx: CanvasRenderingContext2D,
  time: Date,
  radius: number,
  color: string
) => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const ms = time.getMilliseconds();
  const colonAlpha = 0.5 + 0.5 * Math.sin((ms / 1000) * 2 * Math.PI);

  const timeText = `${hours} ${minutes} ${seconds}`;

  ctx.font = 'bold 18px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;

  ctx.fillText(timeText, 0, -radius * 0.08);

  const textWidth = ctx.measureText(timeText).width;
  const colonSpacing = textWidth / 5.2;

  ctx.globalAlpha = colonAlpha;
  ctx.fillText(':', -colonSpacing, -radius * 0.1);
  ctx.fillText(':', colonSpacing, -radius * 0.1);
  ctx.globalAlpha = 1;

  ctx.font = '12px "Courier New", monospace';
  const dateStr = time.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  ctx.fillText(dateStr, 0, radius * 0.3);
};
