import { useInView } from "../hooks/useInView.js";

export default function Section({ data, align = "left", cta }) {
  const [ref, inView] = useInView({ threshold: 0.45 });
  const words = data.title.split(" ");

  return (
    <section className={`journey-section align-${align}`}>
      <div ref={ref} className={`journey-copy ${inView ? "is-visible" : ""}`}>
        <span className="eyebrow">{data.eyebrow}</span>
        <h2 className="journey-title" aria-label={data.title}>
          {words.map((word, wi) => (
            <span className="title-word" key={wi}>
              {word.split("").map((letter, li) => (
                <span
                  className="title-letter"
                  key={li}
                  style={{ transitionDelay: `${(wi * 6 + li) * 22}ms` }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              ))}
              {wi < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h2>
        <p className="journey-body">{data.body}</p>
        {cta}
      </div>
    </section>
  );
}
