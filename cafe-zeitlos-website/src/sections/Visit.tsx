import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock, Copy, Camera, Info, Calendar, User, MessageSquare, Check, X, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReservationRequest } from '../types';

export const Visit: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ReservationRequest>({
    date: '',
    time: '',
    guests: 2,
    name: '',
    note: ''
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogStep, setDialogStep] = useState<'phone' | 'otp'>('phone');
  const [countryCode, setCountryCode] = useState('+49');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  // OTP: 6 digits
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpShake, setOtpShake] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const countries = [
    { code: '+49', flag: '🇩🇪', name: 'Deutschland' },
    { code: '+43', flag: '🇦🇹', name: 'Österreich' },
    { code: '+41', flag: '🇨🇭', name: 'Schweiz' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+33', flag: '🇫🇷', name: 'Frankreich' },
    { code: '+39', flag: '🇮🇹', name: 'Italien' },
    { code: '+34', flag: '🇪🇸', name: 'Spanien' },
    { code: '+31', flag: '🇳🇱', name: 'Niederlande' },
    { code: '+32', flag: '🇧🇪', name: 'Belgien' },
    { code: '+48', flag: '🇵🇱', name: 'Polen' },
    { code: '+420', flag: '🇨🇿', name: 'Tschechien' },
    { code: '+46', flag: '🇸🇪', name: 'Schweden' },
    { code: '+47', flag: '🇳🇴', name: 'Norwegen' },
    { code: '+45', flag: '🇩🇰', name: 'Dänemark' },
    { code: '+358', flag: '🇫🇮', name: 'Finnland' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+30', flag: '🇬🇷', name: 'Griechenland' },
    { code: '+36', flag: '🇭🇺', name: 'Ungarn' },
    { code: '+40', flag: '🇷🇴', name: 'Rumänien' },
    { code: '+7',  flag: '🇷🇺', name: 'Russland' },
  ];


  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const selectedDate = new Date(formData.date);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setSubmitError(t('reservation.error_past_date'));
      return;
    }

    const time = formData.time;
    if (time < '09:00' || time > '20:00') {
      setSubmitError(t('reservation.error_invalid_time'));
      return;
    }

    // Open dialog at phone step
    setDialogStep('phone');
    setPhone('');
    setCountryCode('+49');
    setPhoneError(null);
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    setShowDialog(true);
  };

  const handlePhoneConfirm = () => {
    setPhoneError(null);
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned || cleaned.length < 4) {
      setPhoneError('Bitte gib eine gültige Handynummer ein.');
      return;
    }
    // Move to OTP step
    setDialogStep('otp');
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    setTimeout(() => otpRefs.current[0]?.focus(), 80);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError(null);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') handleOtpVerify();
  };

  const handleOtpVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setOtpError('Bitte alle 6 Ziffern eingeben.');
      return;
    }
    // Always wrong — no real backend
    setOtpShake(true);
    setTimeout(() => setOtpShake(false), 600);
    setOtpError('Falscher Code. Bitte versuche es erneut.');
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePhoneConfirm();
  };

  const getSummaryText = () => {
    return `${t('reservation.title')} Café Zeitlos\n${t('reservation.name_label')}: ${formData.name}\n${t('reservation.date')}: ${formData.date}\n${t('reservation.time')}: ${formData.time}\n${t('reservation.guests_label')}: ${formData.guests}${formData.note ? `\n${t('reservation.note_label')}: ${formData.note}` : ''}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSummaryText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="visit" className="py-24 bg-cafe-cream/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-[clamp(2rem,6vw,3rem)] font-bold text-cafe-espresso mb-4">
            {t('visit.title')}
          </h2>
          <div className="w-20 h-1 bg-cafe-gold rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Info Card */}
          <div className="flex-1 bg-cafe-espresso text-cafe-ivory rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cafe-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="font-heading text-3xl font-bold mb-8 relative z-10">Café Zeitlos</h3>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Adresse</p>
                  <p className="text-cafe-cream/90 text-lg leading-relaxed">{t('visit.address')}</p>
                  <a
                    href="https://maps.apple.com/?q=Rebenring+47a,+38106+Braunschweig"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-cafe-gold hover:text-white transition-colors underline underline-offset-4"
                  >
                    Route planen
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">{t('visit.hours_title')}</p>
                  <p className="text-cafe-cream/90 text-lg leading-relaxed">{t('visit.hours_text')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cafe-cocoa flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-cafe-gold" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Telefon</p>
                  <a href="tel:+4953112885768" className="text-cafe-cream/90 text-lg hover:text-white transition-colors">
                    {t('visit.phone')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Planner */}
          <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-cafe-cream relative">
            <h3 className="font-heading text-3xl font-bold text-cafe-espresso mb-2">{t('reservation.title')}</h3>
            <p className="text-cafe-text/70 mb-8">{t('reservation.disclaimer')}</p>

            {!isGenerated ? (
              <form onSubmit={handleGenerate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="res-date" className="text-sm font-bold text-cafe-text block">{t('reservation.date')} *</label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      min={getTodayDateString()}
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="res-time" className="text-sm font-bold text-cafe-text block">{t('reservation.time')} *</label>
                    <input
                      id="res-time"
                      type="time"
                      required
                      min="09:00"
                      max="20:00"
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="res-guests" className="text-sm font-bold text-cafe-text block">{t('reservation.guests')} *</label>
                    <input
                      id="res-guests"
                      type="number"
                      min="1"
                      max="20"
                      required
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="res-name" className="text-sm font-bold text-cafe-text block">{t('reservation.name')} *</label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-cafe-ivory border border-cafe-cream h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-cafe-text block">{t('reservation.note')}</label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full bg-cafe-ivory border border-cafe-cream p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cafe-gold transition-all resize-none"
                  ></textarea>
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm font-semibold animate-pulse bg-red-50 p-2.5 rounded-lg border border-red-200 text-center">{submitError}</p>
                )}

                <div className="pt-2">
                  <Button type="submit" fullWidth>{t('reservation.submit')}</Button>
                </div>
              </form>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 space-y-6">
                {/* Custom Elegant Notice */}
                <div className="bg-[#fffcf6] border border-[#f3e1cc] p-5 rounded-2xl flex items-start gap-3 shadow-sm">
                  <Info className="text-cafe-gold mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-cafe-espresso text-sm mb-1 uppercase tracking-wider">
                      {t('reservation.title')}
                    </h4>
                    <p className="text-sm text-[#735b40] leading-relaxed">
                      {t('reservation.disclaimer_generate')}
                    </p>
                  </div>
                </div>

                {/* Structured Overview Card */}
                <div className="bg-cafe-ivory/50 border border-cafe-cream rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cafe-cream/60">
                    <span className="font-serif italic font-semibold text-cafe-espresso text-lg">{t('reservation.summary')}</span>
                    <span className="text-xs bg-cafe-gold/20 text-[#735b40] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{t('reservation.draft')}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-cafe-cream/30">
                      <div className="w-9 h-9 rounded-lg bg-cafe-cream/40 flex items-center justify-center text-cafe-espresso">
                        <User size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-cafe-text/60 block font-bold">{t('reservation.name_label')}</span>
                        <span className="text-sm font-semibold text-cafe-espresso">{formData.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-cafe-cream/30">
                      <div className="w-9 h-9 rounded-lg bg-cafe-cream/40 flex items-center justify-center text-cafe-espresso">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-cafe-text/60 block font-bold">{t('reservation.date')}</span>
                        <span className="text-sm font-semibold text-cafe-espresso">{formData.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-cafe-cream/30">
                      <div className="w-9 h-9 rounded-lg bg-cafe-cream/40 flex items-center justify-center text-cafe-espresso">
                        <Clock size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-cafe-text/60 block font-bold">{t('reservation.time')}</span>
                        <span className="text-sm font-semibold text-cafe-espresso">{t('reservation.time_value', { time: formData.time })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-cafe-cream/30">
                      <div className="w-9 h-9 rounded-lg bg-cafe-cream/40 flex items-center justify-center text-cafe-espresso">
                        <User size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-cafe-text/60 block font-bold">{t('reservation.guests_label')}</span>
                        <span className="text-sm font-semibold text-cafe-espresso">{t('reservation.guests_count', { count: formData.guests })}</span>
                      </div>
                    </div>
                  </div>

                  {formData.note && (
                    <div className="flex gap-3 bg-white/60 p-4 rounded-xl border border-cafe-cream/30">
                      <div className="w-9 h-9 rounded-lg bg-cafe-cream/40 flex items-center justify-center text-cafe-espresso shrink-0">
                        <MessageSquare size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-cafe-text/60 block font-bold">{t('reservation.note_label')}</span>
                        <span className="text-sm text-cafe-text leading-normal block whitespace-pre-wrap">{formData.note}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Grid */}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={copyToClipboard}
                    variant={isCopied ? "primary" : "secondary"}
                    fullWidth
                    className={`gap-2 h-12 text-base transition-all rounded-full flex items-center justify-center ${isCopied ? '!bg-green-700 !text-white hover:!bg-green-800' : ''}`}
                  >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    {isCopied ? t('reservation.copied') : t('reservation.copy')}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://www.instagram.com/cafezeitlos_bs/', '_blank')}
                      className="gap-2 h-12 rounded-full"
                    >
                      <Camera size={18} />
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('tel:+4953112885768')}
                      className="gap-2 h-12 rounded-full"
                    >
                      <Phone size={18} />
                      {t('reservation.call')}
                    </Button>
                  </div>
                  <button
                    onClick={() => setIsGenerated(false)}
                    className="mt-4 text-sm font-medium text-cafe-text/60 hover:text-cafe-espresso underline underline-offset-4"
                  >
                    {t('reservation.edit')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Phone / OTP Dialog ── */}
      <AnimatePresence>
        {showDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-cafe-espresso/50 backdrop-blur-sm z-[70]"
              onClick={() => setShowDialog(false)}
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[80] max-w-sm mx-auto bg-white rounded-3xl shadow-2xl p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              {/* Close button */}
              <button
                onClick={() => setShowDialog(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-cafe-cream/60 text-cafe-espresso hover:bg-cafe-cream transition-colors"
                aria-label="Schließen"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">

                {/* ── Step 1: Phone ── */}
                {dialogStep === 'phone' && (
                  <motion.div
                    key="phone-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cafe-gold/10 flex items-center justify-center mb-5 mx-auto">
                      <Phone size={26} className="text-cafe-gold" />
                    </div>
                    <h3 id="dialog-title" className="font-heading text-2xl font-bold text-cafe-espresso text-center mb-1">
                      Handynummer bestätigen
                    </h3>
                    <p className="text-sm text-cafe-text/60 text-center mb-6">
                      Wir senden dir einen Code zur Bestätigung.
                    </p>
                    <div className="space-y-1.5 mb-4">
                      <label htmlFor="phone-input" className="text-sm font-bold text-cafe-text block">
                        Handynummer *
                      </label>
                      {/* Country + Number row */}
                      <div className={`flex rounded-xl border overflow-hidden transition-all focus-within:ring-2 focus-within:ring-cafe-gold ${
                        phoneError ? 'border-red-400' : 'border-cafe-cream'
                      }`}>
                        {/* Country selector */}
                        <div className="relative">
                          <select
                            value={countryCode}
                            onChange={e => setCountryCode(e.target.value)}
                            className="appearance-none h-full bg-cafe-cream/60 text-cafe-espresso text-sm font-semibold pl-3 pr-7 focus:outline-none cursor-pointer"
                            aria-label="Ländervorwahl"
                          >
                            {countries.map(c => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          {/* Dropdown arrow */}
                          <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-cafe-espresso/50 text-xs">▾</span>
                        </div>
                        {/* Divider */}
                        <div className="w-px bg-cafe-cream self-stretch" />
                        {/* Number input */}
                        <input
                          id="phone-input"
                          type="tel"
                          autoFocus
                          placeholder="151 23456789"
                          value={phone}
                          onChange={e => { setPhone(e.target.value.replace(/[^\d\s]/g, '')); setPhoneError(null); }}
                          onKeyDown={handlePhoneKeyDown}
                          className="flex-1 bg-cafe-ivory px-3 py-3 text-base focus:outline-none"
                        />
                      </div>
                      {/* Preview */}
                      {phone && (
                        <p className="text-xs text-cafe-text/50 mt-1">
                          Vollständig: <span className="font-semibold text-cafe-espresso">{countryCode} {phone}</span>
                        </p>
                      )}
                      {phoneError && (
                        <p className="text-red-500 text-xs font-medium mt-1">{phoneError}</p>
                      )}
                    </div>
                    <button
                      onClick={handlePhoneConfirm}
                      className="w-full py-3.5 bg-cafe-espresso text-cafe-ivory font-semibold text-base rounded-2xl hover:bg-cafe-cocoa transition-colors active:scale-95"
                    >
                      Code senden
                    </button>
                  </motion.div>
                )}

                {/* ── Step 2: OTP ── */}
                {dialogStep === 'otp' && (
                  <motion.div
                    key="otp-step"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-cafe-gold/10 flex items-center justify-center mb-5 mx-auto">
                      <ShieldCheck size={26} className="text-cafe-gold" />
                    </div>
                    <h3 id="dialog-title" className="font-heading text-2xl font-bold text-cafe-espresso text-center mb-1">
                      Code eingeben
                    </h3>
                    <p className="text-sm text-cafe-text/60 text-center mb-6">
                      Wir haben einen 6-stelligen Code an{' '}
                      <span className="font-semibold text-cafe-espresso">{countryCode} {phone}</span> gesendet.
                    </p>

                    {/* 6-digit OTP boxes */}
                    <motion.div
                      animate={otpShake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex gap-2 justify-center mb-4"
                    >
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 focus:outline-none transition-all ${
                            otpError
                              ? 'border-red-400 bg-red-50 text-red-600'
                              : digit
                              ? 'border-cafe-gold bg-cafe-ivory text-cafe-espresso'
                              : 'border-cafe-cream bg-cafe-ivory text-cafe-espresso focus:border-cafe-gold'
                          }`}
                        />
                      ))}
                    </motion.div>

                    {otpError && (
                      <p className="text-red-500 text-xs font-medium text-center mb-3 flex items-center justify-center gap-1">
                        <X size={12} /> {otpError}
                      </p>
                    )}

                    <button
                      onClick={handleOtpVerify}
                      className="w-full py-3.5 bg-cafe-espresso text-cafe-ivory font-semibold text-base rounded-2xl hover:bg-cafe-cocoa transition-colors active:scale-95 mb-3"
                    >
                      Bestätigen
                    </button>

                    <button
                      onClick={() => { setDialogStep('phone'); setOtpError(null); }}
                      className="w-full text-sm text-cafe-text/50 hover:text-cafe-espresso transition-colors text-center"
                    >
                      ← Nummer ändern
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
