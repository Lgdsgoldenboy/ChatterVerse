import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, TrendingUp } from "lucide-react";
import { AnalyticsChart } from "@/components/analytics-chart";

const stats = [
    { title: "Total Views", value: "15,234", icon: <Eye className="h-5 w-5 text-muted-foreground" />, change: "+12.5%" },
    { title: "Total Likes", value: "3,892", icon: <Heart className="h-5 w-5 text-muted-foreground" />, change: "+8.1%" },
    { title: "Total Comments", value: "1,109", icon: <MessageCircle className="h-5 w-5 text-muted-foreground" />, change: "+21.3%" },
    { title: "Engagement Rate", value: "28.4%", icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />, change: "+2.2%" },
];


export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Your Analytics Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Content Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <AnalyticsChart />
                </CardContent>
            </Card>
        </div>
    );
}
