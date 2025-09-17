// File: app/admin/dashboard/page.jsx

"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  Spinner,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [counts, setCounts] = useState([]);
  const [type, setType] = useState("daily");
  const [chartType, setChartType] = useState("line");
  const [recent, setRecent] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [filterAge, setFilterAge] = useState("");

  useEffect(() => {
    fetchStats(type);
    fetchRecent();
  }, [type]);

  useEffect(() => {
    applyFilters();
  }, [filterState, filterAge, recent]);

  const fetchStats = async (rangeType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contestant/stats?type=${rangeType}`);
      const json = await res.json();
      setLabels(json.labels);
      setCounts(json.counts);
      const formatted = json.labels.map((label, i) => ({ name: label, count: json.counts[i] }));
      setData(formatted);
    } catch (err) {
      console.error("Error loading stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecent = async () => {
    try {
      const res = await fetch("/api/contestant");
      const json = await res.json();
      const recent = json.slice(0, 20);
      setRecent(recent);
    } catch (err) {
      console.error("Error fetching recent:", err);
    }
  };

  const applyFilters = () => {
    let filteredData = recent;
    // if (filterState) {
    //   filteredData = filteredData.filter((c) => c.stateOfOrigin?.toLowerCase() === filterState.toLowerCase());
    // }
    if (filterAge) {
      filteredData = filteredData.filter((c) => String(c.age) === filterAge);
    }
    setFiltered(filteredData);
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3182CE" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#3182CE" fill="#bee3f8" />
          </AreaChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3182CE" strokeWidth={3} />
          </LineChart>
        );
    }
  };

  const exportHeaders = labels.map((label) => ({
    label: String(label),
    key: label,
  }));
  
  const csvData = [
    Object.fromEntries(labels.map((label, i) => [label, counts[i]])),
  ];
  
  

//   const exportHeaders = Object.keys(contestants[0] || {}).map((key) => ({
//     label: key,
//     key: key
//   }));
  
//   const csvData = [Object.fromEntries(labels.map((label, i) => [label, counts[i]]))];

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableData = filtered.map((item, index) => [
      index + 1,
      item.name,
      item.email,
      item.stateOfOrigin,
      new Date(item.createdAt).toLocaleDateString(),
    ]);

    doc.text("Recent Contestant Registrations", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["S/N", "Name", "Email", "State", "Date"]],
      body: tableData,
    });
    doc.save("contestant-registrations.pdf");
  };

  return (
    <Box p={6}>
      

      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={4}>
        <Heading size="md">📈 Registration Stats</Heading>
        <HStack>
          <Select width="300px" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="hourly">Today (Hourly)</option>
            <option value="daily">Last 7 Days</option>
            <option value="weekly">Last 4 Weeks</option>
            <option value="monthly">Last 12 Months</option>
            <option value="yearly">Last 5 Years</option>
          </Select>
          <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="area">Area</option>
          </Select>
          {/* <CSVLink data={csvData} headers={exportHeaders} filename="stats.csv">
            <Button colorScheme="blue">Export CSV</Button>
          </CSVLink>
        <Button colorScheme="red" onClick={exportPDF}>Export PDF</Button> */}
        </HStack>
      </Flex>

      <Box p={4} bg="white" borderRadius="lg" shadow="md">
        {loading ? (
          <Flex justify="center" align="center" h="300px">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        )}
      </Box>

      <Box mt={10}>
        <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
          <Heading size="md">🕒 Recent Registrations</Heading>
          <HStack>
            
            <Select
              placeholder="Filter by Age"
              size="sm"
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
            >
              {[...Array(15)].map((_, i) => (
                <option key={i + 18} value={i + 18}>{i + 18}</option>
              ))}
            </Select>
            {/* <Button size="sm" colorScheme="red" onClick={exportPDF}>Export PDF</Button> */}
          </HStack>
        </Flex>

        {/* <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Registered</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((c, i) => (
                <Tr key={c._id}>
                  <Td>{i + 1}</Td>
                  <Td>{c.name}</Td>
                  <Td>{c.email}</Td>
                  <Td>{c.age}</Td>
                  <Td>{new Date(c.createdAt).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box> */}
      </Box>
    </Box>
  );
}