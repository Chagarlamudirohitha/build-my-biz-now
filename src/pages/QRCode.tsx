import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Share2, Copy, Eye, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function QRCodePage() {
  const { toast } = useToast();
  const [websiteUrl] = useState("https://your-business.break-even.app");
  const [qrCodeData, setQrCodeData] = useState({
    url: websiteUrl,
    size: 200,
    color: "#000000",
    bgColor: "#ffffff"
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(websiteUrl);
    toast({
      title: "URL Copied!",
      description: "Website URL has been copied to clipboard"
    });
  };

  const handleDownloadQR = () => {
    toast({
      title: "QR Code Downloaded!",
      description: "QR code image has been saved to your downloads"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Visit My Business Website",
        text: "Check out my business website!",
        url: websiteUrl
      });
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code</h1>
          <p className="text-muted-foreground mt-1">
            Share your business website with QR codes
          </p>
        </div>
        <Button onClick={handleShare} className="bg-primary hover:bg-primary/90">
          <Share2 className="w-4 h-4 mr-2" />
          Share Website
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-success">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-success">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53.2%</div>
            <p className="text-xs text-success">QR → Website visits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle>Your Business QR Code</CardTitle>
            <CardDescription>
              Customers can scan this to visit your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div 
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 bg-white"
                style={{ 
                  width: qrCodeData.size + 32, 
                  height: qrCodeData.size + 32 
                }}
              >
                <div 
                  className="bg-gray-900 rounded-lg flex items-center justify-center"
                  style={{ 
                    width: qrCodeData.size, 
                    height: qrCodeData.size 
                  }}
                >
                  <QrCode 
                    className="text-white" 
                    size={qrCodeData.size * 0.6} 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                <span className="text-sm font-medium">URL:</span>
                <span className="text-sm text-muted-foreground flex-1">{websiteUrl}</span>
                <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleDownloadQR} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Customization */}
        <Card>
          <CardHeader>
            <CardTitle>Customize QR Code</CardTitle>
            <CardDescription>
              Adjust the appearance of your QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="size">Size (pixels)</Label>
              <Input
                id="size"
                type="range"
                min="100"
                max="400"
                value={qrCodeData.size}
                onChange={(e) => setQrCodeData({ ...qrCodeData, size: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1">
                Current size: {qrCodeData.size}px
              </div>
            </div>

            <div>
              <Label htmlFor="color">QR Code Color</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="color"
                  type="color"
                  value={qrCodeData.color}
                  onChange={(e) => setQrCodeData({ ...qrCodeData, color: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={qrCodeData.color}
                  onChange={(e) => setQrCodeData({ ...qrCodeData, color: e.target.value })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bgColor">Background Color</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="bgColor"
                  type="color"
                  value={qrCodeData.bgColor}
                  onChange={(e) => setQrCodeData({ ...qrCodeData, bgColor: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={qrCodeData.bgColor}
                  onChange={(e) => setQrCodeData({ ...qrCodeData, bgColor: e.target.value })}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Marketing Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Place QR codes on business cards</li>
                <li>• Add to storefront windows</li>
                <li>• Include in printed advertisements</li>
                <li>• Share on social media posts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}