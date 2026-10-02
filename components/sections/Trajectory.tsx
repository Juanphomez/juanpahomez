'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { eras, todayLabel, TRAJECTORY_END_YEAR } from '@/content/experience';
import styles from './Trajectory.module.css';

const START_YEAR = eras[0]!.startYear;
const SPAN = TRAJECTORY_END_YEAR - START_YEAR;
const BANDS = eras.length;

/** Years a capability takes to settle in — the width of each riser. */
const RAMP = 0.6;

/** One validated step of a single-hue ramp per band, foot of the stack first. */
const BAND_COLOR = ['var(--layer-1)', 'var(--layer-2)', 'var(--layer-3)', 'var(--layer-4)'];

/**
 * Headroom above the top band so every band label can sit on the surface
 * rather than on a fill — which is what keeps them legible at AA.
 */
const Y_MAX = BANDS + 0.5;

/** Horizontal position of a year, as a percentage of the plot. */
const x = (year: number) => ((year - START_YEAR) / SPAN) * 100;

/** Vertical position of a stacked value, as a percentage from the top. */
const y = (value: number) => 100 - (value / Y_MAX) * 100;

/**
 * One band: flat along the bottom of its slot until the year it starts, then a
 * smooth riser to full height, then flat to today.
 */
function bandPath(index: number, startYear: number): string {
  const x0 = x(startYear);
  const x1 = x(startYear + RAMP);
  const xEnd = 100;
  const yBottom = y(index);
  const yTop = y(index + 1);
  const control = (x1 - x0) / 2;

  return [
    `M ${x0} ${yBottom}`,
    `C ${x0 + control} ${yBottom}, ${x1 - control} ${yTop}, ${x1} ${yTop}`,
    `L ${xEnd} ${yTop}`,
    `L ${xEnd} ${yBottom}`,
    'Z',
  ].join(' ');
}

export function Trajectory() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Section surface="deep" label="Trayectoria profesional">
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow>Trayectoria</Eyebrow>
          <LineReveal
            as="h2"
            className={styles.title}
            lines={['Cada etapa no reemplazó', 'a la anterior. Se sumó.']}
          />
          <p className={styles.lead}>
            Por eso la línea solo sube: cada capacidad que entró sigue en uso. Pasa el
            cursor por una etapa para verla en la gráfica.
          </p>
        </Reveal>

        <Reveal className={styles.chart} from="scale">
          <div className={styles.plotFrame} data-active={activeId ? 'true' : 'false'}>
            {/* Count of accumulated domains — the chart's only quantity */}
            <div className={styles.yAxis} aria-hidden="true">
              {Array.from({ length: BANDS + 1 }, (_, i) => (
                <span key={i} className={styles.yTick} style={{ top: `${y(i)}%` }}>
                  {i}
                </span>
              ))}
            </div>

            <div className={styles.plot} data-active={activeId ? 'true' : 'false'}>
              <svg
                className={styles.bands}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <g className={styles.grid}>
                  {Array.from({ length: BANDS }, (_, i) => (
                    <line
                      key={i}
                      x1="0"
                      x2="100"
                      y1={y(i + 1)}
                      y2={y(i + 1)}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth="1"
                    />
                  ))}
                </g>

                {eras.map((era, index) => (
                  <path
                    key={era.id}
                    className={styles.band}
                    data-on={activeId === era.id ? 'true' : 'false'}
                    d={bandPath(index, era.startYear)}
                    fill={BAND_COLOR[index]}
                    /* A hairline of surface between stacked fills */
                    stroke="var(--surface)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                <line
                  className={styles.baseline}
                  x1="0"
                  x2="100"
                  y1="100"
                  y2="100"
                  vectorEffect="non-scaling-stroke"
                  strokeWidth="1"
                />
              </svg>

              {eras.map((era, index) => (
                <span
                  key={`dot-${era.id}`}
                  className={styles.milestone}
                  style={{
                    left: `${x(era.startYear)}%`,
                    top: `${y(index)}%`,
                    color: BAND_COLOR[index],
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Today: the right edge of the scale. The dot marks the top of
                  the stack — four domains in play. */}
              <span className={styles.today} aria-hidden="true">
                <span className={styles.todayDot} style={{ top: `${y(BANDS)}%` }} />
              </span>
            </div>

            {/* Direct labels in their own gutter, aligned to each band's
                middle. Identity never rests on colour alone, and the label
                never sits on a fill it has to fight for contrast. */}
            <div className={styles.bandLabels} aria-hidden="true">
              {eras.map((era, index) => (
                <span
                  key={era.id}
                  className={styles.bandLabel}
                  data-on={activeId === era.id ? 'true' : 'false'}
                  style={{ top: `${y(index + 0.5)}%` }}
                >
                  {/* The swatch carries identity; the text keeps a text colour,
                      so no label depends on a fill passing contrast. */}
                  <span
                    className={styles.labelSwatch}
                    style={{ backgroundColor: BAND_COLOR[index] }}
                  />
                  {era.title}
                </span>
              ))}
            </div>

            <div className={styles.xAxis} aria-hidden="true">
              {eras.map((era) => (
                <span
                  key={era.id}
                  className={styles.xTick}
                  style={{ left: `${x(era.startYear)}%` }}
                >
                  {era.startYear}
                </span>
              ))}
              <span className={`${styles.xTick} ${styles.xTickToday}`}>Hoy</span>
            </div>
          </div>


          <p className={styles.axisCaption}>
            El eje vertical cuenta cuántos dominios estaban en uso cada año — contabilidad,
            automatización, datos y producto. No es un puntaje.
          </p>
        </Reveal>

        {/* The same data as text: legend, detail and table view in one place */}
        <ol className={styles.eras}>
          {eras.map((era, index) => (
            <li
              key={era.id}
              className={styles.era}
              onMouseEnter={() => setActiveId(era.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(era.id)}
              onBlur={() => setActiveId(null)}
              tabIndex={0}
            >
              <div className={styles.eraHead}>
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: BAND_COLOR[index] }}
                  aria-hidden="true"
                />
                <span className={styles.period}>{era.period}</span>
              </div>
              <h3 className={styles.eraTitle}>{era.title}</h3>
              <p className={styles.note}>{era.note}</p>
              <ul className={styles.capabilities}>
                {era.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <Reveal className={styles.convergence}>
          <p className={styles.convergenceLabel}>{todayLabel.period}</p>
          <div>
            <h3 className={styles.convergenceTitle}>{todayLabel.title}</h3>
            <p className={styles.note}>{todayLabel.note}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
