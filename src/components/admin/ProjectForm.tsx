import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea'; 
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { storage, database } from '@/lib/firebase';
import { toast } from 'sonner';
import { Upload, Image } from 'lucide-react';

type ProjectCategory = 'residential' | 'commercial' | 'industrial';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('residential');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!duration.trim()) newErrors.duration = 'Duration is required';
    if (!teamSize.trim()) newErrors.teamSize = 'Team size is required';

    if (imageFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(imageFile.type)) {
        newErrors.imageFile = 'Image must be JPEG, PNG, or WebP format';
      }
      if (imageFile.size > 10 * 1024 * 1024) {
        newErrors.imageFile = 'Image must be smaller than 10MB';
      }
    } else {
      newErrors.imageFile = 'Project image is required';
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
        const imageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const projectData = {
        title,
        description,
        imageUrl,
        category,
        location,
        duration,
        teamSize,
        type: 'project' as const,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const projectRef = dbRef(database, 'projects');
      const newProjectRef = push(projectRef);
      await set(newProjectRef, projectData);

      toast.success('Project uploaded successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('residential');
      setLocation('');
      setDuration('');
      setTeamSize('');
      setImageFile(null);
      setErrors({});
      const fileInput = document.getElementById('project-image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload project. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-6 w-6" />
          <span>Add Project</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="project-title">Project Title *</Label>
            <Input
              id="project-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="project-description">Project Description *</Label>
            <Textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label>Project Category *</Label>
            <Select value={category} onValueChange={(value: ProjectCategory) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="project-location">Location *</Label>
              <Input
                id="project-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="project-duration">Duration *</Label>
              <Input
                id="project-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 3 months"
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <Label htmlFor="project-teamSize">Team Size *</Label>
              <Input
                id="project-teamSize"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="e.g. 8 technicians"
                className={errors.teamSize ? 'border-red-500' : ''}
              />
              {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="project-image-upload">Project Image *</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="project-image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className={`flex-1 ${errors.imageFile ? 'border-red-500' : ''}`}
              />
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Image className="h-4 w-4" />
                <span>Required (Max 10MB)</span>
              </div>
            </div>
            {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Project'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
