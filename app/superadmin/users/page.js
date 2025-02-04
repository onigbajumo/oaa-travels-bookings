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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const getAccessToken = () => localStorage.getItem("accessToken");

const AddUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const cancelRef = useRef();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    inactive: users.filter((u) => !u.isActive).length,
  };

  const confirmAction = (user, type) => {
    setSelectedUser(user);
    if (type === "deactivate") {
      setIsDeactivateOpen(true);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!res.ok) throw new Error("Failed to deactivate user");
      toast.success("User has been deactivated.");
      setIsDeactivateOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate user");
    }
  };

  const handleAddSubmit = async (values, actions) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
      };
      const res = await fetch("/api/auth/admin-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to invite user");
      toast.success("User invited successfully!");
      setIsAddModalOpen(false);
      actions.resetForm();
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to invite user");
      actions.setSubmitting(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleLabel = (role) => {
    const roleMap = {
      admin: "Admin",
      superadmin: "Superadmin",
      user: "Author",
    };
    return roleMap[role] || role;
  };

  return (
    <div className="space-y-5 p-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Users</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="space-y-2 p-4 rounded-xl border-2">
          <h6 className="text-sm text-gray-500">Total Users</h6>
          <p className="text-xl font-bold">{userStats.total}</p>
        </div>
        <div className="space-y-2 p-4 rounded-xl border-2">
          <h6 className="text-sm text-gray-500">Active</h6>
          <p className="text-xl font-bold">{userStats.active}</p>
        </div>
        <div className="space-y-2 p-4 rounded-xl border-2">
          <h6 className="text-sm text-gray-500">Inactive</h6>
          <p className="text-xl font-bold">{userStats.inactive}</p>
        </div>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search User"
              className="border-none bg-white p-0 w-full rounded-none focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div>
          <button
            className="bg-secondary text-white py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-main-dark transition"
            onClick={() => setIsAddModalOpen(true)}
          >
            <BsPlus className="text-xl" /> Invite User
          </button>
        </div>
      </div>

      <div>
        <TableContainer>
          <Table variant="simple" border="2px solid #e2e8f0" borderRadius="xl">
            <Thead bg="#EEEFF0">
              <Tr>
                <Th width={10}>S/N</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <Tr key={user._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={user.profilePicture || "/images/avatar.png"}
                          name={user.name}
                          size="sm"
                        />
                        <span>{user.name}</span>
                      </div>
                    </Td>
                    <Td>{user.email}</Td>
                    <Td className="capitalize">{getRoleLabel(user.role)}</Td>
                    <Td>
                      {user.isActive ? (
                        <div className="py-1 px-3 flex items-center gap-2 bg-[#EAF6EC] w-fit rounded-full">
                          <span className="text-[#28A745] text-sm">Active</span>
                        </div>
                      ) : (
                        <div className="py-1 px-3 flex items-center gap-2 bg-[#FDEFEC] w-fit rounded-full">
                          <span className="text-[#E5240A] text-sm">
                            Inactive
                          </span>
                        </div>
                      )}
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
                          {user.isActive && (
                            <MenuItem
                              onClick={() => confirmAction(user, "deactivate")}
                            >
                              Deactivate
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} className="text-center">
                    No users found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <AlertDialog
        isOpen={isDeactivateOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeactivateOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deactivate User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to deactivate this user?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeactivateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="yellow"
                onClick={() => handleDeactivate(selectedUser._id)}
                ml={3}
              >
                Deactivate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
              }}
              validationSchema={AddUserSchema}
              onSubmit={handleAddSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormControl isInvalid={errors.name && touched.name} mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.email && touched.email} mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    width="full"
                  >
                    Invite User
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersPage;
