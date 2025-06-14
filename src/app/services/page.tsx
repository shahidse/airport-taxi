'use client';

import ServiceCard from '@/components/services/ServiceCard';
import VehicleTypeCard from '@/components/VehicleTypeCard';

import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { color } from 'framer-motion';

export default function ServicesPage() {
    const services = [
        {
            icon: <LocalTaxiIcon className="text-accent" />,
            title: 'Reliable Airport Transfers',
            description: 'Get safe, punctual rides to and from the airport with professional drivers.',
        },
        {
            icon: <ScheduleIcon className="text-accent" />,
            title: 'Easy Booking & Scheduling',
            description: 'Book in seconds with instant confirmation and flexible pickup times.',
        },
        {
            icon: <SupportAgentIcon className="text-accent" />,
            title: '24/7 Customer Support',
            description: 'Our support team is available round-the-clock to assist you anytime.',
        },
    ];

    const vehicles = [
        {
            icon: <DirectionsCarIcon className="text-primary" />,
            title: 'Standard',
            description: 'Affordable and comfortable cars for everyday airport travel.',
            color: 'text-primary'
        },
        {
            icon: <AirportShuttleIcon className="text-indigo-400" />,
            title: 'Executive',
            description: 'Spacious vehicles for business trips and corporate rides.',
            color: 'text-indigo-400'
        },
        {
            icon: <ElectricCarIcon className="text-purple-500" />,
            title: 'Luxury',
            description: 'Premium electric or luxury class vehicles for top-tier experience.',
            color: 'text-purple-500'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Services Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">Our Services</h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Discover what makes our airport taxi experience seamless and premium.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>

            {/* Vehicle Types Section */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-3">Vehicle Types</h2>
                <p className="text-md md:text-lg text-muted-foreground">
                    Choose the perfect vehicle type for your travel needs.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((vehicle, index) => (
                    <VehicleTypeCard
                        key={index}
                        icon={vehicle.icon}
                        title={vehicle.title}
                        description={vehicle.description}
                        color={vehicle.color}
                    />
                ))}
            </div>
        </div>
    );
}
