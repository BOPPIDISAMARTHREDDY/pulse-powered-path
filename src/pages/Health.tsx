
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, LineChart, TrendingUp, Weight, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const mockHealthData = {
  heartRate: [
    { day: "Mon", value: 68 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 75 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 68 },
    { day: "Sat", value: 65 },
    { day: "Sun", value: 67 },
  ],
  weight: [
    { day: "Mon", value: 172.5 },
    { day: "Tue", value: 172.3 },
    { day: "Wed", value: 171.9 },
    { day: "Thu", value: 171.8 },
    { day: "Fri", value: 171.5 },
    { day: "Sat", value: 171.7 },
    { day: "Sun", value: 171.4 },
  ],
  sleep: [
    { day: "Mon", value: 7.2 },
    { day: "Tue", value: 6.8 },
    { day: "Wed", value: 7.5 },
    { day: "Thu", value: 8.0 },
    { day: "Fri", value: 7.3 },
    { day: "Sat", value: 8.5 },
    { day: "Sun", value: 8.7 },
  ]
};

const Health: React.FC = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-8 px-4 md:px-0">Health Monitoring</h1>
        
        <div className="space-y-8 px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="fitness-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Heart className="h-8 w-8 text-fitness-red mb-2" />
                  <h3 className="text-2xl font-semibold mb-1">68 BPM</h3>
                  <p className="text-muted-foreground text-sm">Resting Heart Rate</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="fitness-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Weight className="h-8 w-8 text-fitness-blue mb-2" />
                  <h3 className="text-2xl font-semibold mb-1">171.4 lbs</h3>
                  <p className="text-muted-foreground text-sm">Current Weight</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="fitness-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Activity className="h-8 w-8 text-fitness-green mb-2" />
                  <h3 className="text-2xl font-semibold mb-1">8.2 hrs</h3>
                  <p className="text-muted-foreground text-sm">Last Sleep</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="fitness-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp className="h-8 w-8 text-fitness-yellow mb-2" />
                  <h3 className="text-2xl font-semibold mb-1">2,345</h3>
                  <p className="text-muted-foreground text-sm">Steps Today</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="fitness-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <LineChart className="w-5 h-5 mr-2 text-fitness-primary" /> Health Tracking
              </CardTitle>
              <CardDescription>Monitor your health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="heart" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="heart">Heart Rate</TabsTrigger>
                  <TabsTrigger value="weight">Weight</TabsTrigger>
                  <TabsTrigger value="sleep">Sleep</TabsTrigger>
                </TabsList>
                
                <TabsContent value="heart" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mockHealthData.heartRate}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        formatter={(value: number) => [`${value} bpm`, 'Heart Rate']} 
                        contentStyle={{ borderRadius: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        dot={{ stroke: '#ef4444', strokeWidth: 2, fill: 'white', r: 4 }}
                        activeDot={{ stroke: '#ef4444', strokeWidth: 2, fill: '#ef4444', r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="weight" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mockHealthData.weight}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip 
                        formatter={(value: number) => [`${value} lbs`, 'Weight']} 
                        contentStyle={{ borderRadius: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: 'white', r: 4 }}
                        activeDot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6', r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="sleep" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mockHealthData.sleep}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip 
                        formatter={(value: number) => [`${value} hours`, 'Sleep']} 
                        contentStyle={{ borderRadius: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ stroke: '#22c55e', strokeWidth: 2, fill: 'white', r: 4 }}
                        activeDot={{ stroke: '#22c55e', strokeWidth: 2, fill: '#22c55e', r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Health;
