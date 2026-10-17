import React, { useState } from 'react';
import { profileData } from './data/profile';

const CURRENT_YEAR = new Date().getFullYear();
const PASSCODE_HASH = 'dbc135be34e6da3d3860d3b89c2a1e9bf4dc78a6439ca5a977e660207eaafe3c';

async function verifyPasscode(input: string): Promise<boolean> {
  const trimmed = input.trim();
  if (trimmed === '0122') return true;
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(trimmed));
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hash === PASSCODE_HASH;
  } catch {
    return trimmed === '0122';
  }
}

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('el_access_granted') === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name,
    nickname,
    origin,
    age,
    faith,
    photoUrl,
    hero,
    about,
    journey,
    interests,
    relationship,
    contact,
  } = profileData;

  const initials = nickname ? nickname.toUpperCase() : 'EL';

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Silakan masukkan kode akses.');
      return;
    }

    setIsSubmitting(true);
    const valid = await verifyPasscode(passcode);
    setIsSubmitting(false);

    if (valid) {
      try {
        sessionStorage.setItem('el_access_granted', 'true');
      } catch {
        // ignore storage errors
      }
      setIsUnlocked(true);
      setErrorMsg('');
      setPasscode('');
    } else {
      setErrorMsg('Kode akses tidak sesuai. Silakan periksa kembali.');
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem('el_access_granted');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setPasscode('');
    setErrorMsg('');
  };

  // TAMPILAN LOCK SCREEN (Jika Belum Terbuka)
  if (!isUnlocked) {
    return (
      <div className="lock-page-wrapper">
        <main className="lock-card" role="dialog" aria-labelledby="lock-title">
          <div className="lock-monogram" aria-hidden="true">
            {initials}
          </div>
          <h1 id="lock-title" className="lock-title">Ruang Personal</h1>
          <p className="lock-desc">
            Halaman ini bersifat privat. Silakan masukkan kode akses untuk melanjutkan.
          </p>

          <form onSubmit={handleUnlock} className="lock-form" noValidate>
            <div className="lock-input-group">
              <label htmlFor="passcode-input" className="sr-only">
                Kode Akses
              </label>
              <input
                id="passcode-input"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                maxLength={16}
                placeholder="Masukkan kode akses"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className={`lock-input ${errorMsg ? 'has-error' : ''}`}
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="lock-error" role="alert">
                {errorMsg}
              </p>
            )}

            <button type="submit" className="btn-primary lock-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Memeriksa...' : 'Buka Halaman'}
            </button>
          </form>
        </main>
      </div>
    );
  }

  // TAMPILAN WEBSITE UTAMA (Jika Sudah Terbuka)
  return (
    <div className="site-wrapper">
      {/* Aksesibilitas: Skip link untuk pengguna keyboard / screen reader */}
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      {/* Navigasi Minimalis */}
      <header className="top-nav" role="banner">
        <div className="container nav-inner">
          <a href="#hero" className="nav-logo" aria-label={`Beranda ${name}`}>
            <span className="nav-monogram-tiny" aria-hidden="true">{initials}</span>
            <span className="nav-logo-text">{nickname}</span>
          </a>
          <nav aria-label="Navigasi Halaman" className="nav-menu">
            <ul className="nav-links">
              <li><a href="#tentang">Tentang</a></li>
              <li><a href="#perjalanan">Perjalanan</a></li>
              <li><a href="#minat">Minat</a></li>
              <li><a href="#hubungan">Nilai Relasi</a></li>
              {contact?.channels && contact.channels.length > 0 && (
                <li><a href="#kontak" className="nav-contact-link">Kontak</a></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* 1. HERO SECTION */}
        <section id="hero" className="hero-section section" aria-labelledby="hero-title">
          <div className="container">
            <div className="hero-monogram-container" aria-hidden="true">
              {photoUrl ? (
                <img src={photoUrl} alt={`Foto profil ${name}`} className="hero-photo" />
              ) : (
                <div className="hero-monogram" title={`Inisial ${name}`}>
                  {initials}
                </div>
              )}
            </div>

            <p className="hero-greeting">{hero.greeting}</p>
            <h1 id="hero-title" className="hero-name">
              {name} <span className="hero-nickname">({nickname})</span>
            </h1>

            <p className="hero-lead">{hero.introduction}</p>

            <ul className="hero-meta-list" aria-label="Ringkasan identitas">
              <li className="meta-chip">
                <span>Asal:</span> <strong>{origin}</strong>
              </li>
              <li className="meta-chip">
                <span>Usia:</span> <strong>{age} tahun</strong>
              </li>
              <li className="meta-chip">
                <span>Agama:</span> <strong>{faith}</strong>
              </li>
              <li className="meta-chip">
                <span>Status:</span> <strong>Studi di Taiwan</strong>
              </li>
            </ul>

            <div className="hero-action">
              <a href="#tentang" className="btn-primary">
                {hero.callToAction} &darr;
              </a>
            </div>
          </div>
        </section>

        {/* 2. TENTANG SAYA */}
        {about && (
          <section id="tentang" className="section" aria-labelledby="about-title">
            <div className="container">
              <header className="section-header">
                <span className="section-eyebrow">Kepribadian</span>
                <h2 id="about-title" className="section-title">Tentang Saya & Keseharian</h2>
              </header>

              <p className="about-summary">{about.summary}</p>

              {about.principles && about.principles.length > 0 && (
                <div className="principles-list" aria-label="Prinsip dasar bersikap">
                  {about.principles.map((principle, index) => (
                    <article key={index} className="principle-card">
                      <h3 className="principle-title">{principle.title}</h3>
                      <p className="principle-desc">{principle.description}</p>
                    </article>
                  ))}
                </div>
              )}

              {about.dailyRhythm && (
                <aside className="daily-box" aria-label="Keseharian saat ini">
                  <div className="daily-box-title">Keseharian Saat Ini</div>
                  <p>{about.dailyRhythm}</p>
                </aside>
              )}
            </div>
          </section>
        )}

        {/* 3. PERJALANAN SAYA */}
        {journey && journey.items && journey.items.length > 0 && (
          <section id="perjalanan" className="section" aria-labelledby="journey-title">
            <div className="container">
              <header className="section-header">
                <span className="section-eyebrow">Pendidikan & Langkah Hidup</span>
                <h2 id="journey-title" className="section-title">Perjalanan Saya</h2>
                <p className="section-intro">{journey.intro}</p>
              </header>

              <div className="journey-timeline">
                {journey.items.map((item) => (
                  <article key={item.id} className={`journey-card stage-${item.stage}`}>
                    <div className="journey-header">
                      <span className={`stage-badge stage-badge-${item.stage}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="journey-title">{item.title}</h3>
                    <div className="journey-institution">{item.institution}</div>
                    <p className="journey-desc">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. HAL YANG SAYA NIKMATI */}
        {interests && interests.items && interests.items.length > 0 && (
          <section id="minat" className="section" aria-labelledby="interests-title">
            <div className="container">
              <header className="section-header">
                <span className="section-eyebrow">Waktu Luang</span>
                <h2 id="interests-title" className="section-title">Hal yang Saya Nikmati</h2>
                <p className="section-intro">{interests.intro}</p>
              </header>

              <div className="interests-grid">
                {interests.items.map((interest) => (
                  <article key={interest.id} className="interest-item">
                    <h3 className="interest-title">{interest.title}</h3>
                    <p className="interest-desc">{interest.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. MENGENAI HUBUNGAN */}
        {relationship && (
          <section id="hubungan" className="section" aria-labelledby="relationship-title">
            <div className="container">
              <header className="section-header">
                <span className="section-eyebrow">Prinsip & Masa Depan</span>
                <h2 id="relationship-title" className="section-title">Mengenai Hubungan</h2>
              </header>

              <div className="relationship-container">
                <article className="relationship-purpose-card">
                  <h3 className="card-subheading">Tujuan Berkenalan</h3>
                  <p>{relationship.purpose}</p>
                </article>

                {relationship.values && relationship.values.length > 0 && (
                  <div className="values-grid" aria-label="Nilai yang saya utamakan">
                    {relationship.values.map((val, idx) => (
                      <article key={idx} className="value-card">
                        <h4 className="value-title">{val.title}</h4>
                        <p className="value-desc">{val.description}</p>
                      </article>
                    ))}
                  </div>
                )}

                {relationship.futureOutlook && (
                  <article className="future-card">
                    <h4 className="future-title">Harapan & Cara Berkenalan</h4>
                    <p>{relationship.futureOutlook}</p>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 6. KONTAK */}
        {contact && contact.channels && contact.channels.length > 0 && (
          <section id="kontak" className="section contact-section" aria-labelledby="contact-title">
            <div className="container">
              <div className="contact-box">
                <h2 id="contact-title" className="contact-heading">{contact.heading}</h2>
                <p className="contact-note">{contact.note}</p>

                <div className="contact-channels" aria-label="Pilihan saluran kontak">
                  {contact.channels.map((ch, idx) => (
                    <a
                      key={idx}
                      href={ch.url}
                      className="contact-btn"
                      target={ch.type === 'instagram' ? '_blank' : undefined}
                      rel={ch.type === 'instagram' ? 'noopener noreferrer' : undefined}
                      aria-label={`${ch.label}: ${ch.value}`}
                    >
                      <span className="contact-btn-label">{ch.label}</span>
                      <span className="contact-btn-value">{ch.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-content">
          <p>&copy; {CURRENT_YEAR} {name}. Ruang perkenalan personal.</p>
          <button type="button" onClick={handleLock} className="btn-relock" title="Kunci kembali halaman">
            Kunci Halaman
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
