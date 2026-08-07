import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { createNewProperty, editProperty } from '../redux/propertiesSlice';
import propertyService from '../services/propertyService';
import ImageUploader from '../components/ImageUploader';
import { HiArrowLeft } from 'react-icons/hi2';
import { toast } from 'react-toastify';

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  propertyType: yup.string().oneOf(['Apartment', 'Villa', 'Plot', 'Commercial'], 'Invalid type').required('Property type is required'),
  status: yup.string().oneOf(['Sale', 'Rent'], 'Invalid status').required('Listing status is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be positive').required('Price is required'),
  location: yup.string().required('Location is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
  bedrooms: yup.number().typeError('Bedrooms must be a number').min(0, 'Cannot be negative').default(0),
  bathrooms: yup.number().typeError('Bathrooms must be a number').min(0, 'Cannot be negative').default(0),
  areaSqft: yup.number().typeError('Area must be a number').positive('Area must be positive').required('Area is required'),
  amenities: yup.string().default(''),
  featured: yup.boolean().default(false),
  active: yup.boolean().default(true),
});

const AdminPropertyForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actionLoading } = useSelector((state) => state.properties);

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bedrooms: 0,
      bathrooms: 0,
      featured: false,
      active: true,
    },
  });

  const selectedType = watch('propertyType');

  // Load existing details for edit mode
  useEffect(() => {
    if (isEdit && id) {
      const loadDetails = async () => {
        setFormLoading(true);
        try {
          // Fetch property directly by id or slug.
          // Since the admin screen has id, we can fetch all and locate,
          // or we can fetch by slug. But our service has getPropertyBySlug.
          // Wait! Let's get the property from the list, or fetch it.
          // Let's implement a fetch directly via propertyService using standard parameters
          // or fetch list and find. Or, getPropertyBySlug works.
          // Wait, is there a getPropertyById? We can query our properties list first!
          const listResponse = await propertyService.getProperties({ active: 'all', limit: 100 });
          const property = listResponse.properties.find((p) => p._id === id);

          if (property) {
            setValue('title', property.title);
            setValue('description', property.description);
            setValue('propertyType', property.propertyType);
            setValue('status', property.status);
            setValue('price', property.price);
            setValue('location', property.location);
            setValue('address', property.address);
            setValue('city', property.city);
            setValue('state', property.state);
            setValue('pincode', property.pincode);
            setValue('bedrooms', property.bedrooms);
            setValue('bathrooms', property.bathrooms);
            setValue('areaSqft', property.areaSqft);
            setValue('featured', property.featured);
            setValue('active', property.active);
            setValue('amenities', property.amenities.join(', '));
            setExistingImages(property.images || []);
          } else {
            toast.error('Listing data not found in cache.');
            navigate('/admin/properties');
          }
        } catch (error) {
          toast.error('Failed to load listing details.');
        } finally {
          setFormLoading(false);
        }
      };
      loadDetails();
    }
  }, [isEdit, id, setValue, navigate]);

  const onSubmit = async (data) => {
    // Construct FormData envelope
    const formData = new FormData();
    
    // Append standard inputs
    Object.keys(data).forEach((key) => {
      if (key === 'amenities') {
        // Parse amenities comma string into clean JSON array
        const amenitiesArray = data.amenities
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
        formData.append('amenities', JSON.stringify(amenitiesArray));
      } else {
        formData.append(key, data[key]);
      }
    });

    // Append images
    if (isEdit) {
      formData.append('images', JSON.stringify(existingImages));
    }

    newImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      if (isEdit) {
        const result = await dispatch(editProperty({ id, formData }));
        if (editProperty.fulfilled.match(result)) {
          toast.success('Property listing modified successfully.');
          navigate('/admin/properties');
        } else {
          toast.error(result.payload || 'Failed to update listing.');
        }
      } else {
        const result = await dispatch(createNewProperty(formData));
        if (createNewProperty.fulfilled.match(result)) {
          toast.success('New property listing published successfully.');
          navigate('/admin/properties');
        } else {
          toast.error(result.payload || 'Failed to publish listing.');
        }
      }
    } catch (error) {
      toast.error('Network connection error.');
    }
  };

  if (formLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
          <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">Loading listing details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Modify Property Listing' : 'Publish Property Listing'} | SVS Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/properties"
            className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
          >
            <HiArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-wide uppercase">
              {isEdit ? 'Modify Listing' : 'Publish Listing'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Provide geographic details, layout specs, and premium photography assets.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200/50 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Property Title</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. SVS Royal Palms Villa"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.title && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Narrative Description</label>
              <textarea
                rows={5}
                {...register('description')}
                placeholder="Describe the architectural layout, materials, luxury fittings, and community context..."
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none resize-none focus:ring-1 transition-all ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.description && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.description.message}</p>}
            </div>

            {/* Type */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Property Class</label>
              <select
                {...register('propertyType')}
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none appearance-none focus:ring-1 transition-all ${
                  errors.propertyType ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
              {errors.propertyType && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.propertyType.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Acquisition Status</label>
              <select
                {...register('status')}
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none appearance-none focus:ring-1 transition-all ${
                  errors.status ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              >
                <option value="Sale">For Buy/Sale</option>
                <option value="Rent">For Rent</option>
              </select>
              {errors.status && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.status.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Valuation Price (₹)</label>
              <input
                type="number"
                {...register('price')}
                placeholder="e.g. 7500000"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.price ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.price && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.price.message}</p>}
            </div>

            {/* Area */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Area Size (Sqft)</label>
              <input
                type="number"
                {...register('areaSqft')}
                placeholder="e.g. 2400"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.areaSqft ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.areaSqft && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.areaSqft.message}</p>}
            </div>

            {/* Bedrooms (Show only if not Plot or Commercial) */}
            {selectedType !== 'Plot' && selectedType !== 'Commercial' && (
              <>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Bedrooms count (BHK)</label>
                  <input
                    type="number"
                    {...register('bedrooms')}
                    placeholder="3"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                      errors.bedrooms ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {errors.bedrooms && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.bedrooms.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Bathrooms count</label>
                  <input
                    type="number"
                    {...register('bathrooms')}
                    placeholder="3"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                      errors.bathrooms ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {errors.bathrooms && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.bathrooms.message}</p>}
                </div>
              </>
            )}

            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Locality / Sector</label>
              <input
                type="text"
                {...register('location')}
                placeholder="e.g. Jubilee Hills"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.location ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.location && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.location.message}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">City</label>
              <input
                type="text"
                {...register('city')}
                placeholder="e.g. Hyderabad"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.city && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.city.message}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Street Address</label>
              <input
                type="text"
                {...register('address')}
                placeholder="e.g. Plot No 12, Road No 10"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.address && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.address.message}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">State</label>
              <input
                type="text"
                {...register('state')}
                placeholder="e.g. Telangana"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.state ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.state && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.state.message}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Pincode</label>
              <input
                type="text"
                {...register('pincode')}
                placeholder="e.g. 500033"
                className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                  errors.pincode ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
              {errors.pincode && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.pincode.message}</p>}
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Amenities (comma-separated)</label>
              <input
                type="text"
                {...register('amenities')}
                placeholder="e.g. Swimming Pool, Private Gym, Power Backup, 24/7 Security"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>

            {/* Flags */}
            <div className="md:col-span-2 flex items-center space-x-8 py-2">
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="rounded border-slate-350 text-amber-500 focus:ring-amber-500 h-4.5 w-4.5"
                />
                <span>Mark as Featured Estate</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  {...register('active')}
                  className="rounded border-slate-350 text-amber-500 focus:ring-amber-500 h-4.5 w-4.5"
                />
                <span>Set Listing Status to Active</span>
              </label>
            </div>

            {/* Photo Uploader */}
            <div className="md:col-span-2">
              <ImageUploader
                newImages={newImages}
                setNewImages={setNewImages}
                existingImages={existingImages}
                setExistingImages={setExistingImages}
              />
            </div>
          </div>

          {/* Submit controls */}
          <div className="flex justify-end space-x-4 border-t border-slate-100 pt-6">
            <Link
              to="/admin/properties"
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-lg transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={actionLoading}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-slate-900 font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              {actionLoading ? 'Saving Listing...' : isEdit ? 'Modify Listing' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminPropertyForm;
