"use client"

import {
  animated,
  useChain,
  useSpringRef,
  useSprings,
  useTrail,
} from "@react-spring/web"

import { Shell } from "@/shared/components/shells/shell"

const COORDS = [
  [50, 20],
  [90, 20],
  [50, 40],
  [60, 50],
  [70, 50],
  [80, 50],
  [90, 40],
]

const STROKE_WIDTH = 0.25

const OFFSET = STROKE_WIDTH / 2

const MAX_WIDTH = 150 + OFFSET * 2
const MAX_HEIGHT = 80 + OFFSET * 2

function HomeImage() {
  const gridApi = useSpringRef()

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  })

  const boxApi = useSpringRef()

  const [boxSprings] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220,
    },
  }))

  useChain([gridApi, boxApi], [0, 1], 1500)

  return (
    <Shell>
      <div className={"flex flex-col items-center justify-center"}>
        <div className={"w-full max-w-[600px]"}>
          <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
            <g>
              {gridSprings.map(({ x2 }, index) => (
                <animated.line
                  x1={0}
                  y1={index * 10 + OFFSET}
                  x2={x2}
                  y2={index * 10 + OFFSET}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              ))}
              {gridSprings.map(({ y2 }, index) => (
                <animated.line
                  x1={index * 10 + OFFSET}
                  y1={0}
                  x2={index * 10 + OFFSET}
                  y2={y2}
                  key={index}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                />
              ))}
            </g>
            {boxSprings.map(({ scale }, index) => (
              <animated.rect
                key={index}
                width={10}
                height={10}
                fill={"currentColor"}
                style={{
                  transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                  transform: `translate(${COORDS![index]![0]! + OFFSET}px, ${
                    COORDS![index]![1]! + OFFSET
                  }px)`,
                  scale,
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </Shell>
  )
}

export default HomeImage
