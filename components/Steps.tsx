import { STEPS } from "@/lib/content";
import Icon from "./Icon";

export default function Steps() {
  return (
    <section className="section" id="qadamlar">
      <div className="section__head">
        <h2 className="h2" data-reveal>
          Uchta qadam, <em>oʻn daqiqa.</em>
        </h2>
      </div>

      <ol className="steps">
        {STEPS.map((step) => (
          <li className="step" key={step.n} data-reveal>
            <span className="step__n mono">{step.n}</span>
            <Icon name={step.icon} className="step__icon" />
            <h3 className="h3">{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
