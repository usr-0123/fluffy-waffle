import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useContentData } from '../../hooks/useContentData';
import { ref, remove, update } from 'firebase/database';
import { database } from '../../lib/firebase';
import { useToast } from '../../hooks/use-toast';
import { Edit, Trash2, Eye, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ContentListProps {
  contentType: 'service' | 'project' | 'article' | 'partner';
}

const ContentList = ({ contentType }: ContentListProps) => {
  const { data: items, loading, error } = useContentData(contentType);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await remove(ref(database, `${contentType}s/${itemId}`));
      toast({
        title: "Success!",
        description: "Item deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setEditFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editingItem) return;

    try {
      const updatedData = {
        ...editFormData,
        updatedAt: Date.now()
      };
      
      await update(ref(database, `${contentType}s/${editingItem.id}`), updatedData);
      
      toast({
        title: "Success!",
        description: "Item updated successfully.",
      });
      
      setIsDialogOpen(false);
      setEditingItem(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      });
    }
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{contentType}s</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading {contentType}s...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{contentType}s</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Error loading {contentType}s: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{contentType}s ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No {contentType}s found. Create your first {contentType} using the form above.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {item.imageUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.imageUrl, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {contentType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editFormData.title || ''}
                onChange={(e) => handleEditInputChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editFormData.description || ''}
                onChange={(e) => handleEditInputChange('description', e.target.value)}
              />
            </div>
            {contentType === 'project' && (
              <>
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editFormData.location || ''}
                    onChange={(e) => handleEditInputChange('location', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={editFormData.duration || ''}
                    onChange={(e) => handleEditInputChange('duration', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-teamSize">Team Size</Label>
                  <Input
                    id="edit-teamSize"
                    value={editFormData.teamSize || ''}
                    onChange={(e) => handleEditInputChange('teamSize', e.target.value)}
                  />
                </div>
              </>
            )}
            {contentType === 'partner' && (
              <div>
                <Label htmlFor="edit-website">Website</Label>
                <Input
                  id="edit-website"
                  value={editFormData.website || ''}
                  onChange={(e) => handleEditInputChange('website', e.target.value)}
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentList;
