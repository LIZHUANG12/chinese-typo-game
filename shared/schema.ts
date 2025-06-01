import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  passage: text("passage").notNull(),
  typoIndex: integer("typo_index").notNull(),
  correctChar: text("correct_char").notNull(),
  wrongChar: text("wrong_char").notNull(),
  reward: integer("reward").notNull(), // in cents
  difficulty: integer("difficulty").notNull().default(1),
  category: text("category").notNull().default("classical"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => challenges.id),
  completed: boolean("completed").notNull().default(false),
  timeSpent: integer("time_spent"), // in seconds
  selectedIndex: integer("selected_index"),
  completedAt: timestamp("completed_at"),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique(),
  totalEarnings: integer("total_earnings").notNull().default(0), // in cents
  completedTasks: integer("completed_tasks").notNull().default(0),
  accuracy: integer("accuracy").notNull().default(0), // percentage
  totalTimeSpent: integer("total_time_spent").notNull().default(0), // in seconds
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true, createdAt: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true, completedAt: true });
export const insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
