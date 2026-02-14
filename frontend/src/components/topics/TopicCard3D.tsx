import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function TopicCard3D({ topic, completed, onClick }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        rotateX: 5,
        rotateY: -5,
      }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card
        onClick={onClick}
        className="relative p-6 h-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-400 transition-all cursor-pointer"
      >
        <div className="text-6xl mb-4">{topic.icon}</div>

        <h3 className="text-xl font-bold mb-2">
          {topic.title}
        </h3>

        <p className="text-gray-400 text-sm">
          {topic.description}
        </p>

        {completed && (
          <div className="mt-4 text-green-400 font-semibold">
            ✓ Mission Completed
          </div>
        )}
      </Card>
    </motion.div>
  );
}
