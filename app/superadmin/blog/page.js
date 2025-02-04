"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Textarea,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newBlog, setNewBlog] = useState({
    title: "",
    body: "",
    image: null,
    imagePreview: "",
    category: "",
    isFeatured: false,
  });

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const [blogToDeleteIndex, setBlogToDeleteIndex] = useState(null);

  useEffect(() => {
    fetchAllBlogs();
    fetchCategories();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories");
      console.error(error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Error fetching blogs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewBlogModal = () => {
    setIsEditing(false);
    setCurrentBlogIndex(null);
    setNewBlog({
      title: "",
      body: "",
      image: null,
      imagePreview: "",
      category: "",
      isFeatured: false,
    });
    onOpen();
  };

  const handleOpenEditBlogModal = async (index) => {
    try {
      setIsEditing(true);
      setCurrentBlogIndex(index);
      const existing = blogs[index];
      setNewBlog({
        ...existing,
        image: null,
        imagePreview: existing.image,
        category: existing.category._id, 
      });
      onOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const getFinalImage = async () => {
    if (newBlog.image) {
      const base64Str = await toBase64(newBlog.image);
      return base64Str;
    }
    return newBlog.imagePreview;
  };

  const handleAddOrEditBlog = async () => {
    if (!newBlog.title || !newBlog.body || !newBlog.category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const finalImage = await getFinalImage();

      const finalBlogData = {
        title: newBlog.title,
        body: newBlog.body,
        image: finalImage,
        category: newBlog.category,
        isFeatured: newBlog.isFeatured,
      };

      const accessToken = getAccessToken();
      if (!accessToken) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      if (!isEditing) {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(finalBlogData),
        });
        if (!res.ok) throw new Error("Failed to create blog");
        toast.success("Blog added successfully");
        onClose();
        fetchAllBlogs();
      } else {
        const existingBlog = blogs[currentBlogIndex];
        if (!existingBlog._id) {
          toast.error("Cannot edit. Missing blog ID");
          return;
        }
        finalBlogData.id = existingBlog._id;
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(finalBlogData),
        });
        if (!res.ok) throw new Error("Failed to update blog");
        toast.success("Blog updated successfully");
        onClose();
        fetchAllBlogs();
      }
    } catch (err) {
      toast.error("Error saving blog");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = (index) => {
    setBlogToDeleteIndex(index);
    onDeleteOpen();
  };

  const confirmDeleteBlog = async () => {
    if (blogToDeleteIndex == null) return;
    const blog = blogs[blogToDeleteIndex];
    if (!blog._id) {
      toast.error("Cannot delete. Missing ID");
      onDeleteClose();
      return;
    }
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      const res = await fetch(`/api/blogs?id=${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      toast.success("Blog deleted successfully");
      onDeleteClose();
      fetchAllBlogs();
    } catch (err) {
      toast.error("Error deleting blog");
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Blogs Management</h3>
      </div>

      <div className="flex justify-between md:items-center gap-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg border-2 p-2 flex items-center gap-2">
            <BsSearch className="text-xl text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search Blogs"
              className="border-none bg-white p-0 w-full rounded-none"
            />
          </div>
        </div>
        <Button
          colorScheme="blue"
          leftIcon={<BsPlus />}
          onClick={handleOpenNewBlogModal}
        >
          Add Blog
        </Button>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="flex flex-col gap-3 mt-5">
          {blogs.map((blog, index) => (
            <div key={blog._id || index} className="border-2 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Image src={blog.image} boxSize="100px" objectFit="cover" />
                  <div>
                    <h4 className="text-lg font-semibold">{blog.title}</h4>
                    <p className="text-sm text-gray-500">
                      {blog.category?.name}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`${
                          blog.isFeatured
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        } px-2 py-1 rounded`}
                      >
                        {blog.isFeatured ? "Featured" : "Not Featured"}
                      </span>
                    </div>
                  </div>
                </div>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDotsVertical />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleOpenEditBlogModal(index)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteBlog(index)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this blog? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteBlog} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Blog" : "Add New Blog"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <FormControl isRequired>
              <FormLabel>Blog Title</FormLabel>
              <Input
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                value={newBlog.category}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Body</FormLabel>
              <Textarea
                value={newBlog.body}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, body: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Featured</FormLabel>
              <Checkbox
                isChecked={newBlog.isFeatured}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, isFeatured: e.target.checked })
                }
              >
                Mark as Featured
              </Checkbox>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Blog Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setNewBlog({
                    ...newBlog,
                    image: file,
                    imagePreview: URL.createObjectURL(file),
                  });
                }}
              />
              {newBlog.imagePreview && (
                <Image src={newBlog.imagePreview} boxSize="100px" mt={2} />
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleAddOrEditBlog}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Saving"
                  : "Creating"
                : isEditing
                ? "Save Changes"
                : "Create Blog"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
