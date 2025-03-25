"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box,
  Text,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Checkbox,
  IconButton,
  ModalFooter,
  Select
} from "@chakra-ui/react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContestantTable = () => {
  const [contestants, setContestants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterAge, setFilterAge] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();

  const cancelRef = useRef();

  useEffect(() => {
    fetchContestants();
  }, []);

  useEffect(() => {
    filterByDate();
  }, [filterAge, startDate, endDate, contestants]);

  const fetchContestants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contestant");
      const data = await res.json();
      setContestants(data);
      setFilteredData(data);
    } catch (err) {
      toast.error("Failed to fetch contestants");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = contestants.filter((c) =>
      [c.name, c.email, c.phone, c.stateOfOrigin].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      await fetch(`/api/contestant?ids=${selectedIds.join(",")}`, {
        method: "DELETE"
      });
      toast.success("Selected contestants deleted");
      fetchContestants();
      setSelectedIds([]);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/contestant?id=${deleteId}`, {
        method: "DELETE"
      });
      toast.success("Contestant deleted");
      fetchContestants();
      setDeleteId(null);
      onDeleteClose();
    } catch (err) {
      toast.error("Failed to delete contestant");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch("/api/contestant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });
      if (!res.ok) throw new Error();
      toast.success("Contestant updated");
      onEditClose();
      fetchContestants();
    } catch (err) {
      toast.error("Failed to update contestant");
    }
  };

  const filterByDate = () => {
    let result = contestants;
  
    // Filter by date if both dates are selected
    if (startDate && endDate) {
      result = result.filter((c) => {
        const date = new Date(c.createdAt);
        return date >= startDate && date <= endDate;
      });
    }
  
    // Filter by age if selected
    if (filterAge) {
      result = result.filter((c) => String(c.age) === String(filterAge));
    }
  
    setFilteredData(result);
  };
  
  

  

  const exportHeaders = Object.keys(contestants[0] || {}).map((key) => ({
    label: key,
    key: key
  }));

  

  const overview = [
    {
      title: "Total Contestant",
      value: filteredData.length,
    },
  ];

  return (
    <Box className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Contestant</h3>
      </div>

      <div>
        <div className="grid md:grid-cols-4 gap-3">
          {overview.map((item, index) => (
            <div
              key={index}
              className="space-y-2 p-4 rounded-md border-2 bg-white shadow-sm"
            >
              <h6 className="text-gray-600">{item.title}</h6>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <Box className="flex flex-col md:flex-row justify-between gap-3">
        <Box className="flex items-center border px-3 py-2 rounded-lg w-1/2 md:w-1/3">
          <BsSearch className="text-gray-400" />
          <Input
            placeholder="Search contestants"
            variant="unstyled"
            ml={2}
            value={searchQuery}
            onChange={handleSearch}
            className="border-0"
          />
        </Box>


        <Box className="flex gap-2 items-center">
        <Select
          placeholder="Filter by Age"
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
        >
          {[...Array(15)].map((_, i) => (
            <option key={i + 18} value={i + 18}>{i + 18}</option>
          ))}
        </Select>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="p-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="p-2 border rounded"
          />
          <Button onClick={filterByDate}>Filter</Button>
        </Box>
      </Box>

      <Box className="flex flex-wrap gap-2">
        <Button
          colorScheme="red"
          onClick={handleBulkDelete}
          disabled={!selectedIds.length}
        >
          Delete Selected
        </Button>
        <CSVLink data={filteredData} headers={exportHeaders} filename="all-contestants.csv">
          <Button>Export All</Button>
        </CSVLink>
        <CSVLink
          data={contestants.filter((c) => selectedIds.includes(c._id))}
          headers={exportHeaders}
          filename="selected-contestants.csv"
        >
          <Button disabled={!selectedIds.length}>Export Selected</Button>
        </CSVLink>
      </Box>

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Age</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((c, index) => (
              <Tr key={c._id}>
                <Td>
                  <Checkbox
                    isChecked={selectedIds.includes(c._id)}
                    onChange={() => handleSelect(c._id)}
                  />
                </Td>
                <Td>{c.name}</Td>
                <Td>{c.email}</Td>
                <Td>{c.phone}</Td>
                <Td>{c.age}</Td>
                <Td>
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString("en-GB")
                    : "-"}
                </Td>
                <Td>
                <Menu>
                    <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} size="sm" />
                    <MenuList>
                      <MenuItem as={Link} href={`/superadmin/contestants/${c._id}`}>View</MenuItem>
                      <MenuItem onClick={() => {
                        setEditData(c);
                        onEditOpen();
                      }}>Edit</MenuItem>
                      <MenuItem onClick={() => {
                        setDeleteId(c._id);
                        onDeleteOpen();
                      }} color="red.500">Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contestant Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedContestant && (
              <Stack spacing={3} p={3}>
                {Object.entries(selectedContestant).map(([key, value]) => (
                  <Box key={key}>
                    <Text fontWeight="bold">{key}:</Text>
                    <Text whiteSpace="pre-wrap">{
                      Array.isArray(value) ? value.join(", ") : typeof value === 'boolean' ? value ? "Yes" : "No" : value || "-"
                    }</Text>
                  </Box>
                ))}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this contestant?</ModalBody>
          <ModalFooter>
            <Button ref={cancelRef} onClick={onDeleteClose} mr={3}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contestant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editData && (
              <Stack spacing={3}>
                <Input name="name" value={editData.name || ""} onChange={handleEditChange} placeholder="Name" />
                <Input name="email" value={editData.email || ""} onChange={handleEditChange} placeholder="Email" />
                <Input name="phone" value={editData.phone || ""} onChange={handleEditChange} placeholder="Phone" />
                <Input name="stateOfOrigin" value={editData.stateOfOrigin || ""} onChange={handleEditChange} placeholder="State" />
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onEditClose} mr={3}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleEditSubmit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContestantTable;
