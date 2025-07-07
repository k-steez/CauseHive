import { useState, useCallback } from 'react';

export default function PhotoUpload({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('image/'));
    
    if (droppedFiles.length) {
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter(file => file.type.startsWith('image/'));
    
    if (selectedFiles.length) {
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = () => {
    if (files.length && onUpload) {
      onUpload(files);
      setFiles([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
        />
        <p className="text-gray-600">
          {isDragging ? 'Drop images here' : 'Drag & drop images here or click to select'}
        </p>
      </div>

      {files.length > 0 && (
        <>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-500">{Math.round(file.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >
            Upload {files.length} {files.length === 1 ? 'Photo' : 'Photos'}
          </button>
        </>
      )}
    </div>
  );
}
