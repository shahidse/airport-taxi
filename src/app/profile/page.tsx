import ProfileCard from '@/components/profile/ProfileCard';
import { Typography } from '@mui/material';

export default function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 1234 567890',
    address: '123 Baker Street, London',
    totalBookings: 12,
    totalQuotes: 18,
    paymentMethod: 'Visa Card',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-20">
      <Typography variant="h4" className="text-accent font-bold mb-6">
        My Profile
      </Typography>
      <ProfileCard {...user} />
    </div>
  );
}
