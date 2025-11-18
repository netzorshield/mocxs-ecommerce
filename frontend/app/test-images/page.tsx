'use client';

export default function TestImages() {
  const images = [
    '/images/trends/Innerwear_90b511e4-5a96-416d-9077-2bc4b762b713.png',
    '/images/trends/Panties_dc2b266b-9a3d-4d42-836a-be682f902690.png',
    '/images/trends/Screenshot 2025-11-14 170142.png',
    '/images/trends/Shorts_3bd61a03-ba6e-43a2-94b6-85478c20b13b.png',
    '/images/trends/Sleep_Dress_8948eed7-7f89-42a7-9a8f-258df0b24e08.png',
    '/images/trends/T-Shirts_d9ea7289-357e-44ba-9a8d-cbaa96a5f891.png',
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="border p-4">
            <p className="mb-2 text-sm">{img}</p>
            <div className="relative h-64 bg-gray-100">
              <img
                src={img}
                alt={`Test ${idx + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => console.log('✅ Loaded:', img)}
                onError={(e) => {
                  console.error('❌ Failed:', img);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

