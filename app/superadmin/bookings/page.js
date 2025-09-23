"use client";
import { useState, useEffect, useRef } from "react";
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, Badge,
  useToast, AlertDialog, AlertDialogOverlay,
  AlertDialogContent, AlertDialogHeader, AlertDialogBody,
  AlertDialogFooter
} from "@chakra-ui/react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [actionBooking, setActionBooking] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const cancelRef = useRef();

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  }

  async function confirmAction() {
  if (!actionBooking || !actionType) return;
  setIsLoading(true);

  try {
    const res = await fetch(`/api/bookings?id=${actionBooking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: actionType }), // <-- pass action in body
    });

    const data = await res.json();
    if (res.ok) {
      toast({
        title: `Booking ${actionType}ed successfully`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchBookings();
    } else {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Failed to update booking",
      status: "error",
    });
  } finally {
    setIsLoading(false);
    setActionBooking(null);
    setActionType(null);
  }
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Apartment</Th>
            <Th>Dates</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((b) => (
            <Tr key={b._id}>
              <Td>{b.fullName}</Td>
              <Td>{b.apartment?.name}</Td>
              <Td>{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</Td>
              <Td>
                <Badge
                  colorScheme={
                    b.status === "pending"
                      ? "yellow"
                      : b.status === "accepted"
                      ? "green"
                      : "red"
                  }
                >
                  {b.status}
                </Badge>
              </Td>
              <Td>
                {b.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      colorScheme="green"
                      mr={2}
                      onClick={() => {
                        setActionBooking(b);
                        setActionType("accept");
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setActionBooking(b);
                        setActionType("reject");
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={!!actionBooking}
        leastDestructiveRef={cancelRef}
        onClose={() => setActionBooking(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm {actionType === "accept" ? "Acceptance" : "Rejection"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to {actionType} this booking for{" "}
              <strong>{actionBooking?.fullName}</strong> at{" "}
              <strong>{actionBooking?.apartment?.name}</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setActionBooking(null)}>
                Cancel
              </Button>
              <Button
                colorScheme={actionType === "accept" ? "green" : "red"}
                onClick={confirmAction}
                ml={3}
                isLoading={isLoading}
              >
                {actionType === "accept" ? "Accept" : "Reject"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
