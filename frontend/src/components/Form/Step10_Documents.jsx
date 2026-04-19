import React, { useState } from 'react';

const Step10_Documents = ({ formData, updateFormData, handleFileUpload, uploading }) => {
  const [uploadStatus, setUploadStatus] = useState({});

  const onFileUpload = async (file, type) => {
    if (!file) return;
    
    setUploadStatus(prev => ({ ...prev, [type]: 'uploading' }));
    
    try {
      const fileType = type === 'pitchdeck' ? 'pitchdeck' : 
                       type === 'financial' ? 'financial' : 
                       type === 'screenshot' ? 'screenshot' : 'document';
      
      await handleFileUpload(file, fileType);
      setUploadStatus(prev => ({ ...prev, [type]: 'success' }));
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 10: Documents Upload</h2>
      
      {/* Pitch Deck - Mandatory */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="font-semibold text-gray-700 block mb-2">
          Pitch Deck (PDF) <span className="text-red-500">* Mandatory</span>
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => onFileUpload(e.target.files[0], 'pitchdeck')}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-fsv-navy file:text-white hover:file:bg-fsv-navy/90"
          disabled={uploading}
        />
        {uploadStatus.pitchdeck === 'uploading' && <p className="text-blue-500 text-sm mt-2">⏳ Uploading...</p>}
        {formData.pitchDeckUrl && (
          <p className="text-green-600 text-sm mt-2">
            ✅ Pitch Deck uploaded successfully!
          </p>
        )}
        {!formData.pitchDeckUrl && uploadStatus.pitchdeck !== 'uploading' && (
          <p className="text-red-500 text-sm mt-2">⚠️ Pitch Deck is required</p>
        )}
      </div>
      
      {/* Financial Model - Optional */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="font-semibold text-gray-700 block mb-2">
          Financial Model (Optional)
        </label>
        <input
          type="file"
          accept=".pdf,.xlsx,.xls"
          onChange={(e) => onFileUpload(e.target.files[0], 'financial')}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-700"
          disabled={uploading}
        />
        {uploadStatus.financial === 'uploading' && <p className="text-blue-500 text-sm mt-2">⏳ Uploading...</p>}
        {formData.financialModelUrl && <p className="text-green-600 text-sm mt-2">✅ Uploaded</p>}
      </div>
      
      {/* Product Demo / Screenshots - Optional */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="font-semibold text-gray-700 block mb-2">
          Product Demo / Screenshots (Optional)
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => onFileUpload(e.target.files[0], 'screenshot')}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-700"
          disabled={uploading}
        />
        {uploadStatus.screenshot === 'uploading' && <p className="text-blue-500 text-sm mt-2">⏳ Uploading...</p>}
        {formData.screenshotsUrl && <p className="text-green-600 text-sm mt-2">✅ Uploaded</p>}
      </div>
      
      {/* Additional Documents - Optional */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="font-semibold text-gray-700 block mb-2">
          Any Additional Documents (Optional)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onFileUpload(e.target.files[0], 'document')}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-700"
          disabled={uploading}
        />
        {uploadStatus.document === 'uploading' && <p className="text-blue-500 text-sm mt-2">⏳ Uploading...</p>}
        {formData.additionalDocsUrl && <p className="text-green-600 text-sm mt-2">✅ Uploaded</p>}
      </div>
      
      {uploading && <p className="text-center text-fsv-navy">Uploading... Please wait</p>}
    </div>
  );
};

export default Step10_Documents;