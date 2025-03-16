import { useState } from "react";
import { fetchAllNamesAndData, fetchDataById, postData, updateData } from "../api";

export default function Practice() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", year: "", price: "", cpuModel: "", hardDiskSize: "" });
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showFetchByIdForm, setShowFetchByIdForm] = useState(false);

  const handleFetchAll = async () => {
    const data = await fetchAllNamesAndData();
    setItems(data);
  };

  const handleFetchById = async () => {
    const data = await fetchDataById(formData.id);
    setItems(data);
  };

  const handleSubmit = async () => {
    const newItem = await postData(formData);
    if (newItem) {
      setItems([...items, newItem]);
      setShowForm(false);
    }
  };

  const handleUpdate = async () => {
    const success = await updateData(formData.id, formData);
    if (success) {
      setShowUpdateForm(false);
      handleFetchAll();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 pt-[300px] pb-[200px] mb-[50px] max-w-lg mx-auto text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-2xl mt-12 border border-gray-300">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">REST API Integration</h1>
      <div className="space-x-4 mb-6">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all" onClick={() => { setShowForm(false); setShowUpdateForm(false); setShowFetchByIdForm(false); handleFetchAll(); }}>Fetch Data</button>
        <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-all" onClick={() => { setShowForm(false); setShowUpdateForm(false); setShowFetchByIdForm(true); setItems([]); }}>Fetch Data by ID</button>
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all" onClick={() => { setShowForm(true); setShowUpdateForm(false); setShowFetchByIdForm(false); setItems([]); }}>Post Data</button>
        <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all" onClick={() => { setShowForm(false); setShowUpdateForm(true); setShowFetchByIdForm(false); setItems([]); }}>Update Data</button>
      </div>
      {showFetchByIdForm && (
        <div className="mb-6 space-y-4">
          <input type="text" name="id" placeholder="Enter ID" value={formData.id} onChange={handleChange} className="w-full p-3 border rounded" />
          <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-600 transition-all" onClick={handleFetchById}>Fetch by ID</button>
        </div>
      )}
      {(showForm || showUpdateForm) && (
        <div className="mb-6 space-y-4">
          {showUpdateForm && <input type="text" name="id" placeholder="Enter ID" value={formData.id} onChange={handleChange} className="w-full p-3 border rounded" />}
          {["name", "year", "price", "cpuModel", "hardDiskSize"].map((field) => (
            <input key={field} type="text" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={formData[field]} onChange={handleChange} className="w-full p-3 border rounded" />
          ))}
          <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-600 transition-all" onClick={showUpdateForm ? handleUpdate : handleSubmit}>{showUpdateForm ? "Submit Update" : "Submit Data"}</button>
        </div>
      )}
      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-300 text-left hover:shadow-xl transition-all">
            <p className="text-lg font-extrabold text-gray-900">Name: {item.name}</p>
            <pre className="mt-4 p-5 bg-gray-200 rounded-xl overflow-auto text-sm text-gray-800 border border-gray-400">{JSON.stringify(item.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

