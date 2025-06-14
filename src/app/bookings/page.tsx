import BookingList, { status } from "@/components/booking/BookingList";

const mockBookings = [
    {
        id: "1",
        passengerName: "Charlie",
        vehicleType: "Sedan",
        pickupTime: "2025-06-15 08:00 AM",
        returnJourney: true,
        address: "123 Baker Street, London",
        status: status.CONFIRMED,
    },
    {
        id: "2",
        passengerName: "Diana",
        vehicleType: "SUV",
        pickupTime: "2025-06-16 06:30 PM",
        address: "456 Kings Road, Chelsea",
        status: status.PENDING,
    },
    {
        id: "1",
        passengerName: "Charlie",
        vehicleType: "Sedan",
        pickupTime: "2025-06-15 08:00 AM",
        returnJourney: true,
        address: "123 Baker Street, London",
        status: status.CONFIRMED,
    },
    {
        id: "2",
        passengerName: "Diana",
        vehicleType: "SUV",
        pickupTime: "2025-06-16 06:30 PM",
        address: "456 Kings Road, Chelsea",
        status: status.PENDING,
    },
    {
        id: "1",
        passengerName: "Charlie",
        vehicleType: "Sedan",
        pickupTime: "2025-06-15 08:00 AM",
        returnJourney: true,
        address: "123 Baker Street, London",
        status: status.CONFIRMED,
    },
    {
        id: "2",
        passengerName: "Diana",
        vehicleType: "SUV",
        pickupTime: "2025-06-16 06:30 PM",
        address: "456 Kings Road, Chelsea",
        status: status.PENDING,
    },
    {
        id: "1",
        passengerName: "Charlie",
        vehicleType: "Sedan",
        pickupTime: "2025-06-15 08:00 AM",
        returnJourney: true,
        address: "123 Baker Street, London",
        status: status.CONFIRMED,
    },
    {
        id: "2",
        passengerName: "Diana",
        vehicleType: "SUV",
        pickupTime: "2025-06-16 06:30 PM",
        address: "456 Kings Road, Chelsea",
        status: status.PENDING,
    },
    // Add more mock bookings
];

export default function BookingPage() {
    return (
        <div className=" pt-6 max-w-6xl mx-auto h-[calc(100vh-4rem)]">
            <h1 className="text-3xl font-bold text-accent mb-6">Your Bookings</h1>
            <BookingList bookings={mockBookings} />
        </div>
    );
}
