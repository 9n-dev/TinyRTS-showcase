import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

/** What a visitor asks before anything else: can I play it, where, when, and what is missing. */
export function Status() {
  const { t } = useContent();
  const s = t.status;
  return <section id="status" className="section status" aria-labelledby="status-title">
    <SectionTitle id="status-title" title={s.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet">
        <h3>{s.factsTitle}</h3>
        <dl className="glance">{s.facts.map(fact => <div key={fact.key}><dt>{fact.key}</dt><dd>{fact.value}</dd></div>)}</dl>
        <h3>{s.nowTitle}</h3>
        <p>{s.now}</p>
        <h3>{s.nextTitle}</h3>
        <ol className="roadmap">{s.next.map(step => <li key={step.head}><strong>{step.head}.</strong> {step.body}</li>)}</ol>
        <p className="guide-note">{s.nextNote}</p>
      </PixelPanel>
      <PixelPanel className="sheet">
        <h3>{s.faqTitle}</h3>
        <dl className="faq">{s.faq.map(item => <div key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>)}</dl>
      </PixelPanel>
    </PixelPanel>
  </section>;
}
