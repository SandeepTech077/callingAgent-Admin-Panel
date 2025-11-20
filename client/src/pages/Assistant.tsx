import { useQuery } from '@tanstack/react-query';
import { assistantsAPI } from '../api/assistants';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AssistantTable } from '../components/AssistantComponents';

export default function Assistant() {
  const navigate = useNavigate();

  // Fetch assistants
  const { data: assistantsResponse, isLoading: loadingAssistants } = useQuery({
    queryKey: ['assistants'],
    queryFn: () => assistantsAPI.getAllAssistants()
  });

  const assistants = assistantsResponse?.data || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
      

        {/* Assistants Table */}
        <AssistantTable
          assistants={assistants}
          isLoading={loadingAssistants}
        />
      </div>
    </div>
  );
}
