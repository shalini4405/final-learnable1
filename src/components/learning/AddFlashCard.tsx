import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useLearning } from '@/contexts/LearningContext';
import { useToast } from '../ui/use-toast';
import { X } from 'lucide-react';

interface AddFlashCardProps {
  onClose: () => void;
}

const AddFlashCard: React.FC<AddFlashCardProps> = ({ onClose }) => {
  const { addFlashcard } = useLearning();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    hint: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question || !formData.answer || !formData.category) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in question, answer, and category.",
        variant: "destructive"
      });
      return;
    }

    addFlashcard({
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      hint: formData.hint || undefined,
      image: formData.image || undefined
    });

    toast({
      title: "Flashcard Added",
      description: "Your new flashcard has been created successfully!"
    });

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Add New Flashcard</CardTitle>
          <CardDescription>Create a new card to study</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              name="question"
              placeholder="Enter your question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              name="answer"
              placeholder="Enter the answer"
              value={formData.answer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Math, Science, History"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hint">Hint (Optional)</Label>
            <Input
              id="hint"
              name="hint"
              placeholder="Add a helpful hint"
              value={formData.hint}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Flashcard
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFlashCard; 