import { Card, CardContent } from '@mui/material';
import { FC, JSX } from 'react';


type VehicleTypeProps = {
    icon: JSX.Element;
    title: string;
    description: string;
    color?: string; // Optional color prop for customization
};

const VehicleTypeCard: FC<VehicleTypeProps> = ({ icon, title, description, color }) => (
    <Card className="rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className={`flex items-center gap-4 mb-4 ${color || 'text-accent'}`}>
            <div className="text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <CardContent className="p-0 text-base text-muted-foreground">
            {description}
        </CardContent>
    </Card>
);

export default VehicleTypeCard;
