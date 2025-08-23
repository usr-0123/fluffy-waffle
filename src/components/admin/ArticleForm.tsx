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

const ArticleForm = () => {
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setArticleFormData(prev => ({ ...prev, [field]: value }));
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
        const imageRef = storageRef(storage, `articles/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const articleData = {
        ...articleFormData,
        imageUrl,
        type: 'article' as const,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await push(ref(database, 'articles'), articleData);

      toast({
        title: "Success!",
        description: "Article created successfully.",
      });

      // Reset form
      setArticleFormData({
        title: '',
        description: '',
        category: '',
        content: '',
      });
      setImage(null);
      
      // Reset file input
      const fileInput = document.getElementById('article-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
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
        <h2 className="text-2xl font-bold text-gray-900">Create New Article</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            value={articleFormData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter article title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={articleFormData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the article"
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Article Content</Label>
          <Textarea
            id="content"
            value={articleFormData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Full article content"
            className="min-h-32"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="case-study">Case Study</SelectItem>
              <SelectItem value="tips">Tips & Tricks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="article-image">Featured Image</Label>
          <div className="mt-2">
            <Input
              id="article-image"
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
              Creating Article...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
