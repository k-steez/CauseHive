import PhotoUpload from '../components/PhotoUpload';

export default function UploadPage() {
  const handleUpload = (files) => {
    console.log('Uploading files:', files);
    // TODO: Implement actual upload logic
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upload Photos</h1>
      <PhotoUpload onUpload={handleUpload} />
    </div>
  );
}
