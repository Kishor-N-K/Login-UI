import React, { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" }
];

function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) || c.code.includes(query) || c.flag.includes(query)
  );

  const selected = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 w-20 px-3 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]"
      >
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className="text-sm">{selected.code}</span>
        <svg className={`ml-auto w-3 h-3 transform ${open ? "-rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none">
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="country-pop absolute left-0 mt-2 w-64 bg-[#06121a] border border-[rgba(255,255,255,0.04)] rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="w-full px-3 py-2 rounded-lg bg-[#061621] border border-[rgba(255,255,255,0.03)] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]"
            />
          </div>

          <ul role="listbox" aria-label="Country codes" className="max-h-48 overflow-auto">
            {filtered.map((c) => (
              <li
                key={c.code}
                role="option"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer"
              >
                <span className="text-lg">{c.flag}</span>
                <div className="flex-1 text-sm">
                  <div className="font-medium text-gray-100">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.code}</div>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function LoginCard() {
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("signin"); // "signin", "signup", "confirmation"
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [registered, setRegistered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stampHit, setStampHit] = useState(false);

  const signupUsernameRef = useRef(null);
  const signupEmailRef = useRef(null);
  const signupPhoneRef = useRef(null);
  const signupPasswordRef = useRef(null);

  function openSignIn() {
    setMode("signin");
    setFlipped(true);
  }
  function openSignUp() {
    setMode("signup");
    setFlipped(true);
  }
  function closeBack() {
    setFlipped(false);
  }

  function togglePassword() {
    setShowPassword((s) => !s);
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    // basic front-end validation: ensure required fields have values
    const username = signupUsernameRef.current?.value?.trim();
    const email = signupEmailRef.current?.value?.trim();
    const phone = signupPhoneRef.current?.value?.trim();
    const password = signupPasswordRef.current?.value?.trim();

    if (!username || !email || !phone || !password) {
      if (!username) signupUsernameRef.current?.focus();
      else if (!email) signupEmailRef.current?.focus();
      else if (!phone) signupPhoneRef.current?.focus();
      else if (!password) signupPasswordRef.current?.focus();
      return;
    }

    // Start confirmation flow: switch to confirmation mode and animate
    setMode("confirmation");
    setShowConfirmation(true);

    // Do a quick flip to simulate moving to the "next" card (confirmation)
    // We'll toggle flipped off then on to force a single smooth flip to the confirmation face.
    setFlipped(false);
    setTimeout(() => setFlipped(true), 60);

    // After 1s, play stamp hit animation
    setTimeout(() => setStampHit(true), 1000);

    // mark registered state so other UI can react if needed
    setRegistered(true);
  }

  return (
    <div className="page min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#071020] to-[#0b1220] p-8 text-gray-200">
      {/* decorative background */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="decor -left-24 -top-24" />
        <div className="decor -right-24 bottom-12" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="perspective">
          <div
            className={`card relative w-full h-[520px] transition-transform duration-900 ease-in-out ${
              flipped ? "is-flipped" : ""
            }`}
            aria-live="polite"
          >
            {/* Front */}
            <div className="card-face card-front absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.8)]">
              <div className="front-grid h-full grid grid-rows-[auto_1fr_auto] bg-[linear-gradient(180deg,rgba(6,10,18,0.9),rgba(8,14,24,0.85))] p-8 backdrop-blur-sm">
                <header className="flex items-center justify-between">
                  <div className="max-w-[65%]">
                    <h1 className="company text-2xl font-extrabold tracking-tight">KISHOR.DEV</h1>
                    <p className="tagline text-sm text-gray-700 mt-1 truncate">DESIGN & BUILD BRANDS</p>
                  </div>
                  <div className="logo w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ef4444] flex items-center justify-center text-white font-bold shadow-xl">K</div>
                </header>

                <div className="center flex flex-col items-center justify-center gap-4 px-2">
                  <div className="info-card w-full max-w-full rounded-2xl p-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[rgba(124,58,237,0.12)] flex items-center justify-center text-[#a78bfa] font-semibold">i</div>
                    <div className="text">
                      <p className="text-sm text-gray-300">Leading provider of cloud-native automation — fast, secure, reliable.</p>
                      <p className="text-xs text-gray-500 mt-1">Contact Me: <a href="https://www.linkedin.com/in/kishor-n-k-99421525b/" >LinkedIn</a></p>
                    </div>
                  </div>

                  <p className="desc text-sm text-gray-400 text-center px-6">Premium dark UI with smooth 3D flip, subtle glows and focused inputs.</p>
                </div>

                <footer className="mt-4 flex gap-4 z-10">
                  <button
                    onClick={openSignIn}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#ef4444] text-white font-semibold shadow-lg hover:opacity-95 active:scale-95 transition-transform"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={openSignUp}
                    className="flex-1 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] text-gray-200 font-semibold bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.03)]"
                  >
                    Sign Up
                  </button>
                </footer>
              </div>

              {/* subtle glow */}
              <div className="front-accent" />

              {/* Registered stamp overlay - appears after successful signup (if you still want it) */}
              {registered && !showConfirmation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="stamp">You are registered</div>
                </div>
              )}
            </div>

            {/* Back */}
            <div className="card-face card-back absolute inset-0 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.8)] bg-[linear-gradient(135deg,rgba(6,8,15,0.95)_0%,rgba(10,14,25,0.95)_100%)]" aria-hidden={!flipped}>
              <div className="p-6 h-full flex flex-col">
                {/* Header — conditional layout: centered profile for signin, left profile for signup/confirmation */}
                {mode === "signin" ? (
                  <div className="relative mb-6 w-full">
                    <button onClick={closeBack} className="absolute right-0 top-0 text-sm text-gray-400 hover:text-gray-200">Close ✕</button>

                    <div className="flex flex-col items-center mb-6">
                      <div className="profile w-20 h-20 rounded-full bg-gradient-to-tr from-[#2d2f57] to-[#412a57] flex items-center justify-center overflow-hidden shadow-inner mb-3">
                        <img src="\assets\kishor2.0.png" alt="profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-100">Welcome back</h3>
                        <p className="text-xs text-gray-400">Sign in to continue</p>
                      </div>
                    </div>

                    {/* SIGN IN FORM (restored) */}
                    <form className="space-y-4 mt-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Username</label>
                        <input type="text" required placeholder="Enter your username" className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                        <div className="relative">
                          <input id="signin-password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 pr-16 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                          <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#a78bfa]">{showPassword ? 'Hide' : 'Show'}</button>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-400">
                        <span></span>
                        <a  className="hover:text-gray-200">Forgot password?</a>
                      </div>

                      <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#ef4444] text-white font-semibold shadow-lg hover:opacity-95 active:scale-95 transition-transform">
                        Sign In
                      </button>
                    </form>
                  </div>
                ) : mode === "signup" ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="profile w-16 h-16 rounded-full bg-gradient-to-tr from-[#2d2f57] to-[#412a57] flex items-center justify-center overflow-hidden shadow-inner">
                          <img src="\assets\kishor2.0.png" alt="profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-100">Create account</h3>
                          <p className="text-xs text-gray-400">Fill details to get started</p>
                        </div>
                      </div>

                      <button onClick={closeBack} className="text-sm text-gray-400 hover:text-gray-200">Close ✕</button>
                    </div>

                    <div className="form-wrapper flex-1 overflow-auto">
                      <form className="space-y-4" onSubmit={handleSignupSubmit}>
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Username</label>
                          <input ref={signupUsernameRef} id="signup-username" required placeholder="Choose a username" className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                          <input ref={signupEmailRef} id="signup-email" type="email" required placeholder="you@domain.com" className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Phone number</label>
                          <div className="flex gap-3">
                            <CountrySelect value={countryCode} onChange={setCountryCode} />
                            <input ref={signupPhoneRef} id="signup-phone" type="tel" required placeholder="123 456 7890" className="flex-1 px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                          <div className="relative">
                            <input ref={signupPasswordRef} id="signup-password" type={showPassword ? "text" : "password"} required placeholder="Create a strong password" className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] text-gray-100 placeholder-gray-500 pr-16 focus:outline-none focus:ring-2 focus:ring-[#5b21b6]" />
                            <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#a78bfa]">{showPassword ? 'Hide' : 'Show'}</button>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#ef4444] text-white font-semibold shadow-lg hover:opacity-95 active:scale-95 transition-transform">Sign Up</button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  // Confirmation face (next card) shown after signup submit
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="confirmation-card w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="confirm-text text-lg font-semibold text-gray-100">Account created</div>
                      <div className="confirm-sub text-sm text-gray-400">We are finalizing your account.</div>

                      {/* big translucent placeholder for where stamp will hit */}
                      <div className="stamp-area relative mt-6 w-72 h-44 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] flex items-center justify-center">
                        <div className={`stamp ${stampHit ? 'hit' : ''}`}>Registered</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-center text-xs text-gray-500">Copyright © Kishor — All rights reserved.</div>
              </div>
            </div>

            {/* Hidden third face could be added later if needed */}
          </div>
        </div>
      </div>

      {/* Styles (Tailwind + small custom CSS) */}
      <style jsx>{`
        .perspective { perspective: 1400px; }
        .card { height: 520px; transform-style: preserve-3d; }
        .card-face { -webkit-backface-visibility: hidden; backface-visibility: hidden; position: absolute; inset: 0; transition: transform 0.9s cubic-bezier(.2,.9,.25,1), opacity 0.6s; }

        /* set face orientation */
        .card-front { transform: rotateY(0deg); z-index: 2; }
        .card-back { transform: rotateY(180deg); }

        /* flipped state — rotate container, not the faces */
        .is-flipped { transform: rotateY(180deg); }

        /* ensure pointer-events are correct */
        .card-front, .card-back { pointer-events: auto; }
        .card-back[aria-hidden="true"] { pointer-events: none; opacity: 0; }

        /* dark glass look */
        .card-front, .card-back { background: rgba(6,8,15,0.85); box-shadow: 0 20px 60px rgba(2,6,23,0.8); border: 1px solid rgba(255,255,255,0.04); }

        .front-accent { position: absolute; inset: -40%; background: radial-gradient(closest-side, rgba(99,102,241,0.06), transparent 40%); transform: rotate(10deg); opacity: 0.9; pointer-events: none; }

        .decor { position: absolute; width: 480px; height: 480px; border-radius: 50%; filter: blur(72px); opacity: 0.14; background: linear-gradient(90deg, rgba(99,102,241,0.95), rgba(236,72,153,0.85)); mix-blend-mode: screen; }

        /* premium touches */
        .company { background: linear-gradient(90deg,#e6eefc,#c084fc); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .info-card { transition: transform 0.45s ease, box-shadow 0.45s ease; }
        .info-card:hover { transform: translateY(-6px); box-shadow: 0 28px 60px rgba(3,7,18,0.6); }

        .logo { transform: rotate(-6deg); }

        /* form scroll styling */
        .form-wrapper::-webkit-scrollbar { width: 8px; }
        .form-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 8px; }

        /* country dropdown */
        .country-pop { border-radius: 12px; }
        .country-pop ul li { transition: background 0.18s; }

        /* registered stamp */
        .stamp {
          display: inline-block;
          padding: 18px 36px;
          border: 6px solid rgba(220,38,38,0.95);
          color: rgba(220,38,38,0.95);
          font-weight: 800;
          font-size: 20px;
          letter-spacing: 2px;
          transform: rotate(-18deg) scale(0.85);
          background: rgba(0,0,0,0.25);
          box-shadow: 0 12px 30px rgba(2,6,23,0.6);
          border-radius: 8px;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
          transition: transform 0.35s cubic-bezier(.2,.9,.25,1), opacity 0.45s;
          opacity: 0;
        }
        .stamp.hit {
          transform: rotate(-18deg) scale(1) translateY(-6px);
          opacity: 1;
          transition: transform 0.28s cubic-bezier(.2,.9,.25,1), opacity 0.18s;
        }

        .stamp-area { display: flex; align-items: center; justify-content: center; }

        @media (max-width: 640px) {
          .card { height: auto; }
          .profile.w-20 { width: 64px; height: 64px; }
        }
      `}</style>
    </div>
  );
}
