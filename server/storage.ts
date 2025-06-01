import { 
  users, challenges, userProgress, userStats,
  type User, type InsertUser, 
  type Challenge, type InsertChallenge,
  type UserProgress, type InsertUserProgress,
  type UserStats, type InsertUserStats
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Challenge methods
  getAllChallenges(): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  getRandomChallenges(limit: number): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // User progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getChallengeProgress(userId: number, challengeId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  // User stats methods
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createUserStats(stats: InsertUserStats): Promise<UserStats>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private challenges: Map<number, Challenge>;
  private userProgress: Map<number, UserProgress>;
  private userStats: Map<number, UserStats>;
  private currentUserId: number;
  private currentChallengeId: number;
  private currentProgressId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.challenges = new Map();
    this.userProgress = new Map();
    this.userStats = new Map();
    this.currentUserId = 1;
    this.currentChallengeId = 1;
    this.currentProgressId = 1;
    this.currentStatsId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "player",
      password: "password"
    };
    this.users.set(1, defaultUser);

    // Create default stats
    const defaultStats: UserStats = {
      id: 1,
      userId: 1,
      totalEarnings: 15678, // 156.78 in cents
      completedTasks: 23,
      accuracy: 94,
      totalTimeSpent: 3600
    };
    this.userStats.set(1, defaultStats);

    // Initialize challenges with literature passages
    this.initializeChallenges();
  }

  private initializeChallenges() {
    const challengeData: InsertChallenge[] = [
      {
        title: "《红楼梦》错字挑战",
        passage: "林黛玉病体怯弱，却有一种娇弱的美。她的眼中常含有泪水，仿佛有说不尽的愁思。贾宝玉对她情有独种，两人青梅竹马，感情深厚。在贾府这个富贵之家，她的命运却如风中的花朵，飘摇不定。",
        typoIndex: 51,
        correctChar: "钟",
        wrongChar: "种",
        reward: 214,
        difficulty: 2,
        category: "classical"
      },
      {
        title: "《西游记》错字挑战", 
        passage: "孙悟空手持金箍棒，火眼金睛，能看破妖怪的真身。他在花果山水帘洞称王称霸，后来拜师学艺，获得了七十二变的神通。西天取经路上，他保护唐僧，降妖除魔，立下了汗马功牢。",
        typoIndex: 85,
        correctChar: "劳",
        wrongChar: "牢", 
        reward: 203,
        difficulty: 2,
        category: "classical"
      },
      {
        title: "《水浒传》错字挑战",
        passage: "武松身材高大，相貌堂堂，性格豪放不羁。他在景阳冈上赤手空拳打死了一只猛虎，从此名声大震。后来他为兄报仇，手刃西门庆，成为梁山好汉中的重要人勿。",
        typoIndex: 72,
        correctChar: "物",
        wrongChar: "勿",
        reward: 288,
        difficulty: 3,
        category: "classical"
      },
      {
        title: "《三国演义》错字挑战",
        passage: "刘备仁德宽厚，有王者之风。他与关羽、张飞桃园三结义，情深如手组。虽然早年颠沛流离，但始终心怀复兴汉室的大志。最终在诸葛亮的辅佐下，建立了蜀汉政权。",
        typoIndex: 53,
        correctChar: "足",
        wrongChar: "组",
        reward: 126,
        difficulty: 1,
        category: "classical"
      },
      {
        title: "《平凡的世界》错字挑战",
        passage: "孙少平是一个有理想、有抱负的青年。他出身贫寒，却不甘于命运的安排。通过不断学习和努力，他逐渐改变了自己的人生轨迹。他的故事告诉我们，只要有坚定的信念，就能突破困竟。",
        typoIndex: 76,
        correctChar: "境",
        wrongChar: "竟",
        reward: 143,
        difficulty: 2,
        category: "modern"
      },
      {
        title: "《围城》错字挑战",
        passage: "方鸿渐是个典型的知识分子形象。他留学归来，却发现现实与理想的巨大差距。在爱情和事业上都遭遇挫折，最终陷入了人生的围城。钱钟书通过这个角色，深刻揭示了现代人的生存困竟。",
        typoIndex: 83,
        correctChar: "境",
        wrongChar: "竟",
        reward: 153,
        difficulty: 3,
        category: "modern"
      },
      {
        title: "《老人与海》错字挑战",
        passage: "圣地亚哥是一位年老的渔夫，已经八十四天没有捕到鱼了。但他并没有放弃，仍然怀着希望出海。在与大鱼搏斗的过程中，他展现出了顽强的意志和不屈的精申。",
        typoIndex: 67,
        correctChar: "神",
        wrongChar: "申",
        reward: 405,
        difficulty: 2,
        category: "foreign"
      },
      {
        title: "《钢铁是怎样炼成的》错字挑战",
        passage: "保尔·柯察金是一个坚强勇敢的青年。他在战争中失去了健康，但从未放弃对理想的追求。即使在病榻上，他仍然坚持写作，用文字继续为社会主义事业奋斗。他的精神激厉了无数的年轻人。",
        typoIndex: 82,
        correctChar: "励",
        wrongChar: "厉",
        reward: 189,
        difficulty: 2,
        category: "foreign"
      },
      {
        title: "《简·爱》错字挑战",
        passage: "简·爱是一个独立自强的女性。虽然出身贫寒，相貌平凡，但她有着坚强的性格和高尚的品德。她追求平等的爱情，不愿意接受施舍般的感情。她的坚持最终赢得了真正的辛福。",
        typoIndex: 73,
        correctChar: "幸",
        wrongChar: "辛",
        reward: 267,
        difficulty: 3,
        category: "foreign"
      },
      {
        title: "《傲慢与偏见》错字挑战",
        passage: "伊丽莎白·班纳特是个聪明独立的女性，她不轻易被外表所迷惑。当她初次见到达西先生时，觉得他傲慢无礼。然而，随着时间的推移和相互了解的加深，她发现达西其实是个正真善良的人。",
        typoIndex: 78,
        correctChar: "直",
        wrongChar: "真",
        reward: 182,
        difficulty: 2,
        category: "foreign"
      }
    ];

    challengeData.forEach((challenge, index) => {
      const id = this.currentChallengeId++;
      const fullChallenge: Challenge = {
        id,
        ...challenge,
        difficulty: challenge.difficulty || 1,
        category: challenge.category || 'classical',
        createdAt: new Date()
      };
      this.challenges.set(id, fullChallenge);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Challenge methods
  async getAllChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async getRandomChallenges(limit: number): Promise<Challenge[]> {
    const allChallenges = Array.from(this.challenges.values());
    const shuffled = allChallenges.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = this.currentChallengeId++;
    const challenge: Challenge = { 
      ...insertChallenge, 
      id, 
      difficulty: insertChallenge.difficulty || 1,
      category: insertChallenge.category || 'classical',
      createdAt: new Date() 
    };
    this.challenges.set(id, challenge);
    return challenge;
  }

  // User progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getChallengeProgress(userId: number, challengeId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.challengeId === challengeId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      userId: insertProgress.userId || null,
      challengeId: insertProgress.challengeId || null,
      completed: insertProgress.completed || false,
      timeSpent: insertProgress.timeSpent || null,
      selectedIndex: insertProgress.selectedIndex || null,
      completedAt: insertProgress.completed ? new Date() : null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, updateData: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = this.userProgress.get(id);
    if (!progress) return undefined;

    const updated: UserProgress = { 
      ...progress, 
      ...updateData,
      completedAt: updateData.completed ? new Date() : progress.completedAt
    };
    this.userProgress.set(id, updated);
    return updated;
  }

  // User stats methods
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return Array.from(this.userStats.values()).find(stats => stats.userId === userId);
  }

  async createUserStats(insertStats: InsertUserStats): Promise<UserStats> {
    const id = this.currentStatsId++;
    const stats: UserStats = { 
      ...insertStats, 
      id,
      userId: insertStats.userId || null,
      totalEarnings: insertStats.totalEarnings || 0,
      completedTasks: insertStats.completedTasks || 0,
      accuracy: insertStats.accuracy || 0,
      totalTimeSpent: insertStats.totalTimeSpent || 0
    };
    this.userStats.set(id, stats);
    return stats;
  }

  async updateUserStats(userId: number, updateData: Partial<UserStats>): Promise<UserStats | undefined> {
    const stats = Array.from(this.userStats.values()).find(s => s.userId === userId);
    if (!stats) return undefined;

    const updated: UserStats = { ...stats, ...updateData };
    this.userStats.set(stats.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
