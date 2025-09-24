"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  Box,
  Heading,
  useToast
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";

const getAccessToken = () => localStorage.getItem("accessToken");

const Page = () => {
  const [overviewData, setOverviewData] = useState({
    bookings: 0,
    users: 0,
    apartments: 0,
  });
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAccessToken();
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const [apartmentsRes, usersRes, bookingsRes] = await Promise.all([
          fetch("/api/apartments", { headers }),
          fetch("/api/users", { headers }),
          fetch("/api/bookings", { headers }),
        ]);

        const apartmentData = await apartmentsRes.json();
        const usersData = await usersRes.json();
        const bookingsData = await bookingsRes.json();

        setOverviewData({
          bookings: bookingsData.length,
          users: usersData.length,
          apartments: apartmentData.length,
        });

        // Format resources (apartments)
        const formattedResources = apartmentData.map((apt) => ({
          id: apt._id,
          title: apt.name,
        }));

        // Format events (bookings)
        const formattedEvents = bookingsData.map((b) => ({
          id: b._id,
          resourceId: b.apartment._id,
          title: `${b.fullName} (${b.status})`,
          start: b.checkIn,
          end: b.checkOut,
          color:
            b.status === "accepted"
              ? "#38a169" // green
              : b.status === "pending"
              ? "#dd6b20" // orange
              : "#e53e3e", // red
        }));

        setResources(formattedResources);
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const overview = [
    { title: "Bookings", value: overviewData.bookings, path: "/superadmin/bookings" },
    { title: "Users", value: overviewData.users, path: "/superadmin/users" },
    { title: "Apartments", value: overviewData.apartments, path: "/superadmin/apartments" },
  ];

  return (
    <Box className="space-y-5">
      <Heading size="lg" mb={6}>📊 Admin Dashboard</Heading>

      {/* Overview Cards */}
      <div>
        <div className="grid md:grid-cols-4 gap-3">
          {overview.map((item, index) => (
            <div
              key={index}
              className="space-y-2 p-4 rounded-xl border-2 bg-white shadow"
            >
              <h6 className="text-gray-600">Total {item.title}</h6>
              <p className="text-xl font-bold">{item.value}</p>
              <Link
                href={item.path}
                className="text-secondary hover:underline mt-2 inline-flex gap-1 items-center"
              >
                View {item.title} <MdOutlineArrowOutward className="text-xl" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <Box mt={10}>
        <Heading size="md" mb={4}>📅 Apartment Booking Calendar</Heading>
        <FullCalendar
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimelineMonth"
          resources={resources}
          events={events}
          height="80vh"
          eventClick={(info) => {
            const booking = info.event.extendedProps;
            toast({
              title: "Booking Details",
              description: `${info.event.title}\n${info.event.startStr} → ${info.event.endStr}`,
              status: "info",
              duration: 6000,
              isClosable: true,
            });
          }}
          resourceAreaHeaderContent="Apartments"
        />
      </Box>
    </Box>
  );
};

export default Page;
