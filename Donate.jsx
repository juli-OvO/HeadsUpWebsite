/* Heads Up — Donate page */
const { useState } = React;

const PRESETS = [10, 25, 50, 100];

function DonateHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <Reveal>
          <div className="kicker-row">
            <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Support Us</Sticker>
          </div>
          <h1>Help students <DrawHL>look up.</DrawHL></h1>
          <p className="lead">Reflect on your screen time today — and consider what a gift could do for the next student who needs this movement.</p>
        </Reveal>
      </div>
    </header>
  );
}

function DonateSection() {
  const [preset, setPreset] = useState(25);
  const [custom, setCustom] = useState('');
  const [freq, setFreq]     = useState('one-time');
  const [coverFee, setCoverFee] = useState(false);

  const base = custom !== '' ? (parseFloat(custom) || 0) : preset;
  const fee  = +(base * 0.03).toFixed(2);
  const total = coverFee ? +(base + fee).toFixed(2) : +base.toFixed(2);

  const pickPreset = (n) => { setPreset(n); setCustom(''); };

  const impacts = [
    'Club events across 70+ active chapters nationwide',
    'Support for 750+ Ambassadors worldwide',
    'Website, technology, and platform costs',
    'Screen time competition prizes',
    'Marketing and awareness campaigns',
    'Partnership and outreach development',
  ];

  const freqLabel = { 'one-time': '', weekly: 'Weekly', monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual' };

  return (
    <section className="section donate-section">
      <div className="wrap">
        <div className="donate-grid">

          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Where it goes</div>
            <h2 className="donate-impact-h">Every dollar funds<br />youth-led change.</h2>
            <ul className="donate-impact-list">
              {impacts.map((item, i) => (
                <li key={i}>
                  <span className="dil-icon"><Icon name="arrowRight" size={13} /></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="contact-note" style={{ marginTop: 28 }}>
              Heads Up is a registered 501(c)(3).<br />EIN: 99‑1479158
            </p>
          </Reveal>

          <Reveal delay={80}>
            <form className="donate-form" onSubmit={(e) => e.preventDefault()}>

              <div className="df-field">
                <div className="cf-label">Donation amount</div>
                <div className="donate-presets">
                  {PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={'donate-preset' + (preset === n && custom === '' ? ' active' : '')}
                      onClick={() => pickPreset(n)}
                    >
                      ${n}
                    </button>
                  ))}
                </div>
                <div className={'donate-custom-wrap' + (custom !== '' ? ' active' : '')}>
                  <span className="donate-dollar">$</span>
                  <input
                    className="donate-custom-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Custom amount"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setPreset(null); }}
                  />
                </div>
              </div>

              <div className="df-field">
                <label className="cf-label" htmlFor="df-freq">Frequency</label>
                <select
                  id="df-freq"
                  className="donate-select"
                  value={freq}
                  onChange={(e) => setFreq(e.target.value)}
                >
                  <option value="one-time">One-Time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <div className="df-field">
                <label className="donate-check-label">
                  <input
                    type="checkbox"
                    className="donate-check"
                    checked={coverFee}
                    onChange={(e) => setCoverFee(e.target.checked)}
                  />
                  <span>Cover the 3% processing fee{base > 0 ? <span className="donate-fee-note"> (+${fee.toFixed(2)})</span> : null}</span>
                </label>
              </div>

              <div className="donate-total">
                <span className="donate-total-label">Total</span>
                <span className="donate-total-amt">${total.toFixed(2)}</span>
              </div>

              <button className="btn btn-primary btn-lg donate-btn" type="submit">
                Donate ${total.toFixed(2)}{freqLabel[freq] ? ' · ' + freqLabel[freq] : ''}
              </button>

              <p className="donate-tax">
                <Icon name="check" size={13} />
                All donations are tax deductible &nbsp;·&nbsp; EIN 99‑1479158
              </p>

            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

window.DonateHero = DonateHero;
window.DonateSection = DonateSection;
