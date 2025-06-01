import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, insertUserStatsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all challenges
  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getAllChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  // Get random challenges for task list
  app.get("/api/challenges/random", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const challenges = await storage.getRandomChallenges(limit);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random challenges" });
    }
  });

  // Get specific challenge
  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const challenge = await storage.getChallenge(id);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenge" });
    }
  });

  // Get user stats (using default user ID 1 for demo)
  app.get("/api/user/stats", async (req, res) => {
    try {
      const userId = 1; // Default user for demo
      const stats = await storage.getUserStats(userId);
      if (!stats) {
        // Create default stats if not found
        const defaultStats = {
          userId,
          totalEarnings: 0,
          completedTasks: 0,
          accuracy: 0,
          totalTimeSpent: 0
        };
        const created = await storage.createUserStats(defaultStats);
        return res.json(created);
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Submit challenge completion
  app.post("/api/challenges/:id/complete", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const userId = 1; // Default user for demo
      
      // Validate request body
      const submitSchema = z.object({
        selectedIndex: z.number(),
        timeSpent: z.number(),
        completed: z.boolean()
      });
      
      const { selectedIndex, timeSpent, completed } = submitSchema.parse(req.body);
      
      // Get challenge to validate answer
      const challenge = await storage.getChallenge(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      const isCorrect = selectedIndex === challenge.typoIndex;
      
      // Create user progress
      const progress = await storage.createUserProgress({
        userId,
        challengeId,
        completed: isCorrect,
        timeSpent,
        selectedIndex
      });
      
      // Update user stats
      const currentStats = await storage.getUserStats(userId);
      if (currentStats) {
        const newEarnings = isCorrect ? currentStats.totalEarnings + challenge.reward : currentStats.totalEarnings;
        const newCompleted = isCorrect ? currentStats.completedTasks + 1 : currentStats.completedTasks;
        const newTotalTime = currentStats.totalTimeSpent + timeSpent;
        
        // Calculate new accuracy
        const userProgress = await storage.getUserProgress(userId);
        const totalAttempts = userProgress.length;
        const successfulAttempts = userProgress.filter(p => p.completed).length;
        const newAccuracy = totalAttempts > 0 ? Math.round((successfulAttempts / totalAttempts) * 100) : 0;
        
        await storage.updateUserStats(userId, {
          totalEarnings: newEarnings,
          completedTasks: newCompleted,
          totalTimeSpent: newTotalTime,
          accuracy: newAccuracy
        });
      }
      
      res.json({
        success: true,
        correct: isCorrect,
        progress,
        reward: isCorrect ? challenge.reward : 0,
        correctAnswer: challenge.correctChar
      });
      
    } catch (error) {
      console.error("Error completing challenge:", error);
      res.status(500).json({ message: "Failed to submit challenge completion" });
    }
  });

  // Get user progress
  app.get("/api/user/progress", async (req, res) => {
    try {
      const userId = 1; // Default user for demo
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
