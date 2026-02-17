import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/input';
import { authUser } from '@/lib/api';
import { User } from '@/types/types';

interface HomePageProps {
  onLogin: (user: User) => void;
}

export default function HomePage({ onLogin }: HomePageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      setError('Please enter your name and email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authUser(name, email);
      if (response.data.success) {
        onLogin(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating planets */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🪐
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20 text-5xl"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌙
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4 text-4xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ⭐
      </motion.div>

      <div className="content-wrapper max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200 
            }}
            className="text-9xl mb-6 inline-block"
          >
            ✈️

          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-semibold mb-4 tracking-tight text-white"
          >
            Spacey Science
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-2"
          >
            Explore the Universe with AI
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-yellow-400 text-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Learn about space, planets, and stars!</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="glass-strong rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Start Your Journey
              <Star className="w-6 h-6 text-yellow-400" />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  What's your name, Space Explorer?
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  disabled={loading}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="space"
                size="xl"
                className="w-full text-lg font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Rocket className="w-5 h-5" />
                    </motion.div>
                    Launching...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Launch Into Space!
                  </span>
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              By continuing, you agree to explore the wonders of the universe! 🌌
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>✨ AI-Powered Quizzes • Interactive Lessons • Earn Badges ✨</p>
        </motion.div>
      </div>
    </div>
  );
}