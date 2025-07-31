
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Download,
  Upload,
  Trash2,
  Key
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    portfolioUpdates: true,
    marketNews: false,
    socialTrends: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    compactView: false,
    autoRefresh: true,
    soundEffects: false
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <SettingsIcon className="text-primary" size={24} />
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground">
              Customize your ChainAgent experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary" size={20} />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">CryptoTrader</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">user@example.com</span>
                    <Badge variant="secondary">Verified</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Member Since</label>
                  <span className="text-sm text-muted-foreground">December 2023</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="text-primary" size={20} />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when prices hit your targets</p>
                  </div>
                  <Switch 
                    checked={notifications.priceAlerts}
                    onCheckedChange={() => handleNotificationChange('priceAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Portfolio Updates</p>
                    <p className="text-sm text-muted-foreground">Daily portfolio performance summaries</p>
                  </div>
                  <Switch 
                    checked={notifications.portfolioUpdates}
                    onCheckedChange={() => handleNotificationChange('portfolioUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Market News</p>
                    <p className="text-sm text-muted-foreground">Breaking news and market updates</p>
                  </div>
                  <Switch 
                    checked={notifications.marketNews}
                    onCheckedChange={() => handleNotificationChange('marketNews')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Social Trends</p>
                    <p className="text-sm text-muted-foreground">Trending topics and sentiment changes</p>
                  </div>
                  <Switch 
                    checked={notifications.socialTrends}
                    onCheckedChange={() => handleNotificationChange('socialTrends')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-primary" size={20} />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge variant="destructive">Disabled</Badge>
                </div>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Key size={16} />
                  Enable 2FA
                </Button>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="text-primary" size={20} />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch 
                    checked={preferences.darkMode}
                    onCheckedChange={() => handlePreferenceChange('darkMode')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact View</p>
                    <p className="text-sm text-muted-foreground">Show more data in less space</p>
                  </div>
                  <Switch 
                    checked={preferences.compactView}
                    onCheckedChange={() => handlePreferenceChange('compactView')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Refresh</p>
                    <p className="text-sm text-muted-foreground">Automatically update data</p>
                  </div>
                  <Switch 
                    checked={preferences.autoRefresh}
                    onCheckedChange={() => handlePreferenceChange('autoRefresh')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound Effects</p>
                    <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                  </div>
                  <Switch 
                    checked={preferences.soundEffects}
                    onCheckedChange={() => handlePreferenceChange('soundEffects')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="text-primary" size={20} />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">Download your portfolio and transaction history</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Download size={16} />
                    Export Portfolio
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Import Data</p>
                  <p className="text-sm text-muted-foreground">Import transactions from other platforms</p>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Upload size={16} />
                    Import Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 className="text-red-600" size={20} />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Reset All Settings</p>
                  <p className="text-sm text-muted-foreground">Restore all settings to default values</p>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Reset Settings
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About ChainAgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold mb-1">v2.1.0</p>
                <p className="text-sm text-muted-foreground">Current Version</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
