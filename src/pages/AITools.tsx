import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Image, FileText, PenTool, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  action: () => void;
}

export default function AITools() {
  const { toast } = useToast();
  const [websiteContent, setWebsiteContent] = useState("");
  const [enhancedContent, setEnhancedContent] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [businessDescription, setBusinessDescription] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("");

  const aiTools: AITool[] = [
    {
      id: "enhance-website",
      name: "Website Content Enhancer",
      description: "Improve your website copy with AI suggestions",
      category: "Content",
      icon: Wand2,
      action: handleEnhanceWebsite
    },
    {
      id: "generate-copy",
      name: "Marketing Copy Generator", 
      description: "Create compelling marketing content for your business",
      category: "Marketing",
      icon: PenTool,
      action: handleGenerateCopy
    },
    {
      id: "seo-optimizer",
      name: "SEO Optimizer",
      description: "Optimize your content for search engines",
      category: "SEO",
      icon: FileText,
      action: handleSEOOptimize
    },
    {
      id: "banner-designer",
      name: "Banner Designer",
      description: "Create eye-catching banners and promotional materials",
      category: "Design",
      icon: Image,
      action: handleBannerDesign
    }
  ];

  function handleEnhanceWebsite() {
    if (!websiteContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some website content to enhance",
        variant: "destructive"
      });
      return;
    }

    setIsEnhancing(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhanced = `Enhanced version of your content:

${websiteContent}

AI Suggestions:
• Add more compelling call-to-action phrases
• Include customer testimonials for credibility  
• Highlight unique selling propositions
• Use more action-oriented language
• Consider adding urgency elements ("Limited time", "Exclusive offer")
• Improve readability with shorter sentences
• Include relevant keywords for better SEO`;

      setEnhancedContent(enhanced);
      setIsEnhancing(false);
      
      toast({
        title: "Content Enhanced!",
        description: "Your website content has been improved with AI suggestions"
      });
    }, 2000);
  }

  function handleGenerateCopy() {
    if (!businessDescription.trim()) {
      toast({
        title: "Error", 
        description: "Please describe your business first",
        variant: "destructive"
      });
      return;
    }

    // Simulate copy generation
    const copy = `📢 EXCITING NEWS! 

Discover ${businessDescription} - where quality meets excellence! 

🌟 What makes us special:
• Premium products & services
• Exceptional customer experience  
• Competitive pricing
• Fast & reliable service

💥 LIMITED TIME OFFER: Get 20% off your first order!

Don't miss out - visit us today and see why customers love what we do!

#Business #Quality #CustomerFirst #SpecialOffer`;

    setGeneratedCopy(copy);
    
    toast({
      title: "Marketing Copy Generated!",
      description: "Your promotional content is ready to use"
    });
  }

  function handleSEOOptimize() {
    toast({
      title: "SEO Analysis Complete!",
      description: "Your content has been analyzed for SEO improvements"
    });
  }

  function handleBannerDesign() {
    toast({
      title: "Banner Designer Opened!",
      description: "AI banner design tools are now available"
    });
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Tools</h1>
          <p className="text-muted-foreground mt-1">
            Enhance your business with AI-powered tools
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
          <Sparkles className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <tool.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={tool.action} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Use AI Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Content Enhancer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Website Content Enhancer
            </CardTitle>
            <CardDescription>
              Paste your current website content and get AI-powered improvements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="website-content">Current Website Content</Label>
              <Textarea
                id="website-content"
                value={websiteContent}
                onChange={(e) => setWebsiteContent(e.target.value)}
                placeholder="Paste your website content here..."
                className="min-h-[120px]"
              />
            </div>
            <Button 
              onClick={handleEnhanceWebsite} 
              disabled={isEnhancing}
              className="w-full"
            >
              {isEnhancing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Enhance Content
                </>
              )}
            </Button>
            {enhancedContent && (
              <div>
                <Label>Enhanced Content</Label>
                <Textarea
                  value={enhancedContent}
                  readOnly
                  className="min-h-[200px] bg-accent"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Marketing Copy Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5" />
              Marketing Copy Generator
            </CardTitle>
            <CardDescription>
              Generate promotional content for social media and marketing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business-desc">Business Description</Label>
              <Textarea
                id="business-desc"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Describe your business, products, or services..."
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleGenerateCopy} className="w-full">
              <PenTool className="w-4 h-4 mr-2" />
              Generate Marketing Copy
            </Button>
            {generatedCopy && (
              <div>
                <Label>Generated Marketing Copy</Label>
                <Textarea
                  value={generatedCopy}
                  readOnly
                  className="min-h-[200px] bg-accent"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI-Powered Business Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Use emotional triggers in your headlines to increase engagement",
              "Add customer testimonials to build trust and credibility",
              "Include clear call-to-action buttons on every page",
              "Optimize images with alt text for better SEO",
              "Use social proof to encourage more conversions",
              "Create urgency with limited-time offers"
            ].map((tip, index) => (
              <div key={index} className="p-3 bg-accent rounded-lg">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}