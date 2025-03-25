"use client";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  Stack,
  Image,
  Link as ChakraLink,
  Divider,
  Button,
  Grid,
  GridItem,
  HStack,
  Tag
} from "@chakra-ui/react";
import Link from "next/link";
import { CSVLink } from "react-csv";
import html2pdf from "html2pdf.js";

export default function ContestantDetailPage({ params }) {
  const { id } = params;

  const [contestant, setContestant] = useState(null);
  const [loading, setLoading] = useState(true);
  const exportRef = useRef();

  useEffect(() => {
    if (id) fetchContestant();
  }, [id]);

  const fetchContestant = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/contestant?id=${id}`);
      const data = await res.json();

      // Convert image URLs to base64
      if (data.images && data.images.length > 0) {
        const base64Images = await Promise.all(
          data.images.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          })
        );
        data.images = base64Images;
      }

      setContestant(data);
    } catch (err) {
      console.error("Error fetching contestant:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    const element = exportRef.current;
    const imgs = element.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map((img) => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        });
      })
    );

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `contestant-${contestant.name || "profile"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" }
      })
      .save();
  };

  const exportHeaders = contestant
    ? Object.keys(contestant).map((key) => ({ label: key, key }))
    : [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="lg" />
        <Text mt={2}>Loading contestant data...</Text>
      </Box>
    );
  }

  if (!contestant) {
    return (
      <Box p={8} textAlign="center">
        <Text>No contestant found</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="7xl" mx="auto" bg="gray.50" borderRadius="xl" boxShadow="md">
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Contestant Profile</Heading>
        <HStack spacing={4}>
          <CSVLink
            data={[contestant]}
            headers={exportHeaders}
            filename={`contestant-${contestant.name || "data"}.csv`}
          >
            <Button colorScheme="blue">Export CSV</Button>
          </CSVLink>
          <Button colorScheme="teal" onClick={handleExportPDF}>Export PDF</Button>
          <Link href="/superadmin/contestants">
            <Button variant="outline">← Back</Button>
          </Link>
        </HStack>
      </Box>

      <Divider mb={6} />

      <div ref={exportRef}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          <GridItem>
            <Heading size="md" mb={4}>Photos</Heading>
            <Stack spacing={4}>
              {contestant.images?.length > 0 ? (
                contestant.images.map((base64, i) => (
                  <Image
                    key={i}
                    src={base64}
                    alt={`Contestant image ${i + 1}`}
                    borderRadius="lg"
                    objectFit="cover"
                    w="100%"
                    h="auto"
                    maxH="400px"
                    boxShadow="lg"
                  />
                ))
              ) : (
                <Text>No images uploaded</Text>
              )}
            </Stack>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Box>
                <Heading size="md" mb={2} color="gray.900">Personal Info</Heading>
                <Stack spacing={2} fontSize="md">
                  <Text><strong>Name:</strong> {contestant.name}</Text>
                  <Text><strong>Email:</strong> {contestant.email}</Text>
                  <Text><strong>Phone:</strong> {contestant.phone}</Text>
                  <Text><strong>State of Origin:</strong> {contestant.stateOfOrigin}</Text>
                  <Text><strong>Date of Birth:</strong> {formatDate(contestant.dateOfBirth)}</Text>
                  <Text><strong>Place of Birth:</strong> {contestant.placeOfBirth}</Text>
                  <Text><strong>Height:</strong> {contestant.height}</Text>
                </Stack>
              </Box>

              <Box>
                <Heading size="md" mb={2} color="gray.900">Background & Attributes</Heading>
                <Stack spacing={2} fontSize="md">
                  <Text><strong>Profession:</strong> {contestant.cherishedProfession}</Text>
                  <Text><strong>Best thing about your age:</strong> {contestant.bestThingAboutAge}</Text>
                  <Text><strong>Descriptive Words:</strong> {contestant.descriptiveWords?.join(", ")}</Text>
                  <Text><strong>Favorite Quote:</strong> {contestant.favoriteQuote}</Text>
                  <Text><strong>Life Ambition:</strong> {contestant.lifeAmbition}</Text>
                  <Text><strong>Best Attribute:</strong> {contestant.bestAttribute}</Text>
                  <Text><strong>Embarrassing Moment:</strong> {contestant.embarrassingMoment}</Text>
                </Stack>
              </Box>

              <Box>
                <Heading size="md" mb={2} color="gray.900">Achievements & Goals</Heading>
                <Stack spacing={2} fontSize="md">
                  <Text><strong>Reason for Joining:</strong> {contestant.reasonForJoining}</Text>
                  <Text><strong>Promotion Plan:</strong> {contestant.promotionPlan}</Text>
                  <Text><strong>School Achievements:</strong> {contestant.schoolAchievements}</Text>
                  <Text><strong>Activity Involvements:</strong> {contestant.activityInvolvements}</Text>
                  <Text><strong>Leadership Roles:</strong> {contestant.leadershipRoles}</Text>
                  <Text><strong>Work Experience:</strong> {contestant.workExperience}</Text>
                </Stack>
              </Box>

              <Box>
                <Heading size="md" mb={2} color="gray.900">Submitted</Heading>
                <Text fontSize="md">{formatDate(contestant.createdAt)}</Text>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </div>
    </Box>
  );
}
