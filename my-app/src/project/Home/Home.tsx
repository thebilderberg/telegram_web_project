import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture';
import "./Home.scss"

const cards = [
    'https://downloader.disk.yandex.ru/preview/618e135cd0c3824cc672485bb6a9b2954ea77243c93b8de6e431ff2c87035b01/68c0c54e/y2MDUqTEzkM6025LruM9ZJKcoBmDNUSMFeJU9othDsaW7fqlgQPWPyqJgjhLC1XeJGNNyAK3ljmIT9GnMs40cQ%3D%3D?uid=0&filename=66.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1440x692',
    'https://downloader.disk.yandex.ru/preview/dfcbb72a650e0e496797d0dcc8e407a085292c36213ee6dd5f99dfc1112f035e/68c0c537/Nou3V7u4izD-4jyBdBQNcQOidxwhG6AOgwWP0CPcgSTZNUzpVHAB4BfdePIPWMg8uwnTH58VZe8VIgI-AZbNfg%3D%3D?uid=0&filename=55.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1440x692',
    'https://downloader.disk.yandex.ru/preview/ffe75743e836497eadfd3c6ba21776e47244713c55e7da1e236869ac0adaf218/68c0c51d/6iFzr1VTsX5n9LXb_1BCGhQJ5DKF7cYJg-BQHI0PWWfkVKmAO5-Mmr6NCbBaPdRK2wkuq8qzBjVSEoe5mHaMYQ%3D%3D?uid=0&filename=44.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1440x692',
    'https://downloader.disk.yandex.ru/preview/3ee4754e534938be207951d91e8a0522bfae4453f824670bca627def66d04ac3/68c0c4dd/XSVWbdFZMWkcj9hnCI-HLFiRJYSLNnj2KrX5KwwrdcVAzWUh5wypEnvml-ZOiBVrTzq5hag4YY-_wbYM9Qo41g%3D%3D?uid=0&filename=33.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1440x692',
    'https://downloader.disk.yandex.ru/preview/766ddeda48319143f4ed7e55b4d94151009fcec8c0961dd48599d844f3f05bfd/68c0c48b/6xaNrzBy3MbOV3WGPVscdpRwq-Bin2o4xCuFyQBcbAipaYZzjV802IRwVZuHJx9elQ9imEQrDgrTJJRxBDgoTQ%3D%3D?uid=0&filename=22.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=1440x692',
    'https://downloader.disk.yandex.ru/preview/ee6f3f83528ad31ce7e1c95724304d01217673b134bc1b1ca63a8bad9e362ecb/68c0c3b7/s0wD3xdWgtIdywkfVd6Bgvoqnx63d4EPQHwyGH_0zfJvijQ7vSJjh-oMDioshHOeWnJGzjOHBC2sbphghh00Iw%3D%3D?uid=0&filename=11.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=2048x2048',
  ]
  
  // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  })
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  
  function Deck() {
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, i => ({
      ...to(i),
      from: from(i),
    })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start(i => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1 // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear()
          api.start(i => to(i))
        }, 600)
    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
      <>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div className="deck" key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${cards[i]})`,
              }}
            />
          </animated.div>
        ))}
      </>
    )
  }

function Home() {
  return (
    <div className="container">
        <div className='header'>
            <h2>Карты Таро расскажут обо мне больше</h2>
        </div>
        <div className='footer'>
            <h2>Скипай в стороны</h2>
        </div>
        <Deck />
    </div>
  );
}

export default Home;
