import React, { useState } from 'react';
import { Button } from '../../../../../Templates/spark-vision-builds/src/components/ui/button';
import { Input } from '../../../../../Templates/spark-vision-builds/src/components/ui/input';
import { Textarea } from '../../../../../Templates/spark-vision-builds/src/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../Templates/spark-vision-builds/src/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../Templates/spark-vision-builds/src/components/ui/select';
import { Label } from '../../../../../Templates/spark-vision-builds/src/components/ui/label';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { storage, database } from '../../../../../Templates/spark-vision-builds/src/lib/firebase';
import { toast } from 'sonner';
import { Upload, Image } from 'lucide-react';
import { PREDEFINED_ICONS } from '../../../../../Templates/spark-vision-builds/src/lib/predefinedIcons';

const ServiceForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconId, setIconId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!iconId) newErrors.iconId = 'Icon selection is required';

    if (imageFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(imageFile.type)) {
        newErrors.imageFile = 'Image must be JPEG, PNG, or WebP format';
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        newErrors.imageFile = 'Image must be smaller than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      if (errors.imageFile) {
        setErrors(prev => ({ ...prev, imageFile: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix form errors');
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = '';
      
      if (imageFile) {
        const imageRef = ref(storage, `services/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const serviceData = {
        title,
        description,
        imageUrl,
        iconId,
        type: 'service' as const,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const serviceRef = dbRef(database, 'services');
      const newServiceRef = push(serviceRef);
      await set(newServiceRef, serviceData);

      toast.success('Service uploaded successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setIconId('');
      setImageFile(null);
      setErrors({});
      const fileInput = document.getElementById('service-image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload service. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-6 w-6" />
          <span>Add Service</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="service-title">Service Title *</Label>
            <Input
              id="service-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter service title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="service-description">Service Description *</Label>
            <Textarea
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description"
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label>Service Icon *</Label>
            <Select value={iconId} onValueChange={setIconId}>
              <SelectTrigger className={errors.iconId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {PREDEFINED_ICONS.map((icon) => {
                  const IconComponent = icon.component;
                  return (
                    <SelectItem key={icon.id} value={icon.id}>
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{icon.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.iconId && <p className="text-red-500 text-sm mt-1">{errors.iconId}</p>}
          </div>

          <div>
            <Label htmlFor="service-image-upload">Service Image</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="service-image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className={`flex-1 ${errors.imageFile ? 'border-red-500' : ''}`}
              />
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Image className="h-4 w-4" />
                <span>Optional (Max 5MB)</span>
              </div>
            </div>
            {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
