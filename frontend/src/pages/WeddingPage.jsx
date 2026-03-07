import { useEffect, useState } from 'react';
import {
  Heart, MapPin, Clock, Music, ChevronDown, Gem, Sparkles, Calendar, ExternalLink
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || '';

/* ─── Floating petals ─────────────────────────── */
function Petals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            opacity: 0.4 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Story', 'Timeline', 'Venue', 'Attire', 'RSVP'];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-gold/20' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-script text-2xl text-gold">A & K</span>
        <ul className="hidden md:flex gap-8">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                  scrolled ? 'text-charcoal hover:text-gold' : 'text-white/90 hover:text-gold'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── Hero Section ────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 30%, #3d2415 60%, #1a0e08 100%)'
      }}
    >
      {/* Background photo placeholder with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 overlay-dark" />

      {/* Decorative corner flourishes */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-gold/40" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-gold/40" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-gold/40" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-gold/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fade-in">
        <p className="font-body text-gold/80 tracking-[0.4em] text-xs uppercase mb-6">
          Together Forever
        </p>

        <h1 className="font-script text-7xl md:text-9xl text-white mb-2 leading-none"
            style={{ textShadow: '0 2px 40px rgba(201,169,110,0.4)' }}>
          Abhijith
        </h1>
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="gold-divider w-24" />
          <Heart size={16} className="text-blush fill-blush animate-float" />
          <div className="gold-divider w-24" />
        </div>
        <h1 className="font-script text-7xl md:text-9xl text-white mb-8 leading-none"
            style={{ textShadow: '0 2px 40px rgba(201,169,110,0.4)' }}>
          Kelsey
        </h1>

        <p className="font-display text-xl md:text-2xl text-champagne/90 italic font-light mb-3">
          We're getting married!
        </p>
        <p className="font-body text-gold/80 tracking-widest text-sm mb-12">
          June 06, 2026 · SLIEMA, MALTA
        </p>

        <a href="#rsvp" className="btn-gold inline-block">
          <span>RSVP Now</span>
        </a>

        <a href="#story" className="block mt-12 text-white/50 hover:text-gold transition-colors animate-float">
          <ChevronDown size={28} className="mx-auto" />
        </a>
      </div>
    </section>
  );
}

/* ─── Love Story Section ──────────────────────── */
function LoveStory() {
  const stories = [
    {
      icon: <Sparkles size={20} />,
      tag: 'How We Met',
      title: 'A Chance Encounter',
      year: '2021',
      description: 'What started as a casual introduction turned into an evening neither of us wanted to end. From the very first conversation, we knew there was something extraordinary between us.',
      image: '/firstmeeting.jpeg',
      imageAlt: 'How we met',
    },
    {
      icon: <Calendar size={20} />,
      tag: 'First Date',
      title: 'The Night That Changed Everything',
      year: '2021',
      description: 'A candlelit dinner by the water, nervous smiles, and the realisation that this was just the beginning. We talked for hours and time seemed to stand completely still.',
      image: '/firstdate.jpeg',
      imageAlt: 'First date dinner',
    },
    {
      icon: <Gem size={20} />,
      tag: 'The Proposal',
      title: 'She Said Yes',
      year: '2024',
      description: 'On a golden evening with the Mediterranean shimmering in the distance, Abhijith got down on one knee. Kelsey said yes before he could even finish the question.',
      image: '/proposal.jpeg',
      imageAlt: 'Proposal',
    },
  ];

  return (
    <section id="story" className="py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">Our Journey</p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light mb-6">
            A Love Story
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="group card-hover bg-white rounded-none overflow-hidden shadow-lg section-reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden h-66">
                <img
                  src={story.image}
                  alt={story.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 text-white px-3 py-1">
                  {story.icon}
                  <span className="font-body text-xs tracking-widest uppercase">{story.tag}</span>
                </div>
                <span className="absolute bottom-4 right-4 font-display text-4xl text-white/30 font-light">
                  {story.year}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-2xl text-charcoal mb-4 font-medium">
                  {story.title}
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline Section ────────────────────────── */
function Timeline() {
  const events = [
    {
      time: '5:00 PM',
      title: 'The Ceremony',
      desc: 'Exchange of vows at Palazzo Capua',
      icon: <Heart size={18} />,
      side: 'right',
    },
    {
      time: '6:00 PM',
      title: 'Welcome drink',
      desc: 'Champagne & canapés in Ax the Palace',
      icon: <Music size={18} />,
      side: 'left',
    },
    {
      time: '7:00 PM',
      title: 'Receiption Begins',
      desc: 'everyone should be seated by 6:45',
      icon: <Sparkles size={18} />,
      side: 'right',
    },
     {
      time: '9:30 PM',
      title: 'Cake Cutting',
      desc: 'Sweet celebrations & toasts',
      icon: <Sparkles size={18} />,
      side: 'left',
    },
    {
      time: '10:00 PM',
      title: 'After Party',
      desc: 'Dancing the night away until midnight',
      icon: <Music size={18} />,
      side: 'right',
    },
  ];

  return (
    <section id="timeline" className="py-28 bg-charcoal relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `radial-gradient(circle, #c9a96e 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-20 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">The Big Day</p>
          <h2 className="font-display text-5xl md:text-6xl text-ivory font-light mb-6">
            Day Timeline
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="timeline-line hidden md:block" />

          <div className="space-y-12">
            {events.map((event, i) => (
              <div
                key={i}
                className={`flex items-center gap-8 section-reveal ${
                  event.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-col md:flex-row`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Content card */}
                <div className={`flex-1 ${event.side === 'right' ? 'md:text-right' : 'md:text-left'} text-left`}>
                  <div className={`inline-block bg-ivory/5 border border-gold/20 p-6 hover:border-gold/60 transition-colors duration-300 ${
                    event.side === 'right' ? 'md:ml-auto' : ''
                  }`}>
                    <p className="font-body text-gold text-xs tracking-widest uppercase mb-2">{event.time}</p>
                    <h3 className="font-display text-2xl text-ivory font-light mb-2">{event.title}</h3>
                    <p className="font-body text-ivory/50 text-sm">{event.desc}</p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white flex-shrink-0 z-10 shadow-lg shadow-gold/30">
                  {event.icon}
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Venue Section ───────────────────────────── */
function Venue() {
  const venues = [
    {
      type: 'Ceremony',
      name: 'Palazzo Capua',
      location: 'Sliema, Malta',
      description: 'A breathtaking 18th-century palazzo steeped in Maltese heritage. Its ornate architecture and lush gardens provide the perfect backdrop for our exchange of vows.',
      image: '/Palazzo-Capua-Hotel-Gallery-Events.jpg',
      time: '5:00 PM',
      details: ['Historic Baroque Architecture', 'Private Courtyard Gardens'],
    },
    {
      type: 'Reception',
      name: 'AX The Palace',
      location: 'Sliema, Malta',
      description: 'A five-star luxury hotel with grand ballrooms and panoramic Mediterranean views. The ultimate setting for an unforgettable evening of dining and dancing.',
      image: '/Royal-Hall-2.jpg',
      time: '7:00 PM',
      details: ['5-Star Luxury Hotel', 'Grand Ballroom'],
    },
  ];

  return (
    <section id="venue" className="py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">Where & When</p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light mb-6">
            The Venues
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {venues.map((venue, i) => (
            <div key={i} className="group card-hover section-reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              {/* Image */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-5 left-5 bg-gold text-white px-4 py-1.5">
                  <span className="font-body text-xs tracking-widest uppercase">{venue.type}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-display text-3xl text-white font-light">{venue.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-gold" />
                    <span className="font-body text-white/70 text-sm">{venue.location}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-8 border border-champagne">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-gold" />
                  <span className="font-body text-gold text-sm tracking-wider">{venue.time}</span>
                </div>
                <p className="font-body text-charcoal/70 text-sm leading-relaxed mb-6">
                  {venue.description}
                </p>
                <ul className="space-y-2">
                  {venue.details.map((d, j) => (
                    <li key={j} className="flex items-center gap-3 font-body text-xs text-charcoal/60 tracking-wide uppercase">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Attire Section ──────────────────────────── */
function Attire() {
  const items = [
    {
      icon: '👒',
      title: 'Guests — Ladies',
      subtitle: 'Cocktail to Formal',
      description: 'Elegant cocktail dresses, gowns, or dressy separates.',
    },
    {
      icon: '🎩',
      title: 'Guests — Gentlemen',
      subtitle: 'Smart Formal',
      description: 'Dark suits or tuxedos. Ties required.',
    },
  ];

  return (
    <section id="attire" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2c1810 0%, #3d2415 50%, #2c1810 100%)' }}>
      {/* Gold filigree pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c9a96e 0%, transparent 50%)` }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-20 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">Dress Code</p>
          <h2 className="font-display text-5xl md:text-6xl text-ivory font-light mb-4">
            Wedding Attire
          </h2>
          <p className="font-display text-xl text-gold/80 italic">Black Tie & Formal</p>
          <div className="gold-divider mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group section-reveal border border-gold/20 p-8 hover:border-gold/60 transition-all duration-300 hover:bg-ivory/5"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display text-2xl text-ivory font-light mb-1">{item.title}</h3>
              <p className="font-body text-gold text-xs tracking-widest uppercase mb-4">{item.subtitle}</p>
              <div className="w-6 h-px bg-gold/40 mb-4" />
              <p className="font-body text-ivory/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 section-reveal">
          <p className="font-display text-lg text-ivory/60 italic">
            "Come dressed to celebrate — we want to make beautiful memories together."
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Map Section ─────────────────────────────── */
function MapSection() {
  const locations = [
    { name: 'Palazzo Capua', address: 'Sliema, Malta', type: 'Ceremony', query: 'Palazzo+Capua+Sliema+Malta' },
    { name: 'AX The Palace', address: 'Sliema, Malta', type: 'Reception', query: 'AX+The+Palace+Sliema+Malta' },
  ];

  return (
    <section id="map" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">Getting There</p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light mb-6">Find Us</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {locations.map((loc, i) => (
            <div key={i} className="section-reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="bg-ivory border border-champagne p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gold flex items-center justify-center">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div>
                    <span className="font-body text-xs text-gold tracking-widest uppercase">{loc.type}</span>
                    <h3 className="font-display text-xl text-charcoal">{loc.name}</h3>
                  </div>
                </div>
                <p className="font-body text-charcoal/60 text-sm mb-4">{loc.address}</p>
                <a
                  href={`https://www.google.com/maps/search/${loc.query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold inline-flex items-center gap-2 text-xs"
                >
                  Open in Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded map */}
        <div className="section-reveal overflow-hidden border border-champagne shadow-lg">
          <iframe
            title="Wedding Venues"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.0!2d14.5!3d35.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4523d29bed9f%3A0x74523de94f935b1c!2sSliema%2C+Malta!5e0!3m2!1sen!2smt!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── RSVP Section ────────────────────────────── */
function RSVPSection() {
  const [form, setForm] = useState({
    name: '', phone: '', attending: '',
    guests: 1, dietaryRestrictions: '', message: ''
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', phone: '', attending: '', guests: 1, dietaryRestrictions: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not connect to server. Please try again.');
    }
  };

  const inputClass = "w-full bg-transparent border-b border-charcoal/20 focus:border-gold outline-none py-3 font-body text-sm text-charcoal placeholder-charcoal/30 transition-colors duration-300";
  const labelClass = "font-body text-xs tracking-widest uppercase text-charcoal/50 mb-1 block";

  return (
    <section id="rsvp" className="py-28 bg-ivory relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <p className="font-body text-gold tracking-widest text-xs uppercase mb-4">Join the Celebration</p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light mb-4">
            RSVP
          </h2>
          <p className="font-display text-lg text-charcoal/60 italic mb-6">
            Kindly respond by May 16, 2026
          </p>
          <div className="gold-divider" />
        </div>

        {status === 'success' ? (
          <div className="text-center py-20 section-reveal">
            <div className="text-5xl mb-6">💌</div>
            <h3 className="font-display text-4xl text-charcoal font-light mb-4">Thank You!</h3>
            <p className="font-body text-charcoal/60">
              Your RSVP has been received. We can't wait to celebrate with you.
            </p>
            <button onClick={() => setStatus(null)} className="btn-outline-gold mt-8 text-xs">
              Submit Another RSVP
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 section-reveal">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  placeholder="Your full name" className={inputClass} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="+356 xxxx xxxx" className={inputClass} />
            </div>

            {/* Attendance */}
            <div>
              <label className={labelClass}>Will you be attending? *</label>
              <div className="flex gap-4 mt-3">
                {['yes', 'no'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, attending: opt }))}
                    className={`flex-1 py-3 border font-body text-xs tracking-widest uppercase transition-all duration-300 ${
                      form.attending === opt
                        ? 'bg-gold border-gold text-white'
                        : 'border-charcoal/20 text-charcoal/50 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {opt === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests (only if attending) */}
            {form.attending === 'yes' && (
              <div>
                <label className={labelClass}>Number of Guests (including yourself)</label>
                <select name="guests" value={form.guests} onChange={handleChange} className={inputClass}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Dietary */}
            <div>
              <label className={labelClass}>Dietary Restrictions</label>
              <input name="dietaryRestrictions" value={form.dietaryRestrictions} onChange={handleChange}
                placeholder="Any dietary requirements we should know about?" className={inputClass} />
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>A Note for the Couple</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                placeholder="Share your wishes or a special message..." 
                className={`${inputClass} resize-none`} />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="text-red-500 font-body text-sm text-center">{errorMsg}</p>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={status === 'loading' || !form.attending}
                className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{status === 'loading' ? 'Sending...' : 'Send RSVP'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="gold-divider w-16" />
        <Heart size={14} className="text-blush fill-blush" />
        <div className="gold-divider w-16" />
      </div>
      <h3 className="font-script text-4xl text-gold mb-3">Abhijith & Kelsey</h3>
      <p className="font-body text-ivory/30 text-xs tracking-widest uppercase mb-2">
        June 06, 2026 · Sliema, Malta
      </p>
      <p className="font-display text-ivory/20 text-sm italic mt-6">
        Made with love, for love.
      </p>
    </footer>
  );
}

/* ─── Intersection Observer hook ─────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Main Page ───────────────────────────────── */
export default function WeddingPage() {
  useReveal();

  return (
    <div className="relative">
      <Petals />
      <Nav />
      <Hero />
      <LoveStory />
      <Timeline />
      <Venue />
      <Attire />
      <MapSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}
