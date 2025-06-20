import React from 'react';

const parseCSV = (text) => {
  return text
    .trim()
    .split(/\n+/)
    .map((line) => line.split(','));
};

const InputData = ({ onData }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      let data;
      if (file.type.includes('json')) {
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }
      } else if (file.type.includes('csv') || file.name.endsWith('.csv')) {
        data = parseCSV(text);
      } else {
        data = text;
      }
      onData(data);
    };
    reader.readAsText(file);
  };

  const generateSample = () => {
    const sample = Array.from({ length: 5 }, (_, i) => ({
      label: `Metric ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    }));
    onData(sample);
  };

  const fetchAPIData = () => {
    setTimeout(() => {
      const data = Array.from({ length: 5 }, (_, i) => ({
        label: `API Metric ${i + 1}`,
        value: Math.floor(Math.random() * 100),
      }));
      onData(data);
    }, 1000);
  };

  return (
    <div className="bg-[#1a1f29] rounded-xl p-6 shadow-lg space-y-4">
      <h2 className="text-xl font-semibold mb-2">Input Data</h2>
      <input
        type="file"
        accept=".csv,.json,.xlsx,.xls"
        onChange={handleFile}
        className="text-sm"
      />
      <div className="flex gap-4">
        <button
          onClick={generateSample}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
        >
          샘플 데이터 생성
        </button>
        <button
          onClick={fetchAPIData}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
        >
          API 데이터 가져오기
        </button>
      </div>
    </div>
  );
};

export default InputData;
