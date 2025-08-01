import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Globe, 
  Check, 
  Sparkles, 
  Palette, 
  Eye,
  QrCode,
  Download,
  Share,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WebsiteBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessDescription, setBusinessDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const themes = [
    {
      id: "modern",
      name: "Modern Business",
      description: "Clean, professional layout perfect for service businesses",
      preview: "bg-gradient-to-br from-blue-50 to-indigo-100",
      color: "Blue & White"
    },
    {
      id: "elegant",
      name: "Elegant Dark",
      description: "Sophisticated dark theme for luxury brands",
      preview: "bg-gradient-to-br from-gray-900 to-purple-900",
      color: "Dark & Purple"
    },
    {
      id: "vibrant",
      name: "Vibrant Colors",
      description: "Bold and colorful design for creative businesses",
      preview: "bg-gradient-to-br from-orange-400 to-pink-500",
      color: "Orange & Pink"
    }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      toast({
        title: "Logo uploaded successfully!",
        description: "Your logo has been added to the website.",
      });
    }
  };

  const handleGenerateWebsite = () => {
    if (!businessDescription || !selectedTheme) {
      toast({
        title: "Missing information",
        description: "Please fill in your business description and select a theme.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Website generated successfully! 🎉",
      description: "Your business website is now live with a unique QR code.",
    });
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: "Business Info", description: "Tell us about your business" },
    { number: 2, title: "Logo & Branding", description: "Upload your logo" },
    { number: 3, title: "Choose Theme", description: "Select a design template" },
    { number: 4, title: "Generate & Deploy", description: "Create your website" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Website Builder</h1>
          <p className="text-muted-foreground mt-1">
            Create a professional website for your business in minutes
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Sparkles className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Progress Steps */}
      <Card className="bg-card border shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm
                  ${currentStep >= step.number 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background text-muted-foreground border-border'
                  }
                `}>
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-1 mx-4
                    ${currentStep > step.number ? 'bg-primary' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center max-w-[120px]">
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Business Info */}
          {currentStep >= 1 && (
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Describe your business, location, and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input 
                    id="business-name" 
                    placeholder="e.g., John's Restaurant & Catering"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    placeholder="Describe your business, location, services, and what makes you special..."
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="City, State"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="(555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>
                {currentStep === 1 && (
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!businessDescription}
                    className="w-full"
                  >
                    Continue to Logo Upload
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Logo Upload */}
          {currentStep >= 2 && (
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Logo & Branding
                </CardTitle>
                <CardDescription>
                  Upload your business logo (optional but recommended)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {logoFile ? logoFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, SVG up to 10MB
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="outline" className="mt-4" asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                </div>
                {currentStep === 2 && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      className="flex-1"
                    >
                      Continue to Theme Selection
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Theme Selection */}
          {currentStep >= 3 && (
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Choose Your Theme
                </CardTitle>
                <CardDescription>
                  Select a design template that matches your brand
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`
                        border-2 rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-medium
                        ${selectedTheme === theme.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className={`w-full h-24 rounded-lg mb-3 ${theme.preview}`} />
                      <h4 className="font-semibold text-sm mb-1">{theme.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {theme.color}
                      </Badge>
                      {selectedTheme === theme.id && (
                        <div className="flex items-center justify-center mt-3">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {currentStep === 3 && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleGenerateWebsite}
                      disabled={!selectedTheme}
                      className="flex-1"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Website
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <Card className="bg-card shadow-large border-success/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Website Created Successfully! 🎉
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your business website is now live and ready to share with customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="default">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Website
                  </Button>
                  <Button variant="outline">
                    <QrCode className="w-4 h-4 mr-2" />
                    Get QR Code
                  </Button>
                  <Button variant="outline">
                    <Share className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Website Preview */}
          <Card className="bg-card shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Website Preview</CardTitle>
              <CardDescription>
                See how your website will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 text-center min-h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">
                  <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Preview will appear here</p>
                  <p className="text-xs">after completing the form</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>• Use high-quality logo images for best results</p>
                <p>• Include your location for local SEO</p>
                <p>• Mention your unique selling points</p>
                <p>• Add contact information clearly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}