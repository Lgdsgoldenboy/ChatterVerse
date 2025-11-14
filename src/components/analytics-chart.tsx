"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Post 1", views: 4000, likes: 2400 },
  { name: "Post 2", views: 3000, likes: 1398 },
  { name: "Post 3", views: 2000, likes: 9800 },
  { name: "Post 4", views: 2780, likes: 3908 },
  { name: "Post 5", views: 1890, likes: 4800 },
  { name: "Post 6", views: 2390, likes: 3800 },
  { name: "Post 7", views: 3490, likes: 4300 },
]

export function AnalyticsChart() {
  return (
    <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Legend />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="likes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
