import { useState } from 'react';
import { PixelPanel, SectionTitle } from '../components/PixelUI';
import { Sprite } from '../components/Sprite';
import { useContent } from '../i18n';

const TABS = ['units', 'buildings', 'techs', 'camps', 'controls'] as const;
type Tab = (typeof TABS)[number];

/** The player's manual: what you train, build, research, fight and press. */
export function Guide() {
  const { t } = useContent();
  const g = t.guide;
  const [tab, setTab] = useState<Tab>('units');
  // Arrow keys walk the tabs, as the ARIA pattern asks of a tablist.
  const walk = (event: React.KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(TABS.indexOf(tab) + step + TABS.length) % TABS.length];
    setTab(next);
    document.getElementById(`guide-tab-${next}`)?.focus();
  };
  return <section id="guide" className="section guide" aria-labelledby="guide-title">
    <SectionTitle id="guide-title" title={g.title} />
    <PixelPanel skin="wood" className="board">
      <PixelPanel className="sheet">
        <h3>{g.heading}</h3>
        <p>{g.intro}</p>
        <div className="tabs" role="tablist" aria-labelledby="guide-title" onKeyDown={walk}>
          {TABS.map(id => <button key={id} id={`guide-tab-${id}`} type="button" role="tab" aria-selected={tab === id} aria-controls="guide-panel"
            tabIndex={tab === id ? 0 : -1} onClick={() => setTab(id)}>{g.tabs[id]}</button>)}
        </div>
        <div id="guide-panel" role="tabpanel" aria-labelledby={`guide-tab-${tab}`} className="guide-panel">
          {(tab === 'units' || tab === 'buildings') && <>
            <ul className="cards">
              {g[tab].map(card => <li key={card.name} className="card">
                <div className="card-art"><Sprite id={card.sprite} fit={96} /></div>
                <div>
                  <h4>{card.name}</h4>
                  <p className="card-cost">{g.costLabel}: {card.cost}{'from' in card && <> · {g.fromLabel}: {card.from}</>}</p>
                  <p>{card.role}</p>
                </div>
              </li>)}
            </ul>
            <p className="guide-note">{tab === 'units' ? g.unitsNote : g.buildingsNote}</p>
          </>}
          {tab === 'techs' && <>
            <div className="branches">
              {g.techs.map(branch => <div key={branch.branch} className="branch">
                <h4>{branch.branch} <span>{branch.at}</span></h4>
                <ul>{branch.list.map(tech => <li key={tech.name}>
                  <strong>{tech.name}</strong> <span className="card-cost">{tech.cost}</span>
                  <p>{tech.effect}{tech.needs && <em> {g.needsLabel}: {tech.needs}.</em>}</p>
                </li>)}</ul>
              </div>)}
            </div>
            <p className="guide-note">{g.techsNote}</p>
          </>}
          {tab === 'camps' && <>
            <p>{g.camps.intro}</p>
            {g.camps.tiers.map(tier => <div key={tier.tier} className="tier" data-tier={tier.tier}>
              <h4><i aria-hidden="true" />{tier.name}</h4>
              <table className="facts camp-table">
                <thead><tr><th scope="col">{t.maps.text.campGeneric}</th><th scope="col">{g.camps.guardsLabel}</th><th scope="col">{g.camps.rewardLabel}</th></tr></thead>
                <tbody>{tier.list.map(camp => <tr key={camp.name}>
                  <th scope="row">{camp.name}</th><td>{camp.guards}</td><td>{camp.reward}, {g.camps.joinsLabel} {camp.joins}</td>
                </tr>)}</tbody>
              </table>
            </div>)}
            <p className="guide-note">{g.camps.waterNote}</p>
            <h4>{g.camps.neutralsTitle}</h4>
            <dl className="neutrals">{g.camps.neutrals.map(neutral => <div key={neutral.name}><dt>{neutral.name}</dt><dd>{neutral.text}</dd></div>)}</dl>
          </>}
          {tab === 'controls' && <>
            <div className="control-groups">
              {g.controls.groups.map(group => <div key={group.title}>
                <h4>{group.title}</h4>
                <dl className="keys">{group.rows.map(row => <div key={row.keys}><dt><kbd>{row.keys}</kbd></dt><dd>{row.action}</dd></div>)}</dl>
              </div>)}
            </div>
            <p className="guide-note">{g.controls.note}</p>
          </>}
        </div>
      </PixelPanel>
    </PixelPanel>
  </section>;
}
