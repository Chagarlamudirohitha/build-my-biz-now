import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Users, DollarSign, Globe, Share2, Heart, Star } from "lucide-react";

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: any;
  liked: boolean;
}

export default function Tips() {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: "1",
      title: "Optimize Your Website Loading Speed",
      description: "Fast loading websites have better SEO rankings and higher conversion rates. Compress images, minimize code, and use a content delivery network (CDN).",
      category: "SEO",
      difficulty: "Intermediate",
      icon: Globe,
      liked: false
    },
    {
      id: "2", 
      title: "Use Social Proof to Build Trust",
      description: "Display customer reviews, testimonials, and ratings prominently on your website. Social proof increases credibility and encourages new customers to purchase.",
      category: "Marketing",
      difficulty: "Beginner",
      icon: Users,
      liked: true
    },
    {
      id: "3",
      title: "Create Compelling Call-to-Action Buttons",
      description: "Use action-oriented text like 'Get Started', 'Join Now', or 'Claim Your Discount'. Make buttons stand out with contrasting colors.",
      category: "Design",
      difficulty: "Beginner",
      icon: TrendingUp,
      liked: false
    },
    {
      id: "4",
      title: "Implement Email Marketing Automation",
      description: "Set up automated email sequences for new subscribers, abandoned carts, and customer follow-ups to increase sales and retention.",
      category: "Marketing",
      difficulty: "Advanced",
      icon: DollarSign,
      liked: false
    },
    {
      id: "5",
      title: "Leverage QR Codes for Offline Marketing",
      description: "Place QR codes on business cards, flyers, and storefront to drive traffic from offline interactions to your digital presence.",
      category: "Marketing",
      difficulty: "Beginner",
      icon: Share2,
      liked: true
    },
    {
      id: "6",
      title: "Optimize for Mobile-First Experience",
      description: "Ensure your website looks and functions perfectly on mobile devices. Most customers browse and shop on their phones.",
      category: "Design",
      difficulty: "Intermediate",
      icon: Globe,
      liked: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Marketing", "SEO", "Design", "Sales"];

  const toggleLike = (tipId: string) => {
    setTips(tips.map(tip => 
      tip.id === tipId ? { ...tip, liked: !tip.liked } : tip
    ));
  };

  const filteredTips = selectedCategory === "All" 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Tips</h1>
          <p className="text-muted-foreground mt-1">
            Expert advice to grow your business and improve your website
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
          <Lightbulb className="w-4 h-4 mr-1" />
          Expert Tips
        </Badge>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => (
          <Card key={tip.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">
                      {tip.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleLike(tip.id)}
                  className="shrink-0"
                >
                  <Heart 
                    className={`w-4 h-4 ${tip.liked ? 'fill-destructive text-destructive' : ''}`} 
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tip.description}
              </CardDescription>
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(tip.difficulty)}>
                  {tip.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>Pro Tip</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Tip */}
      <Card className="bg-gradient-subtle border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured Tip
            </Badge>
          </div>
          <CardTitle className="text-xl">Weekly Business Spotlight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Customer Retention Strategy:</strong> It costs 5-25x more to acquire a new customer than to retain an existing one. 
              Focus on providing exceptional customer service, follow up after purchases, and create loyalty programs to keep customers coming back.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="outline">Advanced Strategy</Badge>
              <span className="text-muted-foreground">• Increases lifetime value</span>
              <span className="text-muted-foreground">• Reduces marketing costs</span>
              <span className="text-muted-foreground">• Builds brand loyalty</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Wins - Implement Today!</CardTitle>
          <CardDescription>Simple changes that can make a big impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Add your business hours to your website header",
              "Include your phone number in a prominent location", 
              "Create a Google My Business profile",
              "Add customer testimonials to your homepage",
              "Enable website analytics tracking",
              "Set up automated email responses for inquiries"
            ].map((quickTip, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-primary-foreground font-bold">{index + 1}</span>
                </div>
                <span className="text-sm">{quickTip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}