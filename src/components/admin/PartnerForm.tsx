import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { ref, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '@/lib/firebase';
import { Upload, Plus } from 'lucide-react';

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    website: '',
    partnershipType: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      
      if (image) {
        const imageRef = storageRef(storage, `partners/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const partnerData = {
        ...formData,
        imageUrl,
        type: 'partner' as const,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await push(ref(database, 'partners'), partnerData);

      toast({
        title: "Success!",
        description: "Partner created successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        website: '',
        partnershipType: '',
      });
      setImage(null);
      
      // Reset file input
      const fileInput = document.getElementById('partner-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error creating partner:', error);
      toast({
        title: "Error",
        description: "Failed to create partner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Plus className="h-6 w-6 mr-2 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Add New Partner</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="title">Partner Name</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter partner name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the partnership"
            required
          />
        </div>

        <div>
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://partner-website.com"
          />
        </div>

        <div>
          <Label htmlFor="partnershipType">Partnership Type</Label>
          <Select onValueChange={(value) => handleInputChange('partnershipType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier">Supplier</SelectItem>
              <SelectItem value="technology">Technology Partner</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
              <SelectItem value="strategic">Strategic Alliance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="partner-image">Partner Logo</Label>
          <div className="mt-2">
            <Input
              id="partner-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              Adding Partner...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PartnerForm;
