import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUpIcon, 
  AwardIcon, 
  BarChartIcon, 
  UsersIcon,
  TrophyIcon,
  CalendarIcon,
  ZapIcon,
  TargetIcon
} from "lucide-react";

export const PerformanceDashboard = () => {
  const performanceData = [
    {
      category: "Vertical Jump",
      current: 67,
      benchmark: 65,
      percentile: 78,
      improvement: "+12%",
      color: "from-primary to-primary-glow"
    },
    {
      category: "Sprint Speed",
      current: 4.2,
      benchmark: 4.5,
      percentile: 85,
      improvement: "+8%", 
      color: "from-accent to-primary"
    },
    {
      category: "Endurance",
      current: 12.5,
      benchmark: 13.0,
      percentile: 72,
      improvement: "+15%",
      color: "from-success to-accent"
    },
    {
      category: "Strength",
      current: 45,
      benchmark: 40,
      percentile: 92,
      improvement: "+20%",
      color: "from-warning to-primary"
    }
  ];

  const recentAchievements = [
    {
      title: "Speed Demon",
      description: "Top 10% in sprint tests",
      icon: ZapIcon,
      unlocked: true,
      date: "2 days ago"
    },
    {
      title: "Jump Master", 
      description: "Exceeded vertical jump benchmark",
      icon: TrendingUpIcon,
      unlocked: true,
      date: "1 week ago"
    },
    {
      title: "Consistency King",
      description: "5 consecutive verified tests",
      icon: TargetIcon,
      unlocked: false,
      progress: 80
    }
  ];

  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", score: 94.5, state: "Maharashtra" },
    { rank: 2, name: "Arjun Kumar", score: 92.8, state: "Punjab" },
    { rank: 3, name: "You", score: 89.2, state: "Karnataka", isUser: true },
    { rank: 4, name: "Sneha Patel", score: 87.6, state: "Gujarat" },
    { rank: 5, name: "Vikram Singh", score: 86.1, state: "Haryana" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-foreground to-primary bg-clip-text">
            Performance Analytics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your athletic progress with comprehensive AI-powered performance insights
          </p>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((item, index) => (
            <Card key={index} className="card-athletic">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{item.category}</CardTitle>
                  <Badge className="bg-success/20 text-success border-success/30">
                    {item.improvement}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Current vs Benchmark */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current</span>
                    <span className={`text-2xl font-black text-transparent bg-gradient-to-r ${item.color} bg-clip-text`}>
                      {item.current}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Benchmark</span>
                    <span className="text-lg text-muted-foreground">{item.benchmark}</span>
                  </div>
                </div>

                {/* Percentile Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Percentile Rank</span>
                    <span className="text-primary font-medium">{item.percentile}%</span>
                  </div>
                  <Progress value={item.percentile} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Card className="card-athletic">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AwardIcon className="h-5 w-5 text-warning" />
                <span>Achievements & Badges</span>
              </CardTitle>
              <CardDescription>Track your milestone accomplishments</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? "border-primary/30 bg-primary/10" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked 
                          ? "bg-gradient-energy" 
                          : "bg-muted"
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          achievement.unlocked ? "text-background" : "text-muted-foreground"
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        
                        {achievement.unlocked ? (
                          <Badge className="mt-2 bg-success/20 text-success border-success/30">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {achievement.date}
                          </Badge>
                        ) : (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-muted-foreground">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress || 0} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="card-athletic">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrophyIcon className="h-5 w-5 text-accent" />
                <span>National Leaderboard</span>
              </CardTitle>
              <CardDescription>Top performers across India</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((player) => (
                  <div 
                    key={player.rank}
                    className={`flex items-center space-x-4 p-3 rounded-lg ${
                      player.isUser 
                        ? "bg-primary/10 border border-primary/30" 
                        : "hover:bg-surface/50"
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      player.rank === 1 ? "bg-gradient-to-r from-warning to-primary text-background" :
                      player.rank === 2 ? "bg-muted text-foreground" :
                      player.rank === 3 ? "bg-warning/30 text-warning" :
                      "bg-surface text-muted-foreground"
                    }`}>
                      {player.rank}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${
                          player.isUser ? "text-primary" : "text-foreground"
                        }`}>
                          {player.name}
                        </h4>
                        <span className="font-bold text-lg text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                          {player.score}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{player.state}</p>
                    </div>
                    
                    {player.isUser && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        You
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="card-athletic">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChartIcon className="h-5 w-5 text-primary" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Track your improvement over time</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="metric-display">28</div>
                  <p className="font-semibold text-foreground">Tests Completed</p>
                  <Badge className="bg-primary/20 text-primary">This Month</Badge>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="metric-display">+18%</div>
                  <p className="font-semibold text-foreground">Overall Improvement</p>
                  <Badge className="bg-success/20 text-success">Last 30 Days</Badge>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="metric-display">4.8/5</div>
                  <p className="font-semibold text-foreground">Consistency Score</p>
                  <Badge className="bg-accent/20 text-accent">Excellent</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};