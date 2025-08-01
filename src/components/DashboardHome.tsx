import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  ShoppingCart,
  MessageCircle,
  Star
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export function DashboardHome() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.3%",
      isPositive: true,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Website Visits",
      value: "1,234",
      change: "+5.2%",
      isPositive: true,
      icon: Eye,
      description: "this month"
    },
    {
      title: "Active Products",
      value: "23",
      change: "+2",
      isPositive: true,
      icon: ShoppingCart,
      description: "total items"
    },
    {
      title: "Customer Messages",
      value: "8",
      change: "3 new",
      isPositive: true,
      icon: MessageCircle,
      description: "unread"
    }
  ];

  const recentActivities = [
    { action: "New order received", time: "2 minutes ago", status: "success" },
    { action: "Website visitor from QR code", time: "15 minutes ago", status: "info" },
    { action: "Product inventory updated", time: "1 hour ago", status: "warning" },
    { action: "Customer message received", time: "3 hours ago", status: "info" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl">
            Your business is growing! Here's what's happening with your digital storefront and sales performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Globe className="w-4 h-4 mr-2" />
              Build New Website
            </Button>
            <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              View Analytics
            </Button>
          </div>
        </div>
        <img 
          src={dashboardHero} 
          alt="Dashboard Hero" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`flex items-center gap-1 ${stat.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {stat.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card hover:shadow-medium transition-smooth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              Create New Website
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Check Messages
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card hover:shadow-medium transition-smooth">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' :
                      'bg-primary'
                    }`} />
                    <span className="text-sm font-medium">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Status */}
      <Card className="bg-card hover:shadow-medium transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Your Websites
            </span>
            <Badge variant="secondary">2 Active</Badge>
          </CardTitle>
          <CardDescription>
            Manage your active business websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gradient-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Main Business Site</h4>
                <Badge variant="default" className="bg-success text-success-foreground">Live</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Restaurant & Catering Services
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>👁️ 234 views</span>
                <span>🔗 breakeven.com/resto</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Promo Landing</h4>
                <Badge variant="outline">Draft</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Holiday Special Campaign
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>👁️ 0 views</span>
                <span>🔗 Not published</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}