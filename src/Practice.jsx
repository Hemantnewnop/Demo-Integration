import { useState } from "react";
import axios from "axios";

export default function Practice() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    price: "",
    cpuModel: "",
    hardDiskSize: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [idInput, setIdInput] = useState("");
  const apiUrl = "https://api.restful-api.dev/objects";

  const fetchAllNamesAndData = async () => {
    try {
      const res = await axios.get(apiUrl);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]);
    }
  };

  const fetchFilteredData = async () => {
    if (!idInput.trim()) return;
    const ids = idInput.split(",").map((id) => `id=${id.trim()}`).join("&");
    try {
      const res = await axios.get(`${apiUrl}?${ids}`);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setItems([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const newItem = {
        name: formData.name,
        data: {
          year: formData.year,
          price: formData.price,
          cpuModel: formData.cpuModel,
          hardDiskSize: formData.hardDiskSize,
        },
      };
      const res = await axios.post(apiUrl, newItem);
      setItems([...items, res.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 pt-[300px] pb-[200px] mb-[50px] max-w-lg mx-auto text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-2xl mt-12 border border-gray-300">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">REST API Integration</h1>
      <div className="space-x-2">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          onClick={fetchAllNamesAndData}
        >
          Fetch Data 
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
          onClick={() => setShowForm(true)}
        >
          Post Data
        </button>
      </div>
      
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter IDs (e.g. 3,5,10)"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          className="p-2 border rounded w-2/3"
        />
        <button
          className="ml-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition-all"
          onClick={fetchFilteredData}
        >
          Filter Data
        </button>
      </div>
      
      {showForm && (
        <div className="mb-6 space-y-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded" />
          <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-3 border rounded" />
          <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded" />
          <input type="text" name="cpuModel" placeholder="CPU Model" value={formData.cpuModel} onChange={handleChange} className="w-full p-3 border rounded" />
          <input type="text" name="hardDiskSize" placeholder="Hard Disk Size" value={formData.hardDiskSize} onChange={handleChange} className="w-full p-3 border rounded" />
          <button
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-600 transition-all"
            onClick={handleSubmit}
          >
            Submit Data
          </button>
        </div>
      )}
      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-300 text-left hover:shadow-xl transition-all">
            <p className="text-lg font-extrabold text-gray-900">Name: {item.name}</p>
            <pre className="mt-4 p-5 bg-gray-200 rounded-xl overflow-auto text-sm text-gray-800 border border-gray-400">
              {JSON.stringify(item.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
