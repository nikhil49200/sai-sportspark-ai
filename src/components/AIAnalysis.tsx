import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  VideoIcon, 
  PlayIcon, 
  PauseIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  TrendingUpIcon,
  ZapIcon,
  EyeIcon,
  BrainIcon
} from "lucide-react";
import aiAnalysis from "@/assets/ai-analysis.jpg";

export const AIAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState("vertical-jump");
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "analyzing" | "complete">("idle");

  const tests = [
    {
      id: "vertical-jump",
      name: "Vertical Jump Test",
      description: "AI tracks jump height and landing form",
      aiFeatures: ["Jump Height Detection", "Form Analysis", "Landing Stability"],
      duration: "30 seconds"
    },
    {
      id: "sprint-test", 
      name: "20m Sprint Test",
      description: "Speed and acceleration measurement",
      aiFeatures: ["Speed Tracking", "Acceleration Curve", "Stride Analysis"],
      duration: "10 seconds"
    },
    {
      id: "sit-ups",
      name: "Sit-ups Counter",
      description: "Automatic repetition counting",
      aiFeatures: ["Rep Counting", "Form Verification", "Tempo Analysis"],
      duration: "60 seconds"
    }
  ];

  const selectedTest = tests.find(test => test.id === currentTest) || tests[0];

  // Simulate AI analysis progress
  useEffect(() => {
    if (analysisStatus === "analyzing") {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setAnalysisStatus("complete");
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [analysisStatus]);

  const startAnalysis = () => {
    setAnalysisStatus("analyzing");
    setAnalysisProgress(0);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (analysisStatus === "analyzing" && analysisProgress < 100) {
      setAnalysisProgress(100);
      setAnalysisStatus("complete");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-foreground to-primary bg-clip-text">
            AI-Powered Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced computer vision analyzes your performance in real-time with precision accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Selection */}
          <div className="space-y-6">
            <Card className="card-athletic">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ZapIcon className="h-5 w-5 text-primary" />
                  <span>Select Test</span>
                </CardTitle>
                <CardDescription>Choose your assessment protocol</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      currentTest === test.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCurrentTest(test.id)}
                  >
                    <h4 className="font-semibold text-foreground">{test.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                    <Badge className="mt-2 bg-surface text-muted-foreground">
                      {test.duration}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="card-athletic">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BrainIcon className="h-5 w-5 text-accent" />
                  <span>AI Analysis Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedTest.aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <EyeIcon className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Video Recording Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-athletic">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <VideoIcon className="h-5 w-5 text-primary" />
                    <span>{selectedTest.name}</span>
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    {isRecording && (
                      <Badge className="bg-danger/20 text-danger border-danger/30 animate-pulse">
                        Recording
                      </Badge>
                    )}
                    {analysisStatus === "complete" && (
                      <Badge className="bg-success/20 text-success border-success/30">
                        <CheckCircleIcon className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Video Area */}
                <div className="relative aspect-video bg-surface rounded-lg overflow-hidden">
                  <img 
                    src={aiAnalysis} 
                    alt="AI Analysis Interface"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Recording Overlay */}
                  {isRecording && (
                    <div className="absolute inset-0 bg-danger/20 flex items-center justify-center">
                      <div className="bg-background/90 rounded-lg p-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-energy rounded-full animate-pulse mx-auto" />
                        <h3 className="text-lg font-bold">AI Tracking Active</h3>
                        <p className="text-sm text-muted-foreground">
                          Analyzing {selectedTest.name.toLowerCase()}...
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Analysis Complete Overlay */}
                  {analysisStatus === "complete" && !isRecording && (
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center">
                      <div className="bg-background/90 rounded-lg p-6 text-center space-y-4">
                        <CheckCircleIcon className="w-16 h-16 text-success mx-auto" />
                        <h3 className="text-lg font-bold text-success">Analysis Complete</h3>
                        <p className="text-sm text-muted-foreground">
                          Performance verified and recorded
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1 mr-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Analysis Progress</span>
                      <span className="text-primary font-medium">{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress 
                      value={analysisProgress} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    {!isRecording ? (
                      <Button 
                        onClick={startAnalysis}
                        className="btn-energy px-6"
                        disabled={analysisStatus === "analyzing"}
                      >
                        <PlayIcon className="mr-2 h-4 w-4" />
                        Start Test
                      </Button>
                    ) : (
                      <Button 
                        onClick={stopRecording}
                        variant="destructive"
                        className="px-6"
                      >
                        <PauseIcon className="mr-2 h-4 w-4" />
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Results */}
            {analysisStatus === "complete" && (
              <Card className="card-athletic">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUpIcon className="h-5 w-5 text-success" />
                    <span>Performance Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="metric-display">67cm</div>
                      <p className="font-semibold text-foreground">Jump Height</p>
                      <Badge className="bg-success/20 text-success">Excellent</Badge>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="metric-display">95%</div>
                      <p className="font-semibold text-foreground">Form Score</p>
                      <Badge className="bg-primary/20 text-primary">Verified</Badge>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="metric-display">8.2/10</div>
                      <p className="font-semibold text-foreground">Overall Rating</p>
                      <Badge className="bg-accent/20 text-accent">Above Average</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};