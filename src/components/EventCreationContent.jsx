import React, { useState, useRef } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MIN_DIMENSIONS = { width: 1200, height: 600 };
const MAX_DIMENSIONS = { width: 3840, height: 1920 };

const EventCreationContent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    isPublic: true,
    requiresApproval: false,
    capacity: 'unlimited',
    coverImage: null,
    coverImageUrl: null
  });

  const [imageError, setImageError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file selected');
        return;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        reject('File type not supported. Please upload JPEG, PNG, or WebP images.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        reject('File size too large. Maximum size is 5MB.');
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(img.src);
        
        if (img.width < MIN_DIMENSIONS.width || img.height < MIN_DIMENSIONS.height) {
          reject(`Image dimensions too small. Minimum size is ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height}px.`);
          return;
        }

        if (img.width > MAX_DIMENSIONS.width || img.height > MAX_DIMENSIONS.height) {
          reject(`Image dimensions too large. Maximum size is ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height}px.`);
          return;
        }

        resolve(true);
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject('Error loading image. Please try another file.');
      };
    });
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let { width, height } = img;
        if (width > MAX_DIMENSIONS.width) {
          height *= MAX_DIMENSIONS.width / width;
          width = MAX_DIMENSIONS.width;
        }
        if (height > MAX_DIMENSIONS.height) {
          width *= MAX_DIMENSIONS.height / height;
          height = MAX_DIMENSIONS.height;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.8 
        );
      };
    });
  };

  const processImage = async (file) => {
    try {
      setImageLoading(true);
      setImageError(null);

      await validateImage(file);
      const compressedFile = await compressImage(file);
      const imageUrl = URL.createObjectURL(compressedFile);

      setEventData(prev => ({
        ...prev,
        coverImage: compressedFile,
        coverImageUrl: imageUrl
      }));

      setImageError({ type: 'success', message: 'Image uploaded successfully!' });
    } catch (error) {
      setImageError({ type: 'error', message: error });
      setEventData(prev => ({
        ...prev,
        coverImage: null,
        coverImageUrl: null
      }));
    } finally {
      setImageLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleImageClick = () => {
    if (!imageLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-2">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form className="space-y-6">
        {/* Image Upload Section */}
        <div 
          onClick={handleImageClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative aspect-[2/1] w-full rounded-xl overflow-hidden group cursor-pointer 
            ${imageLoading ? 'opacity-50 cursor-wait' : ''}`}
        >
          {eventData.coverImageUrl ? (
            <>
              <img 
                src={eventData.coverImageUrl} 
                alt="Event cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Change Cover Image
                </p>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-base-200 border-2 border-dashed border-base-300 hover:bg-base-300 transition-colors flex items-center justify-center">
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-base-content/70 mb-2">Click or drag to upload event cover image</p>
                <p className="text-xs text-base-content/50">
                  JPEG, PNG or WebP • Max 5MB • Min {MIN_DIMENSIONS.width}x{MIN_DIMENSIONS.height}px
                </p>
              </div>
            </div>
          )}
          <input 
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Image Upload Status/Error Messages - Using DaisyUI Alert */}
        {imageError && (
          <div className={`alert ${imageError.type === 'error' ? 'alert-error' : 'alert-success'} mt-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              {imageError.type === 'error' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <div>
              <h3 className="font-bold">{imageError.type === 'error' ? 'Error' : 'Success'}</h3>
              <div className="text-sm">{imageError.message}</div>
            </div>
          </div>
        )}

        {/* Event Name */}
        <div className="form-control">
          <input 
            type="text"
            name="name"
            placeholder="Event Name"
            className="input input-lg input-ghost w-full text-3xl font-semibold placeholder:text-base-content/50"
            value={eventData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Mulai</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="startDate"
                className="input input-bordered"
                value={eventData.startDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="startTime"
                className="input input-bordered"
                value={eventData.startTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Akhir</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="endDate"
                className="input input-bordered"
                value={eventData.endDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="endTime"
                className="input input-bordered"
                value={eventData.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Lokasi Acara</span>
          </label>
          <input 
            type="text"
            name="location"
            placeholder="Lokasi offline atau tautan virtual"
            className="input input-bordered"
            value={eventData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <textarea
            name="description"
            placeholder="Tambahkan Deskripsi"
            className="textarea textarea-bordered h-24"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Event Settings */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Opsi Acara</h3>
            
            {/* Visibility Toggle */}
            <div className="flex justify-between items-center py-2">
              <div>
                <h4 className="font-medium">Tiket</h4>
                <p className="text-sm text-base-content/70">Gratis</p>
              </div>
              <button type="button" className="btn btn-sm btn-ghost">Edit</button>
            </div>

            {/* Approval Toggle */}
            <div className="flex justify-between items-center py-2">
              <div>
                <h4 className="font-medium">Memerlukan Persetujuan</h4>
                <p className="text-sm text-base-content/70">Tamu harus disetujui untuk menghadiri acara</p>
              </div>
              <input
                type="checkbox"
                name="requiresApproval"
                className="toggle toggle-primary"
                checked={eventData.requiresApproval}
                onChange={handleInputChange}
              />
            </div>

            {/* Capacity Setting */}
            <div className="flex justify-between items-center py-2">
              <div>
                <h4 className="font-medium">Capacity</h4>
                <p className="text-sm text-base-content/70">Tak terbatas</p>
              </div>
              <button type="button" className="btn btn-sm btn-ghost">Edit</button>
              </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block">
        Buat Acara
        </button>
      </form>

      {/* Loading Overlay */}
      {imageLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Modals for Edit Options */}
      <dialog id="modal_ticket" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Ticket Settings</h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Free Event</span>
              <input type="radio" name="ticketType" className="radio" checked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Paid Event</span>
              <input type="radio" name="ticketType" className="radio" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price (TON)</span>
            </label>
            <input type="number" className="input input-bordered" placeholder="Enter price in TON" />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_capacity" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Capacity</h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Unlimited</span>
              <input type="radio" name="capacityType" className="radio" checked />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Limited</span>
              <input type="radio" name="capacityType" className="radio" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Maximum Attendees</span>
            </label>
            <input type="number" className="input input-bordered" placeholder="Enter maximum capacity" />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventCreationContent;