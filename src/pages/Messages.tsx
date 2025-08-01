import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Send, Mail, Users, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface EmailCampaign {
  subject: string;
  content: string;
  recipients: string[];
}

export default function Messages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Question about your coffee",
      message: "Hi, I'm interested in your premium coffee beans. Do you offer bulk discounts?",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "2",
      name: "Sarah Smith", 
      email: "sarah@example.com",
      subject: "Catering inquiry",
      message: "Hello, I'm planning an event and would like to know about your catering services.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  ]);

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailCampaign, setEmailCampaign] = useState<EmailCampaign>({
    subject: "",
    content: "",
    recipients: []
  });

  const [customerEmails] = useState([
    "john@example.com",
    "sarah@example.com", 
    "mike@example.com",
    "lisa@example.com"
  ]);

  const markAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleSendEmailCampaign = () => {
    if (!emailCampaign.subject || !emailCampaign.content) {
      toast({
        title: "Error",
        description: "Please fill in subject and content",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending email campaign
    toast({
      title: "Email Campaign Sent!",
      description: `Sent to ${customerEmails.length} recipients`
    });

    setEmailCampaign({ subject: "", content: "", recipients: [] });
    setIsEmailDialogOpen(false);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages & Email</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer messages and send email campaigns
          </p>
        </div>
        <Button onClick={() => setIsEmailDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Mail className="w-4 h-4 mr-2" />
          New Email Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerEmails.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Messages</CardTitle>
          <CardDescription>Messages from your website visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg cursor-pointer transition-smooth hover:shadow-medium ${
                  !message.read ? "bg-accent/50 border-primary/50" : "bg-background"
                }`}
                onClick={() => markAsRead(message.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{message.name}</h4>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.read && (
                      <Badge variant="destructive" className="text-xs">New</Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <h5 className="font-medium mb-1">{message.subject}</h5>
                <p className="text-sm text-muted-foreground">{message.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Campaign Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Email Campaign</DialogTitle>
            <DialogDescription>
              Send updates, promotions, or announcements to your customers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                value={emailCampaign.subject}
                onChange={(e) => setEmailCampaign({ ...emailCampaign, subject: e.target.value })}
                placeholder="e.g., Special Discount - 20% Off This Weekend!"
              />
            </div>
            <div>
              <Label htmlFor="content">Email Content</Label>
              <Textarea
                id="content"
                value={emailCampaign.content}
                onChange={(e) => setEmailCampaign({ ...emailCampaign, content: e.target.value })}
                placeholder="Write your email content here... Include updates, discounts, or special announcements."
                className="min-h-[200px]"
              />
            </div>
            <div>
              <Label>Recipients</Label>
              <div className="mt-2 p-3 bg-accent rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  This email will be sent to all {customerEmails.length} subscribers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {customerEmails.map((email, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {email}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSendEmailCampaign} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Campaign
              </Button>
              <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}