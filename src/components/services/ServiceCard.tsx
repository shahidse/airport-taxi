import { FC, JSX } from 'react';
import { Card, CardContent } from '@mui/material';

type ServiceProps = {
    icon: JSX.Element;
    title: string;
    description: string;
};

const ServiceCard: FC<ServiceProps> = ({ icon, title, description }) => (
    <Card className="rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4 text-accent">
            <div className="text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <CardContent className="p-0 text-base text-muted-foreground">
            {description}
        </CardContent>
    </Card>
);

export default ServiceCard;
