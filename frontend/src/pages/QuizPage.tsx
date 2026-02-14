import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/progress';
import { Badge } from '@/components/badge';
import { getTopic } from '@/lib/topics';
import { generateQuiz, saveProgress } from '@/lib/api';
import { User, Quiz, QuizQuestion } from '@/types/types';

interface QuizPageProps {
  user: User;
}

export default function QuizPage({ user }: QuizPageProps) {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getTopic(topicId || '');

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ questionIndex: number; answer: string; isCorrect: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState<any>(null);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const response = await generateQuiz(user._id, topicId || '', 'medium');
      if (response.data.success) {
        setQuiz(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!showExplanation) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !quiz) return;

    const question = quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setAnswers([
      ...answers,
      {
        questionIndex: currentQuestion,
        answer: selectedAnswer,
        isCorrect
      }
    ]);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    if (!quiz) return;

    const score = answers.filter(a => a.isCorrect).length;
    
    try {
      const response = await saveProgress({
        userId: user._id,
        quizId: quiz._id,
        topic: topicId || '',
        answers,
        score,
        totalQuestions: quiz.questions.length
      });

      if (response.data.success && response.data.data.badgeInfo) {
        setBadgeAwarded(response.data.data.badgeInfo);
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }

    setQuizCompleted(true);
  };

  if (loading) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🤖
          </motion.div>
          <p className="text-2xl text-white">AI is creating your personalized quiz...</p>
          <p className="text-gray-400 mt-2">This may take a few seconds</p>
        </motion.div>
      </div>
    );
  }

  if (!quiz || !topic) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white">Failed to load quiz</p>
          <Button onClick={() => navigate('/topics')} className="mt-4">
            Back to Topics
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="space-bg min-h-screen">
        <div className="content-wrapper container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-9xl mb-6"
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '🌟'}
            </motion.div>

            <h1 className="text-5xl font-bold gradient-text-space mb-4">
              {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Great Job!' : 'Good Effort!'}
            </h1>

            <Card className="glass-strong p-8 mb-8">
              <div className="text-6xl font-bold gradient-text-space mb-4">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-xl text-gray-300">
                You scored {percentage}%!
              </p>

              <div className="mt-6 space-y-2">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      answer.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    {answer.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm">Question {index + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            {badgeAwarded && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mb-8"
              >
                <Card className="glass-strong p-6 border-yellow-500/50">
                  <div className="text-6xl mb-3">{badgeAwarded.icon}</div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    New Badge Unlocked!
                  </h3>
                  <p className="text-lg text-white">{badgeAwarded.name}</p>
                  <p className="text-sm text-gray-400">{badgeAwarded.description}</p>
                </Card>
              </motion.div>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/topics')}
                className="bg-white/5 border-white/10"
              >
                Choose Another Topic
              </Button>
              
              <Button
                variant="space"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="space-bg min-h-screen">
      <div className="content-wrapper container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/topics')}
            className="text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Quiz
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm font-medium text-white">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-strong p-8 mb-6">
                <div className="flex items-start gap-4 mb-8">
                  <div className="text-5xl">{topic.icon}</div>
                  <h2 className="text-2xl font-bold text-white leading-relaxed">
                    {question.question}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === question.correctAnswer;
                    const showResult = showExplanation;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!showExplanation ? { scale: 1.02 } : {}}
                        whileTap={!showExplanation ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswerSelect(option)}
                        className={`p-6 rounded-xl text-left transition-all ${
                          showResult
                            ? isCorrect
                              ? 'bg-green-500/20 border-2 border-green-500'
                              : isSelected
                              ? 'bg-red-500/20 border-2 border-red-500'
                              : 'bg-white/5 border border-white/10'
                            : isSelected
                            ? 'bg-blue-500/30 border-2 border-blue-500'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg text-white">{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-6 h-6 text-red-400" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">
                          Explanation
                        </h4>
                        <p className="text-gray-200">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>

              <div className="flex justify-end">
                {!showExplanation ? (
                  <Button
                    variant="space"
                    size="lg"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="min-w-[200px]"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    variant="space"
                    size="lg"
                    onClick={handleNextQuestion}
                    className="min-w-[200px]"
                  >
                    {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}