import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TestTubeDiagonal } from 'lucide-react';
const userData = [
    {
        id: 1,
        weight: 30,
        height: 100,
        vlDate: '23rd dec 2023',
        vlResults: 'LDL'
    },
    {
        id: 2,
        weight: 35,
        height: 102,
        vlDate: '23rd march 2024',
        vlResults: 'LDL'
    }
]

const Charts = () => {
    const [weightData, setWeightData] = useState({});
    const [vlData, setVlData] = useState({});

    useEffect(() => {
        if (userData.length > 0) {
            // Prepare data for weight and VL charts
            const weightData = {
                labels: [],
                datasets: [
                    {
                        label: 'Weight (kg)',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            };
    
            const vlData = {
                labels: [],
                datasets: [
                    {
                        label: 'VL Results (1 for LDL)',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            };
    
            userData.forEach(user => {
                weightData.labels.push(user.vlDate);
                weightData.datasets[0].data.push(user.weight);
    
                vlData.labels.push(user.vlDate);
                vlData.datasets[0].data.push(user.vlResults === 'LDL' ? 1 : 0);
            });
    
            setWeightData(weightData);
            setVlData(vlData);
        }
    }, [userData]);
    
    return (
        <div className="charts-container">
            <Card>
                <CardHeader className="grid gap-1">
                    <div className="flex items-center space-x-4">
                        <TestTubeDiagonal className="align-self-start" />
                        <CardTitle className="text-center font-bold">Viral Load Trends</CardTitle>
                    </div>
                    <CardDescription className="text-sm font-semibold">
                        <Line data={vlData} options={{ responsive: true }} />
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="grid gap-1">
                    <div className="flex items-center space-x-4">
                        <TestTubeDiagonal className="align-self-start" />
                        <CardTitle className="text-center font-bold">Weight Trends</CardTitle>
                    </div>
                    <CardDescription className="text-sm font-semibold">
                        <Line data={weightData} options={{ responsive: true }} />
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default Charts;