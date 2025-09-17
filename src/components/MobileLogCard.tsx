import React from 'react';
import { Button, Input, Textarea } from '@heroui/react';
import { LoadingStates } from './LoadingSpinner';

interface LocalLogEntry {
  id: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  logText: string;
}

interface MobileLogCardProps {
  log: LocalLogEntry;
  index: number;
  isEditing: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  onUpdateField: (logId: string, field: 'owner' | 'logText', value: string) => void;
  onSave: (logId: string) => void;
  onCancel: (logId: string) => void;
  onStartEditing: (logId: string) => void;
  onDelete: (logId: string) => void;
  formatDate: (date: Date) => string;
}

export const MobileLogCard: React.FC<MobileLogCardProps> = ({
  log,
  index,
  isEditing,
  isSaving,
  isDeleting,
  onUpdateField,
  onSave,
  onCancel,
  onStartEditing,
  onDelete,
  formatDate
}) => {
  return (
    <div 
      key={log.id} 
      id={`log-${log.id}`} 
      className={`rounded-lg p-4 border-l-4 ${
        index % 2 === 0 
          ? "bg-[#e9ecf2] border-l-[#e9ecf2]" 
          : "bg-[#f8f9fa] border-l-[#f8f9fa]"
      }`}
    >
      <div className="space-y-3 text-gray-900">
        <div>
          <label className="text-sm font-medium text-gray-500">Owner</label>
          {isEditing ? (
            <Input
              value={log.owner}
              onChange={(e) => onUpdateField(log.id, 'owner', e.target.value)}
              placeholder="Enter owner name"
              classNames={{
                input: "p-1 border border-gray-500 min-w-[200px]",
                inputWrapper: "p-0"
              }}
              className="mt-1"
              size="sm"
            />
          ) : (
            <p className="text-gray-900 mt-1">{log.owner || 'No owner'}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Created</label>
            <p className="text-sm text-gray-600 mt-1">{formatDate(log.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Updated</label>
            <p className="text-sm text-gray-600 mt-1">{formatDate(log.updatedAt)}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Log Text</label>
          {isEditing ? (
            <Textarea
              value={log.logText}
              onChange={(e) => onUpdateField(log.id, 'logText', e.target.value)}
              placeholder="Enter log text"
              minRows={2}
              maxRows={2}
              classNames={{
                input: "p-1 border border-gray-500",
                inputWrapper: "p-0 w-full"
              }}
              className="mt-1 text-gray-900"
              size="sm"
            />
          ) : (
            <p className="text-gray-900 mt-1 whitespace-pre-wrap">{log.logText || 'No log text'}</p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {isEditing ? (
            <>
              <Button
                color="success"
                size="sm"
                onPress={() => onSave(log.id)}
                disabled={isSaving}
                className="flex-1 p-2 text-gray-900 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-green-500 transition-all duration-200 rounded-lg"
              >
                {isSaving ? <LoadingStates.SaveLoading /> : 'Save'}
              </Button>
              <Button
                color="default"
                size="sm"
                onPress={() => onCancel(log.id)}
                className="flex-1 p-2 text-gray-900 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-gray-500 transition-all duration-200 rounded-lg"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                size="sm"
                onPress={() => onStartEditing(log.id)}
                className="flex-1 p-2 text-gray-900 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-blue-500 transition-all duration-200 rounded-lg"
              >
                Update
              </Button>
              <Button
                color="danger"
                size="sm"
                onPress={() => onDelete(log.id)}
                disabled={isDeleting}
                className="flex-1 p-2 text-gray-900 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-red-500 transition-all duration-200 rounded-lg"
              >
                {isDeleting ? <LoadingStates.DeleteLoading /> : 'Delete'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
