"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
  Text,
  Stack,
  Button,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Page() {
  
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);
  const cancelRef = useRef();

  
  useEffect(() => {
    fetchEnrollments();
  }, []);

  
  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/enroll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch enrollments");
      const data = await response.json();

      
      setEnrollments(data.reverse());
    } catch (error) {
      console.error("Fetch Enrollments Error:", error);
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  
  const totalEnrollments = enrollments.length;
  const pendingCount = enrollments.filter((e) => e.status === "pending").length;
  const rejectedCount = enrollments.filter((e) => e.status === "rejected").length;
  const confirmedCount = enrollments.filter((e) => e.status === "confirmed").length;

  
  const filteredEnrollments = useMemo(() => {
    
    let result = [...enrollments];

    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((en) => {
        
        const fullName = `${en.firstName} ${en.lastName}`.toLowerCase();
        return (
          (fullName.includes(q)) ||
          (en.email && en.email.toLowerCase().includes(q)) ||
          (en.phoneNumber && en.phoneNumber.toLowerCase().includes(q))
        );
      });
    }

    
    if (statusFilter !== "all") {
      result = result.filter((en) => en.status === statusFilter);
    }
    return result;
  }, [enrollments, searchQuery, statusFilter]);

  
  const handleView = async (enrollment) => {
    try {
      
      const response = await fetch(`/api/enroll?id=${enrollment._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch single enrollment details");
      }
      const data = await response.json();
      setSelectedEnrollment(data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Could not load enrollment details");
    }
  };

  const handleCloseViewModal = () => {
    setSelectedEnrollment(null);
    setIsViewModalOpen(false);
  };

  
  const confirmDelete = (id) => {
    setEnrollmentToDelete(id);
    onDeleteOpen();
  };

  
  const handleDelete = async () => {
    if (!enrollmentToDelete) return;
    try {
      const response = await fetch(`/api/enroll?id=${enrollmentToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting enrollment: ${response.statusText}`);
      }
      setEnrollments((prev) =>
        prev.filter((c) => c._id !== enrollmentToDelete)
      );
      toast.success("Enrollment deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete enrollment.");
    } finally {
      onDeleteClose();
      setEnrollmentToDelete(null);
    }
  };

  
  return (
    <div className="space-y-5">
      
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Enrollments</h3>
      </div>

      
      <div>
        <div className="grid md:grid-cols-4 gap-3">
          
          <div className="space-y-2 p-4 rounded-xl border-2 bg-white shadow">
            <h6 className="text-gray-600">All Enrollments</h6>
            <p className="text-xl font-bold">{totalEnrollments}</p>
          </div>
          
          <div className="space-y-2 p-4 rounded-xl border-2 bg-white shadow">
            <h6 className="text-gray-600">Pending</h6>
            <p className="text-xl font-bold">{pendingCount}</p>
          </div>
          
          <div className="space-y-2 p-4 rounded-xl border-2 bg-white shadow">
            <h6 className="text-gray-600">Rejected</h6>
            <p className="text-xl font-bold">{rejectedCount}</p>
          </div>
          
          <div className="space-y-2 p-4 rounded-xl border-2 bg-white shadow">
            <h6 className="text-gray-600">Confirmed</h6>
            <p className="text-xl font-bold">{confirmedCount}</p>
          </div>
        </div>
      </div>

      
      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-gray-500" />
            <Input
              placeholder="Search by name, email or phone"
              variant="unstyled"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="p-0 bg-transparent border-none"
            />
          </div>
        </div>

        
        <div>
          <Select
            placeholder="Filter by status"
            width="200px"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="confirmed">Confirmed</option>
          </Select>
        </div>
      </div>

      
      <div>
        {loading ? (
          <p>Loading enrollments...</p>
        ) : (
          <TableContainer>
            <Table
              variant="simple"
              border="2px solid #e2e8f0"
              borderRadius="xl"
            >
              <Thead bg="#EEEFF0">
                <Tr>
                  <Th width={10}>S/N</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredEnrollments.map((en, index) => (
                  <Tr key={en._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {en.firstName} {en.lastName}
                    </Td>
                    <Td>{en.email}</Td>
                    <Td>{en.phoneNumber || "N/A"}</Td>
                    
                    <Td>
                      <span
                        className={`px-3 py-1 text-sm rounded-full border ${
                          en.status === "confirmed"
                            ? "border-green-500 text-green-500"
                            : en.status === "rejected"
                            ? "border-red-500 text-red-500"
                            : "border-yellow-500 text-yellow-500"
                        }`}
                      >
                        {en.status}
                      </span>
                    </Td>
                    <Td>
                      {en.createdAt
                        ? new Date(en.createdAt).toLocaleDateString()
                        : "N/A"}
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<BsThreeDotsVertical />}
                          variant="ghost"
                          aria-label="Options"
                        />
                        <MenuList>
                          <MenuItem onClick={() => handleView(en)}>
                            View enrollment
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* View Enrollment Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enrollment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEnrollment && (
              <Box p={4}>
                {/* Profile Section */}
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  borderBottom="1px solid #ddd"
                  pb={1}
                >
                  Profile
                </Text>
                <Stack spacing={3} mb={5}>
                  <Box>
                    <Text fontWeight="semibold">Name:</Text>
                    <Text>
                      {selectedEnrollment.firstName} {selectedEnrollment.lastName}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Email:</Text>
                    <Text>{selectedEnrollment.email}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Phone Number:</Text>
                    <Text>{selectedEnrollment.phoneNumber || "N/A"}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Gender:</Text>
                    <Text>{selectedEnrollment.gender || "N/A"}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">State:</Text>
                    <Text>{selectedEnrollment.state || "N/A"}</Text>
                  </Box>
                </Stack>

                {/* Course Section */}
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  borderBottom="1px solid #ddd"
                  pb={1}
                >
                  Course
                </Text>
                {selectedEnrollment.course ? (
                  <Stack spacing={3} mb={5}>
                    <Box>
                      <Text fontWeight="semibold">Title:</Text>
                      <Text>{selectedEnrollment.course.title}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Category:</Text>
                      <Text>{selectedEnrollment.course.category}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Tag:</Text>
                      <Text>{selectedEnrollment.course.tag}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Duration:</Text>
                      <Text>{selectedEnrollment.course.duration}</Text>
                    </Box>
                  </Stack>
                ) : (
                  <Text mb={5}>No course data found.</Text>
                )}

                {/* Payment Section */}
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  borderBottom="1px solid #ddd"
                  pb={1}
                >
                  Payment
                </Text>
                <Stack spacing={3}>
                  <Box>
                    <Text fontWeight="semibold">Learning Mode:</Text>
                    <Text>{selectedEnrollment.learningMode}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Payment Plan:</Text>
                    <Text>{selectedEnrollment.paymentPlan}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Price:</Text>
                    <Text>
                      {(() => {
                        if (
                          selectedEnrollment.course &&
                          selectedEnrollment.course.payments
                        ) {
                          // find the matching payment
                          const foundPayment =
                            selectedEnrollment.course.payments.find(
                              (p) =>
                                p.mode.toLowerCase() ===
                                  selectedEnrollment.learningMode.toLowerCase() &&
                                p.plan.toLowerCase() ===
                                  selectedEnrollment.paymentPlan.toLowerCase()
                            );
                          return foundPayment ? foundPayment.price : "N/A";
                        }
                        return "N/A";
                      })()}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  );
}
