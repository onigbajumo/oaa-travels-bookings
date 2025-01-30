"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffPage = () => {
  // Dummy data for staff
  const initialStaff = [
    {
      _id: "1",
      name: "John Doe",
      position: "Software Engineer",
      image: "https://placehold.co/150.png",
    },
    {
      _id: "2",
      name: "Jane Smith",
      position: "Product Manager",
      image: "https://placehold.co/150.png",
    },
  ];

  const [staff, setStaff] = useState(initialStaff);
  const [loading, setLoading] = useState(false); // No loading needed for dummy data
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    image: null,
    imagePreview: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [currentStaff, setCurrentStaff] = useState({
    name: "",
    position: "",
    image: null,
    imagePreview: "",
  });
  const [currentId, setCurrentId] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [staffToDelete, setStaffToDelete] = useState(null);
  const cancelRef = useRef();

  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Simulate fetching staff (no API call needed)
  useEffect(() => {
    setLoading(false); // Set loading to false immediately
  }, []);

  const handleAddStaff = () => {
    const { name, position, image } = newStaff;

    if (name.trim() === "" || position.trim() === "" || !image) {
      toast.error("All fields are required.");
      setIsAddSubmitting(false);
      return;
    }

    setIsAddSubmitting(true);

    // Simulate adding a new staff member
    const newStaffData = {
      _id: String(staff.length + 1), // Generate a simple ID
      name: name.trim(),
      position: position.trim(),
      image: URL.createObjectURL(image), // Use the image preview URL
    };

    setStaff([newStaffData, ...staff]);
    toast.success(
      `Staff member "${newStaffData.name}" has been added successfully.`
    );
    onClose();
    setNewStaff({
      name: "",
      position: "",
      image: null,
      imagePreview: "",
    });
    setIsAddSubmitting(false);
  };

  const handleEditStaff = () => {
    const { name, position, image, imagePreview } = currentStaff;

    if (
      name.trim() === "" ||
      position.trim() === "" ||
      (!image && !imagePreview)
    ) {
      toast.error("All fields are required.");
      setIsEditSubmitting(false);
      return;
    }

    setIsEditSubmitting(true);

    // Simulate updating a staff member
    const updatedStaff = {
      _id: currentId,
      name: name.trim(),
      position: position.trim(),
      image: image ? URL.createObjectURL(image) : imagePreview,
    };

    const updatedStaffList = staff.map((s) =>
      s._id === currentId ? updatedStaff : s
    );

    setStaff(updatedStaffList);
    toast.success(
      `Staff member "${updatedStaff.name}" has been updated successfully.`
    );
    handleCloseEditModal();
    setIsEditSubmitting(false);
  };

  const handleDeleteStaff = () => {
    if (staffToDelete) {
      // Simulate deleting a staff member
      const updatedStaffList = staff.filter((s) => s._id !== staffToDelete);
      setStaff(updatedStaffList);
      toast.info("Staff member has been deleted successfully.");
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (staffMember, id) => {
    setCurrentStaff({
      name: staffMember.name,
      position: staffMember.position,
      image: null,
      imagePreview: staffMember.image,
    });
    setCurrentId(id);
    onEditOpen();
  };

  const handleCloseEditModal = () => {
    setCurrentStaff({
      name: "",
      position: "",
      image: null,
      imagePreview: "",
    });
    setCurrentId(null);
    onEditClose();
  };

  const confirmDeleteStaff = (id) => {
    setStaffToDelete(id);
    onDeleteOpen();
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStaff({
        ...newStaff,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentStaff({
        ...currentStaff,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Staff Members</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search Staff"
              className="border-none bg-white p-0 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            leftIcon={<BsPlus />}
            colorScheme="blue"
            onClick={onOpen}
            className="flex items-center gap-2"
          >
            Add Staff
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {loading ? (
          <p>Loading staff members...</p>
        ) : filteredStaff.length === 0 ? (
          <p>No staff members match your search.</p>
        ) : (
          filteredStaff.map((staffMember) => (
            <div
              key={staffMember._id}
              className="flex justify-between md:items-center p-4 md:p-7 rounded-xl border-2"
            >
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Avatar
                  size="lg"
                  src={staffMember.image}
                  name={staffMember.name}
                  className="rounded-full"
                />
                <div>
                  <div className="text-gray-800 text-lg font-semibold">
                    {staffMember.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {staffMember.position}
                  </div>
                </div>
              </div>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleOpenEditModal(staffMember, staffMember._id)
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-red-600 hover:text-white"
                    onClick={() => confirmDeleteStaff(staffMember._id)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ))
        )}
      </div>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewStaff({
            name: "",
            position: "",
            image: null,
            imagePreview: "",
          });
          setIsAddSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Staff Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="staff-name"
              isRequired
              isInvalid={isAddSubmitting && newStaff.name.trim() === ""}
              mb={4}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                value={newStaff.name}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, name: e.target.value })
                }
              />
              {isAddSubmitting && newStaff.name.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="staff-position"
              isRequired
              isInvalid={isAddSubmitting && newStaff.position.trim() === ""}
              mb={4}
            >
              <FormLabel>Position</FormLabel>
              <Input
                placeholder="Enter position"
                value={newStaff.position}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, position: e.target.value })
                }
              />
              {isAddSubmitting && newStaff.position.trim() === "" && (
                <FormErrorMessage>Position is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="staff-image"
              isRequired
              isInvalid={isAddSubmitting && !newStaff.image}
            >
              <FormLabel>Staff Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAddImageChange}
              />
              {newStaff.imagePreview && (
                <Image
                  src={newStaff.imagePreview}
                  alt="Staff Preview"
                  boxSize="100px"
                  mt={2}
                  objectFit="cover"
                />
              )}
              {isAddSubmitting && !newStaff.image && (
                <FormErrorMessage>Image is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setNewStaff({
                  name: "",
                  position: "",
                  image: null,
                  imagePreview: "",
                });
                setIsAddSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddStaff}
              isLoading={isAddSubmitting}
            >
              Add Staff
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          handleCloseEditModal();
          setIsEditSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Staff Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="edit-staff-name"
              isRequired
              isInvalid={isEditSubmitting && currentStaff.name.trim() === ""}
              mb={4}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                value={currentStaff.name}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    name: e.target.value,
                  })
                }
              />
              {isEditSubmitting && currentStaff.name.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-staff-position"
              isRequired
              isInvalid={
                isEditSubmitting && currentStaff.position.trim() === ""
              }
              mb={4}
            >
              <FormLabel>Position</FormLabel>
              <Input
                placeholder="Enter position"
                value={currentStaff.position}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    position: e.target.value,
                  })
                }
              />
              {isEditSubmitting && currentStaff.position.trim() === "" && (
                <FormErrorMessage>Position is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="edit-staff-image"
              isRequired
              isInvalid={
                isEditSubmitting &&
                !currentStaff.image &&
                !currentStaff.imagePreview
              }
            >
              <FormLabel>Staff Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              {currentStaff.imagePreview && (
                <Image
                  src={currentStaff.imagePreview}
                  alt="Staff Preview"
                  boxSize="100px"
                  mt={2}
                  objectFit="cover"
                />
              )}
              {isEditSubmitting &&
                !currentStaff.image &&
                !currentStaff.imagePreview && (
                  <FormErrorMessage>Image is required.</FormErrorMessage>
                )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                handleCloseEditModal();
                setIsEditSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleEditStaff}
              isLoading={isEditSubmitting}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Staff Member
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this staff member? This action
              cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteStaff} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default StaffPage;