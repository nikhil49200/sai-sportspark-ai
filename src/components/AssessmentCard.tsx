import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon, CheckCircleIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  tests: string[];
  icon: LucideIcon;
  color: string;
}

interface AssessmentCardProps {
  category: AssessmentCategory;
  onSelect: () => void;
}

export const AssessmentCard = ({ category, onSelect }: AssessmentCardProps) => {
  const Icon = category.icon;
  
  return (
    <Card className="card-athletic group cursor-pointer" onClick={onSelect}>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
            <Icon className="h-6 w-6 text-background" />
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {category.tests.length} Tests
          </Badge>
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {category.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {category.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Test List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-3">Included Tests:</h4>
          <div className="grid grid-cols-1 gap-2">
            {category.tests.map((test, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircleIcon className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">{test}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="btn-performance w-full group-hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          Start Assessment
        </Button>
      </CardContent>
    </Card>
  );
};