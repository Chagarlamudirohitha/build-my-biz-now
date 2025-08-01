import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  BarChart3
} from "lucide-react";

export default function Analytics() {
  const chartData = [
    { month: "Jan", revenue: 2400, visitors: 240 },
    { month: "Feb", revenue: 1398, visitors: 139 },
    { month: "Mar", revenue: 9800, visitors: 980 },
    { month: "Apr", revenue: 3908, visitors: 390 },
    { month: "May", revenue: 4800, visitors: 480 },
    { month: "Jun", revenue: 3800, visitors: 380 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your business performance and growth
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,231.89</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">+20.1%</span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Website Visitors
            </CardTitle>
            <Eye className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,350</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">+12.5%</span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3.2%</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">+0.3%</span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-medium transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$89.50</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">+5.2%</span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-medium">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Revenue Chart</p>
                <p className="text-xs">Chart.js integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-medium">
          <CardHeader>
            <CardTitle>Visitor Analytics</CardTitle>
            <CardDescription>
              Website traffic and user engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Visitor Chart</p>
                <p className="text-xs">Chart.js integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card className="bg-card shadow-medium">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>
            Where your website visitors are coming from
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { source: "QR Code Scans", visitors: 1250, percentage: 53, color: "bg-primary" },
              { source: "Direct Traffic", visitors: 680, percentage: 29, color: "bg-success" },
              { source: "Social Media", visitors: 280, percentage: 12, color: "bg-warning" },
              { source: "Search Engines", visitors: 140, percentage: 6, color: "bg-destructive" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.visitors} visitors</span>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}