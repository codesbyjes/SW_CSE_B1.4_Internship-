import { useEffect, useMemo, useRef, useState } from "react";
import "./CGPA.css";

const semesters = [
  {
    id: 1,
    title: "Semester I",
    sgpa: 8.78,
    credits: 18,
    subjects: 6,
    remark: "A strong foundation built with consistency."
  },
  {
    id: 2,
    title: "Semester II",
    sgpa: 9.80,
    credits: 20,
    subjects: 7,
    remark: "Exceptional improvement. Momentum is accelerating."
  },
  { id: 3, title: "Semester III", locked: true },
  { id: 4, title: "Semester IV", locked: true },
  { id: 5, title: "Semester V", locked: true },
  { id: 6, title: "Semester VI", locked: true },
  { id: 7, title: "Semester VII", locked: true },
  { id: 8, title: "Semester VIII", locked: true }
];

function RingParticles({ seed }) {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 20 + ((seed * 17 + i * 9) % 60),
      delay: (i * 0.12).toFixed(2),
      duration: (1.4 + (i % 4) * 0.25).toFixed(2)
    }));
  }, [seed]);

  return (
    <div className="ring-particles">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}

function CGPA() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const unlocked = semesters.filter((s) => !s.locked);
  const allUnlocked = unlocked.length === semesters.length;

  const finalCGPA = allUnlocked
    ? (
        unlocked.reduce((sum, sem) => sum + sem.sgpa, 0) / unlocked.length
      ).toFixed(2)
    : null;

  // Generate continuous floating sparkles along the central axis line
  const axisSparkles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      top: `${(i * 7.5 + 2).toFixed(1)}%`,
      delay: `${(i * 0.35).toFixed(2)}s`,
      duration: `${(2.2 + (i % 3) * 0.6).toFixed(2)}s`,
      size: `${(2 + (i % 3)).toFixed(0)}px`
    }));
  }, []);

  return (
    <section className="cgpa-section" ref={sectionRef}>
      <div className="page-container">
        <span className="section-eyebrow">Academic Highlights</span>

        <h2 className="section-title">Semester Performance</h2>

        <p className="cgpa-subtitle">
          Every semester marks another milestone in my journey.
        </p>

        <div className="gold-divider"></div>

        <div className={`academic-path ${visible ? "show" : ""}`}>
          {/* Animated Luxury Axis Line Elements */}
          <div className="axis-glow"></div>
          <div className="axis-sparkles">
            {axisSparkles.map((sp) => (
              <span
                key={sp.id}
                className="axis-sparkle-dot"
                style={{
                  top: sp.top,
                  animationDelay: sp.delay,
                  animationDuration: sp.duration,
                  width: sp.size,
                  height: sp.size
                }}
              />
            ))}
          </div>

          {semesters.map((semester, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            const delay = `${(index * 0.15).toFixed(2)}s`;

            if (semester.locked) {
              return (
                <div
                  className={`milestone ${side}`}
                  key={semester.id}
                  style={{ transitionDelay: delay }}
                >
                  <div className="timeline-dot"></div>

                  <div className="milestone-node">
                    <div className="lock-wrap" tabIndex="0">
                      <div className="lock-circle">
                        <svg
                          className="lock-icon"
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          fill="currentColor"
                        >
                          <path d="M17 9h-1V7a4 4 0 10-8 0v2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2zm-7-2a2 2 0 114 0v2h-4V7z" />
                        </svg>

                        <RingParticles seed={semester.id} />
                      </div>

                      <div className="lock-tooltip">
                        Awaiting semester completion.
                      </div>
                    </div>
                  </div>

                  <div className="milestone-info locked-info">
                    <h3>{semester.title}</h3>
                  </div>
                </div>
              );
            }

            return (
              <div
                className={`milestone ${side}`}
                key={semester.id}
                style={{ transitionDelay: delay }}
              >
                <div className="timeline-dot"></div>

                <div className="milestone-node">
                  <div className="progress-ring">
                    <RingParticles seed={semester.id} />

                    <svg viewBox="0 0 180 180">
                      <defs>
                        <linearGradient
                          id={`goldRing${semester.id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#fff4b0" />
                          <stop offset="50%" stopColor="#f2c94c" />
                          <stop offset="100%" stopColor="#b8860b" />
                        </linearGradient>
                      </defs>

                      <circle className="ring-bg" cx="90" cy="90" r="74" />

                      <circle
                        className="ring-progress"
                        cx="90"
                        cy="90"
                        r="74"
                        stroke={`url(#goldRing${semester.id})`}
                        strokeDasharray="465"
                        strokeDashoffset={
                          465 - (semester.sgpa / 10) * 465
                        }
                      />
                    </svg>

                    <div className="ring-score">
                      {semester.sgpa.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="milestone-info">
                  <h3>{semester.title}</h3>

                  <div className="milestone-stats">
                    <span>{semester.subjects} Subjects</span>
                    <span className="separator">•</span>
                    <span>{semester.credits} Credits</span>
                  </div>

                  <p className="milestone-remark">"{semester.remark}"</p>
                </div>
              </div>
            );
          })}

          {/* Final CGPA milestone */}
          <div
            className={`milestone final ${
              semesters.length % 2 === 0 ? "left" : "right"
            }`}
            style={{ transitionDelay: `${(semesters.length * 0.15).toFixed(2)}s` }}
          >
            <div className="timeline-dot final-dot"></div>

            <div className="milestone-node">
              <div className={`final-badge ${allUnlocked ? "unlocked" : ""}`}>
                <span className="final-title">Final</span>
                <span className="final-score">
                  {allUnlocked ? finalCGPA : "CGPA"}
                </span>
              </div>
            </div>

            <div className="milestone-info">
              <h3>Overall CGPA</h3>
              <p className="milestone-remark">
                {allUnlocked
                  ? "Every semester completed successfully."
                  : "Calculated automatically after Semester VIII."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CGPA;