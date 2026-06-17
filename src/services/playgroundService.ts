import { supabase } from '../lib/supabase';

export interface PlaygroundExample {
  id: string;
  title: string;
  language: 'c' | 'python';
  code: string;
  description: string | null;
  sortOrder: number;
}

export const getPlaygroundExamples = async (language?: 'c' | 'python'): Promise<PlaygroundExample[]> => {
  try {
    let query = supabase
      .from('playground_examples')
      .select('*')
      .order('sort_order', { ascending: true });

    if (language) {
      query = query.eq('language', language);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      language: item.language,
      code: item.code,
      description: item.description,
      sortOrder: item.sort_order
    })) as PlaygroundExample[];
  } catch (error) {
    console.error('Error fetching playground examples:', error);
    return [];
  }
};

export const addPlaygroundExample = async (example: Omit<PlaygroundExample, 'id'>): Promise<string> => {
  const { data, error } = await supabase
    .from('playground_examples')
    .insert([{
      title: example.title,
      language: example.language,
      code: example.code,
      description: example.description,
      sort_order: example.sortOrder
    }])
    .select()
    .single();

  if (error) throw error;
  return data.id;
};

export const updatePlaygroundExample = async (id: string, example: Partial<PlaygroundExample>): Promise<void> => {
  const formatted: any = {};
  if (example.title) formatted.title = example.title;
  if (example.language) formatted.language = example.language;
  if (example.code) formatted.code = example.code;
  if (example.description !== undefined) formatted.description = example.description;
  if (example.sortOrder !== undefined) formatted.sort_order = example.sortOrder;

  const { error } = await supabase
    .from('playground_examples')
    .update(formatted)
    .eq('id', id);

  if (error) throw error;
};

export const deletePlaygroundExample = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('playground_examples')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
