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

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newCategoryName, setNewCategoryName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [currentId, setCurrentId] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const cancelRef = useRef();

  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to get the access token from localStorage
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/categories", {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`, // Add authorization header
          },
        });
        if (!res.ok) {
          throw new Error(`Error fetching categories: ${res.statusText}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") {
      toast.error("Category name is required.");
      return;
    }

    setIsAddSubmitting(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`, // Add authorization header
        },
        body: JSON.stringify({
          name: newCategoryName.trim(), // Only name is required
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding category: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Create category response:", result);

      await refetchCategories();

      toast.success("Category created successfully!");
      onClose();
      setNewCategoryName("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAddSubmitting(false);
    }
  };

  const refetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Add authorization header
        },
      });
      if (!res.ok) {
        throw new Error(`Error fetching categories: ${res.statusText}`);
      }
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async () => {
    if (currentCategoryName.trim() === "") {
      toast.error("Category name is required.");
      return;
    }

    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() === currentCategoryName.trim().toLowerCase() &&
          category._id !== currentId
      )
    ) {
      toast.error("This category already exists.");
      return;
    }

    setIsEditSubmitting(true);

    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`, // Add authorization header
        },
        body: JSON.stringify({
          id: currentId,
          name: currentCategoryName.trim(), // Only name is required
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating category: ${response.statusText}`);
      }

      const updatedCategory = await response.json();

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === currentId ? updatedCategory : category
        )
      );

      toast.success(`Category "${updatedCategory.name}" has been updated successfully.`);
      handleCloseEditModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(`/api/categories?id=${categoryToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Add authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`Error deleting category: ${response.statusText}`);
      }

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryToDelete)
      );
      toast.info("Category has been deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      onDeleteClose();
    }
  };

  const handleOpenEditModal = (category) => {
    setCurrentCategoryName(category.name);
    setCurrentId(category._id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCategoryName("");
    setCurrentId(null);
  };

  const confirmDeleteCategory = (id) => {
    setCategoryToDelete(id);
    onDeleteOpen();
  };

  const filteredCategories = categories.filter((category) => {
    if (!category.name) return false;

    const q = searchQuery.toLowerCase();
    return category.name.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Categories Management</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search Categories"
              className="border-none bg-white p-0 w-full rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button colorScheme="blue" leftIcon={<BsPlus />} onClick={onOpen}>
            Add Category
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {loading ? (
          <p>Loading categories...</p>
        ) : filteredCategories.length === 0 ? (
          <p>No categories match your search.</p>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-start p-4 md:p-7 rounded-xl border-2"
            >
              <div className="flex-1">
                <h4 className="text-gray-800 text-lg font-semibold">
                  {category.name}
                </h4>
                <p className="text-gray-600 mt-2">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  aria-label="Options"
                />
                <MenuList>
                  <MenuItem onClick={() => handleOpenEditModal(category)}>
                    Edit Details
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-red-600 hover:text-white"
                    onClick={() => confirmDeleteCategory(category._id)}
                  >
                    Delete Category
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewCategoryName("");
          setIsAddSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="category-name"
              isRequired
              isInvalid={isAddSubmitting && newCategoryName.trim() === ""}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              {isAddSubmitting && newCategoryName.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                onClose();
                setNewCategoryName("");
                setIsAddSubmitting(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddCategory}
              isLoading={isAddSubmitting}
            >
              Add Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          handleCloseEditModal();
          setIsEditSubmitting(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="edit-category-name"
              isRequired
              isInvalid={isEditSubmitting && currentCategoryName.trim() === ""}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter new name"
                value={currentCategoryName}
                onChange={(e) => setCurrentCategoryName(e.target.value)}
              />
              {isEditSubmitting && currentCategoryName.trim() === "" && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
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
              onClick={handleEditCategory}
              isLoading={isEditSubmitting}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this category? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCategory} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default CategoriesPage;