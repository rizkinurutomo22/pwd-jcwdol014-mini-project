import { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError(null);
    } else {
      setError('Please upload a valid image file');
      setImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError('No image selected');
      return;
    }

    // Handle image upload logic here
    console.log('Uploading image:', image);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Upload Image</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-4 h-auto w-full rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-500"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
