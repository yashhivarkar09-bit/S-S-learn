import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const {
    currentUser,
    reviewModalSession,
    setReviewModalSession,
    setNotification,
    refreshUser
  } = useApp();

  const [teachingQuality, setTeachingQuality] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [overallRating, setOverallRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!reviewModalSession || !currentUser) return null;

  const isMentor = reviewModalSession.mentorId === currentUser.id;
  const targetUserId = isMentor ? reviewModalSession.learnerId : reviewModalSession.mentorId;
  const targetUserName = isMentor ? reviewModalSession.learnerName : reviewModalSession.mentorName;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: reviewModalSession.id,
          targetUserId,
          targetUserName,
          skillName: reviewModalSession.skillTaught,
          teachingQuality,
          communication,
          punctuality,
          overallRating,
          comment
        })
      });

      const data = await res.json();
      if (data.success) {
        setNotification({
          message: `Verified review submitted for ${targetUserName}! Thank you for contributing to campus trust.`,
          type: 'success'
        });
        await refreshUser();
        setReviewModalSession(null);
      } else {
        setNotification({ message: data.error || 'Failed to submit review', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Network error submitting review', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, setRating: (r: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="p-1 text-slate-300 hover:scale-110 transition-transform cursor-pointer"
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 font-mono font-bold text-slate-700 dark:text-slate-300 text-xs">
          {rating}/5
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Completed Exchange</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Leave Feedback for {targetUserName}
            </h3>
            <p className="text-xs text-slate-500">
              Exchange session on: <span className="font-semibold">{reviewModalSession.skillTaught}</span>
            </p>
          </div>
          <button
            onClick={() => setReviewModalSession(null)}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* 4 Rating Categories (Prompt Section 12) */}
          <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                1. Teaching & Explanation Quality
              </span>
              {renderStars(teachingQuality, setTeachingQuality)}
            </div>

            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                2. Communication & Responsiveness
              </span>
              {renderStars(communication, setCommunication)}
            </div>

            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                3. Punctuality & Preparedness
              </span>
              {renderStars(punctuality, setPunctuality)}
            </div>

            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                4. Overall Learning Experience
              </span>
              {renderStars(overallRating, setOverallRating)}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Written Recommendation & Feedback (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="How did this peer exchange help you? Mention specific topics covered or advice for other students..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setReviewModalSession(null)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Verified Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
