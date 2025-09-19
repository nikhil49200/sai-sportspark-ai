import { useState, useEffect, useRef, useCallback } from "react";
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
  BrainIcon,
  CameraIcon
} from "lucide-react";

interface TrackingPoint {
  x: number;
  y: number;
  confidence: number;
  label: string;
}

interface PerformanceMetrics {
  jumpHeight?: number;
  repCount?: number;
  speed?: number;
  formScore?: number;
}

export const AIAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState("vertical-jump");
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [trackingPoints, setTrackingPoints] = useState<TrackingPoint[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

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

  // Initialize camera
  const initializeCamera = useCallback(async () => {
    setIsInitializingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    } finally {
      setIsInitializingCamera(false);
    }
  }, []);

  // AI tracking function
  const performAITracking = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isRecording) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Simulate AI tracking based on test type
    const newTrackingPoints: TrackingPoint[] = [];
    const newMetrics: PerformanceMetrics = {};
    
    switch (currentTest) {
      case 'vertical-jump':
        // Simulate jump height detection
        const jumpHeight = Math.random() * 100 + 50;
        newMetrics.jumpHeight = Math.round(jumpHeight);
        newTrackingPoints.push({
          x: canvas.width * 0.5,
          y: canvas.height * 0.3,
          confidence: 0.95,
          label: 'Peak Height'
        });
        break;
        
      case 'sit-ups':
        // Simulate rep counting
        const repCount = Math.floor(Math.random() * 5) + 1;
        newMetrics.repCount = repCount;
        newTrackingPoints.push({
          x: canvas.width * 0.5,
          y: canvas.height * 0.5,
          confidence: 0.88,
          label: 'Body Center'
        });
        break;
        
      case 'sprint-test':
        // Simulate speed tracking
        const speed = Math.random() * 10 + 15;
        newMetrics.speed = Math.round(speed * 10) / 10;
        newTrackingPoints.push({
          x: canvas.width * 0.7,
          y: canvas.height * 0.6,
          confidence: 0.92,
          label: 'Runner'
        });
        break;
    }
    
    // Draw tracking points
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    
    newTrackingPoints.forEach(point => {
      // Draw circle
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.fillText(point.label, point.x + 15, point.y - 10);
      
      // Draw confidence
      ctx.fillStyle = '#10b981';
      ctx.font = '12px Arial';
      ctx.fillText(`${Math.round(point.confidence * 100)}%`, point.x + 15, point.y + 5);
    });
    
    setTrackingPoints(newTrackingPoints);
    setMetrics(newMetrics);
    
    // Continue tracking
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(performAITracking);
    }
  }, [isRecording, currentTest]);

  // Start AI tracking when recording starts
  useEffect(() => {
    if (isRecording && cameraStream) {
      performAITracking();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, cameraStream, performAITracking]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

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

  const startAnalysis = async () => {
    // Initialize camera if not already done
    if (!cameraStream) {
      await initializeCamera();
    }
    
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
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
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
                {/* Live Video Area */}
                <div className="relative aspect-video bg-surface rounded-lg overflow-hidden">
                  {/* Live Video Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* AI Tracking Canvas Overlay */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  
                  {/* Camera Initialization Overlay */}
                  {!cameraStream && !isInitializingCamera && (
                    <div className="absolute inset-0 bg-surface/90 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <CameraIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                        <h3 className="text-lg font-bold">Camera Access Required</h3>
                        <p className="text-sm text-muted-foreground">
                          Click "Start Test" to enable camera for AI tracking
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading Overlay */}
                  {isInitializingCamera && (
                    <div className="absolute inset-0 bg-surface/90 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-energy rounded-full animate-pulse mx-auto" />
                        <h3 className="text-lg font-bold">Initializing Camera...</h3>
                        <p className="text-sm text-muted-foreground">Please allow camera access</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Live Tracking Metrics Overlay */}
                  {isRecording && trackingPoints.length > 0 && (
                    <div className="absolute top-4 left-4 bg-background/80 rounded-lg p-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-success">AI Tracking Active</span>
                      </div>
                      {metrics.jumpHeight && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Jump Height: </span>
                          <span className="font-bold text-primary">{metrics.jumpHeight}cm</span>
                        </div>
                      )}
                      {metrics.repCount && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Reps: </span>
                          <span className="font-bold text-primary">{metrics.repCount}</span>
                        </div>
                      )}
                      {metrics.speed && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Speed: </span>
                          <span className="font-bold text-primary">{metrics.speed} km/h</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-danger/20 text-danger px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                      <span className="text-sm font-semibold">LIVE</span>
                    </div>
                  )}
                  
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