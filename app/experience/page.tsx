import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This is a placeholder for the settings page. In a real application,
                            you would implement user settings, application configuration, and other
                            customization options here.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            For the coding challenge, focus on implementing the ChatGPT widget as
                            described in the requirements.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
} 