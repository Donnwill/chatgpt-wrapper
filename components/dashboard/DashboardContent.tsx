"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Sample data for charts
const areaChartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 900 },
    { name: "Jul", value: 1100 },
];

const barChartData = [
    { name: "Product A", sales: 4000, revenue: 2400 },
    { name: "Product B", sales: 3000, revenue: 1398 },
    { name: "Product C", sales: 2000, revenue: 9800 },
    { name: "Product D", sales: 2780, revenue: 3908 },
    { name: "Product E", sales: 1890, revenue: 4800 },
];

const pieChartData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
];

// Theme colors matching shadcn/ui
const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"];

export default function DashboardContent() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={areaChartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="name" className="text-muted-foreground" />
                            <YAxis className="text-muted-foreground" />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary)/0.2)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="hsl(var(--primary))"
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={barChartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="name" className="text-muted-foreground" />
                            <YAxis className="text-muted-foreground" />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                            <Legend />
                            <Bar dataKey="sales" fill="hsl(var(--primary))" />
                            <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
} 