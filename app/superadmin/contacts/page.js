"use client";

import React, { useState, useRef, useEffect } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

const Page = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [contactToDelete, setContactToDelete] = useState(null);

  const cancelRef = useRef();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch contact messages");
      const data = await response.json();

      const newData = data.reverse();
      setContactList(newData);
    } catch (error) {
      console.error("Fetch Contacts Error:", error);
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setSelectedContact(null);
    setIsViewModalOpen(false);
  };

  const confirmDelete = (id) => {
    setContactToDelete(id);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    if (!contactToDelete) return;
    try {
      const response = await fetch(`/api/contacts?id=${contactToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting contact: ${response.statusText}`);
      }

      setContactList((prev) => prev.filter((c) => c._id !== contactToDelete));
      toast.success("Contact message deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact message.");
    } finally {
      onDeleteClose();
      setContactToDelete(null);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      fetchContacts();
      return;
    }

    const filtered = contactList.filter(
      (contact) =>
        (contact.name && contact.name.toLowerCase().includes(query)) ||
        (contact.lastName && contact.lastName.toLowerCase().includes(query)) ||
        (contact.email && contact.email.toLowerCase().includes(query)) ||
        (contact.phoneNumber &&
          contact.phoneNumber.toLowerCase().includes(query)) ||
        (contact.projectDetails &&
          contact.projectDetails.toLowerCase().includes(query))
    );
    setContactList(filtered);
  };

  const overview = [
    {
      title: "Total Messages",
      value: contactList.length,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Contact Messages</h3>
      </div>

      <div>
        <div className="grid md:grid-cols-4 gap-3">
          {overview.map((item, index) => (
            <div
              key={index}
              className="space-y-2 p-4 rounded-xl border-2 bg-white shadow"
            >
              <h6 className="text-gray-600">{item.title}</h6>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-gray-500" />
            <Input
              placeholder="Search Messages"
              variant="unstyled"
              onChange={handleSearch}
              className="p-0 bg-transparent border-none"
            />
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <p>Loading contacts...</p>
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
                  <Th>Message</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contactList.map((contact, index) => (
                  <Tr key={contact._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {contact.name} {contact.lastName}
                    </Td>
                    <Td>{contact.email}</Td>
                    <Td>{contact.phoneNumber || "N/A"}</Td>
                    <Td className="truncate">
                      {contact.projectDetails || "N/A"}
                    </Td>
                    <Td>
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleDateString("en-GB")
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
                          <MenuItem onClick={() => handleView(contact)}>
                            View
                          </MenuItem>
                          {/* <MenuItem
                            className="hover:bg-red-600 hover:text-white"
                            onClick={() => confirmDelete(contact._id)}
                          >
                            Delete
                          </MenuItem> */}
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

      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Message Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedContact && (
              <Box p={4}>
                <Stack spacing={3}>
                  <Box>
                    <Text fontWeight="bold">Name:</Text>
                    <Text>
                      {selectedContact.name} {selectedContact.lastName}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{selectedContact.email}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Phone Number:</Text>
                    <Text>{selectedContact.phoneNumber || "N/A"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Message:</Text>
                    <Text whiteSpace="pre-wrap">
                      {selectedContact.projectDetails || "N/A"}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Reasons for Contact:</Text>
                    <Text>
                      {selectedContact.reasonsForContact &&
                      selectedContact.reasonsForContact.length > 0
                        ? selectedContact.reasonsForContact.join(", ")
                        : "N/A"}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Date:</Text>
                    <Text>
                      {selectedContact.createdAt
                        ? new Date(selectedContact.createdAt).toLocaleString()
                        : "N/A"}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Contact Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this contact message? This action
            cannot be undone.
          </ModalBody>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            p={4}
            gap={3}
          >
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
