'use client';

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Email,
  Phone,
  LocationOn,
  FormatListBulleted,
  DirectionsCarFilled,
  Payment,
} from '@mui/icons-material';

type ProfileProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  totalBookings?: number;
  totalQuotes?: number;
  paymentMethod?: string;
};

export default function ProfileCard({
  name,
  email,
  phone,
  address,
  avatar = '/avatar.png',
  totalBookings = 0,
  totalQuotes = 0,
  paymentMethod = 'Card',
}: ProfileProps) {
  return (
    <Card className="bg-white/80 shadow-md border border-gray-200">
      <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar src={avatar} alt={name} sx={{ width: 80, height: 80 }} />

        <div className="flex-1 space-y-2 w-full">
          <Typography variant="h6" className="text-primary">
            {name}
          </Typography>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Email fontSize="small" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone fontSize="small" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <LocationOn fontSize="small" />
            <span>{address}</span>
          </div>

          <Divider className="my-2" />

          <div className="flex flex-wrap gap-4 text-sm text-gray-800 font-medium">
            <div className="flex items-center gap-1">
              <DirectionsCarFilled fontSize="small" />
              Bookings: {totalBookings}
            </div>
            <div className="flex items-center gap-1">
              <FormatListBulleted fontSize="small" />
              Quotes: {totalQuotes}
            </div>
            <div className="flex items-center gap-1">
              <Payment fontSize="small" />
              Payment: {paymentMethod}
            </div>
          </div>
        </div>
      </CardContent>

      <div className="flex justify-end px-6 pb-4">
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          color="primary"
          href="/profile/edit"
        >
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}
