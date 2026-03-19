import { Pressable } from "react-native";
import Svg, { Line, Circle, Text as SvgText, Path, G } from "react-native-svg";
import { P } from "@/constants/theme";
import { SECS } from "@/constants/sections";

interface MountainMapProps {
  lp: (lessonId: number) => number;
  onLessonPress: (lessonId: number) => void;
}

const COORDS = [
  { x: 30, y: 195, id: 1 },
  { x: 75, y: 188, id: 2 },
  { x: 120, y: 178, id: 3 },
  { x: 155, y: 168, id: 4 },
  { x: 180, y: 155, id: 5 },
  { x: 210, y: 145, id: 6 },
  { x: 245, y: 135, id: 7 },
  { x: 275, y: 122, id: 8 },
  { x: 300, y: 110, id: 9 },
  { x: 325, y: 98, id: 10 },
  { x: 305, y: 88, id: 11 },
  { x: 275, y: 78, id: 12 },
  { x: 250, y: 70, id: 13 },
  { x: 228, y: 62, id: 14 },
  { x: 214, y: 54, id: 15 },
  { x: 202, y: 46, id: 16 },
];

const PEAK = { x: 200, y: 34 };

export function MountainMap({ lp, onLessonPress }: MountainMapProps) {
  const totalSecs = SECS.length;

  return (
    <Svg
      width="100%"
      height={220}
      viewBox="0 0 360 220"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Dashed path between lessons */}
      {COORDS.map((p, i) => {
        if (i < COORDS.length - 1) {
          const n = COORDS[i + 1];
          return (
            <Line
              key={`l${i}`}
              x1={p.x}
              y1={p.y}
              x2={n.x}
              y2={n.y}
              stroke={P.red}
              strokeWidth="0.8"
              strokeDasharray="3,3"
              opacity="0.35"
            />
          );
        }
        return null;
      })}

      {/* Path to summit */}
      <Line
        x1={COORDS[COORDS.length - 1].x}
        y1={COORDS[COORDS.length - 1].y}
        x2={PEAK.x}
        y2={PEAK.y}
        stroke={P.red}
        strokeWidth="0.8"
        strokeDasharray="3,3"
        opacity="0.25"
      />

      {/* Lesson nodes */}
      {COORDS.map((p, i) => {
        const done = lp(p.id) === totalSecs;
        const started = lp(p.id) > 0;
        const color = done ? P.green : started ? P.amber : P.red;
        const alt = i % 2 === 0;

        return (
          <G key={p.id} onPress={() => onLessonPress(p.id)}>
            <Circle
              cx={p.x}
              cy={p.y}
              r={5.5}
              fill={done ? color : "none"}
              stroke={color}
              strokeWidth={done ? 0 : 1.2}
            />
            {done && (
              <Path
                d={`M${p.x - 2.5},${p.y} L${p.x - 0.5},${p.y + 2} L${p.x + 3},${p.y - 1.5}`}
                fill="none"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            )}
            {!done && (
              <Circle
                cx={p.x}
                cy={p.y}
                r={started ? 2 : 1.5}
                fill={color}
                opacity={started ? 1 : 0.4}
              />
            )}
            <SvgText
              x={p.x}
              y={p.y + (alt ? -9 : 14)}
              textAnchor="middle"
              fontSize="6.5"
              fill={P.ink2}
              fontWeight="500"
            >
              L{p.id}
            </SvgText>
          </G>
        );
      })}

      {/* Summit flag */}
      <Line
        x1={PEAK.x}
        y1={PEAK.y}
        x2={PEAK.x}
        y2={PEAK.y - 14}
        stroke={P.red}
        strokeWidth="1.1"
      />
      <Path
        d={`M${PEAK.x},${PEAK.y - 14} L${PEAK.x + 9},${PEAK.y - 10.5} L${PEAK.x},${PEAK.y - 7}`}
        fill={P.red}
        opacity={0.8}
      />
      <SvgText
        x={PEAK.x}
        y={PEAK.y - 19}
        textAnchor="middle"
        fontSize="7"
        fill={P.ink3}
        fontWeight="600"
        letterSpacing={1.5}
      >
        SUMMIT
      </SvgText>

      {/* Labels */}
      <SvgText
        x={50}
        y={210}
        fontSize="7"
        fill={P.ink3}
        opacity={0.4}
        letterSpacing={0.8}
      >
        base camp
      </SvgText>
      <SvgText
        x={310}
        y={210}
        fontSize="7"
        fill={P.ink3}
        opacity={0.4}
        letterSpacing={0.8}
      >
        fluency
      </SvgText>
    </Svg>
  );
}
