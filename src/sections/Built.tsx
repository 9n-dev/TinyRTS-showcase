import { Counter } from '../components/Counter';
import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { useContent } from '../i18n';

/** 'About {16000} lines' → the text with a counter where the braces were. */
const withCounters = (value: string) => value.split(/\{(\d+)\}/).map((part, i) => i % 2 ? <Counter key={i} to={Number(part)} /> : part);

export function Built() {
  const { t } = useContent();
  return <section id="built" className="section built" aria-labelledby="built-title">
    <SectionTitle id="built-title" title={t.built.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet">
        {t.built.before.map(text => <p key={text}>{text}</p>)}
        <table className="facts"><tbody>
          {t.built.facts.map(fact => <tr key={fact.key}><th scope="row">{fact.key}</th><td>{withCounters(fact.value)}</td></tr>)}
        </tbody></table>
        {t.built.after.map(text => <p key={text}>{text}</p>)}
      </PixelPanel>
    </PixelPanel>
  </section>;
}
