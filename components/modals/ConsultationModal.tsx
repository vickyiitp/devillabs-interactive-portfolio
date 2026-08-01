'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, Video, Download } from 'lucide-react';
import { CONSULTATION_SESSIONS } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [selectedSession, setSelectedSession] = useState(CONSULTATION_SESSIONS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('August 12, 2026');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM PST');
  const [booked, setBooked] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', projectLink: '' });

  if (!isOpen) return null;

  const dates = ['August 10, 2026', 'August 12, 2026', 'August 14, 2026', 'August 18, 2026', 'August 20, 2026'];
  const times = ['10:00 AM PST', '02:00 PM PST', '04:30 PM PST', '07:00 PM PST'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    studioAudio.playWhoosh();
    setBooked(true);
  };

  const downloadIcs = () => {
    const csData = `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:MOTION 1:1 Advisory w/ Julian Vance\nDESCRIPTION:${selectedSession.title}\nEND:VCALENDAR`;
    const blob = new Blob([csData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'julian_vance_consultation.ics';
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  1:1 CREATIVE DIRECTION & ADVISORY
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                    DESK CALENDAR PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Book private video call consultations with Julian Vance</p>
              </div>
            </div>

            <button
              onClick={() => {
                studioAudio.playClick(400);
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 font-sans">
            {!booked ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Session Type Picker */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. SELECT SESSION TYPE</h4>
                  <div className="space-y-3">
                    {CONSULTATION_SESSIONS.map((sess) => (
                      <div
                        key={sess.id}
                        onClick={() => {
                          studioAudio.playClick(800);
                          setSelectedSession(sess);
                        }}
                        className={`p-4 rounded-xl cursor-pointer border transition-all ${
                          selectedSession.id === sess.id
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-lg'
                            : 'bg-slate-950/60 border-slate-800/80 hover:border-emerald-500/20 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-white">{sess.title}</h5>
                          <span className="text-sm font-bold text-emerald-400 font-mono">${sess.price}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{sess.description}</p>
                        <div className="mt-2 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {sess.duration} Zoom Video Session
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Date & Slot Picker + Form */}
                <div className="md:col-span-6 flex flex-col gap-5">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">2. SELECT DATE & TIME</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => {
                            studioAudio.playClick(600);
                            setSelectedDate(d);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            selectedDate === d
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-950 border border-slate-800 text-slate-400'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            studioAudio.playClick(600);
                            setSelectedTime(t);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            selectedTime === t
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-950 border border-slate-800 text-slate-400'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-3 pt-3 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. YOUR DETAILS</h4>
                    <div>
                      <input
                        type="text"
                        required
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        placeholder="Your Email Address"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={clientInfo.projectLink}
                        onChange={(e) => setClientInfo({ ...clientInfo, projectLink: e.target.value })}
                        placeholder="Project Link / Portfolio (Optional)"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl flex items-center justify-center gap-2"
                    >
                      CONFIRM ADVISORY BOOKING — ${selectedSession.price}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">ADVISORY SESSION CONFIRMED!</h3>
                <p className="text-xs text-slate-300">
                  {selectedSession.title} with Julian Vance scheduled for <span className="text-emerald-400 font-bold font-mono">{selectedDate} @ {selectedTime}</span>.
                </p>

                <div className="pt-4 border-t border-slate-800 flex justify-center gap-3">
                  <button
                    onClick={downloadIcs}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download .ICS Calendar Invite
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
