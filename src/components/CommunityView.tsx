import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { CommunityPost, PostComment } from '../types/index.ts';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  PlusCircle,
  Search,
  Filter,
  Send,
  Sparkles,
  HelpCircle,
  Briefcase,
  BookOpen
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { currentUser, categories, setNotification, setAuthModalOpen, setAuthModalMode } = useApp();

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // New Post Modal
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Programming & Development');
  const [newPostType, setNewPostType] = useState<'Question' | 'Project' | 'Mentor Request' | 'Resource'>('Question');
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  // Active Post Comments Drawer/Modal
  const [activeCommentPost, setActiveCommentPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Report Modal
  const [reportingPost, setReportingPost] = useState<CommunityPost | null>(null);
  const [reportReason, setReportReason] = useState('Inappropriate content or spam');
  const [reportDetails, setReportDetails] = useState('');

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/community/posts');
      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    try {
      const res = await fetch(`/api/community/posts/${postId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPosts(prev =>
          prev.map(p => {
            if (p.id === postId) {
              const liked = data.isLiked;
              const newLikedBy = liked ? [...p.likedBy, currentUser.id] : p.likedBy.filter(id => id !== currentUser.id);
              return { ...p, likes: data.likes, likedBy: newLikedBy };
            }
            return p;
          })
        );
      }
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleOpenComments = async (post: CommunityPost) => {
    setActiveCommentPost(post);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`);
      const data = await res.json();
      if (data.success && data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeCommentPost) return;
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/community/posts/${activeCommentPost.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentInput })
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments(prev => [...prev, data.comment]);
        setCommentInput('');
        setPosts(prev =>
          prev.map(p => (p.id === activeCommentPost.id ? { ...p, commentCount: p.commentCount + 1 } : p))
        );
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }

    setIsSubmittingPost(true);
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
          category: newPostCategory,
          postType: newPostType
        })
      });
      const data = await res.json();
      if (data.success && data.post) {
        setPosts(prev => [data.post, ...prev]);
        setShowNewPostModal(false);
        setNewPostTitle('');
        setNewPostContent('');
        setNotification({ message: 'Community post published successfully!', type: 'success' });
      }
    } catch (err) {
      setNotification({ message: 'Failed to create post', type: 'error' });
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingPost || !currentUser) return;

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType: 'post',
          itemId: reportingPost.id,
          reason: reportReason,
          details: reportDetails
        })
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: 'Post reported to campus moderators for review.', type: 'info' });
        setReportingPost(null);
        setReportDetails('');
        // Hide reported post locally
        setPosts(prev => prev.filter(p => p.id !== reportingPost.id));
      }
    } catch (err) {
      setNotification({ message: 'Failed to submit report', type: 'error' });
    }
  };

  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (selectedType !== 'all' && post.postType !== selectedType) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Collegiate Discussions & Collaboration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Student Learning Community
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ask questions, showcase projects, seek study buddies, and share free student learning resources.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) {
              setAuthModalMode('login');
              setAuthModalOpen(true);
            } else {
              setShowNewPostModal(true);
            }
          }}
          className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Post or Question</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions, questions, cheat sheets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Post Type filter */}
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="all">All Post Types</option>
          <option value="Question">Questions</option>
          <option value="Project">Project Showcases</option>
          <option value="Mentor Request">Mentor Requests</option>
          <option value="Resource">Learning Resources</option>
        </select>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full sm:w-52 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-500">
          Loading community posts...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No community posts match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Be the first student to ask a question or share a project in this topic!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => {
            const isLiked = currentUser ? post.likedBy.includes(currentUser.id) : false;

            return (
              <div
                key={post.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm text-left hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {post.authorName}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {post.authorDepartment} · {post.authorYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>·</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">{post.category}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                    {post.postType}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Bottom interaction strip */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-500' : ''}`} />
                      <span className="font-mono tabular-nums">{post.likes}</span>
                      <span className="text-[11px]">Likes</span>
                    </button>

                    <button
                      onClick={() => handleOpenComments(post)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="font-mono tabular-nums">{post.commentCount}</span>
                      <span className="text-[11px]">Comments</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setReportingPost(post)}
                    className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Report inappropriate post"
                  >
                    <Flag className="w-3 h-3" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create a Community Post
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Post Type
                  </label>
                  <select
                    value={newPostType}
                    onChange={e => setNewPostType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Question">Question / Help Needed</option>
                    <option value="Project">Project Showcase</option>
                    <option value="Mentor Request">Mentor Request</option>
                    <option value="Resource">Learning Resource / Cheat Sheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={e => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do you handle async state in React? Looking for a quick mentor session"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details, context, code snippets, or what you can offer in return..."
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPost}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
                >
                  {isSubmittingPost ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comments Drawer / Modal */}
      {activeCommentPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {activeCommentPost.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Posted by {activeCommentPost.authorName} ({activeCommentPost.authorDepartment})
                </p>
              </div>
              <button
                onClick={() => setActiveCommentPost(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Comments Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[150px]">
              {comments.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  No replies yet. Be the first to share an answer or offer to help!
                </p>
              ) : (
                comments.map(comm => (
                  <div
                    key={comm.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="font-bold text-slate-900 dark:text-white">{comm.authorName} ({comm.authorDepartment})</span>
                      <span className="text-[10px]">{new Date(comm.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{comm.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Post comment input form */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                required
                placeholder={currentUser ? "Write a helpful answer or feedback..." : "Please log in to comment..."}
                disabled={!currentUser || isSubmittingComment}
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!currentUser || isSubmittingComment || !commentInput.trim()}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Moderation Report Modal */}
      {reportingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-rose-600" />
              <span>Report Community Content</span>
            </h3>
            <p className="text-xs text-slate-500">
              Help us keep S2S learn a safe, respectful learning space for students. Reports are reviewed by faculty moderators.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Report
                </label>
                <select
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Inappropriate content or spam">Inappropriate content or spam</option>
                  <option value="Commercial solicitation / asking for money">Commercial solicitation / asking for money</option>
                  <option value="Academic dishonesty / exam cheating">Academic dishonesty / exam cheating</option>
                  <option value="Harassment or abusive language">Harassment or abusive language</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Additional Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain why this post violates community guidelines..."
                  value={reportDetails}
                  onChange={e => setReportDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportingPost(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
