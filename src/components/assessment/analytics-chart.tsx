"use client";
import React, { useState, useEffect } from 'react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from 'recharts';
import {
  Clock, Users, CheckCircle, AlertCircle, TrendingUp, BookOpen,
  Award, BarChart2, PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";

// Define types for our data structures
interface StatItem {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  color: string;
  bgColor: string;
}

interface AnalyticsItem {
  name: string;
  avgScore: number;
  completion: number;
  difficulty: number;
}

interface MonthlyProgressItem {
  name: string;
  average: number;
}

interface SubjectItem {
  name: string;
  performance: number;
  students: number;
  improvement: string;
  topScore: number;
  avgAssignmentCompletion: number;
}

interface ClassItem {
  name: string;
  performance: number;
  students: number;
  attendance: number;
  highestPerformer: string;
  lowestPerformer: string;
}

interface SkillDataItem {
  subject: string;
  A: number;
  B: number;
  C: number;
  D: number;
  fullMark: number;
}

interface GradeDistributionItem {
  name: string;
  value: number;
  color: string;
}

interface ColorSet {
  bar: string;
  text: string;
  light: string;
}

const Dashboard = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const analyticsData: AnalyticsItem[] = [
    { name: 'Quiz 1', avgScore: 85, completion: 95, difficulty: 0.7 },
    { name: 'Quiz 2', avgScore: 78, completion: 88, difficulty: 0.8 },
    { name: 'Quiz 3', avgScore: 92, completion: 91, difficulty: 0.5 },
    { name: 'Quiz 4', avgScore: 71, completion: 85, difficulty: 0.9 },
    { name: 'Quiz 5', avgScore: 88, completion: 93, difficulty: 0.6 }
  ];

  const monthlyProgress: MonthlyProgressItem[] = [
    { name: 'Jan', average: 65 },
    { name: 'Feb', average: 68 },
    { name: 'Mar', average: 71 },
    { name: 'Apr', average: 75 },
    { name: 'May', average: 78 },
    { name: 'Jun', average: 82 },
    { name: 'Jul', average: 86 },
    { name: 'Aug', average: 88 },
  ];

  const stats: StatItem[] = [
    {
      title: "Average Time",
      value: "12m",
      icon: Clock,
      description: "Per quiz completion",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      description: "Enrolled in course",
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
    },
    {
      title: "Completion Rate",
      value: "90.4%",
      icon: CheckCircle,
      description: "Across all quizzes",
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100"
    },
    {
      title: "Average Difficulty",
      value: "0.7",
      icon: AlertCircle,
      description: "Scale of 0-1",
      color: "text-red-500",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100"
    }
  ];

  const getColorClass = (performance: number): ColorSet => {
    if (performance >= 85) return { bar: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50' };
    if (performance >= 75) return { bar: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' };
    if (performance >= 65) return { bar: 'bg-fuchsia-700', text: 'text-fuchsia-700', light: 'bg-fuchsia-50' };
    return { bar: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50' };
  };

  const subjects: SubjectItem[] = [
    {
      name: 'Mathematics',
      performance: 85,
      students: 158,
      improvement: '+5%',
      topScore: 98,
      avgAssignmentCompletion: 92,
    },
    {
      name: 'Science',
      performance: 70,
      students: 143,
      improvement: '+2%',
      topScore: 95,
      avgAssignmentCompletion: 85,
    },
    {
      name: 'History',
      performance: 92,
      students: 126,
      improvement: '+8%',
      topScore: 100,
      avgAssignmentCompletion: 96,
    },
    {
      name: 'English',
      performance: 65,
      students: 165,
      improvement: '-2%',
      topScore: 88,
      avgAssignmentCompletion: 78,
    }
  ];

  const classes: ClassItem[] = [
    {
      name: 'Class A',
      performance: 88,
      students: 32,
      attendance: 95,
      highestPerformer: 'Sarah Johnson',
      lowestPerformer: 'Alex Smith',
    },
    {
      name: 'Class B',
      performance: 75,
      students: 28,
      attendance: 88,
      highestPerformer: 'Michael Lee',
      lowestPerformer: 'Thomas Brown',
    },
    {
      name: 'Class C',
      performance: 90,
      students: 30,
      attendance: 93,
      highestPerformer: 'Emily Davis',
      lowestPerformer: 'James Wilson',
    },
    {
      name: 'Class D',
      performance: 68,
      students: 31,
      attendance: 82,
      highestPerformer: 'Olivia Martinez',
      lowestPerformer: 'William Taylor',
    }
  ];

  const skillsData: SkillDataItem[] = [
    { subject: 'Problem Solving', A: 85, B: 65, C: 90, D: 55, fullMark: 100 },
    { subject: 'Creativity', A: 70, B: 85, C: 65, D: 75, fullMark: 100 },
    { subject: 'Critical Thinking', A: 90, B: 70, C: 80, D: 60, fullMark: 100 },
    { subject: 'Teamwork', A: 65, B: 90, C: 75, D: 80, fullMark: 100 },
    { subject: 'Communication', A: 80, B: 75, C: 70, D: 85, fullMark: 100 },
  ];

  const gradeDistribution: GradeDistributionItem[] = [
    { name: 'A', value: 35, color: '#4ade80' },
    { name: 'B', value: 25, color: '#facc15' },
    { name: 'C', value: 20, color: '#fb7185' },
    { name: 'D', value: 15, color: '#f43f5e' },
    { name: 'F', value: 5, color: '#dc2626' },
  ];

  return (
    <div className={`p-4 md:p-8 space-y-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 pb-2">
            Educational Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-4">
            Comprehensive insights for optimizing student performance and educational outcomes
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}
              className={`transform transition-all duration-500 hover:scale-105 shadow-xl border-0 overflow-hidden
              ${stat.bgColor} ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</div>
                <p className="text-xs md:text-sm text-gray-500">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Quiz Performance Chart */}
          <Card className={`col-span-1 lg:col-span-2 shadow-xl border-0 transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">Quiz Performance Analytics</CardTitle>
                  <CardDescription>Average scores and completion rates by quiz</CardDescription>
                </div>
                <BarChart2 className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgScore" name="Average Score" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="completion" name="Completion Rate %" stroke="#82ca9d" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
<Card className="shadow-xl border-0 rounded-xl bg-white overflow-hidden transform transition-all duration-500 hover:shadow-2xl" 
      style={{ 
        transitionDelay: '200ms',
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(12px)'
      }}>
  <CardHeader className="pb-2">
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-xl font-bold text-gray-800">Grade Distribution</CardTitle>
        <CardDescription className="text-gray-500">Percentage of students by grade</CardDescription>
      </div>
      <div className="bg-purple-100 p-2 rounded-lg">
        <PieChartIcon className="h-6 w-6 text-purple-600" />
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="h-72 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={gradeDistribution}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            cornerRadius={3}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            animationBegin={animate ? 200 : 9999}
            animationDuration={1200}
            isAnimationActive={true}
          >
            {gradeDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: 'none',
              padding: '8px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.97)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>
        </div>

        {/* Progress Over Time */}
        <Card className={`shadow-xl border-0 mt-8 transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">Progress Over Time</CardTitle>
                <CardDescription>Average student performance trend by month</CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyProgress}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: 'none'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="average"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorAvg)"
                    animationBegin={animate ? 300 : 9999}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Teacher's Overview Section */}
        <div className="mt-12">
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">Teacher Overview</h2>
          </div>

          {/* Skills Radar Chart */}
          <Card className={`shadow-xl border-0 mb-8 transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">Class Skills Comparison</CardTitle>
                  <CardDescription>Comparing key skill areas across classes</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} width={730} height={400} data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Class A" dataKey="A" stroke="#4ade80" fill="#4ade80" fillOpacity={0.4} />
                    <Radar name="Class B" dataKey="B" stroke="#facc15" fill="#facc15" fillOpacity={0.4} />
                    <Radar name="Class C" dataKey="C" stroke="#c026d3" fill="#c026d3" fillOpacity={0.4} />
                    <Radar name="Class D" dataKey="D" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.4} />
                    <Legend />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-700">Subject Performance</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject, index) => {
                const colorSet = getColorClass(subject.performance);
                return (
                  <Card
                    key={index}
                    className={`transform transition-all duration-500 border-0 shadow-lg overflow-hidden ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    style={{ transitionDelay: `${500 + (index * 100)}ms` }}
                  >
                    <CardHeader className={`${colorSet.light}`}>
                      <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                        {subject.name}
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${colorSet.light} ${colorSet.text}`}>
                          {subject.improvement}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Performance</span>
                            <span className={`text-xl font-bold ${colorSet.text}`}>{subject.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`${colorSet.bar} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                              style={{
                                width: animate ? `${subject.performance}%` : '0%',
                                transitionDelay: `${600 + (index * 100)}ms`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Students</p>
                            <p className="font-semibold text-gray-700">{subject.students}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Top Score</p>
                            <p className="font-semibold text-gray-700">{subject.topScore}%</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500">Assignment Completion</p>
                            <p className="font-semibold text-gray-700">{subject.avgAssignmentCompletion}%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Class Performance Section */}
          <div className="space-y-6 mt-12">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-700">Class Performance</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {classes.map((cls, index) => {
                const colorSet = getColorClass(cls.performance);
                return (
                  <Card
                    key={index}
                    className={`transform transition-all duration-500 border-0 shadow-lg overflow-hidden ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    style={{ transitionDelay: `${700 + (index * 100)}ms` }}
                  >
                    <CardHeader className={`${colorSet.light}`}>
                      <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                        {cls.name}
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${colorSet.light} ${colorSet.text}`}>
                          {cls.attendance}% Attendance
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Performance</span>
                            <span className={`text-xl font-bold ${colorSet.text}`}>{cls.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`${colorSet.bar} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                              style={{
                                width: animate ? `${cls.performance}%` : '0%',
                                transitionDelay: `${800 + (index * 100)}ms`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Students</p>
                            <p className="font-semibold text-gray-700">{cls.students}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Highest Performer</p>
                            <p className="font-semibold text-gray-700">{cls.highestPerformer}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Needs Improvement</p>
                            <p className="font-semibold text-gray-700">{cls.lowestPerformer}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pie-chart-3d {
          perspective: 1000px;
        }

        .pie-chart-3d .recharts-pie-sector {
          transition: transform 0.5s ease-in-out;
        }

        .pie-chart-3d .recharts-pie-sector:hover {
          transform: scale(1.1) rotateY(10deg);
        }

        .neumorphic-card {
          background: linear-gradient(145deg, #ffffff, #e6e6e6);
          box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
          border-radius: 12px;
        }

        .neumorphic-card:hover {
          box-shadow: 8px 8px 15px #d9d9d9, -8px -8px 15px #ffffff;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;